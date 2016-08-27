/**
 * Created by oujunhaku on 16/08/18.
 */
var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res) {
    res.render('register');
});

/* POST to register new user */
router.post('/', function (req, res) {

    var registerData = req.body;

    //DB設定
    var mongodb = require('mongodb');
    var server = new mongodb.Server('localhost', 27017);
    var db = new mongodb.Db('DigitalAlumniRecord', server, {safe: true});

    db.open(function (err,db) {
        if (err){
            throw err;
        }else {
            var colUsers = db.collection('users');

            // Regular Expression
            var patterns = {};

            patterns.email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            patterns.password = /^[a-zA-Z0-9]{8,16}$/;
            patterns.tel = /^(13[0-9]|14[5|7]|15[0-3|5-9]|18[0-3|5-9])\d{8}|\d{3}-\d{4}-\d{4}$/;

            // validate data
            var pass = true;
            colUsers.find({email: registerData.email}).toArray(function (err, arr) {
                if (err){
                    throw err;
                }else if (arr.length != 0){
                    pass = false;
                }
            });
            for (var k in registerData){
                if (registerData[k] == ""){
                    pass = false;
                    break;
                }
            }
            if (!patterns.email.test(registerData.email) || !patterns.password.test(registerData.pwd) || !patterns.tel.test(registerData.tel)){
                pass = false;
            }

            if (pass == false){
                res.render('exception');
            }else {
                //insert into DB
                colUsers.insert(registerData, function (err, result) {
                    if (err){
                        throw err;
                    }else {
                        console.log(result.email);
                        res.render('register_success')
                    }
                })
            }
        }
    })
});


module.exports = router;