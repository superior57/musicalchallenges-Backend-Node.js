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
var ReportUserModels = mongoose.model("ReportUser", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        reportuser_id: {
            type: String,
            required: true
        },
       
    }, {
            timestamps: true
        });

    s.statics.reportFriend = function(userData , callback){
        this.checkStatus(userData.userId,userData.friendId,function(res){
            console.log(res)
            if(res.response_code===2001)
            {
                 new ReportUserModels({
                    _id: new ObjectID,
                    user_id: userData.userId,
                    reportuser_id: userData.friendId
                    
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
                            "response_message": "You have reported successfully.",
                            "response_data": {}
                        })
                    }
                })

            }else{
                callback(res);
            }
        })
    }
    
    // Get user block by me
    s.statics.getBlocked = function(searchData,  callBack){
        var blockUser = [];
            ReportUserModels.distinct('reportuser_id',{ user_id: searchData.userId} ) .exec( function(err , userIds){
                    if(err){
                        console.log("error");
                    }
                    if(userIds.length === 0){
                       // blockUser.push(searchData.userId);
                        callBack({ 
                            "response_code": 5002,
                            "response_message": "No user found",
                            "response_data": {}
                        });
                    }
                    if(userIds.length > 0){
                         callBack({
                                    "response_code": 2000,
                                    "response_message": "Block listing.",
                                    "response_data": userIds
                                })
                         
                        // async.forEach(data, function (item, callback) {
                        //     if(item.user_id === searchData.userId){
                        //         blockUser.push(item.reportuser_id);
                        //     }
                        //     else{
                        //         blockUser.push(item.user_id);
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
        ReportUserModels.findOne({
            reportuser_id : friend_id,
            user_id : user_id
        } , function(err , data){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
            }
            if(data === null){
                callback({
                    "response_code": 2001,
                    "response_message": "no result",
                    "response_data": {}
                })    
            }
            if(data !== null){
                callback({
                    "response_code": 2000,
                    "response_message": "You have reported already.",
                    "response_data": {}
                })
            }
        });
    } 
   

    // s.statics.blockList = function(userData , callBack){
    //     var blockUser = [];
    //     ReportUserModels.find({
    //        $and:[
    //             {
    //                 $or:[
    //                     {
    //                         user_id: userData.userId
    //                     },
    //                     {
    //                         reportuser_id: userData.userId
    //                     }
    //                 ]
    //             },
    //             {
    //                 $or:[
    //                     {
    //                         block_first: 1
    //                     },
    //                     {
    //                         block_second: 1
    //                     }
    //                 ] 
    //             }
    //         ]   
    //     } , function(err , data){
    //         if(err){
    //             callBack({
    //                 "response_code": 5005,
    //                 "response_message": "INTERNAL DB ERROR",
    //                 "response_data": {}
    //             });
    //         }
    //         if(data.length > 0){
    //             async.forEach(data, function (item, callback) {
    //                 if(item.user_id === userData.userId){
    //                     blockUser.push(item.reportuser_id);
    //                 }
    //                 else{
    //                     blockUser.push(item.user_id);
    //                 }
    //                 callback();
    //             }, function (err , data) {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 if (!err) {
    //                     blockUser.push(userData.userId);
    //                     console.log("complete");
    //                     callBack({
    //                         "response_code": 2000,
    //                         "response_message": "Block listing.",
    //                         "response_data": blockUser
    //                     })
    //                 }
    //             });   
    //         }
    //         if(data.length === 0){
    //             blockUser.push(userData.userId);
    //             callBack({
    //                 "response_code": 2000,
    //                 "response_message": "No block present.",
    //                 "response_data": blockUser
    //           });  
    //         }
    //     })
    // } 

    

    // s.statics.deleteblockRecords = function(userData , callback){
    //     ReportUserModels.find({
    //         $or:[ 
    //             { user_id : userData.userId }, 
    //             { reportuser_id : userData.userId }
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
    //                     ReportUserModels.remove({
    //                         $or:[ 
    //                             { user_id : userData.userId }, 
    //                             { reportuser_id : userData.userId }
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
module.exports = ReportUserModels;