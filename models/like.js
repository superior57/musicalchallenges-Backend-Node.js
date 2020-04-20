'use strict';
var mongoose = require("mongoose");
var async = require("async");
var config = require('../config');
var mongoPaginate = require("mongoose-pagination");
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
//var BlockUserModels = require('../models/blockUser');
var FeedModels = require('../models/feed');
// Export your module
var LikeModels = mongoose.model("Like", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        feed_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        like_type: {
            type: Number              
        },        
        modifyDate :{
            type : Date
        }
        }, {
            timestamps: true
          });
    
       s.plugin(mongooseAggregatePaginate);

    s.statics.feedLike = function(feedData , callback){
        //console.log(feedData);
        if(feedData.likeState === 1){
               LikeModels.findOne({
                   feed_id : feedData.postId,
                   user_id : feedData.userId
               } , function(err , res){
               // console.log(err);
                //console.log(res);
                   if(err){
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                   }
                   else if(res === null){
                        new LikeModels({
                            _id : new ObjectID,
                            feed_id : feedData.postId,
                            user_id : feedData.userId,
                            like_type : feedData.likeState,
                            modifyDate : new Date()
                        }).save(function(err , data){
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
                                    "response_message": "You liked this post.",
                                    "response_data": "incLikeCount"
                                })
                                // FeedModels.incSupportCount(feedData , function(result){
                                //     //console.log(result);
                                //     if (result.response_code === 2000) {
                                //         callback({
                                //             "response_code": 2000,
                                //             "response_message": "You are supporting this post.",
                                //             "response_data": {}
                                //         }) 
                                //     }
                                //     else if (result.response_code === 5005) {
                                //         callback({
                                //             "response_code": 5005,
                                //             "response_message": "INTERNAL DB ERROR",
                                //             "response_data": {}
                                //         })
                                //     }
                                // });
                            }
                        })
                   }
                   else if(res !== null){
                        LikeModels.update({
                            feed_id : feedData.postId,
                            user_id : feedData.userId 
                        },
                        {
                            $set:
                            {
                                like_type : feedData.likeState,
                                modifyDate : new Date()
                            }
                        } , function(err , resData){
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
                                    "response_message": "You are liking this post.",
                                    "response_data": "inclikePost"
                                })
                            }
                        })
                   }
               })
           }
           else if(feedData.likeState === 0){
               // console.log(feedData);
                LikeModels.findOne({
                    feed_id : feedData.postId,
                    user_id : feedData.userId
                } , function(err , res){
                       //console.log(res);
                       if(err){
                            callback({
                                "response_code": 5005,
                                "response_message": "INTERNAL DB ERROR",
                                "response_data": {}
                            })
                       }
                       else if(res.like_type === 1){
                            LikeModels.remove({
                                feed_id : feedData.postId,
                                user_id : feedData.userId  
                            } , function(err , resData){
                                if(err){
                                    callBack({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR",
                                        "response_data": {}
                                    })   
                                }
                                else{
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "You are unlikeing this post.",
                                        "response_data": "incUnlikePost"
                                    })
                                    
                                }
                            })
                       }
                       
                   })
            }else{
                callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": feedData
                        })
            }
    }
    s.statics.likeList = function( feedData , callback){
           // blockData.pop(feedData.userId);
            var response_data = []
           // var like_data = [];
            var aggregate = LikeModels.aggregate([
                {
                  $match:
                   { feed_id: feedData.postId } 
                },{
                    $sort:{createdAt : 1}
                },{
                  $lookup:
                    {
                      from: "users",
                      localField: "user_id",
                      foreignField: "_id",
                      as: "inventory_docs"
                    }
               },
               {
                   $unwind: "$inventory_docs"
                   
               },
               {
                    $project:{
                        likeId:"$_id",
                        userId:"$inventory_docs._id", 
                        userName:"$inventory_docs.name",
                        likeType:"$like_type",
                        userProfileImage:"$inventory_docs.image_url",
                        // userProfileImage:
                        //    {$cond: { if: {$and:[{$eq:["$inventory_docs.image_url",""]},{$eq:["$inventory_docs.user_type","Normal"]}]}, 
                        // then: "inventory_docs.$image_url", else: {$cond: { if: {$and:[{$ne:["$inventory_docs.image_url",""]},
                        //                 {$eq:["$inventory_docs.user_type","Normal"]}]}, 
                        // then: {$concat: [config.liveUrl, "" , config.profilepicPath , "", "$inventory_docs.image_url" ]} , else: "$inventory_docs.image_url"
                        //    }}
                        //    }},
                        dateTime:"$modifyDate"
                    }
               }
            ])
            var options = { page : feedData.page, limit : 10};
            LikeModels.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
                if(err) 
                {
                console.err(err)
            }
            else
              { 
               // console.log(results);
                if(results.length == 0){
                    callback({
                        "response_code":5002,
                        "response_message":"No one has like yet.",
                        "response_data":[]
                             
                    })
                }
                else{
                  //  like_data.push(results);
                   // response_data.like_data = like_data;
                    callback({
                        "response_code": 2000, 
                        "response_message": "Like list is showing.",
                        "response_data": results
                    })
                }
              }
            })
    }
    s.statics.liked = function(feedData , userId , callback){
        //console.log(feedData);
        LikeModels.findOne({
            feed_id: feedData._id,
            user_id: userId 
        } , function(err , likeData){
                if(err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                else if(likeData === null){
                    callback({
                        "response_code": 2002,
                        "response_message": "",
                        "response_data": {}
                    })
                }
                else if(likeData !== null){
                    callback({
                        "response_code": 2000,
                        "response_message": "",
                        "response_data": likeData
                    })
                }
            });
    }
    s.statics.deleteLikesByPostID = function(commentData , callback){
        LikeModels.remove({ 
            feed_id:commentData.feedId           
        }).exec(function (err , deleteCount){
            if(err){
               console.log(err)
            }
            if(!err){
                callback(deleteCount)
            }
        });
    }
    s.statics.maxLikes = function(req , callback){
      LikeModels.aggregate([
        {
            $group:{
             _id:"$feed_id",
             count: { $sum: 1 }
             
             }
        }
        ], function (err , results){
       // console.log(err);
      //  console.log(results);
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
                        "response_message": "likes found",
                        "response_data": results
                    })
                }
            });
    }
    s.statics.postLikedByUser = function(feedData , callback){
       // console.log(feedData);
        LikeModels.distinct("feed_id" ,{user_id: feedData.user_id}, function(err , likeData){
                if(err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                else if(likeData === null){
                    callback({
                        "response_code": 2002,
                        "response_message": "",
                        "response_data": {}
                    })
                }
                else if(likeData !== null){
                    callback({
                        "response_code": 2000,
                        "response_message": "",
                        "response_data": likeData
                    })
                }
            });
    }
    




    return s;
}());
module.exports = LikeModels;