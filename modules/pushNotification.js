var apn = require('apn');
var FCM = require('fcm-push');
var path = require('path');
var config = require('./config')('local');
//=====================APN=================================

var iosPushConn = new apn.Provider({
   // cert: __dirname + config.DEVELOPMENT_APN_CERTI,
   // key: __dirname + config.DEVELOPMENT_APN_WITHOUT_PASS_PHRASE_KEY,
     cert: __dirname + config.PRODUCTION_APN_CERTI,
     key: __dirname + config.PRODUCTION_APN_WITHOUT_PASS_PHRASE_KEY,
    production: true

});

//====================APN=================================
//====================FCM SETUP FOR PUSH NOTIFICATION=================
var serverKey = config.FCM_SERVER_KEY;
var fcm = new FCM(serverKey);
//====================FCM SETUP FOR PUSH NOTIFICATION=================

var pushNotificationService = {
   /* iosPushTraveller: function(iosTravellerData, callback) {
        var note = new apn.Notification();
        note.alert = iosTravellerData.alert;
        note.payload = iosTravellerData;
        traveller.send(note, iosTravellerData.deviceId).then(result => {
             console.log("sent:", result.sent.length);
             console.log("failed:", result.failed.length);
             console.log(result.failed);
            callback({
                result: result
            })
        });
    },*/
    iosPush: function(iosSenderData, callback) {
        var senderNote = new apn.Notification();
        senderNote.alert = iosSenderData.alert;
        senderNote.badge =iosSenderData.badgeCount;
        senderNote.sound = "default";
        senderNote.payload = { 'rawdata': iosSenderData };
        senderNote.topic = "com.musical-challenges.MusicalChallenges";
        iosPushConn.send(senderNote, iosSenderData.deviceId).then(result => {
             console.log("sent:", result.sent.length);
          //   console.log("failed:", result.failed.length);
             console.log("result",result)
          //  console.log("result",result.failed[0].error);
          //   console.log("result",result.failed[0].response);
             callback({
                result: result
            })
        });
    },
    androidPush: function(androidData, callback) {
        var message = {
            to: androidData.deviceId, // required fill with device token or topics
            collapse_key: 'demo', 
            data:{
                    // "title": androidData.title,
                    // "body": androidData.message,
                    'rawdata': androidData
                }           
            // notification: {
            //         title: androidData.title,
            //         body: androidData.message
            // }
            
        };
        console.log(message);
        fcm.send(message)
            .then(function(response) {
                console.log("Successfully sent with response: ", response);
                 callback({
                    success:true,
                    result: response
                })
            })
            .catch(function(err) {
                console.log("Something has gone wrong!");
                console.error(err);
                   callback({
                    success:false,
                    result: err
                })
            })
    },
    /*androidPushSender: function(androidData, callback) {
        var message = {
            to: androidData.deviceId,
            collapse_key: 'demo',
            data: {
                "rawData": androidData,
                "title": androidData.alert
            }
        };
        fcm.send(message)
            .then(function(response) {
                console.log("Successfully sent with response: ", response);
                callback({
                    success:true,
                    result: response
                })
            })
            .catch(function(err) {
                console.log("Something has gone wrong!");
                console.error(err);
                callback({
                    success:false,
                    result: err
                })
            })
    },
    androidPushTravellerBackground: function(androidData, callback) {
        var message = {
            to: androidData.deviceId, // required fill with device token or topics
            collapse_key: 'demo', 
            notification: {
                "rawData": androidData,
                "title": androidData.alert 
            }
            
        };
        console.log(message);
        fcm.send(message)
            .then(function(response) {
                console.log("Successfully sent with response: ", response);
                 callback({
                    success:true,
                    result: response
                })
            })
            .catch(function(err) {
                console.log("Something has gone wrong!");
                console.error(err);
                   callback({
                    success:false,
                    result: err
                })
            })
    },
    androidPushSenderBackground: function(androidData, callback) {
        var message = {
            to: androidData.deviceId,
            collapse_key: 'demo',
            notification: {
                "rawData": androidData,
                "title": androidData.alert
            }
        };
        fcm.send(message)
            .then(function(response) {
                console.log("Successfully sent with response: ", response);
                callback({
                    success:true,
                    result: response
                })
            })
            .catch(function(err) {
                console.log("Something has gone wrong!");
                console.error(err);
                callback({
                    success:false,
                    result: err
                })
            })
    }

*/
};


module.exports = pushNotificationService;