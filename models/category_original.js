var mongoose = require("mongoose");
// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
// Export your module
var CategoryModel = mongoose.model("Category", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        cat_name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Sing', 'Dance'],
            default: 'Sing',
            required: true
           
        },        
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, {
            timestamps: true
        });
    
    s.statics.insertCategory = function (cat, callback) {     
         
         this.getCatByName(cat, function (res) {
             
                        if (res === null) {                     
                        new CategoryModel(cat).save(function (err, response_data) {
                            if (!err) {
                                console.log("[category saved successfuly]");
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
                           
                            console.log("[Category already exist]");
                        callback({
                            "response_code": 5000,
                            "response_message":"Category already exist",
                            "response_data":res

                        })

                    }
              } ) 
    }
    s.statics.updateCategory = function (cat, callback) {     
         
         this.getCatByName(cat, function (res) {
             
                        if (res === null) {                     
                        // new CategoryModel(cat).save(function (err, response_data) {
                        //     if (!err) {
                        //         console.log("[category saved successfuly]");
                        //         callback({ "response_code": 2000, response_data });
                        //     } else {
                        //         console.log(err);
                        //         callback({
                        //             "response_code": 5005,
                        //             "response_message": "INTERNAL DB ERROR",
                        //             "response_data": {}
                        //         })
                        //     }
                        // })
                     

                    CategoryModel.update({
                        _id: cat.cat_id
                    },
                    {
                        $set:
                        {
                            cat_name:cat.cat_name,
                            type:cat.type
                        }
                    } , function(err , data){
                        if(err){
                            callback({
                                "response_code": 5005,
                                "response_message": "INTERNAL DB ERROR",
                                "response_data": {}
                            })
                        }
                        if (data.n === 1 && data.nModified === 1) {
                            CategoryModel.findOne({
                                _id: cat.cat_id
                            } , function(err , res){
                                if(err){
                                    callback({
                                        "response_code": 5005,
                                        "response_message": "INTERNAL DB ERROR.",
                                        "response_data":{} 
                                    })
                                }
                                else{
                                    callback({
                                        "response_code": 2000,
                                        "response_message": "Category Data.",
                                        "response_data": res
                                    })
                                }
                            })
                        }
                        
                    })



                    }else{
                           
                            console.log("[Category already exist]");
                        callback({
                            "response_code": 5000,
                            "response_message":"Category already exist",
                            "response_data":res

                        })

                    }
              } ) 
    }
    s.statics.getCatByName = function (cat, callback) {

        var prams={};
        if(cat.cat_name!=null)
        {
            prams.cat_name=cat.cat_name;
        }
        if(cat.type!=null)
        {
            prams.type=cat.type;
        }

        CategoryModel.findOne(prams,
            function (err, res) {
                if (err)
                    console.log(err);
                if (!err)
                    callback(res);
            })

    }
 
    s.statics.getAllCategories = function (email, callback) {
        CategoryModel.find({},
            function (err, res) {
                if (err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err)
                {
                   // callback(res);
                   callback({ "response_code": 2000, "categoryRes": res });
                }
               
            })

    }
    s.statics.getCategoriesByType = function (cat, callback) {
        CategoryModel.find({
            type:cat.type,
            isDeleted:false
        },
            function (err, res) {
                if (err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err)
                {
                   // callback(res);
                   callback({ "response_code": 2000, "categoryRes": res });
                }
               
            })

    }




    return s;

}());

module.exports = CategoryModel;