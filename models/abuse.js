var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var async = require("async");
var config = require('../config');
var mongoPaginate = require("mongoose-pagination");
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
//var BlockUserModels = require('../models/blockUser');
var feedModels = require('../models/feed');
// Export your module
var AbuseModels = mongoose.model("Abuse", function () {

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
        }
       }, {
            timestamps: true
          });

    s.statics.abuseData = function(feedData , callback){
        AbuseModels.findOne({
            feed_id: feedData._id,
            user_id: feedData.userId 
        } , function(err , abuseData){
              if(err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
              }
              else if(abuseData === null){
                callback({
                    "response_code": 2002,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
              }
              else if(abuseData !== null){
                callback({
                    "response_code": 2000,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": {}
                })
              }
        });
    }

    return s;
}());
module.exports = AbuseModels;