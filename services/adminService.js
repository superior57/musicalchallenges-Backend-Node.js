var express = require("express");
var AdminModels = require('../models/admin');
var UserModels = require('../models/user');
var CategoryModel = require('../models/category');
var SubCategoryModel = require('../models/subCategory');
var MusicModel = require('../models/music');
var config = require('../config');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secretKey = config.secretKey;
var async = require("async");
var mongo = require('mongodb');
var crypto = require('crypto');
var sha1 = require('node-sha1');
var mailProperty = require('../modules/sendMail');
var ObjectID = mongo.ObjectID;
var baseUrl = config.baseUrl;
var AWS = require('aws-sdk');
var mp3Duration = require('mp3-duration');
const srtToObj = require('srt-to-obj');
var CmsModels = require('../models/cms');
//AWS.config.update({region: 'us-east-2',accessKeyId: 'AKIAJXV4XBAIY453GUMA',secretAccessKey: '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'});

AWS.config.update({ region: 'us-east-1', accessKeyId: 'AKIAIUAWYLXXOWUUHVIA', secretAccessKey: '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' });
var adminService = {
    jwtAuthVerification: (token, callback) => {
        //  console.log(token);
        async.waterfall([
            function(nextCb) {
                if (token == null || token == undefined) {
                    nextCb({ success: false, response_code: 5002, response_message: "No token provided." });
                } else {
                    nextCb(null, { response_code: 2000 })
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 2000) {
                    jwt.verify(token, secretKey, function(err, decoded) {
                        // console.log(err);
                        //console.log(decoded);
                        if (err) {
                            nextCb(null, {
                                success: false,
                                response_code: 4002,
                                response_message: "Session timeout! Please login again.",
                                token: null
                            });
                        }
                        if (!err) {
                            nextCb(null, {
                                success: true,
                                response_code: 2000,
                                response_message: "Authenticate successfully.",
                                response_data: decoded
                            });
                        }
                    });
                }
            }
        ], function(err, content) {
            if (err) {
                callback({
                    "success": false,
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })
            }
            if (content.response_code === 5005) {
                callback(content);
            }
            if (content.response_code === 4002) {
                callback(content);
            }
            if (content.response_code === 2000) {
                callback(content);
            }
        });
    },
    adminSignup: function(adminData, callback) {
        async.waterfall([
            function(nextcb) { //checking email existance
                // var cError1 = "";
                AdminModels.findOne({ email: adminData.email }, function(err, admindet) {
                    if (err)
                        nextcb(err);
                    else {
                        if (admindet) {
                            // cError1 =;
                            nextcb(null, { "response_code": 5000, "response_message": "Email already taken", "response_data": admindet });
                        } else {
                            nextcb(null, { "response_code": 2000 });

                        }
                    }
                });
            },
            function(cError1, nextcb) { //updating admin's data

                if (cError1.response_code === 5000) {
                    console.log(cError1);
                    nextcb(null, cError1);
                }
                if (cError1.response_code === 2000) {
                    adminData._id = new ObjectID;
                    var token = jwt.sign({ email: adminData.email }, secretKey, {
                        expiresIn: '2m' // expires in 1 hours
                    });
                    // adminData.authtoken = crypto.randomBytes(32).toString('hex');
                    adminData.authtoken = token;
                    AdminModels.registerUser(adminData, function(signUpRes) {
                            //nextCb(null, signUpRes); 
                            nextcb(null, signUpRes);
                        })
                        // var admin = new Admin(adminData);
                        // admin.save(function(err){
                        //     if(err){
                        //         nextcb(err);
                        //     } else {
                        //         nextcb(null, cError1);
                        //     }
                        // });
                }
            }

        ], function(err, content) {

            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })
            } else {
                //console.log(content);
                if (content.response_code === 2000) {
                    callback({
                        "response_code": 2000,
                        "response_message": "Admin saved successfully",
                        "response_data": {
                            "authtoken": content.response_data.authtoken,
                            "profile_details": {
                                "rating": content.response_data.rating,
                                "user_id": content.response_data._id,
                                "name": content.response_data.name,
                                "dob": content.response_data.dob,
                                "email": content.response_data.email,
                                "profile_pic": content.response_data.image_url ? content.response_data.image_url : '',
                                "mobile": content.response_data.mobile
                            }
                        }
                    })
                }
                if (content.response_code === 5000) {
                    callback(content);
                }
            }
        });
    },
    adminLogin: (loginData, callback) => {
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
                    //console.log(loginData);
                    // var token = jwt.sign({ email: loginData.email }, secretKey, {
                    //       expiresIn:'1h' // expires in 1 hours
                    //     });
                    var token = jwt.sign({
                        email: loginData.email
                    }, secretKey, { expiresIn: '12h' });
                    console.log(token);
                    loginData.authtoken = token;
                    AdminModels.login(loginData, function(loginInfo) {
                        loginInfo.token = token;
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
                            "token": arg2.token,
                            "response_data": {
                                "profile_type": arg2.profileRes.user_type,
                                "profile_details": {
                                    "user_id": arg2.profileRes._id,
                                    "name": arg2.profileRes.name,
                                    "mobile": arg2.profileRes.mobile,
                                    "email": arg2.profileRes.email,
                                    "profile_pic": arg2.profileRes.image_url ? config.liveUrl + config.profilepicPath + arg2.profileRes.image_url : ''

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
    userList: (userData, callback) => {
        // console.log(userData);
        async.waterfall([
            function(nextCb) {
                nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    UserModels.getUsersAdmin(userData, function(userList) {
                        // console.log(userList);
                        nextCb(null, userList);
                    })
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
            //         if (arg2.profileRes) {
            //             var searchData=arg2.profileRes;
            //             var allUser = {
            //                             "response_code": 2000,
            //                             "success":true,
            //                             "message": "Success",
            //                             "response_data": arg2.profileRes    
            //                             }
            //             nextCb(null, allUser);
            //         }
            //     }
            // }
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
    registerUser: (userData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!userData.name || typeof userData.name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide first name", "response_data": {} });
                    }
                    if (!userData.gender || typeof userData.gender === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide your gender", "response_data": {} });
                    } else if (!userData.email || typeof userData.email === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide email", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        userData._id = new ObjectID;
                        userData.authtoken = crypto.randomBytes(32).toString('hex');
                        var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
                        var sh1Pass = sha1(random);
                        userData.password = sh1Pass;
                        userData.apptype = 'ADMIN';
                        UserModels.registerUser(userData, function(signUpRes) {
                            signUpRes.random = random;
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
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    if (content.response_code === 2000) {
                        // mailProperty('userSignUpSuccess')(userData.email, {
                        //     OTP: content.random,
                        //     name: userData.name,
                        //     email: userData.email
                        // }).send();
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
                                    "profile_pic": content.response_data.image_url ? config.liveUrl + config.profilepicPath + content.response_data.image_url : '',
                                    "aboutme": content.response_data.aboutme
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
                                    "profile_pic": content.response_data.image_url ? config.liveUrl + config.profilepicPath + content.response_data.image_url : '',
                                    "gender": content.response_data.gender
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
    updateUserProfile: (profileData, callback) => {
        profileData.user_id = profileData._id;
        async.waterfall([
            function(nextCb) {
                if (profileData.length <= 0) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide user data", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {



                    UserModels.update({
                        _id: profileData.user_id
                    }, {
                        $set: {
                            name: profileData.name,
                            email: profileData.email,
                            aboutme: profileData.aboutme,
                            username: profileData.username,
                            gender: profileData.gender,
                        }
                    }, function(err, data) {
                        if (err) {
                            nextCb(null, {
                                "response_code": 5005,
                                "success": false,
                                "message": "INTERNAL DB ERROR",
                                "response_data": {}
                            })
                        }
                        if (data.n === 1 && data.nModified === 1) {
                            UserModels.findOne({
                                _id: profileData.user_id
                            }, function(err, res) {
                                if (err) {
                                    nextCb(null, {
                                        "response_code": 5005,
                                        "success": false,
                                        "message": "INTERNAL DB ERROR.",
                                        "response_data": {}
                                    })

                                } else {
                                    nextCb(null, {
                                        "response_code": 2000,
                                        "success": true,
                                        "message": "User updated successfully.",
                                        "response_data": res
                                    })


                                }
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
                if (arg2.response_code === 5000) {
                    nextCb(null, arg2);
                }
                if (arg2.response_code === 2000) {
                    if (arg2.response_data.user_type == 'Social') {
                        config.liveUrl = '';
                        config.profilepicPath = '';
                    }
                    var profileData = {
                        "response_code": 2000,
                        "success": true,
                        "message": "Profile updated successfully.",
                        "response_data": {
                            "authtoken": arg2.response_data.authtoken,
                            "profile_type": arg2.response_data.user_type,
                            "profile_details": {
                                "user_id": arg2.response_data._id,
                                "name": arg2.response_data.name,
                                "username": arg2.response_data.username,
                                "email": arg2.response_data.email,
                                "gender": arg2.response_data.gender,
                                "profile_pic": arg2.response_data.image_url ? config.liveUrl + config.profilepicPath + arg2.response_data.image_url : '',
                                "aboutme": arg2.response_data.aboutme,
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
                    "success": false,
                    "message": "INTERNAL DB ERROR",
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
                callback(content);
            }

        })
    },
    deleteUserData: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData._id || typeof reqData._id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide user data", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        UserModels.remove({ _id: reqData._id }, function(err) {
                            if (err) {
                                nextCb(null, { "response_code": 5000, data: err });
                            } else {
                                nextCb(null, { "response_code": 2000 });
                            }

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

                        callback({
                            "response_code": 2000,
                            "response_message": "User deleted successfully.",
                            "response_data": {}
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": content
                        })
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
    addCategory: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.cat_name || typeof reqData.cat_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide category name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        reqData._id = new ObjectID;
                        CategoryModel.insertCategory(reqData, function(signUpRes) {

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
                            "response_message": "Category inserted successfully.",
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "isDeleted": content.response_data.isDeleted
                            }
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "isDeleted": content.response_data.isDeleted
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
            });
    },

    deleteCategory: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide category name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        CategoryModel.remove({ _id: reqData.cat_id }, function(err) {
                            if (err) {
                                nextCb(null, { "response_code": 5000, data: err });
                            } else {
                                nextCb(null, { "response_code": 2000 });
                            }

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

                        callback({
                            "response_code": 2000,
                            "response_message": "Category deleted successfully.",
                            "response_data": {}
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": content
                        })
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
    addSubCategory: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.cat_name || typeof reqData.cat_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide category name", "response_data": {} });
                    }
                    if (!reqData.type || typeof reqData.type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide category type", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        reqData._id = new ObjectID;
                        SubCategoryModel.insertCategory(reqData, function(signUpRes) {
                            //console.log(signUpRes);
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
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                if (!err) {
                    //console.log(content);
                    if (content.response_code === 2000) {

                        callback({
                            "response_code": 2000,
                            "response_message": "Category inserted successfully.",
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "p_id": content.response_data.p_id,
                                "cat_name": content.response_data.cat_name,
                                "cat_type": content.response_data.type,
                                "isDeleted": content.response_data.isDeleted
                            }
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "cat_type": content.response_data.type,
                                "isDeleted": content.response_data.isDeleted
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
            });
    },

    deleteSubCategory: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide category name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        SubCategoryModel.remove({ _id: reqData.cat_id }, function(err) {
                            if (err) {
                                nextCb(null, { "response_code": 5000, data: err });
                            } else {
                                nextCb(null, { "response_code": 2000 });
                            }

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

                        callback({
                            "response_code": 2000,
                            "response_message": "Category deleted successfully.",
                            "response_data": {}
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": content
                        })
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

    updateCategory: (reqData, callBack) => {
        // console.log(reqData);
        async.waterfall([
                function(nextCb) {
                    if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide category ID", "response_data": {} });
                    }
                    if (!reqData.cat_name || typeof reqData.cat_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide category name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(reqData);
                        CategoryModel.updateCategory(reqData, function(updateRes) {

                            nextCb(null, updateRes);
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

                        callBack({
                            "response_code": 2000,
                            "response_message": "Category updated successfully.",
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "isDeleted": content.response_data.isDeleted
                            }
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callBack({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "isDeleted": content.response_data.isDeleted
                            }
                        })
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
    updateSubCategory: (reqData, callBack) => {
        // console.log(reqData);
        async.waterfall([
                function(nextCb) {
                    if (!reqData.cat_id || typeof reqData.cat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide category ID", "response_data": {} });
                    }
                    if (!reqData.p_id || typeof reqData.p_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please select parent category", "response_data": {} });
                    }
                    if (!reqData.cat_name || typeof reqData.cat_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please enter category name", "response_data": {} });
                    }
                    if (!reqData.type || typeof reqData.type === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide your gender", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        //console.log(reqData);
                        SubCategoryModel.updateCategory(reqData, function(updateRes) {

                            nextCb(null, updateRes);
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

                        callBack({
                            "response_code": 2000,
                            "response_message": "Category updated successfully.",
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "cat_type": content.response_data.type,
                                "isDeleted": content.response_data.isDeleted
                            }
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callBack({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": {
                                "cat_id": content.response_data._id,
                                "cat_name": content.response_data.cat_name,
                                "cat_type": content.response_data.type,
                                "isDeleted": content.response_data.isDeleted
                            }
                        })
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
    categoryList: (reqData, callback) => {
        console.log(reqData);
        async.waterfall([
                function(nextCb) {
                    nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        //if(reqData.p_id==="" || reqData.p_id===null || reqData.p_id===undefined) reqData.p_id= false;
                        CategoryModel.getAllCategories(reqData, function(catList) {
                            //console.log(catList);
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
                        if (arg2.categoryRes) {

                            var allcat = {
                                "response_code": 2000,
                                "success": true,
                                "message": "Success",
                                "response_data": arg2.categoryRes
                            }
                            nextCb(null, allcat);
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
    categoryListByType: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        //if(reqData.p_id==="" || reqData.p_id===null || reqData.p_id===undefined) reqData.p_id= false;
                        CategoryModel.getCategoriesByType(reqData, function(catList) {
                            //console.log(catList);
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
                        if (arg2.categoryRes) {

                            var allcat = {
                                "response_code": 2000,
                                "success": true,
                                "message": "Success",
                                "response_data": arg2.categoryRes
                            }
                            nextCb(null, allcat);
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
    // subCategoryList: (reqData, callback) => {
    //     // console.log(reqData);
    //     async.waterfall([
    //         function(nextCb) {
    //             if (!reqData.pcat_id && typeof reqData.pcat_id === undefined) {
    //                 nextCb(null, { "response_code": 5002, "response_message": "Please provide any parent category ID", "response_data": {} });
    //             }
    //             nextCb(null, { "response_code": 2000 });
    //         },
    //         function(arg1, nextCb) {
    //             if (arg1.response_code === 5002) {
    //                 nextCb(null, arg1);
    //             }
    //             if (arg1.response_code === 2000) {
    //                 if (reqData.pcat_id) {
    //                     console.log("--------------exist data ----------");
    //                     SubCategoryModel.getCategoriesByPid(reqData, function(catList) {
    //                         //console.log(catList);
    //                         nextCb(null, catList);
    //                     });
    //                 } else {
    //                     console.log("--------------subcategory----------");
    //                     SubCategoryModel.getAllCategories(reqData, function(catList) {
    //                         //console.log(catList);
    //                         nextCb(null, catList);
    //                     });

    //                 }
    //             }
    //         },
    //         function(arg2, nextCb) {
    //             //console.log(arg2);
    //             if (arg2.response_code === 5002) {
    //                 nextCb(null, arg2);
    //             }
    //             if (arg2.response_code === 4001) {
    //                 nextCb(null, arg2);
    //             }
    //             if (arg2.response_code === 5000) {
    //                 nextCb(null, arg2);
    //             }
    //             if (arg2.response_code === 2000) {
    //                 if (arg2.categoryRes.length > 0) {
    //                     //console.log(arg2.categoryRes);
    //                     var cat_arr = [];
    //                     async.forEach(arg2.categoryRes, function(item, callback) {
    //                         //console.log(item);
    //                         //  item.photo_path = item.photo_path ? baseUrl + '/upload/' + item.photo_path : '';
    //                         //item.pcat_name='sasdasd'; 
    //                         if (item.p_id) {
    //                             CategoryModel.getCatNameById({ catId: item.p_id }, function(catRes) {
    //                                 // console.log(catRes);
    //                                 if (catRes.response_code === 2000) {
    //                                     //console.log(catRes.res.cat_name);
    //                                     item.pcat_name = catRes.res.cat_name;
    //                                     cat_arr.push(item);
    //                                     callback();
    //                                 }

    //                             });
    //                         } else {
    //                             cat_arr.push(item);
    //                             callback();
    //                         }

    //                     }, function(err) {
    //                         if (err) {
    //                             console.log(err);
    //                         }
    //                         if (!err) {
    //                             // callback({
    //                             //     success: true,
    //                             //     STATUSCODE: 2000,
    //                             //     driverList
    //                             // })
    //                             //console.log(cat_arr);
    //                             var allcat = {
    //                                 "response_code": 2000,
    //                                 "success": true,
    //                                 "response_message": "Success",
    //                                 "response_data": cat_arr
    //                             }
    //                             nextCb(null, allcat);



    //                         }
    //                     });


    //                 } else {
    //                     nextCb(null, {
    //                         "response_code": 5002,
    //                         "success": false,
    //                         "response_message": "No categories found",
    //                         "response_data": []
    //                     });
    //                 }
    //             }
    //         }
    //     ], function(err, content) {
    //         if (err) {
    //             callback({
    //                 "response_code": 5005,
    //                 "response_message": "INTERNAL DB ERROR",
    //                 "response_data": err
    //             });
    //         }
    //         if (!err) {
    //             if (content.response_code === 5005) {
    //                 callback(content);
    //             }
    //             if (content.response_code === 5002) {
    //                 callback(content);
    //             }
    //             if (content.response_code === 4001) {
    //                 callback(content);
    //             }
    //             if (content.response_code === 2000) {
    //                 callback(content);
    //             }
    //             if (content.response_code === 5000) {
    //                 callback(content);
    //             }
    //         }
    //     });
    // },
    subCategoryList: (reqData, callback) => {
        console.log(reqData);
        async.waterfall([
                function(nextCb) {
                    nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        //if(reqData.p_id==="" || reqData.p_id===null || reqData.p_id===undefined) reqData.p_id= false;
                        SubCategoryModel.getAllCategories(reqData, function(catList) {
                            //console.log(catList);
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
                        if (arg2.categoryRes) {

                            var allcat = {
                                "response_code": 2000,
                                "success": true,
                                "message": "Success",
                                "response_data": arg2.categoryRes
                            }
                            nextCb(null, allcat);
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
    addMusic: (musicData, file, callBack) => {
        async.waterfall([
                function(nextCb) {
                    if (!musicData.songs_name || typeof musicData.songs_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide Songs name", "response_data": {} });
                    }
                    if (!musicData.pcat_id || typeof musicData.pcat_id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide any parrent category", "response_data": {} });
                    }
                    if (!musicData.artist_name || typeof musicData.artist_name === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "please provide artist name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        musicData.file_url = '';
                        musicData.lyrics_url = '';
                        musicData.image_url = '';
                        musicData.dance_url = '';
                        if (file != null || file != undefined) {
                            musicData.karaoke_length = '';
                            if (file.karaokefile != null || file.karaokefile != undefined) {
                                mp3Duration(file.karaokefile.data, function(err, duration) {
                                    if (err) return console.log(err.message);
                                    musicData.karaoke_length = duration;
                                });
                            }
                            async.parallel({
                                karaokefile: function(callback) {
                                    if (file.karaokefile != null) {
                                        var s3 = new AWS.S3();
                                        var karaoke = file.karaokefile;
                                        var ext = karaoke.name.slice(karaoke.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var params = {
                                            Bucket: 'musicalchalange/demo/karaoke',
                                            Key: fileName,
                                            Body: karaoke.data,
                                            ContentType: karaoke.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {
                                            callback(null, data);
                                            if (err) {
                                                console.log('karaoke file error in callback');
                                            }
                                        });
                                    }
                                },
                                lyricfile: function(callback) {
                                    if (file.lyricfile != null) {
                                        var lyric = file.lyricfile;
                                        var ext = lyric.name.slice(lyric.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var s3 = new AWS.S3();
                                        var params = {
                                            Bucket: 'musicalchalange/demo/lyric',
                                            Key: fileName,
                                            Body: lyric.data,
                                            ContentType: lyric.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {
                                            callback(null, data);
                                            if (err) {
                                                console.log('lyric file error in callback');
                                            }
                                        });
                                    }
                                },
                                albumimage: function(callback) {
                                    if (file.albumimage != null) {
                                        var s3 = new AWS.S3();
                                        var pic = file.albumimage;
                                        var ext = pic.name.slice(pic.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var params = {
                                            Bucket: 'musicalchalange/demo/albumimage',
                                            Key: fileName,
                                            Body: pic.data,
                                            ContentType: pic.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {

                                            //console.log(data);
                                            // console.log('album image: ', data.Location);
                                            // musicData.image_url = data.Location;
                                            callback(null, data);
                                            if (err) {
                                                console.log('Album image file error in callback');
                                            }

                                        });
                                    }
                                },
                                dancefile: function(callback) {
                                    if (file.dancefile != null) {
                                        var s3 = new AWS.S3();
                                        var dance = file.dancefile;
                                        var ext = dance.name.slice(dance.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var params = {
                                            Bucket: 'musicalchalange/demo/dance',
                                            Key: fileName,
                                            Body: dance.data,
                                            ContentType: dance.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {
                                            callback(null, data);
                                            if (err) {
                                                console.log('karaoke file error in callback');
                                            }
                                        });
                                    }
                                }
                            }, function(err, results) {
                                if (err) {
                                    console.log(err);
                                }
                                if (!err) {
                                    musicData._id = new ObjectID;
                                    musicData.file_url = results.karaokefile.Location;
                                    musicData.lyrics_url = results.lyricfile.Location;
                                    musicData.image_url = results.albumimage.Location;
                                    musicData.dance_url = results.dancefile.Location;
                                    MusicModel.insertMusic(musicData, function(signUpRes) {
                                        nextCb(null, signUpRes);
                                    })
                                }
                            });
                        } else {
                            musicData._id = new ObjectID;
                            console.log("suc");
                            MusicModel.insertMusic(musicData, function(signUpRes) {
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
                        callBack({
                            "response_code": 2000,
                            "response_message": "Music Uploaded successfully.",
                            "response_data": {
                                "karaoke_id": content.response_data._id,
                                "pcat_id": content.response_data.pcat_id,
                                "isDeleted": content.response_data.isDeleted,
                                "karaoke_details": {
                                    "songs_name": content.response_data.songs_name,
                                    "artist_name": content.response_data.artist_name,
                                    "image_url": content.response_data.image_url,
                                    "lyrics_url": content.response_data.lyrics_url,
                                    "musicfile_url": content.response_data.file_url,
                                    "dancefile_url": content.response_data.dance_url,

                                }
                            }
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callBack({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": {
                                "karaoke_id": content.response_data._id,
                                "pcat_id": content.response_data.cat_id,
                                "isDeleted": content.response_data.isDeleted,
                                "karaoke_details": {
                                    "songs_name": content.response_data.songs_name,
                                    "artist_name": content.response_data.artist_name,
                                    "image_url": content.response_data.image_url,
                                    "lyrics_url": content.response_data.lyrics_url,
                                    "musicfile_url": content.response_data.file_url,
                                    "dancefile_url": content.response_data.dance_url,
                                }
                            }
                        })
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

    deleteMusic: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData._id || typeof reqData._id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide music name", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        MusicModel.remove({ _id: reqData._id }, function(err) {
                            if (err) {
                                nextCb(null, { "response_code": 5000, data: err });
                            } else {
                                nextCb(null, { "response_code": 2000 });
                            }

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

                        callback({
                            "response_code": 2000,
                            "response_message": "Music deleted successfully.",
                            "response_data": {}
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": content
                        })
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
    allMusicWithLyricsList: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    nextCb(null, { "response_code": 2000 });
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 5002) {
                        nextCb(null, arg1);
                    }
                    if (arg1.response_code === 2000) {
                        MusicModel.getAllMusic(reqData, function(musicList) {
                            nextCb(null, musicList);
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
    updateMusic: (musicData, file, callBack) => {
        console.log("musicData", musicData)
        async.waterfall([
                function(nextCb) {
                    if (!musicData._id || typeof musicData._id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide music ID", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        if (file != null || file != undefined) {
                            musicData.karaoke_length = '';
                            if (file.karaokefile != null || file.karaokefile != undefined) {
                                mp3Duration(file.karaokefile.data, function(err, duration) {
                                    if (err) return console.log(err.message);
                                    musicData.karaoke_length = duration;
                                });
                            }

                            //console.log(filesArr.length);
                            //async.forEach(filesArr, function (fileData, callback) {
                            console.log(file);
                            async.parallel({
                                karaokefile: function(callback) {
                                    if (file.karaokefile !== undefined) {
                                        musicData.file_url = '';
                                        var s3 = new AWS.S3();
                                        var karaoke = file.karaokefile;
                                        var ext = karaoke.name.slice(karaoke.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var params = {
                                            Bucket: 'musicalchalange/demo/karaoke',
                                            Key: fileName,
                                            Body: karaoke.data,
                                            ContentType: karaoke.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {
                                            // console.log(data);
                                            console.log(data.Location);
                                            //   musicData.file_url = data.Location;                                    
                                            callback(null, data);
                                            if (err) {
                                                console.log('karaoke file error in callback');
                                            }
                                        });
                                    } else {
                                        callback(null, { Location: musicData.file_url });
                                    }
                                },
                                lyricfile: function(callback) {
                                    if (file.lyricfile != null) {
                                        var lyric = file.lyricfile;
                                        var ext = lyric.name.slice(lyric.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var s3 = new AWS.S3();
                                        var params = {
                                            Bucket: 'musicalchalange/demo/lyric',
                                            Key: fileName,
                                            Body: lyric.data,
                                            ContentType: lyric.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {

                                            //console.log(data);
                                            console.log('lyric file: ', data.Location);
                                            // musicData.image_url = data.Location;
                                            callback(null, data);
                                            if (err) {
                                                console.log('lyric file error in callback');
                                            }
                                        });
                                    }
                                },
                                albumimage: function(callback) {
                                    if (file.albumimage !== undefined) {
                                        musicData.image_url = '';
                                        var s3 = new AWS.S3();
                                        var pic = file.albumimage;
                                        var ext = pic.name.slice(pic.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var params = {
                                            Bucket: 'musicalchalange/demo/albumimage',
                                            Key: fileName,
                                            Body: pic.data,
                                            ContentType: pic.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {

                                            //console.log(data);
                                            console.log('album image: ', data);
                                            // musicData.image_url = data.Location;
                                            callback(null, data);
                                            if (err) {
                                                console.log('Album image file error in callback');
                                            }

                                        });
                                    } else {
                                        callback(null, { Location: musicData.image_url })
                                    }
                                },
                                dancefile: function(callback) {
                                    if (file.dancefile !== undefined) {
                                        musicData.dance_url = '';
                                        var s3 = new AWS.S3();
                                        var dance = file.dancefile;
                                        var ext = dance.name.slice(dance.name.lastIndexOf('.'));
                                        var fileName = Date.now() + ext;
                                        var params = {
                                            Bucket: 'musicalchalange/demo/dance',
                                            Key: fileName,
                                            Body: dance.data,
                                            ContentType: dance.mimetype,
                                            ACL: 'public-read'
                                        };
                                        s3.upload(params, function(err, data) {
                                            // console.log(data);
                                            console.log(data.Location);
                                            //   musicData.file_url = data.Location;                                    
                                            callback(null, data);
                                            if (err) {
                                                console.log('dance file error in callback');
                                            }
                                        });
                                    } else {
                                        callback(null, { Location: musicData.dance_url });
                                    }
                                }
                            }, function(err, results) {
                                console.log(results);
                                if (err) {
                                    console.log(err);
                                }
                                if (!err) {
                                    // musicData._id = new ObjectID;
                                    musicData.file_url = results.karaokefile.Location;
                                    musicData.lyrics_url = results.lyricfile.Location;
                                    musicData.image_url = results.albumimage.Location;
                                    musicData.dance_url = results.dancefile.Location;
                                    console.log(musicData);
                                    MusicModel.updateMusic(musicData, function(signUpRes) {
                                        nextCb(null, signUpRes);
                                    })
                                }
                            });
                        } else {
                            MusicModel.updateMusic(musicData, function(signUpRes) {
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

                        callBack({
                            "response_code": 2000,
                            "response_message": "Music Uploaded successfully.",
                            "response_data": {
                                "karaoke_id": content.response_data._id,
                                "cat_id": content.response_data.cat_id,
                                "isDeleted": content.response_data.isDeleted,
                                "karaoke_details": {
                                    "songs_name": content.response_data.songs_name,
                                    "artist_name": content.response_data.artist_name,
                                    "image_url": content.response_data.image_url,
                                    "lyrics_url": content.response_data.lyrics_url,
                                    "musicfile_url": content.response_data.file_url,
                                    "dance_url": content.response_data.dance_url
                                }
                            }
                        })
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
    addCMS: (cmsData, callback) => {
        //  console.log(cmsData);
        async.waterfall([
            function(nextCb) {
                if (!cmsData.keyword || typeof cmsData.keyword === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide all information.", "response_data": {} });
                } else if (!cmsData.content || typeof cmsData.content === undefined) {
                    nextCb(null, { "response_code": 5002, "response_message": "Please provide all information.", "response_data": {} });
                } else {
                    nextCb(null, { "response_code": 2000 });
                }
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    CmsModels.insertCms(cmsData, function(resData) {
                        // console.log(resData)
                        nextCb(null, resData);
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
    getAllCms: (data, callback) => {
        //console.log(data);
        async.waterfall([
            function(nextCb) {
                nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    CmsModels.getAllCms(data, function(resData) {
                        //  console.log(resData)
                        nextCb(null, resData);
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
    deleteCms: (reqData, callback) => {
        async.waterfall([
                function(nextCb) {
                    if (!reqData._id || typeof reqData._id === undefined) {
                        nextCb(null, { "response_code": 5002, "response_message": "Please provide cms page", "response_data": {} });
                    } else {
                        nextCb(null, { "response_code": 2000 });
                    }
                },
                function(arg1, nextCb) {
                    if (arg1.response_code === 2000) {
                        CmsModels.remove({ _id: reqData._id }, function(err) {
                            if (err) {
                                nextCb(null, { "response_code": 5000, data: err });
                            } else {
                                nextCb(null, { "response_code": 2000 });
                            }

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

                        callback({
                            "response_code": 2000,
                            "response_message": "CMS deleted successfully.",
                            "response_data": {}
                        })
                    }
                    if (content.response_code === 5000) {
                        //callback(content);
                        callback({
                            "response_code": 5000,
                            "response_message": content.response_message,
                            "response_data": content
                        })
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
    getCMSPage: (pageData, callback) => {
        async.waterfall([
            function(nextCb) {
                nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    CmsModels.getPerticularCmsData(pageData, function(resData) {
                        nextCb(null, resData);
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
    updateCmsData: (cmsData, callback) => {
        async.waterfall([
            function(nextCb) {
                nextCb(null, { "response_code": 2000 });
            },
            function(arg1, nextCb) {
                if (arg1.response_code === 5002) {
                    nextCb(null, arg1);
                }
                if (arg1.response_code === 2000) {
                    CmsModels.updatePerticularCmsData(cmsData, function(resData) {
                        nextCb(null, resData);
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

};
module.exports = adminService;