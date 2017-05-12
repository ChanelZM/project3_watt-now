var express = require('express');
var router = express.Router();
var img = [
  'img/infrared-photo-1.jpg',
  'img/infrared-photo-2.jpg',
  'img/infrared-photo-3.jpg',
  'img/infrared-photo-4.jpg',
  'img/infrared-photo-5.jpg',
  'img/infrared-photo-6.jpg',
  'img/infrared-photo-7.jpg',
  'img/infrared-photo-8.jpg',
  'img/infrared-photo-9.jpg',
  'img/infrared-photo-10.jpg',
  'img/infrared-photo-11.jpg',
  'img/infrared-photo-12.jpg',
  'img/infrared-photo-13.jpg',
  'img/infrared-photo-14.jpg',
  'img/infrared-photo-15.jpg',
]
function randomImage(){
  return img[Math.floor(Math.random()*img.length)]
}
/* GET rawdata page. */
router.get('/', function(req, res) {
  var areas = [
    {
      stage: 'Area 1',
      image: randomImage()
    },
    {
      stage: 'Area 2',
      image: randomImage()
    },
    {
      stage: 'Area 3',
      image: randomImage()
    },
    {
      stage: 'Area 4',
      image: randomImage()
    }
  ]

    res.render('rawdata', {
      title: 'Raw Data',
      rawdata: true,
      areas: areas
    });
});

module.exports = router;
