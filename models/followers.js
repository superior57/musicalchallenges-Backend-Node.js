var mongoose = require("mongoose");
var mongo = require('mongodb');
var async = require("async");
var mongoPaginate = require("mongoose-pagination");
var BlockuserModel = require('../models/blockUser');
var ObjectID = mongo.ObjectID;
// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
// Export your module
var FollowersModel = mongoose.model("Followers", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        firstuser_id: {
            type: String,
            required: true
        },
        seconduser_id: {
            type: String,
            required: true
        },
        fan_first: {
            type: Number,
            default: 0
        },
        fan_second :{
            type : Number,
            default : 0
        }
    }, {
            timestamps: true
        });
    
    s.statics.insertFollowers = function (user, callback) { 
        this.checkFollowing(user, function (res) {
             //console.log(res);
                    if (res.response_code === 2000) {
                        if(res.response_data[0].firstuser_id === user.userId){
                            FollowersModel.update({
                                _id : res.response_data[0]._id
                            },
                            {
                                $set:
                                    {
                                        fan_first:1
                                    }
                            } , function(err , updateData){
                                if(err){
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    });
                                }
                                if(!err){
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "You have successfully followed.",
                                        "response_data": {}
                                    })
                                }
                            });
                        }
                        else{
                            FollowersModel.update({
                                _id : res.response_data[0]._id
                            },
                            {
                                $set:
                                    {
                                        fan_second:1
                                    }
                            } , function(err , updateData){
                                if(err){
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    });
                                }
                                if(!err){
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "You have successfully followed.",
                                        "response_data": {}
                                    })
                                }
                            });
                        } 
                    }else if (res.response_code === 4001){
                         console.log("[ not following]");
                        
                        new FollowersModel({
                                _id: new ObjectID,
                                firstuser_id: user.userId,
                                seconduser_id: user.friendId,
                                fan_first: 1
                            }).save(function (err, response_data) {
                                        if (!err) {
                                            console.log("[followers saved successfully]");
                                            callback({ "response_code": 2000,"response_message": "You are following now", response_data });
                                        } else {
                                            console.log(err);
                                            callback({
                                                "response_code": 5005,
                                                "response_message": "INTERNAL DB ERROR",
                                                "response_data": {}
                                            })
                                        }
                                    })
                    }else{
                        callback(res);
                    }
              } ) 
    }
    s.statics.updateFollowers = function (user, callback) {  
        this.checkFollowing(user, function (res) {
             //console.log(res);
                    if (res.response_code === 2000) {
                        if(res.response_data[0].firstuser_id === user.userId){
                            FollowersModel.update({
                                _id : res.response_data[0]._id
                            },
                            {
                                $set:
                                    {
                                        fan_first:0
                                    }
                            } , function(err , updateData){
                                if(err){
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    });
                                }
                                if(!err){
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "You have unfollowed successfully.",
                                        "response_data": {}
                                    })
                                }
                            });
                        }
                        else{
                            FollowersModel.update({
                                _id : res.response_data[0]._id
                            },
                            {
                                $set:
                                    {
                                        fan_second:0
                                    }
                            } , function(err , updateData){
                                if(err){
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    });
                                }
                                if(!err){
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "You have unfollowed successfully.",
                                        "response_data": {}
                                    })
                                }
                            });
                        } 
                    }else{
                        callback(res);
                    }
              } ) 
    }  
    s.statics.checkFollowing = function(userData , callback){
        FollowersModel.find({
            $or:[ 
                { firstuser_id : userData.userId , seconduser_id : userData.friendId }, 
                { firstuser_id : userData.friendId , seconduser_id : userData.userId }
            ] 
        }, function(err , data){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })   
            }
            if(data){
                if(data.length>0)
                {
                    callback({
                        "response_code": 2000,
                        "response_message": "Found Successfully",
                        "response_data": data
                    }) 
                }else{
                    callback({
                        "response_code": 4001,
                        "response_message": "No record found",
                        "response_data": []
                    })
                } 
            }
             
        });   
    }
    s.statics.countFollowing = function(id , callback){
        FollowersModel.find({
            $or:[
                {
                    $and:[
                        {
                            firstuser_id: id
                        },
                        {
                            fan_first: 1
                        }
                    ]
                },
                {
                    $and:[
                        {
                            seconduser_id: id
                        },
                        {
                            fan_second: 1
                        }
                    ] 
                }
            ]
        }).count().exec(function (err , countFan){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if(!err){
                callback({
                    "response_code": 2000,
                    "response_message": "Fan count",
                    "response_data": countFan
                })
            }
        });
    }    
    s.statics.countFollower = function(id , callback){
        FollowersModel.find({
            $or:[
                {
                    $and:[
                        {
                            firstuser_id: id
                        },
                        {
                            fan_second: 1
                        }
                    ]
                },
                {
                    $and:[
                        {
                            seconduser_id: id
                        },
                        {
                            fan_first: 1
                        }
                    ] 
                }
            ]
        }).count().exec(function (err , countFan){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": 0
                })
            }
            if(!err){
                callback({
                    "response_code": 2000,
                    "response_message": "Fan count",
                    "response_data": countFan
                })
            }
        });
    }
    s.statics.getFollowingUserList = function(userData , callback){
        FollowersModel.find({
            $or:[
                {
                    $and:[
                        {
                            firstuser_id: userData.userId
                        },
                        {
                            fan_first: 1
                        }
                    ]
                },
                {
                    $and:[
                        {
                            seconduser_id: userData.userId
                        },
                        {
                            fan_second: 1
                        }
                    ] 
                }
            ]
        }, function (err , data){
           //console.log(data);
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": []
                })
            }
            if(!err){
                if(data.length === 0){
                                callback({
                                    "response_code": 5002,
                                    "response_message": "Not Following anyone.",
                                    "response_data": []
                                })    
                            }
                if(data.length > 0){
                    BlockuserModel.getBlocked(userData, function(blockres){
                        var blockIds=blockres.response_data
                        var followingUser=[];
                    async.forEach(data, function (item, callBack) {
                        if(item.firstuser_id === userData.userId){
                             var isBlocked= blockIds.includes(item.seconduser_id);
                             if(!isBlocked)
                             {
                                followingUser.push(item.seconduser_id);
                             }
                            
                        }
                        else{
                             var isBlocked= blockIds.includes(item.firstuser_id);
                             if(!isBlocked)
                             {
                                followingUser.push(item.firstuser_id);
                             }
                            
                        }
                        callBack();
                    }, function (err , result) {
                        var count=followingUser.length;
                       // console.log(result);
                        if (err) {
                            console.log(err);
                        }
                        if (!err) {
                            //console.log(followingUser);
                            callback({
                                "response_code": 2000,
                                "response_message": "Following list.",
                                "response_data": followingUser,
                                "total": count
                            })
                        }
                    });

                    })
                    

                }
            }
        });
    }
    s.statics.getFollowerUserList = function(userData , callback){
        FollowersModel.find({
            $or:[
                {
                    $and:[
                        {
                            firstuser_id: userData.userId
                        },
                        {
                            fan_second: 1
                        }
                    ]
                },
                {
                    $and:[
                        {
                            seconduser_id: userData.userId
                        },
                        {
                            fan_first: 1
                        }
                    ] 
                }
            ]
        }, function (err , data){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": []
                })
            }
            if(!err){
                if(data.length === 0){
                                callback({
                                    "response_code": 5002,
                                    "response_message": "Not Following anyone.",
                                    "response_data": []
                                })    
                            }
                if(data.length > 0){
                    BlockuserModel.getBlocked(userData, function(blockres){
                        var blockIds=blockres.response_data
                        
                    var followingUser=[];
                    async.forEach(data, function (item, callBack) {
                        if(item.firstuser_id === userData.userId){
                            var isBlocked= blockIds.includes(item.seconduser_id);
                             if(!isBlocked)
                             {
                                followingUser.push(item.seconduser_id);
                             }
                             
                        }
                        else{
                            var isBlocked= blockIds.includes(item.firstuser_id);
                             if(!isBlocked)
                             {
                                followingUser.push(item.firstuser_id);
                             }
                            
                        }
                        callBack();
                    }, function (err , result) {
                        if (err) {
                            console.log(err);
                        }
                        if (!err) {
                            var count=followingUser.length;
                            console.log("complete");
                            callback({
                                "response_code": 2000,
                                "response_message": "Follower list.",
                                "response_data": followingUser,
                                "total": count
                            })
                        }
                    });
                    })
                     
                }
            }
        });
    }


   
    return s;

}());

module.exports = FollowersModel;