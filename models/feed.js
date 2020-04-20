var mongoose = require("mongoose");
var mongo = require('mongodb');
var mongoPaginate = require("mongoose-pagination");
var async = require("async");
var ObjectID = mongo.ObjectID;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var FollowersModel = require('../models/followers');
var LikeModel = require('../models/like');
var CommentModel = require('../models/comment');

// Export your module
var FeedModel = mongoose.model("SongsFeed", function () {

  var s = new mongoose.Schema({
    _id: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    share_description: {
      type: String,
      default: ''
    },
    location_name: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    loc: [{ lat: Number, long: Number }],
    singing_mode: {
      type: String,
      enum: ['Freestyle', 'WithOutLyrics', 'WithSongs'],
      default: 'Freestyle'
    },
    media_type: {
      type: String,
      enum: ['AUDIO', 'VIDEO'],
      default: 'AUDIO'
    },
    songs_name: {
      type: String,
      required: true
    },
    artist_name: {
      type: String,
      required: true
    },
    effects: {
      type: String,
      default: ''
    },
    user_id: {
      type: String,
      required: true
    },
    cat_type: {
      type: String,
      enum: ['Sing', 'Dance'],
      default: 'Sing'
    },
    cat_id: {
      type: String,
      required: true
    },

    subcat_name: {
      type:String,
      required: false,
      default: ""
    },

    karaoke_id: {
      type: String
    },
    image_url: {
      type: String,
      default: ''
    },
    file_url: {
      type: String,
      required: true
    },
    track_length: {
      type: String,
      required: true
    },
    is_shared: {
      type: Boolean,
      default: false
    },
    posted_userId: {
      type: String,
      default: ''
    },
    shared_postId: {
      type: String,
      default: ''
    },
    is_shared: {
      type: Boolean,
      default: false
    },
    is_challenged: {
      type: Boolean,
      default: false
    },
    p_challenge_id: {
      type: String,
      default: ''
    },
    challenge_status: {
      type: String,
      enum: ['ACTIVE', 'EXTENDED', 'EXPIRED', ''],
      default: ''
    },
    challenge_exp_date: {
      type: Date,
      default: ''
    },
    winner_status: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Draft'
    },
    view_count: {
      type: Number,
      default: 0
    },

  }, {
      timestamps: true
    });
  s.plugin(mongooseAggregatePaginate);
  s.statics.insertSong = function (songsData, callback) {
    console.log(songsData);
    // this.getMusicByName({sname:songsData.songs_name,artist:songsData.artist_name}, function (res) {

    //                if (res === null) {                     
    new FeedModel({
      _id: songsData._id,
      media_type: songsData.media_type,
      description: songsData.description,
      location_name: songsData.location_name,
      state: songsData.state,
      loc: [{ long: songsData.long, lat: songsData.lat }],
      singing_mode: songsData.singing_mode,
      songs_name: songsData.songs_name,
      artist_name: songsData.artist_name,
      effects: songsData.effects,
      user_id: songsData.user_id,
      cat_type: songsData.cat_type,
      cat_id: songsData.cat_id,
      karaoke_id: songsData.karaoke_id,
      image_url: songsData.image_url,
      file_url: songsData.file_url,
      track_length: songsData.track_length,
      status: songsData.status,
      subcat_name: songsData.subcat_name
    }).save(function (err, response_data) {
      if (!err) {
        var msg = '';
        if (response_data.status === "Draft") msg = "saved successfully";
        else msg = "posted successfully";
        console.log("[Songs posted successfully]");
        callback({
          "response_code": 2000,
          "response_message": response_data.cat_type == "Sing" ? "Song " + msg : response_data.cat_type + " " + msg + "test +++ " + songsData.subcat_name,
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
  }
  s.statics.updatePostStatus = function (postData, callback) {
    FeedModel.update({
      _id: postData._id
    }, {
        $set: {
          status: postData.status
        }
      }).exec(function (err, u) {
        if (err) {
          callback({
            "response_code": 5005,
            "response_message": "INTERNAL DB ERROR",
            "response_data": {}
          })
        }
        if (!err) {
          if (u.n === 1 && u.nModified === 1) {
            FeedModel.getPostDetails(postData._id, function (songsRes) {
              if (songsRes) {
                callback({
                  "response_code": 2000,
                  "response_message": songsRes.cat_type == "Sing" ? "Song posted successfully" : songsRes.cat_type + " posted successfully",
                  "response_data": songsRes
                })
              }
            })
          } else {
            callback({
              "response_code": 5005,
              "response_message": "INTERNAL DB ERROR(update failed)",
              "response_data": {}
            })

          }


        }
      })
  }
  s.statics.updateChallengeWinStatus = function (postData, callback) {
    FeedModel.update({
      _id: postData._id
    }, {
        $set: {
          winner_status: postData.winner_status
        }
      }).exec(function (err, u) {
        if (err) {
          callback({
            "response_code": 5005,
            "response_message": "INTERNAL DB ERROR",
            "response_data": {}
          })
        }
        if (!err) {
          if (u.n === 1 && u.nModified === 1) {
            callback({
              "response_code": 2000,
              "response_message": "Win status updated successfully",
              "response_data": u
            })
          } else {
            callback({
              "response_code": 5005,
              "response_message": "INTERNAL DB ERROR(Win update failed)",
              "response_data": {}
            })
          }
        }
      })
  }
  s.statics.updateChallengeExpireStatus = function (postData, callback) {
    console.log('tobeexpire', postData);
    FeedModel.update(
      {
        $and: [
          { is_challenged: true },
          {
            $or: [
              { _id: postData.feedId },
              { p_challenge_id: postData.feedId }
            ]
          }
        ]


      },
      {
        $set: {
          challenge_status: "EXPIRED"
        }
      },
      { multi: true }
    ).exec(function (err, u) {
      if (err) {
        callback({
          "response_code": 5005,
          "response_message": "INTERNAL DB ERROR",
          "response_data": {}
        })
      }
      if (!err) {
        if (u.n >= 1 && u.nModified >= 1) {
          callback({
            "response_code": 2000,
            "response_message": "Expire status updated successfully",
            "response_data": u
          })
        } else {
          callback({
            "response_code": 5005,
            "response_message": "INTERNAL DB ERROR( Expire update failed)",
            "response_data": {}
          })
        }
      }
    })
  }
  s.statics.getMusicByName = function (req, callback) {
    FeedModel.findOne({
      songs_name: req.sname,
      artist_name: req.artist
    },
      function (err, res) {
        if (err)
          console.log(err);
        if (!err)
          callback(res);
      })
  }
  s.statics.checkDuplicateChallenge = function (req, callback) {
    FeedModel.findOne({
      p_challenge_id: req.pChallengeId,
      user_id: req.user_id,
      challenge_status: "ACTIVE"
    },
      function (err, res) {
        if (err)
          console.log(err);
        if (!err)
          callback(res);
      })
  }
  s.statics.checkDuplicateParentChallenge = function (req, callback) {
    FeedModel.findOne({
      p_challenge_id: "0",
      user_id: req.user_id,
      is_challenged: true,
      shared_postId: req.postId,
      challenge_status: "ACTIVE"
    },
      function (err, res) {
        if (err)
          console.log(err);
        if (!err)
          callback(res);
      })
  }
  s.statics.getAllPostByUser = function (req, callback) {
    //console.log(req);
    var prams = {}
    if (req.user_id) {
      prams.user_id = req.user_id
    }
    if (req.status == "Published" || req.status == "Draft") {
      prams.status = req.status
      prams.is_challenged = false
      prams.is_shared = false
    }
    if (req.status == 'Challenged') {
      //prams.status=req.status
      prams.is_challenged = true
      // prams.is_shared=false
    }
    // FeedModel.find(prams,
    //     function (err, res) {
    //         if (err){
    //             callback({
    //                 "response_code": 5005,
    //                 "response_message": "INTERNAL DB ERROR",
    //                 "response_data": {}
    //             })
    //         } 
    //       }).sort({ "createdAt": -1,}).paginate(req.page, 10, function(err, res, total) {
    //        // console.log('total: ', total, 'docs: ', res)
    //          if (res)
    //         {
    //             //console.log(res);
    //             if(res.length===0)
    //             {
    //                callback({
    //                         "response_code":5002,
    //                         "response_message":"No post found",
    //                         "response_data": []
    //                     }) 
    //             }
    //            else 
    //            {
    //             callback({ 
    //                 "response_code": 2000,
    //                 "total_records":total,
    //                 "feedRes": res 
    //                 });
    //             }
    //         } 



    //       });
    //console.log(prams);
    var aggregate = FeedModel.aggregate([
      {
        $match: prams

      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },

      {
        $project: {
          is_challenged: {
            $cond: {
              if: { $gt: [{ $size: "$sharepost" }, 0] },
              then: {
                $cond: {
                  if: {
                    $and: [{ $eq: [{ "$arrayElemAt": ["$sharepost.is_challenged", 0] }, true] }, { $eq: [{ "$arrayElemAt": ["$sharepost.challenge_status", 0] }, 'ACTIVE'] }]
                  },
                  then: true,
                  else: '$is_challenged'
                }
              },
              else: '$is_challenged'
            }
          },
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          location_name: 1,
          description: 1,
          share_description: 1,
          cat_id: 1,
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          karaoke_id: 1,
          status: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },

          like_count: { $size: "$likepost" },
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" }


        }
      }
    ])
    //start pagination
    var options = { page: req.page, limit: 10 };
    FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
      if (err) {
        console.log(err)
      }
      else {
        // console.log(results);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_records": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "Feed list.",
            "total_records": count,
            "response_data": results
          })
        }

      }
    }) //End pagination
  }
  s.statics.countPost = function (userId, callback) {
    FeedModel.find({
      user_id: userId,
      status: 'Published',
      is_challenged: false
    }).count().exec(function (err, countPost) {
      if (err) {
        callback({
          "response_code": 5005,
          "response_message": "INTERNAL DB ERROR",
          "response_data": {}
        })
      }
      if (!err) {
        callback({
          "response_code": 2000,
          "response_message": "Post count",
          "response_data": countPost
        })
      }
    });
  }
  s.statics.getParentChallenge = function (req, callback) {
    FeedModel.find({
      p_challenge_id: "0",
      challenge_status: 'ACTIVE',
      challenge_exp_date: { $lt: new Date() }
    }, { createdAt: 1, challenge_exp_date: 1 }).exec(function (err, result) {
      if (err) {
        callback({
          "response_code": 5005,
          "response_message": "INTERNAL DB ERROR",
          "response_data": {}
        })
      }
      if (!err) {
        callback({
          "response_code": 2000,
          "response_message": "Challenge Post",
          "total_records": result.length,
          "response_data": result
        })
      }
    });
  }
  s.statics.countChallengedPost = function (userId, callback) {
    FeedModel.find({
      user_id: userId,
      status: 'Published',
      is_challenged: true
    }).count().exec(function (err, countPost) {
      if (err) {
        callback({
          "response_code": 5005,
          "response_message": "INTERNAL DB ERROR",
          "response_data": {}
        })
      }
      if (!err) {
        callback({
          "response_code": 2000,
          "response_message": "Post count",
          "response_data": countPost
        })
      }
    });
  }
  s.statics.getPostDetails = function (post_id, callback) {
    if (post_id) {
      FeedModel.findOne({
        _id: post_id
      }, function (err, u) {
        if (err) {
          callback({
            "response_code": 5005,
            "response_message": "INTERNAL DB ERROR",
            "response_data": {}
          })
        }
        if (!err) {

          callback(u);
        }
      })
    }
  }
  s.statics.getSinglePost = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match: {
          _id: req.postId,
          status: "Published"

        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userinfo"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "followers",
          localField: "user_id",
          foreignField: "firstuser_id",
          as: "firstfollow"
        }
      },
      {
        $lookup:
        {
          from: "followers",
          localField: "user_id",
          foreignField: "seconduser_id",
          as: "secondfollow"
        }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "posted_userId",
          foreignField: "_id",
          as: "originalPostedUser"
        }
      },
      {
        $project: {
          is_shared: 1,
          ownFollowingFirst: {
            $filter: {
              input: "$firstfollow",
              as: "firstfollowing",
              cond: {
                $and: [
                  { $eq: ["$$firstfollowing.seconduser_id", req.userId] },
                  { $eq: ["$$firstfollowing.fan_second", 1] }
                ]
              }
            }
          },
          ownFollowingSecond: {
            $filter: {
              input: "$secondfollow",
              as: "secondfollowing",
              cond: {
                $and: [
                  { $eq: ["$$secondfollowing.firstuser_id", req.userId] },
                  { $eq: ["$$secondfollowing.fan_first", 1] }
                ]
              }
            }
          },
          is_followed: '',
          is_liked: {
            $cond: {
              if: { $eq: [{ "$arrayElemAt": ["$likepost.user_id", 0] }, req.userId] },
              then: true,
              else: false
            }
          },
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          location_name: 1,
          description: 1,
          share_description: 1,
          cat_id: 1,
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          karaoke_id: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },
          challenge_exp_date: 1,
          is_challenged: 1,
          username1: { "$arrayElemAt": ["$userinfo.username", 0] },
          user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
          username2: { "$arrayElemAt": ["$originalPostedUser.username", 0] },
          deviceTokenIOS: { "$arrayElemAt": ["$userinfo.deviceTokenIOS", 0] },
          deviceTokenAndroid: { "$arrayElemAt": ["$userinfo.deviceTokenAndroid", 0] },
          // user2_profile_pic:{ "$arrayElemAt": ["$originalPostedUser.image_url", 0 ] },
          like_count: { $size: "$likepost" },
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" }


        }
      }
    ]).exec(function (err, results) {
      if (err) {
        console.log(err)
      }
      else {
        // console.log(results.length);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_record": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "Feed Details.",
            "response_data": results[0]
          })
        }
      }
    })
  }
  s.statics.getFollowersPost = function (req, callback) {
    var allUser = [];
    FollowersModel.getFollowingUserList(req, function (userList) {
      // console.log(userList);

      if (userList.response_code === 2000) {
        allUser = userList.response_data;

      } else {
        allUser.push(req.userId);
      }
      var aggregate = FeedModel.aggregate([
        {
          $match: {
            $and: [
              { cat_type: req.type },
              { user_id: { $in: allUser } },
              { status: "Published" }
            ]
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "userinfo"
          }
        },
        {
          $lookup:
          {
            from: "likes",
            localField: "_id",
            foreignField: "feed_id",
            as: "likepost"
          }
        },
        {
          $lookup:
          {
            from: "comments",
            localField: "_id",
            foreignField: "feed_id",
            as: "commentpost"
          }
        },
        {
          $lookup:
          {
            from: "followers",
            localField: "user_id",
            foreignField: "firstuser_id",
            as: "firstfollow"
          }
        },
        {
          $lookup:
          {
            from: "followers",
            localField: "user_id",
            foreignField: "seconduser_id",
            as: "secondfollow"
          }
        },
        {
          $lookup:
          {
            from: "songsfeeds",
            localField: "_id",
            foreignField: "shared_postId",
            as: "sharepost"
          }
        },
        {
          $lookup:
          {
            from: "musics",
            localField: "karaoke_id",
            foreignField: "_id",
            as: "karaokefiles"
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "posted_userId",
            foreignField: "_id",
            as: "originalPostedUser"
          }
        },
        {
          $lookup:
          {
            from: "categories",
            localField: "cat_id",
            foreignField: "_id",
            as: "categoryName"
          }
        },
        {
          $project: {
            is_shared: 1,
            is_followed: {
              $cond: {
                if: { $eq: [{ "$arrayElemAt": ["$userinfo._id", 0] }, '$user_id'] },
                then: true,
                else: false
              }
            },
            is_liked: {
              $cond: {
                if: { $eq: [{ "$arrayElemAt": ["$likepost.user_id", 0] }, req.userId] },
                then: true,
                else: false
              }
            },
            cat_type: 1,
            media_type: 1,
            songs_name: 1,
            singing_mode: 1,
            subcat_name: 1,
            location_name: 1,
            state: { $ifNull: [ "$state", "" ] },
            description: 1,
            share_description: 1,
            cat_id: 1,
            cat_name: {
              $cond: {
                if: { $gt: [{ $size: "$categoryName" }, 0] },
                then: { "$arrayElemAt": ["$categoryName.cat_name", 0] },
                else: ''
              }
            },
            file_url: 1,
            track_length: 1,
            effects: 1,
            image_url: 1,
            user_id: 1,
            posted_userId: 1,
            karaoke_id: 1,
            karaoke_file_url: {
              $cond: {
                if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
                else: ''
              }
            },
            lyrics_url: {
              $cond: {
                if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
                else: ''
              }
            },
            artist_name: {
              $cond: {
                if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
                else: '$artist_name'
              }
            },
            username1: { "$arrayElemAt": ["$userinfo.username", 0] },
            user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
            username2: { "$arrayElemAt": ["$originalPostedUser.username", 0] },
            like_count: { $size: "$likepost" },
            comment_count: { $size: "$commentpost" },
            share_count: { $size: "$sharepost" }


          }
        }
      ])
      //start pagination
      var options = { page: req.page, limit: 10 };
      FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
        if (err) {
          console.log(err)
        }
        else {
          // console.log(results);
          if (results.length == 0) {
            callback({
              "response_code": 5002,
              "total_record": 0,
              "response_message": "No post to show",
              "response_data": []

            })
          }
          else {
            callback({
              "response_code": 2000,
              "response_message": "Feed list.",
              "total_record": count,
              "response_data": results
            })
          }

        }
      }) //End pagination
      //callback(userList);
    })
  }
  s.statics.sharePost = function (postData, callback) {
    this.getPostDetails(postData.postId, function (songsData) {
      //console.log(songsData);
      if (songsData !== null) {
        let params = {
          _id: new ObjectID,
          description: songsData.description ? songsData.description : '',
          share_description: postData.description ? postData.description : '',
          location_name: songsData.location_name ? songsData.location_name : '',
          loc: songsData.loc.length >= 1 ? [{ long: songsData.loc[0].long, lat: songsData.loc[0].lat }] : [],
          singing_mode: songsData.singing_mode,
          songs_name: songsData.songs_name,
          artist_name: songsData.artist_name,
          effects: songsData.effects,
          user_id: postData.userId,
          cat_type: songsData.cat_type,
          media_type: songsData.media_type,
          cat_id: songsData.cat_id,
          karaoke_id: songsData.karaoke_id,
          image_url: songsData.image_url,
          file_url: songsData.file_url,
          track_length: songsData.track_length,
          status: songsData.status,
          is_shared: true,
          shared_postId: songsData._id,
          posted_userId: songsData.user_id,
          is_challenged: songsData.is_challenged,
          p_challenge_id: songsData.p_challenge_id,
          challenge_exp_date: songsData.challenge_exp_date
        };
        //console.log(params)                    
        new FeedModel(params).save(function (err, response_data) {
          if (!err) {
            var msg = '';
            if (response_data.status === "Draft") msg = "post saved successfully";
            else msg = "shared successfully";
            console.log("[Songs posted successfully]");
            callback({
              "response_code": 2000,
              "response_message": response_data.cat_type == "Sing" ? "Song " + msg : response_data.cat_type + " " + msg,
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
      } else {

        console.log("[Post does't exist]");
        callback({
          "response_code": 5000,
          "response_message": "Post does't exist",
          "response_data": res
        })
      }
    })
  }
  s.statics.getNewPost = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match: {
          $and: [
            { cat_type: req.type },
            { status: "Published" }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userinfo"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "followers",
          localField: "user_id",
          foreignField: "firstuser_id",
          as: "firstfollow"
        }
      },
      {
        $lookup:
        {
          from: "followers",
          localField: "user_id",
          foreignField: "seconduser_id",
          as: "secondfollow"
        }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "posted_userId",
          foreignField: "_id",
          as: "originalPostedUser"
        }
      },
      {
        $lookup:
        {
          from: "categories",
          localField: "cat_id",
          foreignField: "_id",
          as: "categoryName"
        }
      },
      {
        $project: {
          is_shared: 1,
          ownFollowingFirst: {
            $filter: {
              input: "$firstfollow",
              as: "firstfollowing",
              cond: {
                $and: [
                  { $eq: ["$$firstfollowing.seconduser_id", req.userId] },
                  { $eq: ["$$firstfollowing.fan_second", 1] }
                ]
              }
            }
          },
          ownFollowingSecond: {
            $filter: {
              input: "$secondfollow",
              as: "secondfollowing",
              cond: {
                $and: [
                  { $eq: ["$$secondfollowing.firstuser_id", req.userId] },
                  { $eq: ["$$secondfollowing.fan_first", 1] }
                ]
              }
            }
          },
          is_followed: '',
          is_liked: {
            $cond: {
              if: { $eq: [{ "$arrayElemAt": ["$likepost.user_id", 0] }, req.userId] },
              then: true,
              else: false
            }
          },
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          subcat_name: 1,
          location_name: 1,
          state: { $ifNull: [ "$state", "" ] },
          description: 1,
          share_description: 1,
          cat_id: 1,
          cat_name: {
            $cond: {
              if: { $gt: [{ $size: "$categoryName" }, 0] },
              then: { "$arrayElemAt": ["$categoryName.cat_name", 0] },
              else: ''
            }
          },
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          karaoke_id: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },
          username1: { "$arrayElemAt": ["$userinfo.username", 0] },
          user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
          username2: { "$arrayElemAt": ["$originalPostedUser.username", 0] },
          // user2_profile_pic:{ "$arrayElemAt": ["$originalPostedUser.image_url", 0 ] },
          like_count: { $size: "$likepost" },
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" }


        }
      }
    ]) //start pagination
    var options = { page: req.page, limit: 10 };
    FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
      if (err) {
        console.err(err)
      }
      else {
        // console.log(results.length);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_record": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "New Feed list.",
            "total_record": count,
            "response_data": results
          })
        }

      }
    }) //End pagination
  }
  s.statics.deletePost = function (postData, callback) {
    async.parallel({
      comments: function (callback) {
        CommentModel.deleteCommentsByPostID({ feedId: postData.postId }, function (commentRes) {
          // console.log(followingRes);
          callback(null, commentRes);
        })
      },
      like: function (callback) {
        LikeModel.deleteLikesByPostID({ feedId: postData.postId }, function (likeRes) {
          callback(null, likeRes);
        })
      }

    },
      function (err, results) {
        // eg: results is now equals to: {one: 1, two: 2}
        FeedModel.remove({
          _id: postData.postId
        }).exec(function (err, deleteCount) {
          if (err) {
            callback(err)
          }
          if (!err) {
            //console.log(deleteCount.result.n);
            var resdetails = {
              "response_code": 2000,
              "response_message": "Post deleted successfully",
              "response_data": {
                "post_deleted": deleteCount.result.n,
                "comments_deleted": results.comments.result.n,
                "like_deleted": results.like.result.n
              }
            }
            callback(resdetails);
          }
        });

      });
  }
  s.statics.trendingPost = function (req, callback) {
    async.parallel({
      comments: function (callback) {
        CommentModel.maxComments({}, function (commentRes) {
          // console.log(commentRes);
          callback(null, commentRes);
        })
      },
      like: function (callback) {
        LikeModel.maxLikes({}, function (likeRes) {
          // console.log(likeRes);                                    
          callback(null, likeRes);
        })
      }
    },
      function (err, results) {
        // eg: results is now equals to: {one: 1, two: 2}
        //console.log(results.comments.response_data)
        // console.log(results.like.response_data)
        var postArray = [];
        var postArray = results.comments.response_data.concat(results.like.response_data);
        //console.log(postArray);
        //Get maximum like and comment 
        result = [];
        postArray.forEach(function (a) {
          if (!this[a._id]) {
            this[a._id] = { _id: a._id, count: 0 };
            result.push(this[a._id]);
          }
          this[a._id].count += a.count;
        }, Object.create(null));
        // sorting count in decending order
        var feeds = result.sort(function (a, b) {
          return b.count - a.count;
        });
        // console.log(feeds);
        var allPostId = []
        feeds.forEach(function (item) {
          allPostId.push(item._id)
        })
        // console.log(allPostId)
        var aggregate = FeedModel.aggregate([
          {
            $match: {
              $and: [
                { cat_type: req.type },
                { _id: { $in: allPostId } },
                { status: "Published" }
              ]
            }
          },
          {
            $lookup:
            {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "userinfo"
            }
          },
          {
            $lookup:
            {
              from: "likes",
              localField: "_id",
              foreignField: "feed_id",
              as: "likepost"
            }
          },
          {
            $lookup:
            {
              from: "comments",
              localField: "_id",
              foreignField: "feed_id",
              as: "commentpost"
            }
          },
          {
            $lookup:
            {
              from: "followers",
              localField: "user_id",
              foreignField: "firstuser_id",
              as: "firstfollow"
            }
          },
          {
            $lookup:
            {
              from: "followers",
              localField: "user_id",
              foreignField: "seconduser_id",
              as: "secondfollow"
            }
          },
          {
            $lookup:
            {
              from: "songsfeeds",
              localField: "_id",
              foreignField: "shared_postId",
              as: "sharepost"
            }
          },
          {
            $lookup:
            {
              from: "musics",
              localField: "karaoke_id",
              foreignField: "_id",
              as: "karaokefiles"
            }
          },
          {
            $lookup:
            {
              from: "users",
              localField: "posted_userId",
              foreignField: "_id",
              as: "originalPostedUser"
            }
          },
          {
            $project: {
              is_shared: 1,
              is_followed: {
                $cond: {
                  if: { $gt: [{ $size: "$firstfollow" }, 0] },
                  then: {
                    $cond: {
                      if: { $and: [{ $eq: [{ "$arrayElemAt": ["$firstfollow.seconduser_id", 0] }, req.userId] }, { $eq: [{ "$arrayElemAt": ["$firstfollow.fan_second", 0] }, 1] }] },
                      then: true,
                      else: false
                    }
                  },
                  else: {
                    $cond: {
                      if: { $gt: [{ $size: "$secondfollow" }, 0] },
                      then: {
                        $cond: {
                          if: { $and: [{ $eq: [{ "$arrayElemAt": ["$secondfollow.firstuser_id", 0] }, req.userId] }, { $eq: [{ "$arrayElemAt": ["$secondfollow.fan_first", 0] }, 1] }] },
                          then: true,
                          else: false
                        }
                      },
                      else: false
                    }
                  }
                }
              },
              is_liked: {
                $cond: {
                  if: { $eq: [{ "$arrayElemAt": ["$likepost.user_id", 0] }, req.userId] },
                  then: true,
                  else: false
                }
              },
              cat_type: 1,
              media_type: 1,
              songs_name: 1,
              singing_mode: 1,
              location_name: 1,
              description: 1,
              share_description: 1,
              cat_id: 1,
              file_url: 1,
              track_length: 1,
              effects: 1,
              image_url: 1,
              user_id: 1,
              posted_userId: 1,
              karaoke_id: 1,
              karaoke_file_url: {
                $cond: {
                  if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                  then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
                  else: ''
                }
              },
              lyrics_url: {
                $cond: {
                  if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                  then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
                  else: ''
                }
              },
              artist_name: {
                $cond: {
                  if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                  then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
                  else: '$artist_name'
                }
              },
              username1: { "$arrayElemAt": ["$userinfo.username", 0] },
              user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
              username2: { "$arrayElemAt": ["$originalPostedUser.username", 0] },
              // user2_profile_pic:{ "$arrayElemAt": ["$originalPostedUser.image_url", 0 ] },
              like_count: { $size: "$likepost" },
              comment_count: { $size: "$commentpost" },
              share_count: { $size: "$sharepost" }
            }
          }
        ]) //start pagination
        var options = { page: req.page, limit: 10 };
        FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
          if (err) {
            console.err(err)
          }
          else {
            //console.log(results.length);
            if (results.length == 0) {
              callback({
                "response_code": 5002,
                "total_record": 0,
                "response_message": "No post to show",
                "response_data": []

              })
            }
            else {
              callback({
                "response_code": 2000,
                "response_message": "New Feed list.",
                "total_record": count,
                "response_data": results
              })
            }

          }
        }) //End pagination
      });
  }
  s.statics.getTopTenPost = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match: {
          $and: [
            { _id: { $in: req.postIds } },
            { cat_type: req.type }
          ]
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },
      {
        $project: {
          is_shared: 1,
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          location_name: 1,
          description: 1,
          share_description: 1,
          cat_id: 1,
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          like_count: { $size: "$likepost" },
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" },
          karaoke_id: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },
        }
      }
    ])
    var options = { page: req.page, limit: 10 };
    FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
      if (err) {
        console.err(err)
      }
      else {
        //console.log(results.length);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_record": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": " Feed list.",
            "total_record": count,
            "response_data": results
          })
        }

      }
    }) //End pagination
  }
  s.statics.maxShare = function (req, callback) {
    FeedModel.aggregate([
      {
        "$match": {
          $and: [{ is_shared: true }, { shared_postId: { "$ne": null } }]
        }
      },
      {
        $group: {
          _id: "$shared_postId",
          count: { $sum: 1 }

        }
      }
    ], function (err, results) {
      // console.log(err);
      // console.log(results);
      if (err) {
        callback({
          "response_code": 5005,
          "response_message": "INTERNAL DB ERROR",
          "response_data": {}
        })
      }
      if (!err) {
        callback({
          "response_code": 2000,
          "response_message": "likes found",
          "response_data": results
        })
      }
    });
  }
  s.statics.mySharePosts = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match: {
          user_id: req.user_id,
          is_shared: true
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },
      {
        $project: {
          is_challenged: 1,
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          location_name: 1,
          description: 1,
          share_description: 1,
          cat_id: 1,
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          karaoke_id: 1,
          status: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },

          like_count: { $size: "$likepost" },
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" }
        }
      }
    ])
    //start pagination
    var options = { page: req.page, limit: 10 };
    FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
      if (err) {
        console.log(err)
      }
      else {
        // console.log(results);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_records": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "Feed list.",
            "total_records": count,
            "response_data": results
          })
        }

      }
    }) //End pagination
  }
  s.statics.myLikedPosts = function (req, callback) {//console.log(req);
    LikeModel.postLikedByUser(req, function (likeRes) {
      // console.log(likeRes);
      if (likeRes.response_code === 2000) {
        var aggregate = FeedModel.aggregate([
          {
            $match: {
              _id: {
                $in: likeRes.response_data
              }
            }
          },
          {
            $sort: { createdAt: -1 }
          },
          {
            $lookup:
            {
              from: "songsfeeds",
              localField: "_id",
              foreignField: "shared_postId",
              as: "sharepost"
            }
          },
          {
            $lookup:
            {
              from: "likes",
              localField: "_id",
              foreignField: "feed_id",
              as: "likepost"
            }
          },
          {
            $lookup:
            {
              from: "comments",
              localField: "_id",
              foreignField: "feed_id",
              as: "commentpost"
            }
          },
          {
            $lookup:
            {
              from: "musics",
              localField: "karaoke_id",
              foreignField: "_id",
              as: "karaokefiles"
            }
          },

          {
            $project: {
              is_challenged: 1,
              cat_type: 1,
              media_type: 1,
              songs_name: 1,
              singing_mode: 1,
              location_name: 1,
              description: 1,
              share_description: 1,
              cat_id: 1,
              file_url: 1,
              track_length: 1,
              effects: 1,
              image_url: 1,
              user_id: 1,
              posted_userId: 1,
              karaoke_id: 1,
              status: 1,
              karaoke_file_url: {
                $cond: {
                  if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                  then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
                  else: ''
                }
              },
              lyrics_url: {
                $cond: {
                  if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                  then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
                  else: ''
                }
              },
              artist_name: {
                $cond: {
                  if: { $gt: [{ $size: "$karaokefiles" }, 0] },
                  then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
                  else: '$artist_name'
                }
              },

              like_count: { $size: "$likepost" },
              comment_count: { $size: "$commentpost" },
              share_count: { $size: "$sharepost" }


            }
          }
        ])
        //start pagination
        var options = { page: req.page, limit: 10 };
        FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
          if (err) {
            console.log(err)
          }
          else {
            // console.log(results);
            if (results.length == 0) {
              callback({
                "response_code": 5002,
                "total_records": 0,
                "response_message": "No post to show",
                "response_data": []

              })
            }
            else {
              callback({
                "response_code": 2000,
                "response_message": "Feed list.",
                "total_records": count,
                "response_data": results
              })
            }

          }
        }) //End pagination
        // FeedModel.find({_id:{$in:likeRes.response_data}},
        // function (err, res) {
        //     if (err){
        //         callback({
        //             "response_code": 5005,
        //             "response_message": "INTERNAL DB ERROR",
        //             "response_data": {}
        //         })
        //     }
        //   }).paginate(req.page, 10, function(err, res, total) {
        //    // console.log('total: ', total, 'docs: ', res)
        //      if (res)
        //     {
        //         //console.log(res);
        //         if(res.length===0)
        //         {
        //            callback({
        //                     "response_code":5002,
        //                     "response_message":"No post found",
        //                     "response_data": []
        //                 }) 
        //         }
        //        else 
        //        {
        //         callback({ 
        //             "response_code": 2000,
        //             "total_records":total,
        //             "feedRes": res 
        //             });
        //         }
        //     } 



        //   });

      } else {
        callback(likeRes);
      }
    })
  }
  s.statics.challengeUserPost = function (postData, callback) {
    this.getPostDetails(postData.postId, function (songsData) {
      //console.log(songsData);
      if (songsData !== null) {
        let today = new Date();
        let challenge_expire = today.getTime() + (7 * 24 * 3600 * 1000)
        let params = {
          _id: new ObjectID,
          description: songsData.description ? songsData.description : '',
          share_description: postData.description ? postData.description : '',
          location_name: songsData.location_name ? songsData.location_name : '',
          loc: songsData.loc.length >= 1 ? [{ long: songsData.loc[0].long, lat: songsData.loc[0].lat }] : [],
          singing_mode: songsData.singing_mode,
          songs_name: songsData.songs_name,
          artist_name: songsData.artist_name,
          effects: songsData.effects,
          media_type: songsData.media_type,
          user_id: postData.userId,
          cat_type: songsData.cat_type,
          cat_id: songsData.cat_id,
          karaoke_id: songsData.karaoke_id,
          image_url: songsData.image_url,
          file_url: songsData.file_url,
          track_length: songsData.track_length,
          status: "Published",
          is_challenged: true,
          p_challenge_id: '0',
          shared_postId: postData.postId,
          challenge_status: "ACTIVE",
          challenge_exp_date: challenge_expire

        };
        //console.log(params)                    
        new FeedModel(params).save(function (err, response_data) {
          if (!err) {
            let msg = "challenged successfully";
            console.log("[Songs challenged successfully]");
            callback({
              "response_code": 2000,
              "response_message": response_data.cat_type == "Sing" ? "Song " + msg : response_data.cat_type + " " + msg,
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
      } else {

        console.log("[Post does't exist]");
        callback({
          "response_code": 5000,
          "response_message": "Post does't exist",
          "response_data": res
        })
      }
    })
  }
  s.statics.getChallengedList = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match: {
          $and: [
            { cat_type: req.type },
            { is_challenged: true },
            { p_challenge_id: '0' },
            { challenge_status: { $in: ["ACTIVE", "EXTENDED"] } },
            { status: "Published" }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userinfo"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "posted_userId",
          foreignField: "_id",
          as: "originalPostedUser"
        }
      },
      {
        $lookup:
        {
          from: "transactions",
          localField: "_id",
          foreignField: "challenge_id",
          as: "donatedUser"
        }
      },
      {
        $lookup:
        {
          from: "categories",
          localField: "cat_id",
          foreignField: "_id",
          as: "categoryName"
        }
      },
      {
        $project: {
          challenge_amount: { $arrayElemAt: ["$donatedUser.amount", 0] },
          total_donation: { $sum: "$donatedUser.amount" },
          competitor_count: { $size: "$donatedUser" },
          ownDonate: {
            $filter: {
              input: "$donatedUser",
              as: "donatedUsers",
              cond: { $eq: ["$$donatedUsers.userId", req.userId] }
              // cond:{
              //        if:{ $eq: ["$$donatedUsers.userId", req.userId ] },
              //        then:true,
              //        else:false
              //      }
            }
          },
          isChallegeAccepted: '',

          // isChallegeAccepted : {$cond:{
          //           if:{ $gt:[{$size: "$ownDonate"}, 0 ] },
          //           then:true,
          //           else:false
          // }},
          //transaction:'$donatedUser',
          is_shared: 1,
          is_following: '',
          is_liked: {
            $cond: {
              if: { $eq: [{ "$arrayElemAt": ["$likepost.user_id", 0] }, req.userId] },
              then: true,
              else: false
            }
          },
          is_challenged: 1,
          p_challenge_id: 1,
          challenge_status: 1,
          challenge_exp_date: 1,
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          location_name: 1,
          state: { $ifNull: [ "$state", "" ] },
          description: 1,
          share_description: 1,
          cat_id: 1,
          cat_name: {
            $cond: {
              if: { $gt: [{ $size: "$categoryName" }, 0] },
              then: { "$arrayElemAt": ["$categoryName.cat_name", 0] },
              else: ''
            }
          },
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          karaoke_id: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },
          username1: { "$arrayElemAt": ["$userinfo.username", 0] },
          user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
          username2: { "$arrayElemAt": ["$originalPostedUser.username", 0] },
          // user2_profile_pic:{ "$arrayElemAt": ["$originalPostedUser.image_url", 0 ] },
          like_count: { $size: "$likepost" },
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" }
        }
      }])
    var options = { page: req.page, limit: 10 };
    FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
      if (err) {
        console.err(err)
      }
      else {
        // console.log(results.length);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_record": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "New Feed list.",
            "total_record": count,
            "response_data": results
          })
        }

      }
    }) //End pagination
  }
  s.statics.acceptChallenge = function (songsData, callback) {
    new FeedModel({
      _id: new ObjectID,
      media_type: songsData.media_type,
      description: songsData.description,
      location_name: songsData.location_name,
      state: songsData.state,
      loc: [{ long: songsData.long, lat: songsData.lat }],
      singing_mode: songsData.singing_mode,
      songs_name: songsData.songs_name,
      artist_name: songsData.artist_name,
      effects: songsData.effects,
      user_id: songsData.user_id,
      cat_type: songsData.cat_type,
      cat_id: songsData.cat_id,
      karaoke_id: songsData.karaoke_id,
      image_url: songsData.image_url,
      file_url: songsData.file_url,
      track_length: songsData.track_length,
      status: songsData.status,
      is_challenged: true,
      p_challenge_id: songsData.pChallengeId,
      challenge_status: "ACTIVE",
      challenge_exp_date: songsData.challenge_exp_date
    }).save(function (err, response_data) {
      if (!err) {
        var msg = '';
        // if(response_data.status==="Draft")  msg="saved successfully";
        msg = " challenge accepted successfully";
        console.log("[Challenge accepted successfully]");
        callback({
          "response_code": 2000,
          "response_message": response_data.cat_type == "Sing" ? "Song " + msg : response_data.cat_type + " " + msg,
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
  }
  s.statics.getAcceptedChallengedList = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match: {
          $and: [
            { cat_type: req.type },
            { is_challenged: true },
            { $or: [{ p_challenge_id: req.pChallengeId }, { _id: req.pChallengeId }] },
            // {challenge_status:{$in:["ACTIVE","EXTENDED"]}},
            { status: "Published" }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userinfo"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "songsfeeds",
          localField: "_id",
          foreignField: "shared_postId",
          as: "sharepost"
        }
      },
      {
        $lookup:
        {
          from: "musics",
          localField: "karaoke_id",
          foreignField: "_id",
          as: "karaokefiles"
        }
      },
      {
        $lookup:
        {
          from: "transactions",
          localField: "p_challenge_id",
          foreignField: "challenge_id",
          as: "donatedUser"
        }
      },
      {
        $project: {
          total_donation: { $sum: "$donatedUser.amount" },
          challenge_amount: { $arrayElemAt: ["$donatedUser.amount", 0] },
          competitor_count: { $size: "$donatedUser" },
          // txn:'$donatedUser',
          // ownDonate :{ $filter: {
          //    input: "$donatedUser",
          //    as: "donatedUsers",
          //    cond:{$eq: ["$$donatedUsers.userId", req.userId ]}
          //    // cond:{
          //    //        if:{ $eq: ["$$donatedUsers.userId", req.userId ] },
          //    //        then:true,
          //    //        else:false
          //    //      }
          // }},
          //isChallegeAccepted :'',          
          // isChallegeAccepted : {$cond:{
          //           if:{ $gt:[{$size: "$ownDonate"}, 0 ] },
          //           then:true,
          //           else:false
          // }},
          //transaction:'$donatedUser',
          //is_shared:1,
          //is_following:'',
          // is_liked:{ $cond: {
          //                    if: { $eq: [ {"$arrayElemAt" : ["$likepost.user_id" , 0]}, req.userId ] },
          //                    then: true,
          //                    else: false
          //             }
          // },
          is_challenged: 1,
          p_challenge_id: 1,
          challenge_status: 1,
          challenge_exp_date: 1,
          cat_type: 1,
          media_type: 1,
          songs_name: 1,
          singing_mode: 1,
          location_name: 1,
          description: 1,
          share_description: 1,
          cat_id: 1,
          karaoke_id: 1,
          file_url: 1,
          track_length: 1,
          effects: 1,
          image_url: 1,
          user_id: 1,
          posted_userId: 1,
          karaoke_file_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.file_url", 0] },
              else: ''
            }
          },
          lyrics_url: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.lyrics_url", 0] },
              else: ''
            }
          },
          artist_name: {
            $cond: {
              if: { $gt: [{ $size: "$karaokefiles" }, 0] },
              then: { "$arrayElemAt": ["$karaokefiles.artist_name", 0] },
              else: '$artist_name'
            }
          },
          username1: { "$arrayElemAt": ["$userinfo.username", 0] },
          user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
          like_count: { $size: "$likepost" },
          view_count: 1,
          comment_count: { $size: "$commentpost" },
          share_count: { $size: "$sharepost" }


        }
      }
    ]) //start pagination
    var options = { page: req.page, limit: 10 };
    FeedModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
      if (err) {
        console.log(err)
      }
      else {
        // console.log(results.length);
        if (results.length == 0) {
          callback({
            "response_code": 5002,
            "total_record": 0,
            "response_message": "No post to show",
            "response_data": []

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "Accepted challenge list.",
            "total_record": count,
            "response_data": results
          })
        }

      }
    }) //End pagination
  }
  s.statics.updateViewCount = function (postData, callback) {
    FeedModel.update({
      _id: postData.postId
    }, {
        $inc: {
          view_count: 1,
        }
      }).exec(function (err, u) {
        if (err) {
          callback({
            "response_code": 5005,
            "response_message": "INTERNAL DB ERROR",
            "response_data": {}
          })
        }
        if (!err) {
          if (u.n === 1 && u.nModified === 1) {
            callback({
              "response_code": 2000,
              "response_message": 'incViewCount',
              "response_data": {}
            })
          }
        }
      })
  }
  s.statics.getChallengeWinner = function (req, callback) {
    var aggregate = FeedModel.aggregate([
      {
        $match:
        {
          is_challenged: true,
          $or: [{ p_challenge_id: req.pChallengeId }, { _id: req.pChallengeId }],
          challenge_status: { $nin: ["EXPIRED"] },
          status: "Published"
        }
      },
      {
        $lookup:
        {
          from: "likes",
          localField: "_id",
          foreignField: "feed_id",
          as: "likepost"
        }
      },
      {
        $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "feed_id",
          as: "commentpost"
        }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userinfo"
        }
      },
      {
        $lookup:
        {
          from: "transactions",
          localField: "_id",
          foreignField: "challenge_id",
          as: "donatedUser"
        }
      },
      {
        $project: {
          songs_name: 1,
          cat_type: 1,
          challenge_exp_date: 1,
          user_id: 1,
          fullname: { "$arrayElemAt": ["$userinfo.name", 0] },
          username1: { "$arrayElemAt": ["$userinfo.username", 0] },
          user1_profile_pic: { "$arrayElemAt": ["$userinfo.image_url", 0] },
          deviceTokenIOS: { "$arrayElemAt": ["$userinfo.deviceTokenIOS", 0] },
          deviceTokenAndroid: { "$arrayElemAt": ["$userinfo.deviceTokenAndroid", 0] },
          total_like_comment: { $add: [{ $size: "$likepost" }, { $size: "$commentpost" }] },
          challenge_amount: { $arrayElemAt: ["$donatedUser.amount", 0] },
        }
      },
      {
        $sort: { total_like_comment: -1 }
      }
    ]).exec(function (err, result) {
      if (err) {
        callback({
          "response_code": 5005,
          "response_message": "INTERNAL DB ERROR",
          "response_data": {}
        })
      }
      else {
        if (result.length == 0) {
          callback({
            "response_code": 5002,
            "total_record": 0,
            "response_message": "No post to show",
            "response_data": {}

          })
        }
        else {
          callback({
            "response_code": 2000,
            "response_message": "Winer.",
            "response_data": result
          })
        }

      }
    })
  }
  return s;

}());

module.exports = FeedModel;