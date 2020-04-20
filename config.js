module.exports = {
    "port": 4001,
    "secretKey": "hyrgqwjdfbw4534efqrwer2q38945765",
    staging: {
        username: 'mongoAdminBIT',
        password: 'BiT^7129~jsQ​-P',
        host: '162.243.110.92',
        port: '27017',
        dbName: 'MusicApp',
        authDb: 'admin'
            //mongoose.connection.on
    },
    production: {
        username: 'musicalchallenge',
        password: 'challenge147123',
        host: 'localhost',
        port: '27017',
        dbName: 'musicalchallenges',
        authDb: 'admin'
            //mongoose.connection.on
    },
    local: {
        database: "mongodb://localhost:27017/MusicApp",
        // MAIL_USERNAME: "liveapp.brainium@gmail.com",
        // MAIL_PASS: "YW5kcm9pZDIwMTY",
        MAIL_USERNAME: "cedricharris118@gmail.com",
        MAIL_PASS: "VXdhbm5ha25vdzI=",
        //mongoose.connection.on
    },
    admin_mail: "aloke.brainium@gmail.com",
    profilepicPath: "public/uploads/profilepic/",
    //categoryImagePath:"public/uploads/categorypic/",
    baseUrl: "http://182.74.177.22:4001/",
    liveUrl: "http://localhost:4001/",
    logPath: "/ServiceLogs/admin.debug.log",
    dev_mode: true,
    __root_dir: __dirname,
    __site_url: 'http://182.74.177.22:4001/'
}