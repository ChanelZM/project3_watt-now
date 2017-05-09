var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('rawdata', { title: 'Raw Data' });
});

module.exports = router;
