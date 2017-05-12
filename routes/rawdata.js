var express = require('express');
var fs = require('fs');

var images = ['/img/map.png'];

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var randomImage = images[Math.floor(Math.random()*images.length)];

    res.render('rawdata', { title: 'Raw Data', rawdata: true, image: randomImage });
});

module.exports = router;
