var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var async = require("async");
var config = require('../config');
var mongoPaginate = require("mongoose-pagination");
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
//var BlockUserArchiveModels = require('../models/blockuserarchive');
// Export your module
var BlockUserModels = mongoose.model("UserBlock", function () {

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
       
    }, {
            timestamps: true
        });

    s.statics.blockFriend = function(userData , callback){
        BlockUserModels.find({
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
            if(data.length === 0){
                new BlockUserModels({
                    _id: new ObjectID,
                    firstuser_id: userData.userId,
                    seconduser_id: userData.friendId
                    
                }).save(function(err , data){
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
                            "response_message": "You have blocked successfully.",
                            "response_data": {}
                        })
                    }
                }) 
            }
            if(data.length > 0){
                  callback({
                                "response_code": 2000,
                                "response_message": "You have blocked already by your friend.",
                                "response_data": {}
                            })
                
            }
        });
    }
    s.statics.unblockFriend = function(userData , callback){
       BlockUserModels.findOne({firstuser_id : userData.userId , seconduser_id : userData.friendId}, function(err , data){
        //console.log(data);
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })   
            }
            if(data!=null){                
                    BlockUserModels.remove({
                        _id : data._id
                    }).exec( function(err , updateData){
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
                                "response_message": "Unblocked successfully.",
                                "response_data": {}
                            })
                        }
                    });
                }else{
                    callback({ 
                            "response_code": 5002,
                            "response_message": "No blocked user found",
                            "response_data": {}
                        });
                }
        });  
    }
    // Get user block by me
    s.statics.getBlocked = function(searchData,  callBack){
        //var blockUser = [];
            BlockUserModels.distinct('seconduser_id',{ firstuser_id: searchData.userId} ) .exec( function(err , userIds){
                    if(err){
                        console.log("error");
                    }
                    if(userIds.length === 0){
                       // blockUser.push(searchData.userId);
                        callBack({ 
                            "response_code": 5002,
                            "response_message": "No user found",
                            "total_record":0,
                            "response_data": []
                        });
                    }
                    if(userIds.length > 0){
                         callBack({
                                    "response_code": 2000,
                                    "response_message": "Block listing.",
                                    "total_record":userIds.length,
                                    "response_data": userIds
                                })
                         
                        // async.forEach(data, function (item, callback) {
                        //     if(item.firstuser_id === searchData.userId){
                        //         blockUser.push(item.seconduser_id);
                        //     }
                        //     else{
                        //         blockUser.push(item.firstuser_id);
                        //     }
                        //     callback();
                        // }, function (err , data) {
                        //     if (err) {
                        //         console.log(err);
                        //     }
                        //     if (!err) {
                        //         console.log("complete");
                        //         blockUser.push(searchData.userId);
                        //         callBack({
                        //             "response_code": 2000,
                        //             "response_message": "Connect listing.",
                        //             "response_data": blockUser
                        //         })
                        //     }
                        // });
                    }
        });//.paginate(page , 1);
    }
    s.statics.checkStatus = function(user_id , friend_id , callback){
        BlockUserModels.find({
            $or:[
                        {
                            firstuser_id: user_id,
                            seconduser_id: friend_id
                        },
                        {
                            firstuser_id: friend_id,
                            seconduser_id: user_id
                        }
                ]
        }).count().exec( function(err , data){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if(data === 0){
                callback({
                    "response_code": 5002,
                    "response_message": "no result",
                    "response_data": {}
                })    
            }
            if(data >0){
                callback({
                    "response_code": 2000,
                    "response_message": "That user is blocked.",
                    "response_data": {}
                })
            }
        });
    } 
   

    s.statics.blockList = function(userData , callBack){
        var blockUser = [];
        BlockUserModels.find({
                    $or:[
                        {
                            firstuser_id: userData.userId,

                        },
                        {
                            seconduser_id: userData.userId
                        }
                    ]
                } , function(err , data){
                    if(err){
                        callBack({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        });
                    }
                    if(data.length > 0){
                        async.forEach(data, function (item, callback) {
                            if(item.firstuser_id === userData.userId){
                                blockUser.push(item.seconduser_id);
                            }
                            else{
                                blockUser.push(item.firstuser_id);
                            }
                            callback();
                        }, function (err , data) {
                            if (err) {
                                console.log(err);
                            }
                            if (!err) {
                                blockUser.push(userData.userId);
                                console.log("complete");
                                callBack({
                                    "response_code": 2000,
                                    "response_message": "Block listing.",
                                    "response_data": blockUser
                                })
                            }
                        });   
                    }
                    if(data.length === 0){
                        blockUser.push(userData.userId);
                        callBack({
                            "response_code": 2000,
                            "response_message": "No block present.",
                            "response_data": blockUser
                      });  
                    }
            })
    } 

    

    // s.statics.deleteblockRecords = function(userData , callback){
    //     BlockUserModels.find({
    //         $or:[ 
    //             { firstuser_id : userData.userId }, 
    //             { seconduser_id : userData.userId }
    //         ]                    
    //     } , function(err , data){
    //         if(err){
    //             callback({
    //                 "response_code": 5005,
    //                 "response_message": "INTERNAL DB ERROR",
    //                 "response_data": err
    //             }) 
    //         }
    //         else{
    //             BlockUserArchiveModels.deleteblockRecords(data , function(resData){
    //                 if(resData.response_code === 5005){
    //                     callback({
    //                         "response_code": 5005,
    //                         "response_message": "INTERNAL DB ERROR",
    //                         "response_data": resData.response_data
    //                     }) 
    //                 }
    //                 else if(resData.response_code === 2000){
    //                     BlockUserModels.remove({
    //                         $or:[ 
    //                             { firstuser_id : userData.userId }, 
    //                             { seconduser_id : userData.userId }
    //                         ]     
    //                     } , function(err , res){
    //                         if(err){
    //                             callback({
    //                                 "response_code": 5005,
    //                                 "response_message": "INTERNAL DB ERROR",
    //                                 "response_data": err
    //                             })            
    //                         }
    //                         else{
    //                             callback({
    //                                 "response_code": 2000,
    //                                 "response_message": "Block records deleted.",
    //                                 "response_data": {}
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // }

    return s;
}());
module.exports = BlockUserModels;