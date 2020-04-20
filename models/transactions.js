var mongoose = require("mongoose");
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
var pagination = require('mongoose-pagination');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
// Export your module
var TransactionModel = mongoose.model("Transaction", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        challenge_id: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        txn_id: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        mode: {
            type: String,
            enum: ['C', 'D'],
            default: 'C'                     
        },        
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, {
            timestamps: true
        });
    s.plugin(mongooseAggregatePaginate); 
    s.statics.insertTXN = function (txn, callback) {
        this.checkDuplicate(txn, function (res) {
             
                        if (res === null) {   
                        let params={
                            _id: new ObjectID,
                            challenge_id:txn.challenge_id,
                            userId:txn.userId,
                            txn_id:txn.txn_id,
                            amount:txn.amount

                            }                  
                        new TransactionModel(params).save(function (err, response_data) {
                            if (!err) {
                                console.log("[transaction saved successfully]");
                                callback({ "response_code": 2000, response_data });
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
                        console.log("[transaction already exist]");
                        callback({
                            "response_code": 5000,
                            "response_message":"transaction already exist",
                            "response_data":res

                        })
                    }
              } ) 
    }
    s.statics.checkDuplicate = function (txnData, callback) {
        TransactionModel.findOne({
            challenge_id:txnData.challenge_id,
            userId:txnData.userId
        },
            function (err, res) {
                if (err)
                    console.log(err);
                if (!err)
                    callback(res);
            })
    }
    s.statics.getUserTxnHistory = function (userData, callback) {
        var aggregate = TransactionModel.aggregate([
              {
                $match:
                 {userId: userData.userId} 
              },{
                  $sort:{createdAt : -1}
              },{
                $lookup:
                  {
                    from: "songsfeeds",
                    localField: "challenge_id",
                    foreignField: "_id",
                    as: "challenge_feed"
                  }
             },              
             {
              $project:{
                txn_id:1,
                amount:1,
                createdAt:1,
                pChallenge_id:{"$arrayElemAt": ["$challenge_feed.p_challenge_id", 0 ]},
                challenge_id:{"$arrayElemAt": ["$challenge_feed._id", 0 ]},
                image_url:{"$arrayElemAt": ["$challenge_feed.image_url", 0 ]},
                songsName:{"$arrayElemAt": ["$challenge_feed.songs_name", 0 ]},
                challenge_exp_date:{"$arrayElemAt": ["$challenge_feed.challenge_exp_date", 0 ]},
                challenge_status:{"$arrayElemAt": ["$challenge_feed.challenge_status", 0 ]},
                win_status:{ $cond: {
                                  if:{$eq:[ {"$arrayElemAt": ["$challenge_feed.challenge_status", 0 ]},'ACTIVE']},
                                  then:"Continue",
                                  else:{
                                        $cond:{
                                                 if:{$and:[{$eq:[ {"$arrayElemAt": ["$challenge_feed.challenge_status", 0 ]},'EXPIRED']},
                                                    {$eq:[ {"$arrayElemAt": ["$challenge_feed.winner_status", 0 ]},'WINNER']}]},
                                                then:"Win",
                                                else:"Lose"
                                          }
                                      },
                                    } 
                            }

                // userProfileImage:
                //    {$cond: { if: {$and:[{$eq:["$inventory_docs.image_url",""]},{$eq:["$inventory_docs.user_type","Normal"]}]}, 
                // then: "inventory_docs.$image_url", else: {$cond: { if: {$and:[{$ne:["$inventory_docs.image_url",""]},
                //                 {$eq:["$inventory_docs.user_type","Normal"]}]}, 
                // then: {$concat: [config.liveUrl, "" , config.profilepicPath , "", "$inventory_docs.image_url" ]} , else: "$inventory_docs.image_url"
                //    }}
                //    }},
                
              }
             }
          ])
          var options = { page : userData.page, limit : 10};
          TransactionModel.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
            if(err) 
            {
              console.err(err)
            }
            else
            { 
              if(results.length == 0){
                  callback({
                      "response_code":5002,
                      "response_message":"No transaction found",
                      "response_data":[]
                           
                  })
              }
              else{
                  //comment_data.push(results);
                   
                  callback({
                      "response_code": 2000, 
                      "response_message": "Transaction history",
                      "response_data": results
                  })
              }
            }
          })
    } 
    s.statics.getAllTxnHistory = function (userData, callback) {
        var aggregate = TransactionModel.aggregate([
              {
                $match:
                 {txn_id:{$ne:''}} 
              },{
                  $sort:{createdAt : -1}
              },{
                $lookup:
                  {
                    from: "songsfeeds",
                    localField: "challenge_id",
                    foreignField: "_id",
                    as: "challenge_feed"
                  }
             }, 
             {
              $lookup:
                {
                  from: "users",
                  localField: "userId",
                  foreignField: "_id",
                  as: "userinfo"
                }
           },             
             {
              $project:{
                txn_id:1,
                amount:1,
                createdAt:1,
                pChallenge_id:{"$arrayElemAt": ["$challenge_feed.p_challenge_id", 0 ]},
                challenge_id:{"$arrayElemAt": ["$challenge_feed._id", 0 ]},
                image_url:{"$arrayElemAt": ["$challenge_feed.image_url", 0 ]},
                songsName:{"$arrayElemAt": ["$challenge_feed.songs_name", 0 ]},
                challenge_exp_date:{"$arrayElemAt": ["$challenge_feed.challenge_exp_date", 0 ]},
                challenge_status:{"$arrayElemAt": ["$challenge_feed.challenge_status", 0 ]},
                username:{ "$arrayElemAt": ["$userinfo.username", 0 ] },
                user_profile_pic:{ "$arrayElemAt": ["$userinfo.image_url", 0 ] },
              }
             }
          ])
          var options = { page : userData.page, limit : 10};
          TransactionModel.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
            if(err) 
            {
              console.err(err)
            }
            else
            { 
              if(results.length == 0){
                  callback({
                      "response_code":5002,
                      "response_message":"No transaction found",
                      "response_data":[]
                           
                  })
              }
              else{
                  //comment_data.push(results);
                   
                  callback({
                      "response_code": 2000, 
                      "response_message": "Transaction history",
                      "response_data": results
                  })
              }
            }
          })
    }
   
     
    return s;

}());

module.exports = TransactionModel;