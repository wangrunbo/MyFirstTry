/**
 * Created by oujunhaku on 16/08/22.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('test');
});

module.exports = router;