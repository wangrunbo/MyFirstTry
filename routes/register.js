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

});


module.exports = router;