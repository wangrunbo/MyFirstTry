/**
 * Created by wangrunbo on 16/08/28.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('register_success');
});

module.exports = router;