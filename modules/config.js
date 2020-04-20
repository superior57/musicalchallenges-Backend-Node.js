module.exports = function(profile) {
	var profileContainer = {
		"local" : {
			FCM_SERVER_KEY:'AAAAzimeMv0:APA91bEosTXEADKQzDDU11_YJXrgmR8obZdY3_T-mW4sfN623OKAbpGI5LD1QnRV2c8_0bSJYFnQrT5p1Dnl_H0h8BUzxLosV7WFtU-9nxOkN_Xoc9_mFjaPK0vJ3Q-vfvdEa6Zm1-tX',
			
			//GOOGLFCM_SERVER_KEYE_API_KEY:'AIzaSyAF6Rz5ON7_5FysLYQIlFWfANmMpfOOsd0',

			DEVELOPMENT_APN_CERTI:"/certificate/Musicalchallenges_apns_dev_cert_WithoutPassPhrase.pem",
			
			DEVELOPMENT_APN_WITHOUT_PASS_PHRASE_KEY:"/certificate/Musicalchallenges_apns_dev_key_WithoutPassPhrase.pem",
			PRODUCTION_APN_CERTI:"/certificate/Musicalchallenges_apns_pro_cert_WithoutPassPhrase.pem",
			
			PRODUCTION_APN_WITHOUT_PASS_PHRASE_KEY:"/certificate/Musicalchallenges_apns_pro_key_WithoutPassPhrase.pem",
			
                }
		
	}
    // var nodemailer = require('nodemailer');

    //return function(profile) { console.log(profileContainer[profile]); return profileContainer[profile];};
    return profileContainer[profile];

}

