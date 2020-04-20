var mongoose = require("mongoose");
var mongoPaginate = require("mongoose-pagination");
// Export your module
var SongsRequestModel = mongoose.model("SongsRequest", function () {

    var s = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },     
        songs_name: {
            type: String,
            required: true
        },
        artist_name: {
            type: String,
            required: true            
        },
        genre: {
            type: String,                         
        },
        user_id: {
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
s.statics.insertRequest = function (musicData, callback) {
    //console.log(musicData);
    // this.getMusicByName({sname:musicData.songs_name,artist:musicData.artist_name,type:musicData.cat_type}, function (res) {
    //         if (res === null) {                     
                        new SongsRequestModel(musicData).save(function (err, response_data) {
                            if (!err) {
                                console.log("[Song request saved successfuly]");
                                callback({
                                 "response_code": 2000,
                                 "response_message": "Song request sent successfuly",
                                 "response_data": response_data
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
s.statics.getMusicByName = function (req, callback) {
        SongsRequestModel.findOne({
            songs_name: req.sname,
            artist_name:req.artist,
            cat_type: req.type
        },
            function (err, res) {
                if (err)
                    console.log(err);
                if (!err)
                    callback(res);
            })
} 
s.statics.getAllMusicRequest = function (req, callback) {
        console.log(req);
        var prams={}
        if(req.cat_id)
        {
            prams.cat_id= req.cat_id
          
        }
         console.log(prams);
        SongsRequestModel.find(prams, function (err, res) {
                if (err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": {}
                    })
                }
               
               
            }).paginate(req.page_count, 10, function(err, res, total) {
                 console.log('error: ',err)
                console.log('total: ', total, 'docs: ', res)
                if (err){
                    callback({
                        "response_code": 5005,
                        "response_message": "INTERNAL DB ERROR",
                        "response_data": []
                    })
                }
                 if (!err)
                {
                   // console.log(res);
                    if(res.length===0)
                    {
                       callback({
                                "response_code":5002,
                                "response_message":"No Karaoke found",
                                "response_data": []
                            }) 
                    }
                   else 
                   {
                    callback({                          
                        "response_code": 2000,                        
                        "message": "Success",
                        "total_records":total,
                        "response_data": res
                    });
                    }
                } 



              });
}

s.statics.searchMusic = function (searchData, callback) {
        var ab =".*" + searchData.search_keyword +".*";
                var searchTxt = [];
                var andText = [];
                if(searchData.type=="SONG")
                {
                    searchTxt = [
                                 {songs_name: {'$regex':ab , $options: 'i'}}
                                ];
                    andText = [
                               {cat_type: 'Sing'}
                              ];
                }else if(searchData.type=="DANCE")
                {
                    searchTxt = [
                                 {songs_name: {'$regex':ab , $options: 'i'}}
                                ];
                    andText = [
                                {cat_type: 'Dance'}
                              ];
                }else if(searchData.type=="ARTIST")
                {
                    searchTxt = [
                                 {artist_name: {'$regex':ab , $options: 'i'}}
                                ];
                    andText = [
                                {cat_type: 'Sing'},
                                {cat_type: 'Dance'}
                            ];
                }else{
                    searchTxt = [
                                 {songs_name: {'$regex':ab , $options: 'i'}},
                                 {artist_name: {'$regex':ab , $options: 'i'}},
                                ];
                    andText = [
                                {cat_type: 'Sing'},
                                {cat_type: 'Dance'}
                            ];
                }

        SongsRequestModel.find({
                $and : [
                    { $or:searchTxt
                    },
                    { $or:andText
                    }
                    
                ]
            }, function (err, u) {
            if (err) {
                callback({
                    "response_code": 5005,
                    "response_message": "INTERNAL DB ERROR",
                    "response_data": []
                })
            }
             
        }).paginate(searchData.page_count, 10, function(err, res, total) {
               // console.log('total: ', total, 'docs: ', res)
                 if (res)
                {
                   // console.log(res);
                   if(res.length===0)
                        {
                           callback({
                                    "response_code":5002,
                                    "response_message":"No result found",
                                    "response_data": []
                            }) 
                        }
                       else 
                       {
                            callback({ 
                                "response_code": 2000,
                                "total_records":total,
                                "response_message":"Result found",
                                "response_data": res 
                                });
                        }
                } 
            });
}


    return s;

}());

module.exports = SongsRequestModel;