var express = require("express");
var Admin = require('../models/admin');
var adminService = require('../services/adminService');

var config = require('../config');

var secretKey = config.secretKey;

module.exports = function(app, express) {

    var admin = express.Router();

    admin.post('/adminSignup', function(req, res) {
        var adminData = req.body;
        console.log(adminData);
        adminService.adminSignup(req.body, function(response) {
            res.send(response);
        });
    });
    admin.post('/adminLogin', function(req, res) {
        adminService.adminLogin(req.body, function(loginRes) {
            res.send(loginRes);
        })
    });
    admin.get('/userList', function(req, res) {
        // console.log(req.query)
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.userList(req.query, function(loginRes) {
                    // console.log(loginRes);
                    res.send(loginRes);
                })
            } else {
                res.send(authRes);
            }
        })
    });
    admin.post('/addUser', function(req, res) {
        // console.log(req);
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.registerUser(req.body, function(response) {
                    res.send(response);
                });

            } else {
                res.send(authRes);
            }
        });
    });
    admin.post('/updateUserData', function(req, res) {
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.updateUserProfile(req.body, function(response) {
                    res.send(response);
                });
            } else {
                res.send(authRes);
            }
        });
    });
    admin.post('/deleteUserData', function(req, res) {
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.deleteUserData(req.body, function(response) {
                    res.send(response);
                });
            } else {
                res.send(authRes);
            }
        });
    });
    admin.post('/addCategory', function(req, res) {
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.addCategory(req.body, function(response) {
                    res.send(response);
                });

            } else {
                res.send(authRes);
            }
        });
    });
    admin.post('/addSubCategory', function(req, res) {
        adminService.addSubCategory(req.body, function(response) {
            res.send(response);
        });
    });
    admin.post('/updateCategory', function(req, res) {
        //  console.log(req.body);
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.updateCategory(req.body, function(response) {
                    res.send(response);
                });
            } else {
                res.send(authRes);
            }
        });
    });
    admin.post('/updateSubCategory', function(req, res) {
        //  console.log(req.body);
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.updateSubCategory(req.body, function(response) {
                    res.send(response);
                });
            } else {
                res.send(authRes);
            }
        });
    });
    admin.get('/categorylist', function(req, res) {
        // console.log(req.body);
        // var token = req.headers['x-access-token'];
        //  adminService.jwtAuthVerification(token,function(authRes){
        //      if(authRes.response_code===2000)
        //      {
        adminService.categoryList(req.body, function(response) {
            res.send(response);
        });
        //       }else{
        //         res.send(authRes);
        //       }
        // });
    });

    admin.post('/deleteCategory', function(req, res) {
        adminService.deleteCategory(req.body, function(response) {
            res.send(response);
        });
    });
    admin.post('/categoryListByType', function(req, res) {

        // console.log(req.body);
        // var token = req.headers['x-access-token'];
        //  adminService.jwtAuthVerification(token,function(authRes){
        //      if(authRes.response_code===2000)
        //      {
        adminService.categoryListByType(req.body, function(response) {
            res.send(response);
        });
        //       }else{
        //         res.send(authRes);
        //       }
        // });
    });
    admin.post('/subCategorylist', function(req, res) {
        console.log(req.body);
        // var token = req.headers['x-access-token'];
        //  adminService.jwtAuthVerification(token,function(authRes){
        //      if(authRes.response_code===2000)
        //      {
        adminService.subCategoryList(req.body, function(response) {
            res.send(response);
        });
        //       }else{
        //         res.send(authRes);
        //       }
        // });
    });

    admin.post('/deleteSubCategory', function(req, res) {
        adminService.deleteSubCategory(req.body, function(response) {
            res.send(response);
        });
    });

    admin.post('/addMusic', function(req, res) {
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            if (authRes.response_code === 2000) {
                adminService.addMusic(req.body, req.files, function(response) {
                    res.send(response);
                });

            } else {
                res.send(authRes);
            }
        });
    });

    admin.post('/deleteMusic', function(req, res) {
        adminService.deleteMusic(req.body, function(response) {
            res.send(response);
        });
    });

    admin.get('/musicList', function(req, res) {
        // console.log(req.query);
        var token = req.headers['x-access-token'];
        adminService.jwtAuthVerification(token, function(authRes) {
            // console.log(authRes)
            if (authRes.response_code === 2000) {
                adminService.allMusicWithLyricsList(req.query, function(response) {
                    res.send(response);
                });
            } else {
                res.send(authRes);
            }
        });
    });
    admin.post('/updateMusic', function(req, res) {
        adminService.updateMusic(req.body, req.files, function(response) {
            res.send(response);
        });
    });
    admin.post('/addCMS', function(req, res, next) {
        adminService.addCMS(req.body, function(response) {
            res.send(response);
        })
    });
    admin.post('/updateCmsData', function(req, res, next) {
        adminService.updateCmsData(req.body, function(response) {
            res.send(response);
        })
    });
    admin.get('/listCms', function(req, res, next) {
        adminService.getAllCms(req.body, function(response) {
            res.send(response);
        })
    });
    admin.get('/getCMSPage/:keyword', function(req, res, next) {
        //console.log(req);
        adminService.getCMSPage(req.params, function(response) {
            res.send(response);
        })

    });
    admin.post('/deleteCms', function(req, res) {
        adminService.deleteCms(req.body, function(response) {
            res.send(response);
        });
    });


    return admin;
}