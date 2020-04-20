'use strict';
var express = require("express");
var config = require('../config');
var async = require("async");
var mongo = require('mongodb');
var crypto = require('crypto');
var sha1 = require('node-sha1');
var fs = require('fs');
var util = require('util');
var logger = require('morgan');
var CronJob = require('cron').CronJob;
var mailProperty = require('../modules/sendMail');
var pushNotification = require('../modules/pushNotification');
var ObjectID = mongo.ObjectID;
var baseUrl = config.baseUrl;
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2', accessKeyId: 'AKIAIUAWYLXXOWUUHVIA', secretAccessKey: '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' });

//======================MONGO MODELS============================
var UserModels = require('../models/user');
var CategoryModel = require('../models/category');
var MusicModel = require('../models/music');
var FeedPostModel = require('../models/feed');
var FollowersModel = require('../models/followers');
var SubCategoryModel = require('../models/subCategory');
var LikeModel = require('../models/like');
var CommentModel = require('../models/comment');
var TransactionModel = require('../models/transactions');
var SongsRequestModel = require('../models/song_request');
var BlockuserModel = require('../models/blockUser');
var ContactModel = require('../models/contact_us');
var ReportUserModel = require('../models/reportUser');
var NotificationModel = require('../models/notification');
var braintree = require('braintree')
    //======================MONGO MODELS============================
    //======================LOGGER==================================
    /*    flags: 'a'
    });
    var logStdout = process.stdout;
    var baseUrl = config.baseUrl;
    console.log = function () {
        logFile.write(
            "\n===:" + new Date() + ":\n" +
            util.format.apply(null, arguments) +
            '\n===\n'
        );
        logStdout.write(
            "\n===:" + new Date() + ":\n" +
            util.format.apply(null, arguments) +
            '\n===\n'
        );
    }
    console.error = console.log*/
    //======================LOGGER KEY==============================
    //====================================BRAIN TREE IMPLEMENTATION===============================================
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'mktzgk7b8vcvh9zc',
    publicKey: 'zs53566xpf97v3n3',
    privateKey: 'd57aae02183c467736da698333bd917f'
});
//====================================BRAIN TREE IMPLEMENTATION===============================================
var apiService = {
    jwtAuthVerification: (jwtData, callback) => {
        if (jwtData.authtoken && jwtData.user_id) {
            UserModels.authenticate(jwtData, function(auth) {
                callback(auth);
            })
        }
    },
    signupUser: (userData, file, callback) => {
        console.log("---------------------");
        console.log(file);
        async.waterfall([
                function(nextCb) {
                    if (!userData.name || typeof userData.name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide first name", "response_data": {} });
                    }
                    if (!userData.gender || typeof userData.gender === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide your gender", "response_data": {} });
                    } else if (!userData.email || typeof userData.email === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide email", "response_data": {} });
                    } else if (!userData.password || typeof userData.password === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide password", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        var fileData = file;
                        userData._id = new ObjectID;
                        userData.authtoken = crypto.randomBytes(32).toString('hex');

                        if (fileData != null) {
                            var s3 = new AWS.S3();
                            var pic = fileData.profileimage;
                            var ext = pic.name.slice(pic.name.lastIndexOf('.'));
                            var fileName = Date.now() + ext;
                            var params = {
                                Bucket: 'musicalchalange/demo/profilepic',
                                Key: fileName,
                                Body: pic.data,
                                ContentType: pic.mimetype,
                                ACL: 'public-read'
                            };
                            console.log(file);
                            s3.upload(params, function(err, data) {
                                //musicData.image_url = data.Location;                              
                                if (err) {
                                    console.log('Profile image file error in callback');
                                }
                                if (data) {
                                    userData.image_url = data.Location;
                                    // console.log(profileData);
                                    UserModels.registerUser(userData, function(signUpRes) {
                                        if (signUpRes.response_code === 2000) {
                                            nextCb(null, signUpRes);
                                        }
                                        if (signUpRes.response_code === 5005) {
                                            nextCb(null, signUpRes);
                                        }
                                        if (signUpRes.response_code === 5000) {
                                            nextCb(null, signUpRes);
                                        }
                                        if (signUpRes.response_code === 5002) {
                                            nextCb(null, signUpRes);
                                        }
                                    })
                                }

                            });

                        }
                        if (fileData === null) {

                            console.log("null");
                            UserModels.registerUser(userData, function(signUpRes) {
                                // console.log(signUpRes);
                                if (signUpRes.response_code === 2000) {
                                    nextCb(null, signUpRes);
                                }
                                if (signUpRes.response_code === 5005) {
                                    nextCb(null, signUpRes);
                                }
                                if (signUpRes.response_code === 5000) {
                                    nextCb(null, signUpRes);
                                }
                                if (signUpRes.response_code === 5002) {
                                    nextCb(null, signUpRes);
                                }
                            })
                        }

                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    // console.log(content);
                    if (content.response_code === 2000) {
                        callback({
                            "response_code": 2000,
                            "response_message": "You have registered successfully.",
                            "response_data": {
                                "authtoken": content.response_data.authtoken,
                                "cat_selected": content.response_data.cat_selected,
                                "profile_type": content.response_data.user_type,
                                "profile_details": {
                                    "user_id": content.response_data._id,
                                    "name": content.response_data.name,
                                    "username": content.response_data.username,
                                    "email": content.response_data.email,
                                    "gender": content.response_data.gender,
                                    "profile_pic": content.response_data.image_url ? content.response_data.image_url : '',
                                    "aboutme": content.response_data.aboutme,
                                    "customerId": content.response_data.braintree_customerId
                                }
                            }
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": {
                                "authtoken": content.response_data.authtoken,
                                "cat_selected": content.response_data.cat_selected,
                                "profile_type": content.response_data.user_type,
                                "profile_details": {
                                    "user_id": content.response_data._id,
                                    "name": content.response_data.name,
                                    "username": content.response_data.username,
                                    "email": content.response_data.email,
                                    "profile_pic": content.response_data.image_url ? content.response_data.image_url : '',
                                    "gender": content.response_data.gender,
                                    "customerId": content.response_data.braintree_customerId
                                }
                            }
                        })
                    }
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                }
            })
    },
    socialSignup: (userData, callback) => {
        async.waterfall([
            function(nextCb) {
                if (!userData.name || typeof userData.name === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide first name", "response_data": {} });
                } else if (!userData.image_url || typeof userData.image_url === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide profile image", "response_data": {} });
                } else if (!userData.devicetoken || typeof userData.devicetoken === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide device token", "response_data": {} });
                } else if (!userData.social_id || typeof userData.social_id === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide social id", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    userData._id = new ObjectID;
                    userData.authtoken = crypto.randomBytes(32).toString('hex');
                    userData.user_type = 'Social';
                    UserModels.socialSignup(userData, function(socialSignupRes) {
                        nextCb(null, socialSignupRes);
                    })
                }
            }
        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })
            }
            if (!err) {
                if (content.response_code === 2000) {
                    callback({
                        "response_code": 2000,
                        "response_message": "You have registered successfully.",
                        "response_data": {
                            "authtoken": content.response_data.authtoken,
                            "profile_type": content.response_data.user_type,
                            "profile_details": {
                                "user_id": content.response_data._id,
                                "name": content.response_data.name,
                                "username": content.response_data.username,
                                "email": content.response_data.email,
                                "gender": content.response_data.gender,
                                "profile_pic": content.response_data.image_url ? content.response_data.image_url : '',
                                "aboutme": content.response_data.aboutme,
                                "customerId": content.response_data.braintree_customerId
                            }
                        }
                    })
                }
                if (content.response_code === 5000) {
                    callback({
                        "response_code": 2000,
                        "response_message": "User login successfully.",
                        "response_data": {
                            "authtoken": content.authtoken,
                            "profile_type": content.response_data.user_type,
                            "profile_details": {
                                "user_id": content.response_data._id,
                                "name": content.response_data.name,
                                "username": content.response_data.username,
                                "email": content.response_data.email,
                                "gender": content.response_data.gender,
                                "profile_pic": content.response_data.image_url ? content.response_data.image_url : '',
                                "aboutme": content.response_data.aboutme,
                                "customerId": content.response_data.braintree_customerId
                            }
                        }
                    })
                }
                if (content.response_code === 5005) {
                    callback(content);
                }
                if (content.response_code === 5002) {
                    callback(content);
                }
            }
        })
    },
    login: (loginData, callback) => {
        async.waterfall([
            function(nextCb) {
                if (!loginData.email || typeof loginData.email === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide email", "response_data": {} });
                } else if (!loginData.password || typeof loginData.password === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide password", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }

            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    console.log("===================");
                    console.log(loginData);
                    UserModels.login(loginData, function(loginInfo) {
                        nextCb(null, loginInfo);
                    })
                }
            },
            function(arg2, nextCb) {
                if (arg2.response_code === 5002) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 4001) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 5000) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 2000) {
                    if (arg2.profileRes) {
                        var loginInfo = {
                            "response_code": 2000,
                            "response_message": "Login success.",
                            "response_data": {
                                "authtoken": arg2.profileRes.authtoken,
                                "cat_selected": arg2.profileRes.cat_selected,
                                "profile_type": arg2.profileRes.user_type,
                                "profile_details": {
                                    "user_id": arg2.profileRes._id,
                                    "name": arg2.profileRes.name,
                                    "username": arg2.profileRes.username,
                                    "email": arg2.profileRes.email,
                                    "gender": arg2.profileRes.gender,
                                    "profile_pic": arg2.profileRes.image_url,
                                    "aboutme": arg2.profileRes.aboutme,
                                    "customerId": arg2.profileRes.braintree_customerId

                                }
                            }
                        }
                        nextCb(null, loginInfo);
                    }
                }
            }
        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })
            }
            if (!err) {
                if (content.response_code === 5005) {
                    callback(content);
                }
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 4001) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        })
    },
    logout: (logoutData, callback) => {
        if (logoutData.user_id && logoutData.apptype) {
            UserModels.logout(logoutData, function(logoutRes) {
                callback(logoutRes);
            })
        } else {
            callback({
                "response_code": 5002,
                "response_message": " insufficient information provided",
                "response_data": {}
            })
        }
    },
    changePassword: (changePasswordData, callback) => {
        if (changePasswordData.user_id && changePasswordData.password && changePasswordData.new_password) {
            UserModels.changePassword(changePasswordData, function(passwordRes) {
                callback(passwordRes);
            })
        } else {
            callback({
                "response_code": 5002,
                "response_message": " insufficient information provided",
                "response_data": {}
            })
        }
    },
    updateProfileData: (profileData, file, callback) => {
        console.log(file);
        async.waterfall([
            function(nextCb) {
                if (!profileData.user_id || typeof profileData.user_id === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    var fileData = file;

                    if (fileData != null) {

                        var s3 = new AWS.S3();
                        var pic = fileData.profileimage;
                        var ext = pic.name.slice(pic.name.lastIndexOf('.'));
                        var fileName = Date.now() + ext;
                        var params = {
                            Bucket: 'musicalchalange/demo/profilepic',
                            Key: fileName,
                            Body: pic.data,
                            ContentType: pic.mimetype,
                            ACL: 'public-read'
                        };
                        console.log(file);
                        s3.upload(params, function(err, data) {
                            console.log("-------11");
                            console.log(data);
                            console.log(data.Location);
                            console.log('--------22');
                            //musicData.image_url = data.Location;                              
                            if (err) {
                                console.log('Profile image file error in callback');
                            }
                            if (data) {
                                profileData.image_url = data.Location;
                                // console.log(profileData);
                                UserModels.updateUserProfile(profileData, function(updateProfileRes) {
                                    if (updateProfileRes.response_code === 2000) {
                                        nextCb(null, updateProfileRes);
                                    }
                                    if (updateProfileRes.response_code === 5005) {
                                        nextCb(null, updateProfileRes);
                                    }
                                    if (updateProfileRes.response_code === 5000) {
                                        nextCb(null, updateProfileRes);
                                    }
                                    if (updateProfileRes.response_code === 5002) {
                                        nextCb(null, updateProfileRes);
                                    }
                                })
                            }

                        });

                    }
                    if (fileData === null) {

                        console.log("null");
                        UserModels.updateUserProfile(profileData, function(updateProfileRes) {
                            // console.log(updateProfileRes);
                            if (updateProfileRes.response_code === 2000) {
                                nextCb(null, updateProfileRes);
                            }
                            if (updateProfileRes.response_code === 5005) {
                                nextCb(null, updateProfileRes);
                            }
                            if (updateProfileRes.response_code === 5000) {
                                nextCb(null, updateProfileRes);
                            }
                            if (updateProfileRes.response_code === 5002) {
                                nextCb(null, updateProfileRes);
                            }
                        })
                    }
                }
            },
            function(arg2, nextCb) {
                if (arg2.response_code === 5002) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 5005) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 5000) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 2000) {
                    // if(arg2.response_data.user_type=='Social')
                    // {
                    //      config.liveUrl='';
                    //      config.profilepicPath='';
                    // }
                    var profileData = {
                        "response_code": 2000,
                        "response_message": "Profile updated successfully.",
                        "response_data": {
                            "authtoken": arg2.response_data.authtoken,
                            "profile_type": arg2.response_data.user_type,
                            "profile_details": {
                                "user_id": arg2.response_data._id,
                                "name": arg2.response_data.name,
                                "username": arg2.response_data.username,
                                "email": arg2.response_data.email,
                                "gender": arg2.response_data.gender,
                                "profile_pic": arg2.response_data.image_url,
                                "aboutme": arg2.response_data.aboutme,
                                "customerId": arg2.response_data.braintree_customerId
                            }
                        }
                    }
                    nextCb(null, profileData);
                }
            }
        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })
            }
            if (content.response_code === 5002) {
                callback(content);
            }
            if (content.response_code === 5000) {
                callback(content);
            }
            if (content.response_code === 5005) {
                callback(content);
            }
            if (content.response_code === 2000) {
                //console.log(content);
                callback(content);
            }

        })
    },
    updateDeviceToken: (deviceData, callback) => {
        if (deviceData.devicetoken && deviceData.user_id) {
            UserModels.updateDeviceToken(deviceData, function(deviceDataRes) {
                callback(deviceDataRes);
            })
        } else {
            callback({
                "response_code": 5002,
                "response_message": " insufficient information provided",
                "response_data": {}
            })
        }
    },
    forgotPassword: (forgotPasswordData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!forgotPasswordData.email || typeof forgotPasswordData.email === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user email", "response_data": {} });
                    } else if (!forgotPasswordData.apptype || typeof forgotPasswordData.apptype === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide apptype ", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000, });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        UserModels.verifyUser(forgotPasswordData, function(userData) {
                            nextCb(null, userData);
                        })
                    }
                },
                function(arg2, nextCb) {
                    if (arg2.response_code === 5002) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 5005) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 2000) {
                        var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
                        var sh1Pass = sha1(random);
                        // console.log(forgotPasswordData);
                        UserModels.savePassword(forgotPasswordData, sh1Pass, function(userData) {
                            userData.random = random;
                            nextCb(null, userData);
                        })
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    if (content.response_code === 2000) {

                        mailProperty('forgotPasswordMail')(forgotPasswordData.email, {
                            OTP: content.random,
                            email: forgotPasswordData.email
                        }).send();
                        callback({
                            "response_code": 2000,
                            "response_message": "New password will be sent to your mail.",
                            "response_data": {}
                        })
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                }
            })
    },
    viewUserProfile: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.user_id || typeof userData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user ID", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }

                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        BlockuserModel.checkStatus(userData.user_id, userData.other_user_id, function(blockRes) {
                            console.log(blockRes);
                            //nextCb(null, userInfo);
                            if (blockRes.response_code === 5002) {
                                nextCb(null, { "response_code": 2000 })
                            } else {
                                nextCb(null, {
                                    "response_code": 5002,
                                    "response_message": "User has been block",
                                    "response_data": {}
                                });

                            }
                        })
                    }
                },
                function(arg2, nextCb) {
                    if (arg2.response_code === 5002) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 2000) {
                        UserModels.getUserProfile(userData, function(userInfo) {
                            //console.log(userInfo);
                            //nextCb(null, userInfo);
                            if (userInfo) {
                                nextCb(null, userInfo)
                            } else {
                                nextCb(null, {
                                    "response_code": 5002,
                                    "response_message": "User not found",
                                    "response_data": {}
                                });

                            }
                        })
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }

                    if (content.response_code === 2000) {
                        callback(content);
                    }

                }
            })
    },
    categoryList: (reqData, callback) => {
        console.log("-------requdata");
        console.log(reqData);
        async.waterfall([
            function(nextCb) {
                nextCb(null, { "response_code": 2000 });
                // if (!reqData.type || typeof reqData.type === undefined) {
                //     nextCb(null, { "response_code": 5002, "response_message": "Please provide any type Songs/Dances", "response_data": {} });
                // }
                // else  nextCb(null, { "response_code": 2000 });                
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    // if (reqData.type != null && typeof reqData.type != undefined) {
                    CategoryModel.getAllCategories(reqData, function(catList) {
                        console.log(catList)
                        nextCb(null, catList);
                    });

                    // } else {
                    // reqData.type='ALL';
                    // console.log("111");
                    // CategoryModel.getAllDistinctCategories(reqData, function(catList) {
                    // CategoryModel.getAllCategories(reqData, function(catList) {
                    // console.log("=======================");
                    // console.log("1111111" + reqData.type);
                    //     nextCb(null, catList);
                    // });

                    // }

                }
            },
            function(arg2, nextCb) {
                //console.log(arg2);
                if (arg2.response_code === 5002) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 4001) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 5000) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 2000) {
                    if (arg2.categoryRes.length > 0) {
                        var allcat = {
                            "response_code": 2000,
                            "success": true,
                            "response_message": "Success",
                            "response_data": arg2.categoryRes
                        }
                        nextCb(null, allcat);

                    } else {
                        nextCb(null, {
                            "response_code": 5002,
                            "success": false,
                            "response_message": "No categories found",
                            "response_data": []
                        });
                    }
                }
            }
        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                });
            }
            if (!err) {
                if (content.response_code === 5005) {
                    callback(content);
                }
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 4001) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        });
    },
    subcategoryList: (reqData, callback) => {
        //console.log(reqData);
        async.waterfall([
            function(nextCb) {
                if (!reqData.pcat_id || typeof reqData.pcat_id === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide parent cat ID", "response_data": {} });
                } else nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    //console.log(reqData);
                    //if(reqData.p_id==="") reqData.p_id= false;
                    SubCategoryModel.getCategoriesByPid(reqData, function(catList) {
                        console.log(catList);
                        nextCb(null, catList);
                    });
                }
            },
            function(arg2, nextCb) {
                //console.log(arg2);
                if (arg2.response_code === 5002) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 4001) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 5000) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 2000) {
                    if (arg2.categoryRes.length > 0) {
                        console.log(arg2.categoryRes);
                        var allcat = {
                            "response_code": 2000,
                            "success": true,
                            "response_message": "Success",
                            "response_data": arg2.categoryRes
                        }
                        nextCb(null, allcat);

                    } else {
                        nextCb(null, {
                            "response_code": 5002,
                            "success": false,
                            "response_message": "No categories found",
                            "response_data": []
                        });
                    }
                }
            }
        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                });
            }
            if (!err) {
                if (content.response_code === 5005) {
                    callback(content);
                }
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 4001) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        });
    },
    getKaraokeWithLyrics: (reqData, callback) => {
        async.waterfall([
            function(nextCb) {
                if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide any Category ID", "response_data": {} });
                } else nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) { // console.log(reqData);

                    MusicModel.getMusicByCategories(reqData, function(musicList) {
                        nextCb(null, musicList);
                    });


                }
            }

        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                });
            }
            if (!err) {
                if (content.response_code === 5005) {
                    callback(content);
                }
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 4001) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        });
    },
    postSongsAndDances: (reqData, callback) => {

        async.waterfall([
                function(nextCb) {
                    if (reqData.post_id != null && reqData.post_id != "undefined") {

                        if (!reqData.status || typeof reqData.status === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide any status Published/Draft", "response_data": {} });
                        } else nextCb(null, { "response_code": 2000 });

                    } else {
                        // console.log('postSong',reqData);
                        if (!reqData.singing_mode || typeof reqData.singing_mode === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide any singing mode Freestyle/WithSongs", "response_data": {} });
                        }
                        if (!reqData.artist_name || typeof reqData.artist_name === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide artist name", "response_data": {} });
                        }
                        if (!reqData.cat_type || typeof reqData.cat_type === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide cat type Songs/Dances ", "response_data": {} });
                        }
                        if (!reqData.user_id || typeof reqData.user_id === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide user id", "response_data": {} });
                        }
                        if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide any Category ID", "response_data": {} });
                        }
                        if (!reqData.file_url || typeof reqData.file_url === undefined) {
                            nextCb(null, { "response_code": 5002, "response_message": "Please provide file url", "response_data": {} });
                        } else { nextCb(null, { "response_code": 2000 }); }
                    }

                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        //console.log(reqData);
                        if (reqData.post_id && reqData.status) {
                            reqData._id = reqData.post_id;
                            FeedPostModel.updatePostStatus(reqData, function(feedRes) {
                                console.log(feedRes);
                                nextCb(null, feedRes);
                            });

                        } else {
                            reqData._id = new ObjectID;
                            FeedPostModel.insertSong(reqData, function(feedRes) {
                                // console.log(feedRes);
                                nextCb(null, feedRes);
                            });
                        }

                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                } else {
                    callback(content);
                }
            });
    },
    getUserPost: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.user_id || typeof userData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any user ID", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        // var findwith= userData.user_id;
                        if (userData.other_userId && typeof userData.other_userId !== undefined) {
                            userData.user_id = userData.other_userId
                        }
                        if (userData.status === "Liked") {
                            FeedPostModel.myLikedPosts(userData, function(likeRes) {
                                nextCb(null, likeRes);
                            });
                        } else if (userData.status === "Shared") {
                            FeedPostModel.mySharePosts(userData, function(shareRes) {
                                nextCb(null, shareRes);
                            });

                        } else {
                            FeedPostModel.getAllPostByUser(userData, function(postRes) {
                                nextCb(null, postRes);
                            });
                        }

                    }
                } //,
                // function (arg2, nextCb) {
                //     //console.log(arg2);
                //     if (arg2.response_code === 5002) {
                //         nextCb(null, arg2);
                //     }
                //     if(arg2.response_code === 4001){
                //         nextCb(null,arg2);
                //     }
                //     if(arg2.response_code === 5000){
                //         nextCb(null,arg2);
                //     }
                //     if (arg2.response_code === 2000) {
                //         if (arg2.feedRes) {

                //             var allPost = {
                //                             "response_code": 2000,
                //                             "success":true,
                //                             "response_message": "Success",
                //                             "total_records":arg2.total_records,
                //                             "response_data": arg2.feedRes
                //                         }
                //             nextCb(null, allPost);
                //         }
                //     }
                // }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    setFollowers: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.userId || typeof reqData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide userId", "response_data": {} });
                    } else if (!reqData.friendId || typeof reqData.friendId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide friendId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);           
                        async.parallel({
                            insertFollowers: function(aCallback) {
                                // console.log(reqData)
                                FollowersModel.insertFollowers(reqData, function(userRes) {
                                    console.log(userRes);
                                    aCallback(null, userRes);
                                });
                            },
                            addNotification: function(aCallback) {
                                let userData = {
                                    ownUserId: reqData.friendId,
                                    notificationType: "FOLLOWING",
                                    otherUserId: reqData.userId
                                }
                                NotificationModel.addNotification(userData, function(notifyRes) {
                                    console.log(notifyRes);
                                    aCallback(null, notifyRes);
                                });
                            },
                            getDevicetoken: function(aCallback) {
                                // console.log(reqData)
                                UserModels.getProfileDetails(reqData.friendId, function(userResponse) {
                                    console.log(userResponse);
                                    aCallback(null, userResponse);
                                });
                            },
                        }, function(err, results) {

                            //nextCb(null, signUpRes);
                            UserModels.getProfileDetails(reqData.userId, function(userResponse) {
                                console.log(userResponse);
                                var iosToken = results.getDevicetoken.deviceTokenIOS
                                var androidToken = results.getDevicetoken.deviceTokenAndroid
                                var pushData = {}
                                pushData.alert = userResponse.name + "  started following you "
                                pushData.title = userResponse.name + "  started following you "
                                pushData.message = "Tap to see";
                                pushData.userId = reqData.userId
                                pushData.notificationType = 'FOLLOWING'
                                console.log("push before process");
                                if (iosToken.length > 0) {
                                    NotificationModel.allNotificationCount({ userId: reqData.friendId }, function(nRes) {
                                        iosToken.forEach(function(iosDeviceId) {
                                            pushData.deviceId = iosDeviceId
                                            pushData.badgeCount = nRes.response_data
                                            pushNotification.iosPush(pushData, function(pushStatus) {
                                                console.log("push on process");
                                                console.log(pushStatus);
                                                if (pushStatus.result.sent.length > 0) {
                                                    console.log("IOS Push Sent successfully")
                                                } else {
                                                    console.log("IOS Push Not Sent!")
                                                }
                                            })
                                        })
                                    })
                                }
                                if (androidToken.length > 0) {
                                    androidToken.forEach(function(androidDeviceId) {
                                        pushData.deviceId = androidDeviceId
                                        pushNotification.androidPush(pushData, function(pushStatus) {
                                            console.log(pushStatus);
                                            if (pushStatus.success === true) {
                                                // console.log(pushStatus.result);
                                                console.log("Android Push Sent successfully")
                                            } else {
                                                console.log("Android Push Not Sent ")
                                            }
                                        })
                                    })
                                }
                            })
                            nextCb(null, results.insertFollowers);
                        })

                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    unFollowUser: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.userId || typeof reqData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide userId", "response_data": {} });
                    } else if (!reqData.friendId || typeof reqData.friendId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide friendId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);           

                        FollowersModel.updateFollowers(reqData, function(userRes) {
                            //console.log(userRes);
                            nextCb(null, userRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    getFollowers: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.userId || typeof reqData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide userId", "response_data": {} });
                    }
                    if (!reqData.page || typeof reqData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide page no", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);           

                        // FollowersModel.getFollowerUserList(reqData, function (userRes) {
                        //     //console.log(userRes);
                        //     nextCb(null, userRes);
                        // });
                        async.parallel({
                            userFollower: function(aCallback) {
                                // console.log(reqData)
                                FollowersModel.getFollowerUserList(reqData, function(userRes) {
                                    console.log(userRes);
                                    aCallback(null, userRes);
                                });
                            },
                            ownFollowing: function(aCallback) {
                                //reqData.userId=reqData.ownId;
                                //console.log(reqData)
                                FollowersModel.getFollowingUserList({ userId: reqData.ownId }, function(ownuserRes) {
                                    console.log(ownuserRes);
                                    aCallback(null, ownuserRes);
                                });
                            }
                        }, function(err, results) {
                            //console.log(results); 
                            reqData.userIdArr = results.userFollower.response_data;
                            // nextCb(null, {"response_code": 2000,"response_data":results});
                            // console.log(reqData);
                            UserModels.getUserList(reqData, function(userRes) {
                                console.log(userRes);
                                if (userRes.response_code === 2000) {
                                    var followerUser = [];

                                    async.forEach(userRes.response_data, function(item, callBack) {
                                        // var z = results.userFollowing.response_data.filter(function(val) {
                                        //   item.is_following=results.ownFollowing.response_data.indexOf(val) >= -1?true:false;
                                        // });
                                        item.is_following = results.ownFollowing.response_data.indexOf(item._id) > -1 ? true : false;
                                        followerUser.push(item);
                                        callBack();
                                    }, function(err, data) {
                                        console.log(data);
                                        if (err) {
                                            console.log(err);
                                        }
                                        if (!err) {
                                            var followerData = {
                                                "response_code": 2000,
                                                "response_message": "Follower list.",
                                                "total_record": userRes.total_record,
                                                "response_data": followerUser,

                                            }
                                            nextCb(null, followerData);

                                        }
                                    });
                                } else {
                                    nextCb(null, userRes);

                                }

                            });
                        });
                    }
                },

            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    getFollowing: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.userId || typeof reqData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide userId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });


                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        async.parallel({
                            userFollowing: function(aCallback) {
                                // console.log(reqData)
                                FollowersModel.getFollowingUserList(reqData, function(userRes) {
                                    // console.log(userRes);
                                    aCallback(null, userRes);
                                });
                            },
                            ownFollowing: function(aCallback) {
                                //reqData.userId=reqData.ownId;
                                //console.log(reqData)
                                FollowersModel.getFollowingUserList({ userId: reqData.ownId }, function(ownuserRes) {
                                    //  console.log(ownuserRes);
                                    aCallback(null, ownuserRes);
                                });
                            }
                        }, function(err, results) {
                            //console.log(results); 
                            reqData.userIdArr = results.userFollowing.response_data;
                            // nextCb(null, {"response_code": 2000,"response_data":results});
                            // console.log(reqData);
                            UserModels.getUserList(reqData, function(userRes) {
                                console.log(userRes);
                                if (userRes.response_code === 2000) {
                                    var followingUser = [];

                                    async.forEach(userRes.response_data, function(item, callBack) {
                                        // var z = results.userFollowing.response_data.filter(function(val) {
                                        //   item.is_following=results.ownFollowing.response_data.indexOf(val) >= -1?true:false;
                                        // });
                                        item.is_following = results.ownFollowing.response_data.indexOf(item._id) > -1 ? true : false;
                                        followingUser.push(item);
                                        callBack();
                                    }, function(err, data) {
                                        console.log(data);
                                        if (err) {
                                            console.log(err);
                                        }
                                        if (!err) {
                                            console.log("complete");
                                            var followingData = {
                                                "response_code": 2000,
                                                "response_message": "Following list.",
                                                "total_record": userRes.total_record,
                                                "response_data": followingUser,

                                            }
                                            nextCb(null, followingData);

                                        }
                                    });
                                } else {
                                    nextCb(null, userRes);
                                }

                            });
                        });

                    }
                },

            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    globalSearch: (reqData, callback) => {
        async.waterfall([
            function(nextCb) {

                if (!reqData.search_keyword || typeof reqData.search_keyword === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide search keyword", "response_data": {} });
                } else if (!reqData.type || typeof reqData.type === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide type of search", "response_data": {} });
                } else nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    // console.log(reqData);           
                    if (reqData.type == "PEOPLE") {

                        UserModels.searchUser(reqData, function(searchRes) {
                            // console.log(searchRes);
                            nextCb(null, searchRes);
                        });

                    } else {
                        MusicModel.searchMusic(reqData, function(searchRes) {
                            // console.log(searchRes);
                            nextCb(null, searchRes);
                        });
                    }


                }
            }

        ], function(err, content) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                });
            }
            if (!err) {
                if (content.response_code === 5005) {
                    callback(content);
                }
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 4001) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        });
    },
    followingFeed: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.type || typeof userData.type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any category of post", "response_data": {} });
                    }
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any userId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.getFollowersPost(userData, function(postRes) {
                            nextCb(null, postRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    likePost: (userData, callback) => {
        //console.log('bbbdbasdasd')
        //console.log(userData);
        async.waterfall([
                function(nextCb) {
                    // if (!userData.likeState ||isNaN(userData.likeState )) {
                    //             nextCb(null, { "response_code": 5002, "response_message": "Please provide like state", "response_data": {} });
                    //     }
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any userId", "response_data": {} });
                    }
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any postId", "response_data": {} });
                    } else { nextCb(null, { "response_code": 2000 }); }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log( typeof userData.likeState)
                        // console.log(reqData);
                        LikeModel.feedLike(userData, function(likeRes) {
                            console.log("postRes", likeRes);
                            if (userData.likeState === 1) {
                                userData.notificationType = 'LIKE'
                                apiService.insertNotification(userData, function(notifyres) {
                                    // console.log("notifyres", notifyres)
                                    console.log(notifyres.response_message)
                                    nextCb(null, likeRes);
                                })
                            } else {
                                nextCb(null, likeRes);
                            }

                        });

                    }
                },
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    commentPost: (userData, callback) => {
        // console.log(userData);
        async.waterfall([
                function(nextCb) {
                    if (!userData.comment || typeof userData.comment === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please enter comment", "response_data": {} });
                    }
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any userId", "response_data": {} });
                    }
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any postId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        CommentModel.feedComment(userData, function(postRes) {
                            // console.log(postRes);
                            userData.notificationType = 'COMMENT';
                            userData.notifyText = userData.comment;
                            apiService.insertNotification(userData, function(notifyres) {
                                // console.log("notifyres", notifyres)
                                console.log(notifyres.response_message)
                                nextCb(null, postRes);
                            })
                        });
                    }
                },
                function(arg2, nextCb) {
                    if (arg2.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg2.response_code === 2000) {
                        // console.log(reqData);
                        UserModels.getUserByUserId(userData.userId, function(userRes) {
                            // console.log(userRes);        
                            var comment_res = {
                                "response_code": 2000,
                                "response_message": "Comment has been successfully posted.",
                                "response_data": {
                                    "comment_data": [{
                                        "commentId": arg2.response_data._id,
                                        "userId": userRes._id,
                                        "userName": userRes.username,
                                        "userProfileImage": userRes.image_url,
                                        "commentText": arg2.response_data.comment,
                                        "dateTime": arg2.response_data.createdAt
                                    }]
                                }
                            }
                            nextCb(null, comment_res);
                        })

                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    sharePost: (userData, callback) => {
        //console.log(userData);
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any userId", "response_data": {} });
                    }
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any postId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.sharePost(userData, function(postRes) {
                            //console.log(postRes);
                            //nextCb(null, postRes);
                            userData.notificationType = 'SHARE';
                            userData.notifyText = userData.description
                            apiService.insertNotification(userData, function(notifyres) {
                                // console.log("notifyres", notifyres)
                                console.log(notifyres.response_message)
                                nextCb(null, postRes);
                            })
                        });
                    }
                },
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    newFeed: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.type || typeof userData.type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any category of post", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.getNewPost(userData, function(postRes) {
                            // nextCb(null, postRes);
                            if (postRes.response_code === 2000) {
                                var post_list = [];
                                async.forEach(postRes.response_data, function(item, callBack) {
                                    // item.isChallegeAccepted =item.ownDonate.length>0?item.ownDonate[0].userId==reqData.userId?true:false:false;
                                    item.is_followed = item.ownFollowingFirst.length > 0 ? true : item.ownFollowingSecond.length > 0 ? true : false;
                                    post_list.push(item);
                                    callBack();
                                }, function(err, data) {
                                    // console.log(data);
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (!err) {
                                        console.log("complete");
                                        var ListData = {
                                            "response_code": 2000,
                                            "response_message": "New Feed list.",
                                            "total_record": postRes.total_record,
                                            "response_data": post_list,

                                        }
                                        nextCb(null, ListData);

                                    }
                                });
                            } else {
                                nextCb(null, postRes);
                            }

                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    singleFeed: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any category of post", "response_data": {} });
                    }
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.getSinglePost(userData, function(postRes) {
                            //console.log(postRes);
                            if (postRes.response_code === 2000) {
                                postRes.response_data.is_followed = postRes.response_data.ownFollowingFirst.length > 0 ? true : postRes.response_data.ownFollowingSecond.length > 0 ? true : false;
                                postRes.response_data.ownFollowingFirst = ''
                                postRes.response_data.ownFollowingSecond = ''
                                nextCb(null, postRes);
                                // var post_list=[];                                
                                // async.forEach(postRes.response_data, function (item, callBack) {
                                //    // item.isChallegeAccepted =item.ownDonate.length>0?item.ownDonate[0].userId==reqData.userId?true:false:false;
                                //     item.is_followed=item.ownFollowingFirst.length>0?true:item.ownFollowingSecond.length>0?true:false;
                                //     post_list.push(item) ;                                          
                                //     callBack();
                                // }, function (err , data) {
                                //    // console.log(data);
                                //     if (err) {
                                //         console.log(err);
                                //     }
                                //     if (!err) {
                                //         console.log("complete");
                                //          var ListData={
                                //             "response_code": 2000,
                                //             "response_message": "Feed details",                                            
                                //             "response_data": post_list[0],

                                //         } 
                                //         nextCb(null, ListData);
                                //     }
                                // }); 
                            } else {
                                nextCb(null, postRes);
                            }

                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    trendingFeed: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.type || typeof userData.type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any category of post", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.trendingPost(userData, function(postRes) {
                            nextCb(null, postRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    commentList: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide postId", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        CommentModel.commentList(userData, function(commentRes) {
                            nextCb(null, commentRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    likeList: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide postId", "response_data": [] });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": [] });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        LikeModel.likeList(userData, function(likeRes) {
                            nextCb(null, likeRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    deletePost: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide postId", "response_data": {} });
                    }
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.deletePost(userData, function(delRes) {
                            nextCb(null, delRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    discover: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.type || typeof userData.type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide type", "response_data": [] });
                    }
                    if (!userData.discover_type || typeof userData.discover_type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide discover type", "response_data": [] });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        if (userData.discover_type === "LIKE") {
                            LikeModel.maxLikes({}, function(likeRes) {
                                //console.log(likeRes);
                                // nextCb(null, likeRes);
                                if (likeRes.response_code === 2000) {
                                    var alllikes = likeRes.response_data
                                    let postIds = []
                                    alllikes.forEach(function(item) {
                                        postIds.push(item._id);
                                    })
                                    userData.postIds = postIds;
                                    //console.log(postIds)
                                    FeedPostModel.getTopTenPost(userData, function(postRes) {
                                        // console.log(postRes);
                                        nextCb(null, postRes)
                                    })

                                } else nextCb(null, likeRes)

                            });
                        }
                        if (userData.discover_type === "COMMENT") {
                            CommentModel.maxComments({}, function(commentRes) {
                                //console.log(commentRes);                             
                                if (commentRes.response_code === 2000) {
                                    var alllikes = commentRes.response_data
                                    let postIds = []
                                    alllikes.forEach(function(item) {
                                        postIds.push(item._id);
                                    })
                                    userData.postIds = postIds;
                                    //console.log(postIds)
                                    FeedPostModel.getTopTenPost(userData, function(postRes) {
                                        // console.log(postRes);
                                        nextCb(null, postRes)
                                    })

                                } else nextCb(null, commentRes)

                            });
                        }
                        if (userData.discover_type === "SHARED") {
                            FeedPostModel.maxShare({}, function(shareRes) {
                                //console.log(likeRes);
                                // nextCb(null, likeRes);
                                if (shareRes.response_code === 2000) {
                                    var alllikes = shareRes.response_data
                                    let postIds = []
                                    alllikes.forEach(function(item) {
                                        postIds.push(item._id);
                                    })
                                    userData.postIds = postIds;
                                    //console.log(postIds)
                                    FeedPostModel.getTopTenPost(userData, function(postRes) {
                                        // console.log(postRes);
                                        nextCb(null, postRes)
                                    })

                                } else nextCb(null, shareRes)

                            });
                        }
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    myShare: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide user Id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.mySharePosts(userData, function(delRes) {
                            nextCb(null, delRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    myLiked: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide user Id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.myLikedPosts(userData, function(delRes) {
                            nextCb(null, delRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    challengePost: (userData, callback) => {
        //console.log(userData);
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any userId", "response_data": {} });
                    }
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any postId", "response_data": {} });
                    }
                    // if (!userData.txn_id || typeof userData.txn_id === undefined) {
                    //             nextCb(null, { "response_code": 5002, "response_message": "Please make payment", "response_data": {} });
                    //     }
                    // if (!userData.amount || typeof userData.amount === undefined) {
                    //             nextCb(null, { "response_code": 5002, "response_message": "Please provide amount", "response_data": {} });
                    //     }                
                    else { nextCb(null, { "response_code": 2000 }); }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.checkDuplicateParentChallenge(userData, function(res) {
                            if (res === null) {
                                FeedPostModel.challengeUserPost(userData, function(postRes) {
                                    //console.log(postRes);                      
                                    nextCb(null, postRes);
                                });

                            } else {
                                console.log("[Already challenged]");
                                callback({
                                    "response_code": 5000,
                                    "response_message": "Already challenged ",
                                    "response_data": res
                                })
                            }
                        })
                    }
                },
                function(arg2, nextCb) {
                    if (arg2.response_code === 5002) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 5005) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 2000) {
                        nextCb(null, arg2);
                        // console.log(reqData);
                        //  let random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
                        //userData.challenge_id=arg2.response_data._id,
                        // userData.txn_id=random,
                        //userData.amount=5

                        //TransactionModel.insertTXN(userData, function (txnRes) {
                        //console.log(postRes);
                        //if (txnRes.response_code===2000) {
                        //let transactionsDetails={}
                        //     nextCb(null, arg2);
                        //     }else{
                        //          nextCb(null, txnRes);
                        //     }

                        // }); 
                    }
                },
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    challengePostBraintree: (userData, callback) => {
        //console.log(userData);
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any userId", "response_data": {} });
                    }
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any postId", "response_data": {} });
                    }
                    if (!userData.customerId || typeof userData.customerId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide braintree customerId", "response_data": {} });
                    }
                    // if (!userData.txn_id || typeof userData.txn_id === undefined) {
                    //             nextCb(null, { "response_code": 5002, "response_message": "Please make payment", "response_data": {} });
                    //     }
                    if (!userData.amount || typeof userData.amount === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide amount", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        apiService.getCustomerData(userData, function(cusRes) {
                            if (cusRes.response_code === 2000 && cusRes.response_data.paymentMethods.length > 0) {
                                nextCb(null, { "response_code": 2000 });
                            } else {
                                nextCb(null, { "response_code": 5002, "response_message": "You did not add any card, add it from My Account", "response_data": {} });
                            }
                        })
                    }
                },
                function(arg2, nextCb) {
                    if (arg2.response_code === 5002) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 5005) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 2000) {
                        // console.log(reqData);                   
                        //  userData.challenge_id=arg2.response_data._id,
                        // userData.txn_id=random,
                        //userData.amount=5
                        // TransactionModel.insertTXN(userData, function (txnRes) {
                        //     //console.log(postRes);
                        //     if (txnRes.response_code===2000) {
                        //     //let transactionsDetails={}
                        //     nextCb(null, arg2);
                        //     }else{
                        //          nextCb(null, txnRes);
                        //     }
                        // });
                        FeedPostModel.checkDuplicateParentChallenge(userData, function(res) {
                            if (res === null) {
                                async.parallel({
                                    makeChallenge: function(aCallback) {
                                        // console.log(reqData)                        
                                        FeedPostModel.challengeUserPost(userData, function(postRes) {
                                            //console.log(postRes);                      
                                            aCallback(null, postRes);
                                        });
                                    },
                                    paymentCheckout: function(aCallback) {
                                        //reqData.userId=reqData.ownId;
                                        //console.log(reqData)
                                        apiService.paymentCheckout(userData, function(paymentRes) {
                                            // console.log(paymentRes);
                                            aCallback(null, paymentRes);
                                        });
                                    }
                                }, function(err, results) {
                                    userData.challenge_id = results.makeChallenge.response_data._id,
                                        userData.txn_id = results.paymentCheckout.checkoutData.transaction_id,
                                        //userData.amount=5
                                        TransactionModel.insertTXN(userData, function(txnRes) {
                                            if (txnRes.response_code === 2000) {
                                                //results.makeChallenge.response_data.transaction_history=txnRes.response_data                                    
                                                nextCb(null, results.makeChallenge);
                                            } else {
                                                nextCb(null, results.makeChallenge);
                                            }
                                        });
                                })
                            } else {
                                console.log("[Already challenged]");
                                callback({
                                    "response_code": 5000,
                                    "response_message": "Already challenged ",
                                    "response_data": res
                                })
                            }

                        })
                    }
                },
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    challengeList: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.userId || typeof reqData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide userId", "response_data": {} });
                    }
                    if (!reqData.page || typeof reqData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide page no", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        async.parallel({
                            challengePost: function(aCallback) {
                                //console.log(reqData)
                                FeedPostModel.getChallengedList(reqData, function(listRes) {
                                    //  console.log(listRes);
                                    aCallback(null, listRes);
                                });
                            },
                            ownFollowing: function(aCallback) {
                                //console.log(reqData)
                                FollowersModel.getFollowingUserList(reqData, function(ownuserRes) {
                                    //  console.log(ownuserRes);
                                    aCallback(null, ownuserRes);
                                });
                            }
                        }, function(err, results) {
                            //console.log(results);
                            if (results.challengePost.response_code === 2000) {
                                var challenge_list = [];
                                async.forEach(results.challengePost.response_data, function(item, callBack) {
                                    item.isChallegeAccepted = item.ownDonate.length > 0 ? item.ownDonate[0].userId == reqData.userId ? true : false : false;
                                    item.is_following = results.ownFollowing.response_data.indexOf(item.user_id) > -1 ? true : false;
                                    challenge_list.push(item);
                                    callBack();
                                }, function(err, data) {
                                    // console.log(data);
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (!err) {
                                        //  console.log("complete");
                                        var ListData = {
                                            "response_code": 2000,
                                            "response_message": "Challenge list.",
                                            "total_record": results.challengePost.total_record,
                                            "response_data": challenge_list,

                                        }
                                        nextCb(null, ListData);

                                    }
                                });
                            } else {
                                nextCb(null, results.challengePost);
                            }
                        });
                    }
                },
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    acceptChallenge: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.pChallengeId || typeof reqData.pChallengeId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pChallengeId", "response_data": {} });
                    }
                    if (!reqData.singing_mode || typeof reqData.singing_mode === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any singing mode Freestyle/WithSongs", "response_data": {} });
                    }
                    if (!reqData.artist_name || typeof reqData.artist_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide artist name", "response_data": {} });
                    }
                    if (!reqData.cat_type || typeof reqData.cat_type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide cat type Songs/Dances ", "response_data": {} });
                    }
                    if (!reqData.user_id || typeof reqData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide user id", "response_data": {} });
                    }
                    if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any Category ID", "response_data": {} });
                    }
                    if (!reqData.file_url || typeof reqData.file_url === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide file url", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        FeedPostModel.checkDuplicateChallenge(reqData, function(res) {
                            if (res === null) {
                                async.parallel({
                                        acceptChallenge: function(callback) {
                                            FeedPostModel.acceptChallenge(reqData, function(feedRes) {
                                                callback(null, feedRes);
                                            });
                                        },
                                    },
                                    function(err, results) {
                                        if (results.acceptChallenge.response_code === 5005) {
                                            nextCb(null, results.acceptChallenge);
                                        }
                                        if (results.acceptChallenge.response_code === 5000) {
                                            nextCb(null, results.acceptChallenge);
                                        }
                                        if (results.acceptChallenge.response_code === 2000) {
                                            let msg = "challenge accepted successfully";
                                            var response = {
                                                    "response_code": 2000,
                                                    "response_message": results.acceptChallenge.response_data.cat_type == "Sing" ? "Song " + msg : results.acceptChallenge.response_data.cat_type + " " + msg,
                                                    "response_data": results.acceptChallenge.response_data
                                                }
                                                // nextCb(null, response)
                                            var notifyData = {}
                                            notifyData.userId = reqData.user_id
                                            notifyData.postId = reqData.pChallengeId
                                            notifyData.notificationType = 'ACCEPT_CHALLENGE'
                                            apiService.insertNotification(notifyData, function(notifyres) {
                                                console.log(notifyres.response_message)
                                                nextCb(null, response);
                                            })

                                        }
                                    });
                            } else {
                                console.log("[Already accepted challenge]");
                                callback({
                                    "response_code": 5000,
                                    "response_message": "Challenge accepted already ",
                                    "response_data": res
                                })
                            }
                        })

                    } //end if
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                } else {
                    callback(content);
                }
            });
    },
    acceptChallengeBraintree: (reqData, callback) => {
        console.log(reqData);
        async.waterfall([
                function(nextCb) {
                    if (!reqData.pChallengeId || typeof reqData.pChallengeId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pChallengeId", "response_data": {} });
                    }
                    if (!reqData.singing_mode || typeof reqData.singing_mode === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any singing mode Freestyle/WithSongs", "response_data": {} });
                    }
                    if (!reqData.artist_name || typeof reqData.artist_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide artist name", "response_data": {} });
                    }
                    if (!reqData.cat_type || typeof reqData.cat_type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide cat type Songs/Dances ", "response_data": {} });
                    }
                    if (!reqData.user_id || typeof reqData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide user id", "response_data": {} });
                    }
                    if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide any Category ID", "response_data": {} });
                    }
                    if (!reqData.customerId || typeof reqData.customerId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide braintree customerId", "response_data": {} });
                    }
                    if (!reqData.amount || typeof reqData.amount === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide amount", "response_data": {} });
                    }
                    if (!reqData.file_url || typeof reqData.file_url === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide file url", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        apiService.getCustomerData(reqData, function(cusRes) {
                            if (cusRes.response_code === 2000 && cusRes.response_data.paymentMethods.length > 0) {
                                nextCb(null, { "response_code": 2000 });
                            } else {
                                nextCb(null, { "response_code": 5002, "response_message": "You did not add any card, add it from My Account", "response_data": {} });
                            }
                        })
                    }
                },
                function(arg2, nextCb) {
                    if (arg2.response_code === 5002) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 5005) {
                        nextCb(null, arg2);
                    }
                    if (arg2.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.checkDuplicateChallenge(reqData, function(res) {
                            if (res === null) {
                                async.parallel({
                                        acceptChallenge: function(callBack) {
                                            FeedPostModel.acceptChallenge(reqData, function(feedRes) {
                                                // console.log(feedRes);
                                                callBack(null, feedRes);
                                            });
                                        },
                                        donation: function(callBack) {
                                            apiService.paymentCheckout(reqData, function(payRes) {
                                                if (payRes.response_code === 2000) {
                                                    var txnData = {
                                                        userId: reqData.user_id,
                                                        challenge_id: reqData.pChallengeId,
                                                        txn_id: payRes.checkoutData.transaction_id,
                                                        amount: payRes.checkoutData.amount
                                                    }
                                                    TransactionModel.insertTXN(txnData, function(txnRes) {
                                                        //console.log(postRes);
                                                        if (txnRes.response_code === 2000) {
                                                            callBack(null, txnRes);
                                                        } else {
                                                            callBack(null, txnRes);
                                                        }

                                                    });
                                                } else {
                                                    callBack(null, payRes);
                                                }
                                            })
                                        }
                                    },
                                    function(err, results) {
                                        if (results.acceptChallenge.response_code === 5005) {
                                            nextCb(null, results.acceptChallenge);
                                        }
                                        if (results.acceptChallenge.response_code === 5000) {
                                            nextCb(null, results.acceptChallenge);
                                        }
                                        if (results.donation.response_code === 5005) {
                                            nextCb(null, results.donation);
                                        }
                                        if ((results.donation.response_code === 2000 || results.donation.response_code === 5000) && results.acceptChallenge.response_code === 2000) {
                                            let msg = "challenge accepted successfully";
                                            var response = {
                                                "response_code": 2000,
                                                "response_message": results.acceptChallenge.response_data.cat_type == "Sing" ? "Song " + msg : results.acceptChallenge.response_data.cat_type + " " + msg,
                                                "response_data": results.acceptChallenge.response_data
                                            }
                                            var notifyData = {}
                                            notifyData.userId = reqData.user_id
                                            notifyData.postId = reqData.pChallengeId
                                            notifyData.amount = reqData.amount
                                            notifyData.notificationType = 'ACCEPT_CHALLENGE'
                                            apiService.insertNotification(notifyData, function(notifyres) {
                                                    console.log("notifyres", notifyres)
                                                    console.log(notifyres.response_message)
                                                        //nextCb(null, likeRes);
                                                    nextCb(null, response);
                                                })
                                                //nextCb(null, response);
                                        }
                                    });
                            } else {
                                console.log("[Already accepted challenge]");
                                callback({
                                    "response_code": 5000,
                                    "response_message": "Challenge accepted already ",
                                    "response_data": res
                                })
                            }
                        })
                    }
                },
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    acceptedChallengeList: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.pChallengeId || typeof userData.pChallengeId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pChallenge Id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide pageNo", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.getAcceptedChallengedList(userData, function(delRes) {
                            nextCb(null, delRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    playCountUpdate: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.postId || typeof userData.postId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide postId", "response_data": {} });
                    } else nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        // console.log(reqData);
                        FeedPostModel.updateViewCount(userData, function(feedRes) {
                            nextCb(null, feedRes);
                        });
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    });
                }
                if (!err) {
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                    if (content.response_code === 4001) {
                        callback(content);
                    }
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                }
            });
    },
    requestSong: (musicData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!musicData.user_id || typeof musicData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!musicData.songs_name || typeof musicData.songs_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide Songs name", "response_data": {} });
                    }
                    if (!musicData.artist_name || typeof musicData.artist_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide artist name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        musicData._id = new ObjectID;
                        //console.log(musicData); 

                        SongsRequestModel.insertRequest(musicData, function(signUpRes) {
                            mailProperty('requestSongs')(config.admin_mail, musicData).send();
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    blockUser: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.friendId || typeof userData.friendId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide any type Songs/Dances", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        BlockuserModel.blockFriend(userData, function(signUpRes) {
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    reportUser: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.friendId || typeof userData.friendId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide any type Songs/Dances", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        ReportUserModel.reportFriend(userData, function(signUpRes) {
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    blockedUserList: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide page no", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData);
                        UserModels.getMyBlockList(userData, function(userList) {
                            //console.log(userList);
                            nextCb(null, userList);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },

    unFollowingList: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide page no", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData);
                        UserModels.getUnFollowingList(userData, function(userList) {
                            //console.log(userList);
                            nextCb(null, userList);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    unBlockUser: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.friendId || typeof userData.friendId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide any type Songs/Dances", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        BlockuserModel.unblockFriend(userData, function(signUpRes) {
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    paypalUpdate: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.user_id || typeof userData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    // if (!userData.new_paypal_id || typeof userData.new_paypal_id === undefined) {
                    //     nextCb(null, { "response_code": 5002, "response_message": "please provide your paypal email id", "response_data": {} });
                    // }                                             
                    else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        UserModels.changePayPal(userData, function(signUpRes) {
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    contactUs: (contactData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!contactData.user_id || typeof contactData.user_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!contactData.subject || typeof contactData.subject === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Enter your subject", "response_data": {} });
                    }
                    if (!contactData.message || typeof contactData.message === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Enter your message ", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        contactData._id = new ObjectID;
                        //console.log(musicData);
                        ContactModel.insertRequest(contactData, function(signUpRes) {
                            mailProperty('contactUs')(config.admin_mail, contactData).send();
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    transactionHistory: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide page no", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        TransactionModel.getUserTxnHistory(userData, function(signUpRes) {
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    insertNotification: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.notificationType || typeof userData.notificationType === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide notification type", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        var pushData = {}
                        console.log("insertNotification_userdata", userData);
                        userData.otherUserId = userData.userId
                        if (userData.postId) {
                            FeedPostModel.getSinglePost(userData, function(feedRes) {
                                console.log(feedRes);
                                if (feedRes != null) {

                                    userData.notifyText ? userData.notifyText : feedRes.response_data.songs_name
                                    userData.ownUserId = feedRes.response_data.user_id
                                    NotificationModel.addNotification(userData, function(signUpRes) {
                                        console.log(signUpRes)
                                        nextCb(null, signUpRes);
                                    })

                                    UserModels.getProfileDetails(userData.userId, function(userResponse) {
                                        console.log(userResponse);
                                        var iosToken = feedRes.response_data.deviceTokenIOS
                                        var androidToken = feedRes.response_data.deviceTokenAndroid
                                            // confirmingData.deviceId="ezhoqJWp3TY:APA91bEqmKt8MZFP2EMkfHWtzdwD5dzt2-5vYzaxOmlS7gHTmAi3xcJEgSnD_eo7OTAxd3gUZEVVQTdL3MJ82S4fFIG48wtkO285lzIQCLr7lWSacW_qvR28yBQlytzvCNywzRuUAQDa"
                                        var notifiText = ''
                                        if (userData.notificationType === 'LIKE') {
                                            notifiText = 'liked your post'
                                        }
                                        if (userData.notificationType === 'COMMENT') {
                                            notifiText = 'commented on your post'
                                        }
                                        if (userData.notificationType === 'SHARE') {
                                            notifiText = 'shared your post'
                                        }
                                        if (userData.notificationType === 'ACCEPT_CHALLENGE') {
                                            notifiText = 'accepted your challenge post'
                                        }

                                        pushData.alert = userResponse.name + " " + notifiText
                                        pushData.title = userResponse.name + " " + notifiText
                                        pushData.message = "Tap to see"; //pushData.pChallengeId=feedRes._id
                                        pushData.postId = userData.postId
                                        pushData.challenge_exp_date = feedRes.response_data.challenge_exp_date
                                        pushData.username1 = feedRes.response_data.username1
                                        pushData.songs_name = feedRes.response_data.songs_name
                                        pushData.cat_type = feedRes.response_data.cat_type
                                        pushData.challenge_amount = userData.amount ? userData.amount : ''
                                        pushData.profile_pic = feedRes.response_data.user1_profile_pic
                                        pushData.notificationType = userData.notificationType
                                        console.log("push before process", pushData);
                                        if (iosToken.length > 0) {
                                            NotificationModel.allNotificationCount({ userId: feedRes.response_data.user_id }, function(nRes) {
                                                iosToken.forEach(function(iosDeviceId) {
                                                    pushData.deviceId = iosDeviceId
                                                    pushData.badgeCount = nRes.response_data
                                                    pushNotification.iosPush(pushData, function(pushStatus) {
                                                        console.log("push on process");
                                                        console.log(pushStatus);
                                                        if (pushStatus.result.sent.length > 0) {
                                                            console.log("IOS Push Sent successfully")
                                                        } else {
                                                            console.log("IOS Push Not Sent!")
                                                        }
                                                    })
                                                })
                                            })
                                        }
                                        if (androidToken.length > 0) {
                                            androidToken.forEach(function(androidDeviceId) {
                                                pushData.deviceId = androidDeviceId
                                                pushNotification.androidPush(pushData, function(pushStatus) {
                                                    console.log(pushStatus);
                                                    if (pushStatus.success === true) {
                                                        // console.log(pushStatus.result);
                                                        console.log("Android Push Sent successfully")
                                                    } else {
                                                        console.log("Android Push Not Sent ")
                                                    }
                                                })
                                            })
                                        }
                                    })


                                } else {
                                    //  console.log("feedRes", feedRes)
                                    callBack({
                                        "response_code": 5002,
                                        "response_message": "No post found",
                                        "total_record": 0,
                                        "response_data": []
                                    })
                                }
                            })
                        } else {
                            NotificationModel.addNotification(userData, function(signUpRes) {
                                //console.log(signUpRes)                           
                                nextCb(null, signUpRes);
                            })
                        }
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    notificationList: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    }
                    if (!userData.page || typeof userData.page === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide page no", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        NotificationModel.getNotificationList(userData, function(signUpRes) {
                            nextCb(null, signUpRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    notificationCount: (userData, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        NotificationModel.allNotificationCount(userData, function(notifyRes) {
                            nextCb(null, notifyRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callBack({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callBack(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callBack(content);
                    }
                    if (content.response_code === 5002) {
                        callBack(content);
                    }
                }
            });
    },
    expireChallenge: (callback) => {
        //Gel all parrent challenge
        FeedPostModel.getParentChallenge('', function(parrentChallengeList) {
            //console.log('parrentChallengeList',parrentChallengeList);
            if (parrentChallengeList.response_code === 2000 && parrentChallengeList.total_records > 0) {
                async.forEach(parrentChallengeList.response_data, function(pItem, callBack) {
                    //get winner for each challenge post
                    FeedPostModel.getChallengeWinner({ pChallengeId: pItem._id }, function(challengeWinnerRes) {
                            console.log("challengeWinnerRes", challengeWinnerRes);
                            if (challengeWinnerRes.response_code === 2000) {
                                var winnerUserId = challengeWinnerRes.response_data[0].user_id;
                                //Expire challenge post
                                FeedPostModel.updateChallengeExpireStatus({ feedId: pItem._id }, function(expRes) {
                                    // console.log('expRes',expRes);                                     
                                    if (expRes.response_code === 2000) {
                                        if (challengeWinnerRes.response_data[0].total_like_comment > 0) {
                                            let winner = {
                                                    _id: challengeWinnerRes.response_data[0]._id,
                                                    winner_status: "WINNER"
                                                }
                                                // console.log('winner', winner)
                                                //update winner for each challenge
                                            FeedPostModel.updateChallengeWinStatus(winner, function(winRes) {
                                                // console.log("winRes",winRes)
                                                // send notification to all participent
                                                async.forEach(challengeWinnerRes.response_data, function(item, nCallBack) {
                                                    let userData = {
                                                            ownUserId: item.user_id,
                                                            notificationType: "WIN_CHALLENGE",
                                                            otherUserId: winnerUserId,
                                                            postId: item._id
                                                        }
                                                        /*======Start push notification====== */
                                                    var iosToken = item.deviceTokenIOS
                                                    var androidToken = item.deviceTokenAndroid
                                                        // confirmingData.deviceId="ezhoqJWp3TY:APA91bEqmKt8MZFP2EMkfHWtzdwD5dzt2-5vYzaxOmlS7gHTmAi3xcJEgSnD_eo7OTAxd3gUZEVVQTdL3MJ82S4fFIG48wtkO285lzIQCLr7lWSacW_qvR28yBQlytzvCNywzRuUAQDa"
                                                    var notifiText = ''
                                                    var notificationType = ''
                                                    if (item.user_id === winnerUserId) {
                                                        notifiText = 'you won the challenge'
                                                        notificationType = "WIN_CHALLENGE"
                                                    } else {
                                                        notifiText = item.fullname + " won the challenge"
                                                        notificationType = "LOSE_CHALLENGE"
                                                    }
                                                    var pushData = {}
                                                    pushData.alert = notifiText
                                                    pushData.title = notifiText
                                                    pushData.message = "Tap to see";
                                                    pushData.postId = item._id
                                                    pushData.challenge_exp_date = item.challenge_exp_date
                                                    pushData.username1 = item.username1
                                                    pushData.songs_name = item.songs_name
                                                    pushData.cat_type = item.cat_type
                                                    pushData.challenge_amount = item.challenge_amount
                                                    pushData.profile_pic = item.user1_profile_pic
                                                    pushData.notificationType = notificationType
                                                        // console.log("push before process", pushData);
                                                    if (iosToken.length > 0) {
                                                        NotificationModel.allNotificationCount({ userId: item.user_id }, function(nRes) {
                                                            iosToken.forEach(function(iosDeviceId) {
                                                                pushData.deviceId = iosDeviceId
                                                                pushData.badgeCount = nRes.response_data
                                                                pushNotification.iosPush(pushData, function(pushStatus) {
                                                                    console.log("push on process");
                                                                    console.log(pushStatus);
                                                                    if (pushStatus.result.sent.length > 0) {
                                                                        console.log("IOS Push Sent successfully")
                                                                    } else {
                                                                        console.log("IOS Push Not Sent!")
                                                                    }
                                                                })
                                                            })
                                                        })
                                                    }
                                                    if (androidToken.length > 0) {
                                                        androidToken.forEach(function(androidDeviceId) {
                                                            pushData.deviceId = androidDeviceId
                                                            pushNotification.androidPush(pushData, function(pushStatus) {
                                                                console.log(pushStatus);
                                                                if (pushStatus.success === true) {
                                                                    // console.log(pushStatus.result);
                                                                    console.log("Android Push Sent successfully")
                                                                } else {
                                                                    console.log("Android Push Not Sent ")
                                                                }
                                                            })
                                                        })
                                                    }
                                                    /*======End push notification====== */
                                                    /*======Start insert into notification collection ====== */
                                                    NotificationModel.addNotification(userData, function(signUpRes) {
                                                            //  console.log(signUpRes)                          
                                                            //nextCb(null, signUpRes);
                                                            // nextCb(null, userRes);
                                                            nCallBack()
                                                        })
                                                        /*======End insert into notification collection ====== */
                                                }, function(err, results) {
                                                    if (err) {
                                                        console.log('error in addNotification', err);
                                                        callBack();
                                                    }
                                                    if (!err) {
                                                        console.log('notificationadded')
                                                        callBack();
                                                    }
                                                })
                                            })
                                        } else {
                                            console.log('No winner ')
                                            callBack();
                                        }
                                    } else {
                                        console.log('updateChallengeExpireStatus faild')
                                        callBack();
                                    }
                                })
                            } else {
                                console.log('getChallengeWinner faild')
                                callBack();
                            }
                        })
                        //item.is_following=results.ownFollowing.response_data.indexOf(item._id) >-1?true:false;
                }, function(err, data) {

                    if (err) {
                        console.log(err);
                        callback({
                            "response_code": 5000,
                            "response_message": "Error in challenge expiration",
                            "response_data": res
                        })
                    }
                    if (!err) {
                        callback({
                            "response_code": 2000,
                            "response_message": "Updated successfully.",
                            "response_data": {},
                        })
                    }
                });
            } else {
                console.log('No active challenge found')
                callback({
                    "response_code": 2000,
                    "response_message": "No active challenge found",
                    "response_data": {},
                })
            }
        })
    },
    getClientToken: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.userId || typeof userData.userId === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide user id", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(userData); 
                        UserModels.getProfileDetails(userData.userId, function(userRes) {
                            if (userRes) {
                                if (userRes.braintree_client_token) {
                                    nextCb(null, {
                                        response_code: 2000,
                                        response_message: 'Success',
                                        response_data: {
                                            userId: userData.userId,
                                            clientToken: userRes.braintree_client_token,
                                            customerId: userRes.braintree_customerId
                                        }
                                    })
                                }
                                if (!userRes.braintree_client_token) {
                                    gateway.clientToken.generate({}, function(err, response) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        if (!err) {
                                            //console.log(response);
                                            if (response.clientToken.length > 0) {
                                                gateway.customer.create({
                                                    firstName: userRes.name,
                                                    email: userRes.email
                                                }, function(err, result) {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    if (!err) {
                                                        if (result.success === true) {
                                                            let custInfo = {
                                                                userId: userData.userId,
                                                                clientToken: response.clientToken,
                                                                customerId: result.customer.id
                                                            }
                                                            UserModels.updatePaymentInfo(custInfo, function(res) {
                                                                if (res.response_code === 2000) {
                                                                    nextCb(null, {
                                                                        response_code: 2000,
                                                                        response_message: 'Success',
                                                                        response_data: custInfo
                                                                    })
                                                                } else {
                                                                    nextCb(null, res)

                                                                }
                                                            })
                                                        }
                                                    }
                                                })

                                            }
                                        }

                                    });
                                }

                            } else {
                                nextCb(null, {
                                    "response_code": 5000,
                                    "response_message": "User not found",
                                    "response_data": {}
                                });
                            }
                            // nextCb(null, notifyRes);
                        })
                    }
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                }
            ],
            function(err, content) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {
                        callback(content);
                    }
                    if (content.response_code === 5000) {
                        callback(content);
                    }
                    if (content.response_code === 5005) {
                        callback(content);
                    }
                    if (content.response_code === 5002) {
                        callback(content);
                    }
                }
            });
    },
    // Add debit/credit card
    savePaymentMethod: function(cardData, callback) {
        // console.log(cardData);
        async.waterfall([
            function(nextCb) {
                if (!cardData.customerId || typeof cardData.customerId === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide customer id", "response_data": {} });
                } else if (!cardData.nonceFromTheClient || typeof cardData.nonceFromTheClient === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide nonceFromTheClient", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    gateway.paymentMethod.create({
                        customerId: cardData.customerId,
                        paymentMethodNonce: cardData.nonceFromTheClient
                    }, function(err, result) {
                        if (err) {
                            nextCb(null, { "response_code": 5000, "err": err })
                        }
                        if (!err) {
                            nextCb(null, { "response_code": 2000, "response_message": "You have securely added your card" });
                        }
                    })
                }
            }
        ], function(err, content) {
            if (err) {
                nextCb(null, { "response_code": 5000, "response_message": "Internal DB error", "response_data": {} });
            }
            if (!err) {
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        })
    },
    // set default card 
    setDefaultPaymentMethod: function(paymentMethodData, callback) {
        //console.log(paymentMethodData);
        async.waterfall([
            function(nextCb) {
                if (!paymentMethodData.card_token || typeof paymentMethodData.card_token === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide card token", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {

                    gateway.paymentMethod.update(paymentMethodData.card_token, {
                        options: {
                            makeDefault: true
                        }
                    }, function(err, result) {
                        if (!err) {
                            if (result.success === false) {
                                nextCb(null, {
                                    "response_code": 5002,
                                    "response_message": "Braintree Error",
                                    "response_data": {}
                                });
                            }
                            if (result.success === true) {
                                nextCb(null, {
                                    "response_code": 2000,
                                    "response_message": "Success",
                                    "response_data": {}
                                })
                            }
                        }
                    });
                }
            }
        ], function(err, content) {
            if (err) {

            }
            if (!err) {
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
            }
        })
    },
    //Delete Card
    deletePaymentMethod: function(paymentMethodData, callback) {
        //console.log(paymentMethodData);
        async.waterfall([
            function(nextCb) {
                if (!paymentMethodData.card_token || typeof paymentMethodData.card_token === undefined) {
                    nextCb(null, { "success": false, "response_code": 5002, "response_message": "Please provide card token", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    gateway.paymentMethod.delete(paymentMethodData.card_token, function(err) {
                        if (err) {
                            nextCb(null, {
                                "response_code": 5002,
                                "response_message": "Braintree Error",
                                "response_data": {}
                            });
                        }
                        if (!err) {
                            nextCb(null, {
                                "response_code": 2000,
                                "response_message": "Card Deleted Successfully",
                                "response_data": {}
                            })
                        }
                    });
                }
            }
        ], function(err, content) {
            if (err) {

            }
            if (!err) {
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
            }
        })
    },
    // card list
    getCustomerData: function(customerData, callback) {
        //console.log(custoemrData);
        if (customerData.customerId) {
            gateway.customer.find(customerData.customerId, function(err, customer) {
                if (err) {
                    callback({
                        response_message: "Braintree error",
                        response_code: 5000,
                        response_data: {}

                    });
                } else {
                    callback({
                        response_message: "Success",
                        response_code: 2000,
                        response_data: customer
                    });
                }
            });
        } else {
            callback({
                response_code: 5002,
                response_message: "Please provide customer id",
                response_data: {}
            });
        }
    },
    // payment
    paymentCheckout: function(paymentCheckoutData, callback) {
        //  console.log(paymentCheckoutData);
        async.waterfall([
            function(nextCb) {
                if (!paymentCheckoutData.amount || typeof paymentCheckoutData.amount === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide amount", "checkoutData": {} });
                } else if (!paymentCheckoutData.customerId || typeof paymentCheckoutData.customerId === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "please provide customer id", "checkoutData": {} });
                }
                // else if(!paymentCheckoutData.paymentType || typeof paymentCheckoutData.paymentType === undefined){
                //     nextCb(null, { "response_code": 5002, "response_message": "please provide paymentOptions", "checkoutData": {} }); 
                // }
                else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    //     var paymentOptions={}
                    // if(paymentCheckoutData.paymentType==='holdInEscrow')
                    // {
                    //     paymentOptions={holdInEscrow:true}
                    // }else if(paymentCheckoutData.paymentType==='submitForSettlement')
                    // {
                    //     paymentOptions={submitForSettlement:true}
                    // }
                    gateway.transaction.sale({
                        merchantAccountId: "Musicalchallenges",
                        customerId: paymentCheckoutData.customerId,
                        amount: Math.ceil(paymentCheckoutData.amount),
                        options: { submitForSettlement: true }
                    }, function(err, result) {
                        // console.log("saleresult",result);
                        if (!err) {
                            if (result.success === false) {
                                callback({ "response_code": 5002, "checkoutData": result });
                            }
                            if (result.success === true) {
                                // gateway.transaction.holdInEscrow(result.transaction.id, function (err, holdResult) {
                                //     console.log("holdResult",holdResult);

                                //     });
                                paymentCheckoutData.transaction_id = result.transaction.id;
                                paymentCheckoutData.currency_code = result.transaction.currencyIsoCode;
                                paymentCheckoutData.payment_time = new Date(result.transaction.createdAt).getTime();
                                nextCb(null, { "response_code": 2000, "checkoutData": paymentCheckoutData })
                            }
                        }

                    })
                }
            }
            // function(arg2,nextCb){
            //     if(arg2.response_code === 5002){
            //         nextCb(null,arg2);
            //     }
            //     if(arg2.response_code === 2000){

            //         if(paymentCheckoutData.booking_id !== ''){
            //             apiService.setPaymentMethod(arg2.paymentCheckoutData, function (paymentReturn) {
            //                 console.log("paymentMethod response");
            //                 console.log(paymentReturn);
            //                 nextCb(null,{"response_code": 2000,"checkoutData":arg2.checkoutData});

            //             })
            //         }

            //         if(paymentCheckoutData.booking_id === ''){
            //             apiService.duePaymentMethod(arg2.paymentCheckoutData, function (paymentReturn) {
            //                 console.log("paymentMethod response");
            //                 console.log(paymentReturn);
            //                 nextCb(null,{"response_code": 2000,"checkoutData":arg2.checkoutData});

            //             })
            //         }



            //     }
            // }
        ], function(err, content) {
            if (err) {

            }
            if (!err) {
                if (content.response_code === 5002) {
                    callback(content);
                }
                if (content.response_code === 2000) {
                    callback(content);
                }
            }

        })
    },
    //Refund
    refundAmount: function(transaction, callback) {
        //console.log(custoemrData);
        if (transaction.txnId) {
            gateway.transaction.refund(transaction.txnId, function(err, result) {
                if (err) {
                    callback({
                        response_message: "Braintree error",
                        response_code: 5000,
                        response_data: {}

                    });
                } else {
                    callback({
                        response_message: "Refund successfully",
                        response_code: 2000,
                        response_data: result
                    });
                }
            });
        } else {
            callback({
                response_code: 5002,
                response_message: "Please provide transaction ID",
                response_data: {}
            });
        }
    },
    testPush: function(reqData, callback) {
        var confirmingData = {}
            //ios
        confirmingData.deviceId = "04F8A0173FAEF4591390FC80F064C1A677233629DE4E23FD3E11DAC051A2E49F"
            //android  
            //confirmingData.deviceId="ezhoqJWp3TY:APA91bEqmKt8MZFP2EMkfHWtzdwD5dzt2-5vYzaxOmlS7gHTmAi3xcJEgSnD_eo7OTAxd3gUZEVVQTdL3MJ82S4fFIG48wtkO285lzIQCLr7lWSacW_qvR28yBQlytzvCNywzRuUAQDa"
        confirmingData.alert = "Testing Push alert";
        confirmingData.from = "push from aloke";
        confirmingData.title = "Push title";
        confirmingData.message = "Hi Mainak";

        console.log("push before process");
        pushNotification.iosPush(confirmingData, function(pushStatus) {
                console.log("push on process");
                console.log(pushStatus);
                if (pushStatus.result.sent.length > 0) {
                    callback({

                        response_code: 2000,
                        response_message: "Push Sent successfully"
                    });
                } else {
                    callback({
                        response_code: 5000,
                        response_message: "Push not sent"
                    });
                }
            })
            // pushNotification.androidPush(confirmingData, function (pushStatus)
            //  {
            //      // console.log(pushStatus);
            //      if (pushStatus.success === true) {
            //           console.log(pushStatus.result);
            //           callback(
            //               {                            
            //                   response_code:2000,
            //                   response_message:"Push sent",
            //                   response_data:pushStatus.result
            //               });
            //       }
            //  })
    }
};
//======================CRON JOB==============================
var job = new CronJob({
    cronTime: '0 0 */1 * * *',
    onTick: function() {
        console.log('CronJob');
        /*
         * Runs every 1 minutes
         * 
         */
        apiService.expireChallenge(function(expResponse) {
            // console.log('aloke',expResponse)
            console.log(expResponse.response_message)
        })
    },
    onComplete: function() {
        console.log("Finished cron job...");
    },
    start: true,
    timeZone: 'America/Los_Angeles'
});

console.log('cronjob status', job.running);
module.exports = apiService;