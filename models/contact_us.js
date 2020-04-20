var mongoose = require("mongoose");
var mongoPaginate = require("mongoose-pagination");
// Export your module
var ContactModel = mongoose.model("Contact", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true            
        },
        message: {
            type: String,                         
        },
        user_id: {
            type: String,
            required: true            
        },
        user_name: {
            type: String,
            required: true
        },              
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, {
            timestamps: true
        });    
s.statics.insertRequest = function (reqData, callback) {
    //console.log(musicData);
    // this.getMusicByName({sname:musicData.songs_name,artist:musicData.artist_name,type:musicData.cat_type}, function (res) {
    //         if (res === null) {                     
                        new ContactModel(reqData).save(function (err, response_data) {
                            if (!err) {
                                console.log("[Song request saved successfuly]");
                                callback({
                                 "response_code": 2000,
                                 "response_message": "Message sent successfuly",
                                 "response_data": {}
                                   });
                            } else {
                                console.log(err);
                                callback({
                                    "response_code": 5005,
                                    "response_message": "INTERNAL DB ERROR",
                                    "response_data": {}
                                })
                            }
                        })
                    // }else{
                           
                    //     //console.log("[Music already exist]");
                    //     callback({
                    //         "response_code": 5000,
                    //         "response_message":"Music already exist",
                    //         "response_data":res

                    //     })

                    // }
            //  }) 
}
 


    return s;

}());

module.exports = ContactModel;