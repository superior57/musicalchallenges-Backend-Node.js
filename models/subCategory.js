var mongoose = require("mongoose");
// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
// Export your module
var SubCategoryModel = mongoose.model("SubCategory", function() {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        p_id: {
            type: String,
            default: false
        },
        pcat_name: {
            type: String,
            default: ""
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

    s.statics.insertCategory = function(cat, callback) {
        this.getCatByName(cat, function(res) {
            if (res === null) {
                new SubCategoryModel(cat).save(function(err, response_data) {
                    if (!err) {
                        console.log("[category saved successfully]");
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
            } else {
                console.log("[Category already exist]");
                callback({
                    "response_code": 5000,
                    "response_message": "Category already exist",
                    "response_data": res
                })
            }
        })
    }
    s.statics.updateCategory = function(cat, callback) {
        this.getCatByName(cat, function(res) {

            if (res === null) {
                SubCategoryModel.update({
                    _id: cat.cat_id
                }, {
                    $set: {
                        cat_name: cat.cat_name,
                        p_id: cat.p_id,
                        type: cat.type
                    }
                }, function(err, data) {
                    if (err) {
                        callback({
                            "response_code": 5005,
                            "response_message": "INTERNAL DB ERROR",
                            "response_data": {}
                        })
                    }
                    if (data.n === 1 && data.nModified === 1) {
                        SubCategoryModel.findOne({
                            _id: cat.cat_id
                        }, function(err, res) {
                            if (err) {
                                callback({
                                    "response_code": 5005,
                                    "response_message": "INTERNAL DB ERROR.",
                                    "response_data": {}
                                })
                            } else {
                                callback({
                                    "response_code": 2000,
                                    "response_message": "Category Data.",
                                    "response_data": res
                                })
                            }
                        })
                    }

                })
            } else {

                console.log("[Category already exist]");
                callback({
                    "response_code": 5000,
                    "response_message": "Category already exist",
                    "response_data": res
                })
            }
        })
    }
    s.statics.getCatByName = function(cat, callback) {

        var prams = {};
        if (cat.cat_name != null) {
            prams.cat_name = cat.cat_name;
        }
        if (cat.type != null) {
            prams.type = cat.type;
        }
        if (cat.p_id != null) {
            prams.p_id = cat.p_id;
        }

        SubCategoryModel.findOne(prams,
            function(err, res) {
                if (err)
                    console.log(err);
                if (!err)
                    callback(res);
            })
    }
    s.statics.getAllCategories = function(email, callback) {
        SubCategoryModel.find({},
            function(err, res) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    // callback(res);
                    callback({ "response_code": 2000, "categoryRes": res });
                }

            })
    }
    s.statics.getCategoriesByPid = function(catReq, callback) {
        SubCategoryModel.find({
                p_id: catReq.pcat_id
            },
            function(err, res) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    // callback(res);
                    callback({ "response_code": 2000, "categoryRes": res });
                }

            })
    }
    s.statics.getCategoriesByType = function(cat, callback) {
        // console.log(cat);
        SubCategoryModel.aggregate([{
                    $match: {
                        type: cat.type,
                        p_id: cat.p_id,
                        isDeleted: false
                    }
                },
                {
                    $project: {
                        _id: 1,
                        type: 1,
                        cat_name: 1,
                        p_id: 1,
                        pcat_name: "",
                        isDeleted: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ],
            function(err, res) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    // callback(res);
                    callback({ "response_code": 2000, "categoryRes": res });
                }

            })
    }
    s.statics.getCatNameById = function(cat, callback) {
        SubCategoryModel.findOne({ _id: cat.catId, isDeleted: false },
            function(err, res) {
                if (err) {
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
                if (!err) {
                    // console.log(res[0]);
                    callback({ "response_code": 2000, res });
                }

            });
    }
    return s;

}());

module.exports = SubCategoryModel;