'use strict';
var express = require("express");
var apiService = require('../services/apiService');
var bodyParser = require('body-parser');
var config = require('../config');

var secretKey = config.secretKey;

module.exports = function(app, express) {

    var api = express.Router();
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({
        extended: false
    }));

    api.post('/signupUser', function(req, res) {
        apiService.signupUser(req.body, req.files, function(response) {
            res.send(response);
        });
    });
    api.post('/login', function(req, res) {
        apiService.login(req.body, function(loginRes) {
            res.send(loginRes);
        })
    });
    api.post('/logout', function(req, res) {
        apiService.logout(req.body, function(loginRes) {
            res.send(loginRes);
        })
    });
    api.post('/socialSignup', function(req, res) {
        apiService.socialSignup(req.body, function(response) {
            res.send(response);
        });
    });

    api.post('/updateProfile', function(req, res) {
        apiService.updateProfileData(req.body, req.files, function(profileDataRes) {
            res.send(profileDataRes);
        });
    });
    api.post('/changePassword', function(req, res) {
        apiService.changePassword(req.body, function(passwordRes) {
            res.send(passwordRes);
        })
    });
    api.post('/forgotPassword', function(req, res) {
        apiService.forgotPassword(req.body, function(passwordRes) {
            res.send(passwordRes);
        })
    });
    api.post('/changeDeviceToken', function(req, res) {
        apiService.updateDeviceToken(req.body, function(passwordRes) {
            res.send(passwordRes);
        })
    });
    api.post('/viewUserProfile', function(req, res) {
        apiService.viewUserProfile(req.body, function(userData) {
            res.send(userData);
        })
    });
    api.post('/getCategories', function(req, res) {
        apiService.categoryList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/subcategories', function(req, res) {
        apiService.subcategoryList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/getKaraokeWithLyrics', function(req, res) {
        apiService.getKaraokeWithLyrics(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/postSongsnDances', function(req, res) {
        apiService.postSongsAndDances(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/myPost', function(req, res) {
        apiService.getUserPost(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/setFollowers', function(req, res) {
        apiService.setFollowers(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/unFollowUser', function(req, res) {
        apiService.unFollowUser(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/getFollowing', function(req, res) {
        apiService.getFollowing(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/getFollowers', function(req, res) {
        apiService.getFollowers(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/globalSearch', function(req, res) {
        apiService.globalSearch(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/followingFeed', function(req, res) {
        apiService.followingFeed(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/likePost', function(req, res) {
        apiService.likePost(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/commentPost', function(req, res) {
        apiService.commentPost(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/sharePost', function(req, res) {
        apiService.sharePost(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/newFeed', function(req, res) {
        apiService.newFeed(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/commentList', function(req, res) {
        apiService.commentList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/likeList', function(req, res) {
        apiService.likeList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/deletePost', function(req, res) {
        apiService.deletePost(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/trendingFeed', function(req, res) {
        apiService.trendingFeed(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/discover', function(req, res) {
        apiService.discover(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/myShare', function(req, res) {
        apiService.myShare(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/myLiked', function(req, res) {
        apiService.myLiked(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/challengePost', function(req, res) {
        apiService.challengePost(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/challengeList', function(req, res) {
        apiService.challengeList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/acceptChallenge', function(req, res) {
        apiService.acceptChallenge(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/acceptedChallengeList', function(req, res) {
        apiService.acceptedChallengeList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/playCountUpdate', function(req, res) {
        apiService.playCountUpdate(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/requestSong', function(req, res) {
        apiService.requestSong(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/blockUser', function(req, res) {
        apiService.blockUser(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/reportUser', function(req, res) {
        apiService.reportUser(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/blockedUserList', function(req, res) {
        apiService.blockedUserList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/unBlockUser', function(req, res) {
        apiService.unBlockUser(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/paypalUpdate', function(req, res) {
        apiService.paypalUpdate(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/contactUs', function(req, res) {
        apiService.contactUs(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/transactionHistory', function(req, res) {
        apiService.transactionHistory(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/insertNotification', function(req, res) {
        apiService.insertNotification(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/notificationList', function(req, res) {
        apiService.notificationList(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/notificationCount', function(req, res) {
        apiService.notificationCount(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/singleFeed', function(req, res) {
        apiService.singleFeed(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/getClientToken', function(req, res) {
        apiService.getClientToken(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/savePaymentMethod', function(req, res) {
        apiService.savePaymentMethod(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/getCustomerData', function(req, res) {
        apiService.getCustomerData(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/setDefaultPaymentMethod', function(req, res) {
        apiService.setDefaultPaymentMethod(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/deletePaymentMethod', function(req, res) {
        apiService.deletePaymentMethod(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/paymentCheckout', function(req, res) {
        apiService.paymentCheckout(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/refundAmmount', function(req, res) {
        apiService.refundAmount(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/challengePostBraintree', function(req, res) {
        apiService.challengePostBraintree(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.post('/acceptChallengeBraintree', function(req, res) {
        apiService.acceptChallengeBraintree(req.body, function(resData) {
            res.send(resData);
        })
    });
    api.get('/testPush', function(req, res) {
        apiService.testPush(req.params, function(resData) {
            res.send(resData);
        })

    });
    api.post('/unFollowingList', function(req, res) {
        apiService.unFollowingList(req.body, function(resData) {
            res.send(resData);
        })
    });
    return api;
}