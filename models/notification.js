var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var async = require("async");
var sha1 = require('node-sha1');
var config = require('../config');
var mongoPaginate = require("mongoose-pagination");
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongo = require('mongodb');
var DateDiff = require('date-diff');
var ObjectID = mongo.ObjectID;
//var UserModels = require('../models/user');
 
var UserModels = require('./user');
// Export your module
var NotificationModels = mongoose.model("Notification", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },       
        notificationType : {
            type : String,
            enum: ['LIKE', 'COMMENT', 'SHARE','FOLLOWING','ACCEPT_CHALLENGE','WIN_CHALLENGE','LOSE_CHALLENGE'],
            default : ""
        },        
        senderId : {
            type : String,
            default : ""
        },
        notifyText : {
            type: String,
            default : ""
        },
        viewStatus : {
            type : String,
            default : "UNREAD"
        },
        feed_id : {
            type : String,
            default : ""
        }

       }, {
            timestamps: true
          });
    s.plugin(mongooseAggregatePaginate);

    s.statics.addNotification = function(userData , callback){       
                new NotificationModels({
                    _id : new ObjectID(),
                    userId : userData.ownUserId,
                    notificationType : userData.notificationType,
                    notifyText : userData.notifyText?userData.notifyText:'',
                    senderId : userData.otherUserId,
                    feed_id : userData.postId?userData.postId:'' 
                }).save(function(err , data){
                    if(err){
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR.",
                            "response_data": err
                        })
                    }   
                    else{
                        callback({
                            "response_code": 2000,
                            "response_message": "Notification added.",
                            "response_data": data
                        })
                    }
                })
    }
    // s.statics.addNotificationOthers = function(userData , personalData , callback){
    //             new NotificationModels({
    //                 _id : new ObjectID(),
    //                 userId : personalData.ownUserId,                    
    //                 notificationType : userData.notificationType,
    //                 notifyText : userData.notifyText,
    //                 senderId : userData.otherUserId,
    //                 feed_id : userData.postId                    
    //             }).save(function(err , data){
    //                 if(err){
    //                     callback({
    //                         "response_code": 5005,
    //                         "response_message": "INTERNAL DB ERROR.",
    //                         "response_data": err
    //                     })
    //                 }   
    //                 else{
    //                     callback({
    //                         "response_code": 2000,
    //                         "response_message": "Notification added.",
    //                         "response_data": data
    //                     })
    //                 }
    //             })
    //         }
    // s.statics.addNotificationFeed = function(userData , personalData , callback){
    //     //console.log(userData);
    //      //console.log(personalData);
    //      //console.log(callback);
    //     // UserModels.getUserInfo(userData , function(userInfo){
    //     //     if(userInfo.response_code === 5005){
    //     //         callback({
    //     //             "response_code": 5005,
    //     //             "response_message": "INTERNAL DB ERROR.",
    //     //             "response_data": {}
    //     //         })
    //     //     }
    //     //     else if(userInfo.response_code === 2000){
    //             new NotificationModels({
    //                 _id : new ObjectID(),
    //                 userId : personalData._id,
    //                 //username : userInfo.name,
    //                 notificationType : userData.notificationType,
    //                 notifyText : userData.notifyText,
    //                 senderId : userData.userId,
    //                 feed_id : userData.postId
    //                 //image : userInfo.image_url
    //             }).save(function(err , data){
    //                 if(err){
    //                     callback({
    //                         "response_code": 5005,
    //                         "response_message": "INTERNAL DB ERROR.",
    //                         "response_data": err
    //                     })
    //                 }   
    //                 else{
    //                     callback({
    //                         "response_code": 2000,
    //                         "response_message": "Notification added.",
    //                         "response_data": data
    //                     })
    //                 }
    //             })
    //     //     }
    //     // })
    // }

    s.statics.getNotificationList = function(userData , callback){
        this.updateAllNotificationCount(userData, function(readAllRes){
            console.log(readAllRes);
            var aggregate = NotificationModels.aggregate([
            {
                $match : 
                {       
                    userId : userData.userId
                    // $or: [ 
                    //         { notificationType: "FEED" }, 
                    //         { notificationType: "SUPPORT" },
                    //         { notificationType: "UNSUPPORT" },
                    //         { notificationType: "COMMENT" }
                    // ]
                }
            },
            {
                $sort : {createdAt : -1}
            },
            {
                $lookup : 
                {
                   from: "users",
                   localField: "senderId",
                   foreignField: "_id",
                   as: "userinfo"
                }
            },
            {
                $lookup : 
                {
                   from: "songsfeeds",
                   localField: "feed_id",
                   foreignField: "_id",
                   as: "feedInfo"
                }
            },
            {
                $project:
                {
                    _id : 1,
                    userId : 1,
                    viewStatus : 1,
                    notifyText : 1,
                    senderId : 1,
                    notificationType : 1,
                    createdAt : 1,
                    feed_id : 1,
                   // date:{ $dateToString: { format: "%m %d, %Y", date: "$createdAt" } },
                    username:{ "$arrayElemAt": ["$userinfo.name", 0 ] },
                    image_url:{ "$arrayElemAt": ["$userinfo.image_url", 0 ] },
                    post_type:{ "$arrayElemAt": ["$feedInfo.cat_type", 0 ] },
                    shared:{ "$arrayElemAt": ["$feedInfo.is_shared", 0 ] },
                    challenged:{ "$arrayElemAt": ["$feedInfo.is_challenged", 0 ] },
                    songs_name:{ "$arrayElemAt": ["$feedInfo.songs_name", 0 ] },
                    formatted_date:''
                }
            }
            ])
            var options = { page : userData.page, limit : 10};
            NotificationModels.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
              if(err) 
              {
                console.log(err)
              }
              else
              { //console.log(results);
                 if(results.length == 0){
                    callback({
                        "response_code":5002,
                        "response_message":"No notification found",
                        "response_data": [],
                        "pageCount":0 
                    })
                 }
                 else{
                    // callback({
                    //                 "response_code": 2000, 
                    //                 "response_message": "Notification list.",
                    //                 "response_data": results,
                    //                 "pageCount" :pageCount 
                    //             })  
                    var notificationData=[];                                
                    async.forEach(results, function (item, callBack) {
                           NotificationModels.formatTime(item.createdAt, function(timeRes){
                            item.formatted_date=timeRes
                            item.post_type=item.post_type==="Sing"?"song":item.post_type;
                            notificationData.push(item) ;                                          
                            callBack();
                           })
                            //item.is_following=results.ownFollowing.response_data.indexOf(item._id) >-1?true:false;
                        }, function (err , data) {
                           // console.log(data);
                            if (err) {
                                console.log(err);
                            }
                            if (!err) {   
                                callback({
                                    "response_code": 2000, 
                                    "response_message": "Notification list.",
                                    "response_data": notificationData,
                                    "pageCount" :pageCount 
                                }) 
                            }
                    });// end of foreach
                    
                 }
                 
              }
            }) //end of pagination
        }) // end of update readstatus 
    }
    s.statics.allNotificationCount = function(userData , callback){
       // var response_data = [];
       // var countnotification = {};
        NotificationModels.find({
            userId : userData.userId,
            viewStatus : "UNREAD"            
        }).count().exec(function(err , totalCount){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })
            }
            else{
                callback({
                            "response_code": 2000,
                            "response_message": "Notification count",
                            "response_data": totalCount
                        })
            }
        })
    }
    s.statics.updateAllNotificationCount = function(userData , callback){
        NotificationModels.update({
                userId : userData.userId                
            },
            {
                $set :
                {
                    viewStatus : "READ"
                }
            },
            {
                multi: true
            }, function(err , data){
                if(err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": err
                    })
                }
                else{
                    callback({
                        "response_code": 2000,
                        "response_message": "All notification readed.",
                        "response_data": {}
                    })   
                }
            })
        }

    s.statics.deleteNotificationRecords = function(userData , callback){
        NotificationModels.find({
            $or:[ 
                { userId : userData.userId }, 
                { senderId : userData.userId }
            ]                    
        } , function(err , data){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                }) 
            }
            else{
                NotificationArchiveModels.deleteNotificationRecords(data , function(resData){
                    if(resData.response_code === 5005){
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": resData.response_data
                        })    
                    }
                    else if(resData.response_code === 2000){    
                        NotificationModels.remove({
                            $or:[ 
                                { userId : userData.userId }, 
                                { senderId : userData.userId }
                            ] 
                        } , function(err , res){
                            if(err){
                                callback({
                                    "response_code": 5005,
                                    "response_message": "INTERNAL DB ERROR",
                                    "response_data": err
                                })    
                            }
                            else{
                                callback({
                                    "response_code": 2000,
                                    "response_message": "Notification record deleted.",
                                    "response_data": {}
                                }) 
                            }
                        })
                    }
                })
            }
        })
    }
    s.statics.deleteNotification = function(feedId , callback){
        NotificationModels.remove({
          feed_id : feedId
        } , function(err , data){
          if(err){
            callback({
              "response_code": 5005,
              "response_message": "INTERNAL DB ERROR",
              "response_data": {}
            })
          }
          else{
            callback({
              "response_code": 2000,
              "response_message": "Notification deleted.",
              "response_data": {}
            }) 
          }
        })
    }
    s.statics.formatTime = function(reqTime, callback) {
        var now = new Date();
        var diff = new DateDiff(now, reqTime);
        var seconds = diff.seconds();
        if (seconds < 60) {
            callback('Few seconds ago');
        } else {
            var minutes = diff.minutes();
            if (minutes < 59) {
                var min_number = Math.trunc(minutes);
                if (min_number > 1) {
                   callback(min_number + ' minutes ago');
                } else {
                    callback( min_number + ' minute ago');
                }

            } else {
                var hours = diff.hours();
                if (hours < 24) {
                    var hr_number = Math.trunc(hours);
                    if (hr_number > 1) {
                        callback( hr_number + ' hours ago');
                    } else {
                        callback( hr_number + ' hour ago');
                    }           
               
                } else {
                    var days=diff.days()
                    if(days<2)
                    {
                        callback('yesterday');

                    }else{
                        var now = new Date(reqTime);
                        var month = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"][now.getMonth()];
                        var str = month+ ' ' +now.getDate()+ ', ' + now.getFullYear();
                        callback(str);
                    }
                }
            }
    }  
}

    return s;
}());
module.exports = NotificationModels;