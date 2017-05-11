var express = require('express');
var router = express.Router();

var images = ['/img/map.png'];

/* GET home page. */
router.get('/', function(req, res) {
    var randomImage = images[Math.floor(Math.random()*images.length)];
    console.log(randomImage);
    res.render('image', { title: 'Express', image:randomImage });
});

module.exports = router;
