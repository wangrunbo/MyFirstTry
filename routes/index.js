/**
 * Created by wangrunbo on 16/08/28.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
    if (req.session.user){
        res.render('index');
    }else {
        res.redirect('/login')
    }
});

module.exports = router;