/**
 * Created by oujunhaku on 16/08/17.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login');
});

module.exports = router;