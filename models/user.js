var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var async = require("async");
var mongoPaginate = require("mongoose-pagination");
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var FeedPostModel = require('../models/feed');
var FollowersModel = require('../models/followers');
var BlockuserModel = require('../models/blockUser');
var sha1 = require('node-sha1');

// Export your module
var UserModels = mongoose.model("User", function() {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            default: '',
            required: false
        },
        email: {
            type: String,
            default: '',
            required: false
        },
        password: {
            type: String,
            default: '',
            required: false
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            default: 'Male'

        },
        aboutme: {
            type: String,
            default: '',
            required: false
        },
        paypal_email: {
            type: String,
            default: '',
            required: false
        },
        authtoken: {
            type: String,
            default: ''
        },
        apptype: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            default: '',
            required: false
        },
        social_id: {
            type: String,
            default: '',
            required: false
        },
        deviceTokenIOS: {
            type: Array,
            default: []
        },
        deviceTokenAndroid: {
            type: Array,
            default: []
        },
        user_type: {
            type: String,
            enum: ['Normal', 'Social'],
            default: 'Normal',
            required: true
        },
        random_pasword_checkin: {
            type: String,
            default: ''
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        braintree_customerId: {
            type: String,
            default: ''
        },
        braintree_client_token: {
            type: String,
            default: ''
        }
    }, {
        timestamps: true
    });
    s.plugin(mongooseAggregatePaginate);

    s.pre('save', function(next) {
        var user = this;
        if (!user.isModified('password')) {
            return next();
        }

        var sh1Pass = sha1(user.password);
        user.password = sh1Pass;
        // next();

        bcrypt.hash(user.password, null, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
    s.statics.registerUser = function(user, callback) {
        if (user.apptype == "ANDROID") {
            user.deviceTokenAndroid = user.devicetoken;

        } else if (user.apptype == "IOS") {
            user.deviceTokenIOS = user.devicetoken;

        } else {

            user.deviceTokenAndroid = user.devicetoken;

        }
        this.getUserByEmail(user.email, function(res) {
            if (res === null) {

                new UserModels(user).save(function(err, response_data) {
                    if (!err) {
                        console.log("---registered user---");
                        callback({ "response_code": 2000, response_data });
                    } else {
                        console.log("error");
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                    }
                })
            } else {
                console.log("[user already registered]");
                callback({
                    "response_code": 5000,
                    "response_message": "Already registered with this email",
                    "response_data": res

                })

            }
        })
    }
    s.statics.getUserByEmail = function(email, callback) {
        UserModels.findOne({
                email: email,
                user_type: 'Normal'
            },
            function(err, res) {
                if (err)
                    console.log(err);
                if (!err)
                    callback(res);
            })
    }
    s.statics.getUserByUserId = function(userId, callback) {
        console.log(userId);
        UserModels.findOne({
                _id: userId,
                isBlocked: false
            },
            function(err, res) {
                //       console.log(res)
                if (err)
                    console.log(err);
                if (!err)
                    callback(res);
            })
    }
    s.statics.socialSignup = function(user, callback) {
        if (user.apptype == "ANDROID") {
            user.deviceTokenAndroid = user.devicetoken;

        } else if (user.apptype == "IOS") {
            user.deviceTokenIOS = user.devicetoken;

        } else {

            user.deviceTokenAndroid = user.devicetoken;

        }
        this.getUserByFacebook(user.social_id, function(res) {
            console.log('user', user);
            if (res === null) {
                // let data = {
                //     _id:user._id,
                //     apptype:user.apptype,
                //     devicetoken:user.devicetoken,
                //     name:user.name,
                //     social_id:user.social_id,
                //     image_url:user.image_url,
                //     authtoken:user.authtoken,
                //     user_type:user.user_type,
                //     deviceTokenIOS:user.deviceTokenIOS
                // }
                new UserModels(user).save(function(err, response_data) {
                    console.log('xxxxxxxxxerr', err);
                    if (!err) {
                        callback({ "response_code": 2000, response_data });
                    } else {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                    }
                })
            } else {
                console.log("[user already registered]");

                var conditions = { social_id: user.social_id };

                if (user.apptype == "ANDROID") {
                    fields = {
                        authtoken: user.authtoken,
                        apptype: user.apptype,
                        $addToSet: { deviceTokenAndroid: user.devicetoken }
                    };

                }
                if (user.apptype == "IOS") {
                    fields = {
                        authtoken: user.authtoken,
                        apptype: user.apptype,
                        $addToSet: { deviceTokenIOS: user.devicetoken }
                    };
                }
                options = { upsert: false };
                UserModels.update(conditions, fields, options, function(err, affected) {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": { err }
                        })
                    } else {
                        callback({
                            "response_code": 5000,
                            "response_message": "user already registered.",
                            "authtoken": user.authtoken,
                            "response_data": res
                        })
                    }
                });
            }
        })
    }
    s.statics.getUserByFacebook = function(faceBookId, callback) {
        UserModels.findOne({
            social_id: faceBookId,
            //user_type: 'Social'
        }, function(err, res) {
            if (err)
                console.log(err);
            if (!err)
                callback(res);
        })
    }
    s.statics.verifyUser = function(userData, callback) {
        UserModels.find({
            email: userData.email
        }, function(err, res) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": { err }
                })
            }
            if (!err) {
                console.log("------------------");
                if (res.length == 0) {
                    callback({
                        "response_code": 5002,
                        "response_message": "Email not registered.",
                        "response_data": {}
                    })
                } else {
                    if (res[0].social_id === '') {
                        callback({
                            "response_code": 2000,
                            "response_message": "User Found.",
                            "response_data": { res }
                        })
                    } else {
                        callback({
                            "response_code": 5002,
                            "response_message": "Email not registered.",
                            "response_data": {}
                        })
                    }
                }
            }
        })
    }
    s.statics.setMoreInfo = function(moreInfo, callback) {
        //console.log(moreInfo);
        if (moreInfo.user_id && moreInfo.cat_id) {
            UserModels.update({
                _id: moreInfo.user_id
            }, {
                $set: {
                    category: moreInfo.cat_id,
                    location: moreInfo.location,
                    loc: [{ long: moreInfo.long, lat: moreInfo.lat }],
                    paypal_email: moreInfo.paypal_email,
                    cat_selected: true

                },
            }).exec(function(err, smi) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    if (smi.n === 1) {
                        UserModels.getProfileDetails(moreInfo.user_id, function(profileRes) {
                            callback({ "response_code": 2000, profileRes });
                        })
                    }
                }

            })
        }
    }
    s.statics.getProfileDetails = function(user_id, callback) {
        console.log('user_id', user_id)
        if (user_id) {
            UserModels.findOne({
                _id: user_id
            }, function(err, u) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    callback(u);
                }
            })
        }
    }
    s.statics.login = function(loginData, callback) {
        UserModels.findOne({
            email: loginData.email
        }, function(err, profileRes) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if (profileRes) {
                console.log("====xxxxxxxxxxxxxxxxxxx");
                console.log(profileRes);

                var p = UserModels.comparePassword(loginData.password, profileRes.password);
                if (p === true) {
                    var conditions = { _id: profileRes._id };
                    var token = crypto.randomBytes(32).toString('hex');
                    // var deviceToken=[];
                    //deviceToken.push(loginData.devicetoken);
                    if (loginData.apptype == "ANDROID") {
                        fields = { authToken: token, apptype: loginData.apptype, $addToSet: { deviceTokenAndroid: loginData.devicetoken } };

                    }
                    if (loginData.apptype == "IOS") {
                        fields = { authToken: token, apptype: loginData.apptype, $addToSet: { deviceTokenIOS: loginData.devicetoken } };
                    }
                    options = { upsert: false };
                    UserModels.update(conditions, fields, options, function(err, affected) {
                        if (err) {
                            callback({
                                "response_code": 5005,
                                "response_message": "INTERNAL DB ERROR",
                                "response_data": {}
                            })
                        } else {
                            profileRes.authtoken = token;
                            callback({ "response_code": 2000, "profileRes": profileRes });
                        }
                    });


                }
                if (p === false) {
                    callback({ "response_code": 4001, "response_message": "Wrong password" });
                }
            }
            if (profileRes === null) {
                callback({ "response_code": 5000, "response_message": "No user found" });
            }
        })
    }
    s.statics.logout = function(logoutData, callback) {
        var deviceToken = [];

        deviceToken.push(logoutData.devicetoken);
        var conditions = { _id: logoutData.user_id };
        if (logoutData.apptype == "ANDROID") {
            fields = { authToken: '', $pull: { deviceTokenAndroid: { $in: deviceToken } } };

        }
        if (logoutData.apptype == "IOS") {
            fields = { authToken: '', $pull: { deviceTokenIOS: { $in: deviceToken } } };
        }
        options = { upsert: false };
        UserModels.update(conditions, fields, options, function(err, affected) {
            // console.log(err);
            //console.log(affected);
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            } else {
                callback({
                    "response_code": 2000,
                    "response_message": "You logged out successfully.",
                    "response_data": {}
                });
            }
        });
    }
    s.statics.changePayPal = function(paypalData, callback) {
        UserModels.update({
            _id: paypalData.user_id
        }, {
            $set: {
                paypal_email: paypalData.new_paypal_id
            }
        }).exec(function(err, pu) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if (!err) {
                if (pu.n === 1 && pu.nModified === 1) {
                    callback({
                        "response_code": 2000,
                        "response_message": "Your Paypal Id has saved successfully.",
                        "response_data": {}
                    })
                }
            }
        })
    }
    s.statics.changePassword = function(changePasswordData, callback) {
        UserModels.getProfileDetails(changePasswordData.user_id, function(profileData) {
            if (profileData) {
                var p = UserModels.comparePassword(changePasswordData.password, profileData.password);
                if (p === true) {
                    bcrypt.hash(changePasswordData.new_password, null, null, function(err, hash) {
                        if (err) {
                            return next(err);
                        }
                        if (!err) {
                            var token = crypto.randomBytes(32).toString('hex');
                            UserModels.update({
                                _id: changePasswordData.user_id
                            }, {
                                $set: {
                                    password: hash,
                                    authtoken: token
                                }
                            }).exec(function(err, cpu) {
                                if (err) {
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    })
                                }
                                if (!err) {
                                    if (cpu.n === 1 && cpu.nModified === 1) {
                                        callback({
                                            "response_code": 2000,
                                            "response_message": "Your password is changed successfully",
                                            "response_data": {
                                                "authtoken": token
                                            }
                                        })
                                    }
                                }
                            })
                        }

                    });
                }
                if (p === false) {
                    callback({
                        "response_code": 4001,
                        "response_message": "Existing Password Incorrect",
                        "response_data": {}
                    })
                }
            }
        })
    }
    s.statics.updateDeviceToken = function(userData, callback) {
            var token = [];
            if (userData.apptype === 'ANDROID') {
                token.push(userData.devicetoken);
                UserModels.update({
                    deviceTokenAndroid: { $in: token }
                }, {
                    $pull: { deviceTokenAndroid: { $in: token } }
                }, function(err, resData) {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                    } else {
                        callback({
                            "response_code": 2000,
                            "response_message": "Device token Updated",
                            "response_data": {}
                        })
                    }
                })
            } else if (userData.apptype === 'IOS') {
                token.push(userData.devicetoken);
                UserModels.update({
                    deviceTokenIOS: { $in: token }
                }, {
                    $pull: { deviceTokenIOS: { $in: token } }
                }, function(err, resData) {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                    } else {
                        callback({
                            "response_code": 2000,
                            "response_message": "Device token Updated",
                            "response_data": {}
                        })
                    }
                })
            }
        },
        s.statics.updateUserProfile = function(profileData, callback) {
            // console.log('123');
            console.log(profileData);
            UserModels.getUserByUserId(profileData.user_id, function(res) {

                if (res === null) {

                    callback({
                        "response_code": 5002,
                        "response_message": "No user found",
                        "response_data": {}
                    })
                } else {
                    if (res.user_type == 'Normal') {
                        if (profileData.user_id && profileData.image_url) {

                            var conditions = { _id: profileData.user_id };

                            if (profileData.apptype == "ANDROID") {
                                fields = {
                                    name: profileData.name,
                                    apptype: profileData.apptype,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    image_url: profileData.image_url,
                                    $addToSet: { deviceTokenAndroid: profileData.devicetoken }
                                };

                            } else if (profileData.apptype == "IOS") {
                                fields = {
                                    name: profileData.name,
                                    apptype: profileData.apptype,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    image_url: profileData.image_url,
                                    $addToSet: { deviceTokenIOS: profileData.devicetoken }
                                };
                            } else {

                                fields = {
                                    name: profileData.name,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    image_url: profileData.image_url
                                }

                            }
                            options = { upsert: false };
                            UserModels.update(conditions, fields, options, function(err, affected) {
                                if (err) {
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    })
                                } else {
                                    UserModels.getProfileDetails(profileData.user_id, function(profileRes) {
                                        if (profileRes) {
                                            callback({
                                                "response_code": 2000,
                                                "response_data": profileRes
                                            })
                                        }
                                    })
                                }
                            });


                        }

                        if (profileData.user_id && !profileData.image_url) {
                            var conditions = { _id: profileData.user_id };

                            if (profileData.apptype == "ANDROID") {
                                fields = {
                                    name: profileData.name,
                                    apptype: profileData.apptype,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    $addToSet: { deviceTokenAndroid: profileData.devicetoken }
                                };

                            } else if (profileData.apptype == "IOS") {
                                fields = {
                                    name: profileData.name,
                                    apptype: profileData.apptype,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    $addToSet: { deviceTokenIOS: profileData.devicetoken }
                                };
                            } else {
                                fields = {
                                    name: profileData.name,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender
                                }

                            }
                            options = { upsert: false };
                            // console.log("-----22");
                            UserModels.update(conditions, fields, options, function(err, affected) {
                                if (err) {
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    })
                                } else {
                                    UserModels.getProfileDetails(profileData.user_id, function(profileRes) {
                                        if (profileRes) {
                                            callback({
                                                "response_code": 2000,
                                                "response_data": profileRes
                                            })
                                        }
                                    })
                                }
                            });
                        }
                    }
                    if (res.user_type == 'Social') {
                        if (profileData.user_id && profileData.email) {
                            UserModels.getUserByEmail(profileData.email, function(res) {
                                //console.log(res);
                                if (res === null) {
                                    var conditions = { _id: profileData.user_id };
                                    if (profileData.apptype == "ANDROID") {
                                        fields = {
                                            email: profileData.email,
                                            apptype: profileData.apptype,
                                            aboutme: profileData.aboutme,
                                            username: profileData.username,
                                            gender: profileData.gender,
                                            $addToSet: { deviceTokenAndroid: profileData.devicetoken }
                                        };

                                    } else if (profileData.apptype == "IOS") {
                                        fields = {
                                            email: profileData.email,
                                            apptype: profileData.apptype,
                                            aboutme: profileData.aboutme,
                                            username: profileData.username,
                                            gender: profileData.gender,
                                            $addToSet: { deviceTokenIOS: profileData.devicetoken }
                                        };
                                    } else {
                                        fields = {
                                            email: profileData.email,
                                            aboutme: profileData.aboutme,
                                            username: profileData.username,
                                            gender: profileData.gender
                                        }

                                    }
                                    options = { upsert: false };
                                    console.log("---333");
                                    UserModels.update(conditions, fields, options, function(err, affected) {
                                        if (err) {
                                            callback({
                                                "response_code": 5005,
                                                "response_message": "INTERNAL DB ERROR",
                                                "response_data": {}
                                            })
                                        } else {
                                            UserModels.getProfileDetails(profileData.user_id, function(profileRes) {
                                                if (profileRes) {
                                                    callback({
                                                        "response_code": 2000,
                                                        "response_data": profileRes
                                                    })
                                                }
                                            })
                                        }
                                    });
                                } else {
                                    console.log("[user already registered]");
                                    callback({
                                        "response_code": 5000,
                                        "response_message": "Already registered with this email",
                                        "response_data": res

                                    })

                                }

                            })
                        }
                        if (profileData.user_id && !profileData.email) {
                            // //console.log('sass');
                            var conditions = { _id: profileData.user_id };
                            if (profileData.apptype == "ANDROID") {
                                fields = {
                                    apptype: profileData.apptype,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    $addToSet: { deviceTokenAndroid: profileData.devicetoken }
                                };
                            }
                            if (profileData.apptype == "IOS") {
                                fields = {
                                    apptype: profileData.apptype,
                                    aboutme: profileData.aboutme,
                                    username: profileData.username,
                                    gender: profileData.gender,
                                    $addToSet: { deviceTokenIOS: profileData.devicetoken }
                                };
                            }
                            options = { upsert: false };
                            console.log("---444");
                            UserModels.update(conditions, fields, options, function(err, affected) {
                                if (err) {
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    })
                                } else {
                                    UserModels.getProfileDetails(profileData.user_id, function(profileRes) {
                                        if (profileRes) {
                                            callback({
                                                "response_code": 2000,
                                                "response_data": profileRes
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            })
        }
    s.statics.savePassword = function(passData, newPass, callback) {

        bcrypt.hash(newPass, null, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            if (!err) {
                console.log("=============");
                console.log(newPass);
                var newPassword = hash;
                console.log(newPassword);
                UserModels.update({
                    email: passData.email
                }, {
                    $set: {
                        password: newPassword
                    }
                }).exec(function(err, updated) {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                    }
                    if (!err) {
                        if (updated.n === 1 && updated.nModified === 1) {
                            callback({
                                "response_code": 2000,
                                "response_message": "Succesfully password saved.",
                                "response_data": {}
                            })
                        }
                    }
                })
            }
        });
    }
    s.statics.comparePassword = function(password, dbPassword) {
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        console.log(password);
        console.log(dbPassword);
        return bcrypt.compareSync(password, dbPassword);
    }
    s.statics.getCreatorName = function(user_id, callback) {
        //  console.log(user_id);
        UserModels.findOne({
            _id: user_id
        }, function(err, u) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if (!err) {
                var creatorname = u.fname + ' ' + u.lname;
                callback({
                    "response_code": 2000,
                    "response_message": "",
                    "response_data": { creatorname }
                })
            }
        })
    }
    s.statics.authenticate = function(jwtData, callback) {
        if (jwtData.user_id) {
            UserModels.findOne({
                _id: jwtData.user_id
            }, function(err, u) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    if (u.authtoken && u.authtoken === jwtData.authtoken) {
                        callback({
                            "response_code": 2000,
                            "response_message": "authentication success"

                        })
                    } else {
                        callback({
                            "response_code": 4000,
                            "response_message": "authentication failed"
                        })
                    }

                }
            })
        }
    }
    s.statics.getUsers = function(email, callback) {
        UserModels.aggregate([{
                $project: {

                    name: 1,
                    username: 1,
                    email: 1,
                    gender: 1,
                    aboutme: 1,
                    user_type: 1,
                    image_url: 1,
                    isBlocked: 1,
                    createdAt: 1
                }
            }],
            function(err, res) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    // callback(res);
                    callback({ "response_code": 2000, "profileRes": res });
                }
            })
    }
    s.statics.getUsersAdmin = function(userData, callback) {
        console.log(userData.number);
        var aggregate = UserModels.aggregate([{
                $lookup: {
                    from: "reportusers",
                    localField: "_id",
                    foreignField: "reportuser_id",
                    as: "reportuser"
                }
            },
            {
                $project: {

                    name: 1,
                    username: 1,
                    email: 1,
                    gender: 1,
                    aboutme: 1,
                    user_type: 1,
                    image_url: 1,
                    isBlocked: 1,
                    createdAt: 1,
                    reportCount: { $size: "$reportuser" }
                }
            }
        ])
        var options = { page: userData.number, limit: 10 };
        UserModels.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
                if (err) {
                    console.log(err)
                    callback({
                        "success": false,
                        "response_code": 5000,
                        "response_message": "INTERNAL DB ERROR",
                        "total_record": 0,
                        "response_data": {}
                    })
                } else {
                    //console.log(results.length);
                    if (results.length == 0) {
                        callback({
                            "success": true,
                            "response_code": 5002,
                            "total_record": 0,
                            "response_message": "No user found",
                            "response_data": []

                        })
                    } else {
                        callback({
                            "success": true,
                            "response_code": 2000,
                            "response_message": "New user list.",
                            "total_record": count,
                            "response_data": results
                        })
                    }

                }
            }) //End pagination
    }
    s.statics.searchUser = function(searchData, callback) {
        var ab = "^" + searchData.search_keyword;
        var searchTxt = [];

        searchTxt = [
            { name: { '$regex': ab, $options: 'i' } },
            { username: { '$regex': ab, $options: 'i' } }
        ];
        UserModels.find({
            $and: [{
                    $or: searchTxt
                },
                {
                    isBlocked: false

                }

            ]
        }, function(err, u) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }

        }).paginate(searchData.page_count, 10, function(err, res, total) {
            // console.log('total: ', total, 'docs: ', res)
            if (res) {
                // console.log(res);
                if (res.length === 0) {
                    callback({
                        "response_code": 5002,
                        "response_message": "No result found",
                        "response_data": []
                    })
                } else {
                    callback({
                        "response_code": 2000,
                        "total_records": total,
                        "response_message": "Result found",
                        "response_data": res
                    });
                }
            }
        });
    }
    s.statics.getUserList = function(userData, callback) {
        // console.log(userData); 
        BlockuserModel.blockList(userData, function(blockres) {
            //console.log( "userIdArr",  userData.userIdArr)
            // console.log("blockres", blockres.response_data)
            if (blockres.response_data.length > 0) {
                userData.userIdArr = userData.userIdArr.filter(val => !blockres.response_data.includes(val));
            }
            //  console.log(userData.userIdArr);
            var aggregate = UserModels.aggregate([{
                        $match: {
                            _id: {
                                $in: userData.userIdArr
                            }
                        }
                    },

                    {
                        $project: {
                            name: 1,
                            user_type: 1,
                            email: 1,
                            image_url: 1,
                            gender: 1,
                            is_following: ""
                        }
                    }
                ])
                //start pagination
            var options = { page: userData.page, limit: 15 };
            UserModels.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
                    if (err) {
                        console.log(err)
                    } else {
                        //console.log(results.length);
                        if (results.length == 0) {
                            callback({
                                "response_code": 5002,
                                "total_record": 0,
                                "response_message": "No user found",
                                "response_data": []

                            })
                        } else {
                            callback({
                                "response_code": 2000,
                                "response_message": "New user list.",
                                "total_record": count,
                                "response_data": results
                            })
                        }

                    }
                }) //End pagination

        })
    }
    s.statics.getMyBlockList = function(userData, callback) {
        // console.log(userData); 
        BlockuserModel.getBlocked(userData, function(blockres) {
            //console.log( "userIdArr",  userData.userIdArr)
            // console.log("blockres", blockres.response_data)
            if (blockres.response_code === 2000) {
                //  console.log(userData.userIdArr);
                var aggregate = UserModels.aggregate([{
                            $match: {
                                _id: {
                                    $in: blockres.response_data
                                }
                            }
                        },

                        {
                            $project: {
                                name: 1,
                                user_type: 1,
                                email: 1,
                                image_url: 1,
                                gender: 1,
                                is_following: ""
                            }
                        }
                    ])
                    //start pagination
                var options = { page: userData.page, limit: 10 };
                UserModels.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
                        if (err) {
                            console.log(err)
                        } else {
                            //console.log(results.length);
                            if (results.length == 0) {
                                callback({
                                    "response_code": 5002,
                                    "total_record": 0,
                                    "response_message": "No user found",
                                    "response_data": []

                                })
                            } else {
                                callback({
                                    "response_code": 2000,
                                    "response_message": "New user list.",
                                    "total_record": count,
                                    "response_data": results
                                })
                            }

                        }
                    }) //End pagination
            } else {
                callback(blockres);
            }
        })
    }

    s.statics.getUnFollowingList = function(userData, callback) {
        // console.log(userData); 
        UserModels.find({}, function(err, users) {
            if (err) {
                callback({
                    "response_code": 5002,
                    "total_record": 0,
                    "response_message": "User not exist",
                    "response_data": []

                })
            } else {
                let unfollowings = [];
                async.forEach(users, function(item, callback) {
                    let checkmodel = {
                        userId: userData.userId,
                        friendId: item._id
                    }
                    FollowersModel.checkFollowing(checkmodel, result => {
                        if (result.response_code !== 2000) {
                            unfollowings.push(item)
                        }
                        callback();
                    })
                }, function(err, data) {
                    if (err) {
                        callback({
                            "response_code": 5002,
                            "total_record": 0,
                            "response_message": "Error in task",
                            "response_data": err

                        })
                    } else {
                        if (unfollowings.length == 0) {
                            callback({
                                "response_code": 5002,
                                "total_record": 0,
                                "response_message": "No user found",
                                "response_data": []

                            })
                        } else {
                            callback({
                                "response_code": 2000,
                                "response_message": "New user list.",
                                "response_data": unfollowings
                            })
                        }
                    }
                })
            }
        })
    }
    s.statics.getUserProfile = function(userData, callback) {
        // console.log(userData);
        var findwith = userData.user_id;
        if (userData.other_user_id && typeof userData.other_user_id !== undefined) {
            findwith = userData.other_user_id
        }

        if (findwith) {
            UserModels.findOne({
                _id: findwith
            }, function(err, profileRes) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    //console.log(profileRes);
                    if (profileRes != null) {
                        async.parallel({
                                user: function(callback) {
                                    callback(null, profileRes);
                                },
                                following: function(callback) {
                                    FollowersModel.getFollowingUserList({ userId: findwith }, function(followingRes) {
                                        //console.log('following');
                                        //console.log(followingRes);                              
                                        if (followingRes.response_code === 2000) {
                                            callback(null, {
                                                "following_count": followingRes.total
                                            })
                                        } else {
                                            callback(null, {
                                                "following_count": 0

                                            })
                                        }


                                    })
                                },
                                followers: function(callback) {
                                    FollowersModel.getFollowerUserList({ userId: findwith }, function(followerRes) {
                                        //console.log('followers');
                                        //console.log(followerRes);
                                        let follower_users = followerRes.response_data;
                                        let arrindex = follower_users.indexOf(userData.user_id);

                                        // console.log(arrindex)
                                        if (followerRes.response_code === 2000) {
                                            callback(null, {
                                                "followers_count": followerRes.total,
                                                "is_following": arrindex > -1 ? true : false
                                            })
                                        } else {
                                            callback(null, {
                                                "followers_count": 0,
                                                "is_following": arrindex > -1 ? true : false
                                            })
                                        }
                                    })
                                },
                                posts: function(callback) {
                                    FeedPostModel.countPost(findwith, function(postRes) {
                                        //console.log(postRes);                        
                                        callback(null, {
                                            "post_count": postRes.response_data
                                        })
                                    })
                                },
                                challenges: function(callback) {
                                    FeedPostModel.countChallengedPost(findwith, function(postRes) {
                                        //console.log(postRes);                        
                                        callback(null, {
                                            "post_count": postRes.response_data
                                        })
                                    })
                                }
                            },
                            function(err, results) {
                                // results is now equals to: {one: 1, two: 2}
                                var userdetails = {
                                    "response_code": 2000,
                                    "response_message": "Success",
                                    "response_data": {
                                        "authtoken": results.user.authtoken,
                                        "profile_type": results.user.user_type,
                                        "following_count": results.following.following_count,
                                        "followers_count": results.followers.followers_count,
                                        "post_count": results.posts.post_count,
                                        "challenges_count": results.challenges.post_count,
                                        "profile_details": {
                                            "user_id": results.user._id,
                                            "name": results.user.name,
                                            "username": results.user.username,
                                            "devicetoken": results.user.devicetoken,
                                            "apptype": results.user.apptype,
                                            "email": results.user.email,
                                            "gender": results.user.gender,
                                            "profile_pic": results.user.image_url,
                                            "is_following": results.followers.is_following,
                                            // "profile_pic": arg2.profileRes.image_url ? config.liveUrl + config.profilepicPath + arg2.profileRes.image_url : '',
                                            "aboutme": results.user.aboutme,
                                            "paypalId": results.user.paypal_email ? results.user.paypal_email : '',
                                            "customerId": results.user.braintree_customerId
                                        }
                                    }
                                }
                                callback(userdetails);
                            });
                    } else {
                        callback({
                            "response_code": 5002,
                            "response_message": "No user found",
                            "response_data": {}
                        })
                    }
                }
            })
        } else {
            callback({
                "response_code": 5005,
                "response_message": "INTERNAL DB ERROR",
                "response_data": {}
            })
        }
    }
    s.statics.updatePaymentInfo = function(reqData, callback) {
        //console.log(moreInfo);
        if (reqData.userId && reqData.clientToken) {
            UserModels.update({
                _id: reqData.userId
            }, {
                $set: {
                    braintree_client_token: reqData.clientToken,
                    braintree_customerId: reqData.customerId
                },
            }).exec(function(err, smi) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    if (smi.n === 1) {
                        UserModels.getProfileDetails(reqData.userId, function(profileRes) {
                            callback({ "response_code": 2000, profileRes });
                        })
                    }
                }

            })
        }
    }
    s.statics.getDevicetoken = function(userId, callback) {
        UserModels.find({
            _id: userId
        }, { deviceTokenAndroid: 1, deviceTokenIOS: 1 }, function(err, u) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if (!err) {
                if (u.length) {
                    callback({
                        "response_code": 2000,
                        "response_message": "Devicetoken found",
                        "response_data": u
                    })
                } else {
                    callback({
                        "response_code": 4000,
                        "response_message": "No devicetoken found",
                        "response_data": {}
                    })
                }

            }
        })
    }
    s.statics.getUsersDevicetoken = function(userId_arr, callback) {
        UserModels.find({
            _id: { $in: userId_arr }
        }, { deviceTokenAndroid: 1, deviceTokenIOS: 1 }, function(err, u) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if (!err) {
                if (u.length) {
                    callback({
                        "response_code": 2000,
                        "response_message": "authentication success",
                        "response_data": {}
                    })
                } else {
                    callback({
                        "response_code": 4000,
                        "response_message": "authentication failed"
                    })
                }

            }
        })
    }
    return s;

}());

module.exports = UserModels;