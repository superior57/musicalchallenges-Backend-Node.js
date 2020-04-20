var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var async = require("async");
var sha1 = require('node-sha1');
var config = require('../config');
var mongoPaginate = require("mongoose-pagination");
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
// Export your module
var CmsModels = mongoose.model("Cms", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        keyword: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
       }, {
            timestamps: true
          });

    s.statics.insertCms = function(cmsData , callback){
        CmsModels.find({
            keyword : { $regex: cmsData.keyword, $options: 'i' }
        } , function(err , data){
            if(err){
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": err
                })  
            }
            else if(data.length > 0){
                callback({
                    "response_code": 5002,
                    "response_message": "This keyword already used, choose another.",
                    "response_data": data
                })
            }
            else if(data.length === 0){
                new CmsModels({
                    _id : new ObjectID(),
                    keyword : cmsData.keyword,
                    content : cmsData.content
                }).save(function(err , resData){
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
                            "response_message": "Successfully created.",
                            "response_data": resData
                        })
                    }
                })
            }
        })
    }

    s.statics.getAllCms = function(data , callback){
        CmsModels.find({} , function(err , resData){
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
                    "response_message": "All cms data.",
                    "response_data": resData
                }) 
            }   
        })
    }

    s.statics.getPerticularCmsData = function(cmsData , callback){
        CmsModels.findOne({
            keyword :{ $regex: cmsData.keyword, $options: 'i' } 
        } , function(err , resData){
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
                    "response_message": "Page Data",
                    "response_data": resData
                }) 
            }
        })
    }

    s.statics.updatePerticularCmsData = function(cmsData , callback){
        CmsModels.update({
            _id : cmsData._id
        },
        {
        $set : 
        {
            content : cmsData.content
        }
        } , function(err , resData){
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
                    "response_message": "Record updated successfully.",
                    "response_data": resData
                })    
            }
        })   
    }

    return s;
}());
module.exports = CmsModels;