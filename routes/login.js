/**
 * Created by oujunhaku on 16/08/17.
 */
var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res) {
    // var previousUrl = req.header('Referer') || '/index';
    // res.redirect(previousUrl);
    res.render('login');
});

/* POST to login. */
router.post('/', function (req, res) {
    var loginData = req.body;

    if (loginData.u == ""){
        res.send({result: 2})
    }else if (loginData.p == ""){
        res.send({result: 3})
    }else {
        //DB設定
        var mongodb = require('mongodb');
        var server = new mongodb.Server('localhost', 27017);
        var db = new mongodb.Db('DigitalAlumniRecord', server, {safe: true});

        db.open(function (err, db) {
            if (err){
                throw err;
            }else {
                var colUsers = db.collection('users');

                colUsers.findOne({userEmail: loginData.u}, function (err, item) {
                    if (err){
                        throw err;
                    }else if (item == null){
                        res.send({result: 0});
                    }else if (loginData.p != item.userPassword){
                        res.send({result: 1});
                    }else {
                        req.session.user = item;
                        res.end();
                    }
                })
            }
        })
    }
});

module.exports = router;