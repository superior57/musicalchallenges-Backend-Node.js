var mongoose = require("mongoose");
var async = require("async");
var config = require('../config');
var mongoPaginate = require("mongoose-pagination");
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
var UserModels = require('../models/user');
//var FeedModels = require('../models/feed');
// Export your module
var CommentModels = mongoose.model("Comment", function () {

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
    comment: {
       type: String
    },
    modifyDate :{
        type : Date
    }
   }, {
        timestamps: true
      });

  s.plugin(mongooseAggregatePaginate);

s.statics.feedComment = function(feedData , callback){
  new CommentModels({
    _id: new ObjectID,
    feed_id : feedData.postId,
    user_id : feedData.userId,
    comment : feedData.comment,
    modifyDate : new Date()
  }).save(function(err , resData){
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
                      "response_data": resData
                  })
          }
 });
}
s.statics.feedCommentDelete = function(feedData , callback){
  SupportModels.remove({
    _id : feedData.commentId,
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
      FeedModels.decComment(feedData, function(res){
        if (res.response_code === 2000) {
          callback({
            "response_code": 2000,
            "response_message": "Comment has been deleted successfully.",
            "response_data": {}
          })
        }
        else if (res.response_code === 5005) {
          callback({
            "response_code": 5005,
            "response_message": "INTERNAL DB ERROR",
            "response_data": {}
          })
        }
      });
    }
  })
}
s.statics.commentList = function(feedData , callback){
  //blockData.pop(feedData.userId);
  var response_data = {}
  var comment_data = [];
  var aggregate = CommentModels.aggregate([
      {
        $match:
         {feed_id: feedData.postId} 
      },{
          $sort:{createdAt : -1}
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
        commentId:"$_id",
        userId:"$inventory_docs._id", 
        userName:"$inventory_docs.username",
        commentText:"$comment",
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
  CommentModels.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
    if(err) 
    {
      console.err(err)
    }
    else
    { 
      if(results.length == 0){
          callback({
              "response_code":5002,
              "response_message":"No comment found",
              "response_data":
                  {
                      "comment_data":[]
                  }
          })
      }
      else{
          //comment_data.push(results);
          response_data.comment_data = results;
          callback({
              "response_code": 2000, 
              "response_message": "Feed list.",
              "response_data": response_data
          })
      }
    }
  })
}
s.statics.deleteOneComment = function(commentId , callback){
        CommentModels.deleteOne({ 
            _id:commentId           
        }).exec(function (err , deleteCount){
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
                    "response_message": "Post count",
                    "response_data": deleteCount
                })
            }
        });
}
s.statics.deleteCommentsByPostID = function(commentData , callback){
        CommentModels.remove({ 
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
s.statics.maxComments = function(req , callback){
  CommentModels.aggregate([
     {$group:{
     _id:"$feed_id",
     count: { $sum: 1 }
     
     }}
     

], function (err , results){
 // console.log(err);
 // console.log(results);
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
                    "response_message": "Comments found",
                    "response_data": results
                })
            }
        });
}          

return s;
}());
module.exports = CommentModels;