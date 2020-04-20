var nodemailer = require('nodemailer');
var config = require('../config');
//var pdf = require('html-pdf');
//var adminLoginNotification = require('./userLoginHtml');

module.exports = function(mailType) {

    var from  = config.local.MAIL_USERNAME; // set default mail here

    // define mail types
    var mailDict = {
        // "userSignupSuccess" : {
        //     subject : "Admin Sign In",
        //     text    : "lorem ipsum",
        //     html    : "lorem ipsum",
        // },
        //  "passengerMail" :{
        //     subject : "Welcome to Easy ride",
        //     html    : require('./welcomePassenger'),

        // },
        "userSignupSuccess" : {
            subject : "Admin Sign In",           
            html    : require('./userSignUpSuccess'),
        },
         "forgotPasswordMail" :{
            subject : "Reset Password",
            html    : require('./forgotPasswordMail'),

        }
        // ,
        // "sendInvoice" :{
        //     subject : "Invoice of your trip",
        //     html    : require('./invoiceMail'),

        // }
        // define one mail for each type of case here
    }
// create reusable transporter object using the default SMTP transport to send mail from this account
     var secretPass = config.local.MAIL_PASS;
    var transporter = nodemailer.createTransport(require('nodemailer-smtp-transport')({
        host    : "smtp.gmail.com",
        port    : 465,
        secure  : true,
        debug   : true,
        auth    : {
            user    : config.local.MAIL_USERNAME,
            pass    : new Buffer(secretPass,'base64').toString('ascii'),
            //xoauth2 : "U01UQ0tHczZuaVZGWUJnQ3BpbU5CQTVDWWwzYU1oNnJoNU9iMDFSVk5LMSszSURRY3pkTVVuOXo5WlJXMWpOc1o3YkhOc0kvMnBrPQ=="
        },    
        maxMessages : 100,
        requireTLS : true,
    }));
    return function(to, data, sendPdf, pdfTemplate) {  // pass mailbody only when sendPdf is true
        var self =  {
            send : function() {
                console.log(from);
                var mailOptions = mailDict[mailType];
                mailOptions.from = from;
                mailOptions.to   = to; // to;
                mailOptions.html = self.handleVars(mailOptions.html, data);
                if(sendPdf) {
                    pdf.create( self.handleVars(pdfTemplate, data)).toBuffer(function(err, b) {
                        // template becomes pdf so pass mailbody
                        mailOptions.attachments = [{
                                filename : 'Monthly Statement.pdf',
                                contentType : 'application/pdf',
                                content  : b
                            }];
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log('Error sending mail');
                                console.log(error);
                                return ;
                            }
                            
                            console.log('Message sent with pdf: ' + info.response);
                        });
                    })
                } else {
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log('Error sending mail');
                            console.log(error);
                            return ;
                        }
                        console.log('Message sent: ' + info.response);
                    });
                }
            },
            transporter : transporter,
            getMappedValue : function(s, o) { // cannot handle arrays
                var l = s.split(".");
                var r = o;
                if(l.length > 0) {
                    l.forEach(function(v, i) {
                        if(v && r[v] !== undefined) {
                            r = r[v];
                        }
                    })
                    return r;
                }
                return undefined;
            },
            handleVars : function(html, o) {
                (html.match(/\{\{\s+([^}]*)\s+\}\}/g) || []).forEach(function(w, i) {
                    var s = w.replace(/^\{\{\s+/, "").replace(/\s+\}\}$/, "");
                    var v = self.getMappedValue(s, o);

                    // handle special cases that need processing
                    // date
                    if(s === 'publishedDate' && v != undefined) {
                        // locale format date
                        v = new Date(v).toString();
                    }
                    if(s==='@validUpto' && v ===null){
                        v = 'NA';
                    }
                    if(s==='@userTotalSpace' && v===null){
                        v=0;
                    }
                    if(s==='@userFreeSpace' && v===null){
                        v=0;
                    }
                    if(s==='@currentPlan' && v===null){
                        v='Freedom';
                    }
                    if(s==='@userJunkSpace' && v===null){
                        v=0;
                    }
                    // replace
                    if(v !== undefined) {
                        html = html.replace(w, String(v));
                    }
                })
                return html;
            },
        };
        return self;
    }
}
// usage
// require("./modules/sendmail")('userSignupSuccess')("to@to.to", data).send();
