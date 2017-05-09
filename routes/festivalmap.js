var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('festivalmap', { title: 'Festival Map' });
});

module.exports = router;
