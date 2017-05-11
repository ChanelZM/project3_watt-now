var socket = io();

  /********************
  ** Heatmap generator
  ********************/
  var img = {
      container: document.querySelector('#img-container'),
      width(){ return this.container.getBoundingClientRect().width},
      height(){ return this.container.getBoundingClientRect().height},
  };
  var fakeData = {
      amount: 100,
      container: []
  };

  for (var i = 0; i < fakeData.amount; i++) {
      fakeData.container.push(generateRandom());
  }

  // generate heatmap
  var heatmap = h337.create({
      container: img.container
  });
  heatmap.setData({
      max: fakeData.amount,
      data: fakeData.container,
  });


  // generate fake data for the heatmap
  function generateRandom(){
      var value = {
          x: Math.floor(Math.random()*img.width()),
          y: Math.floor(Math.random()*img.height()),
          value: Math.floor(Math.random()*fakeData.amount),
      };
      return value;
  }

    var canvas = document.querySelector(".heatmap-canvas");
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    // var image = new Image();
    // image.src = heatmap.getDataURL();
    // ctx.drawImage(image, 0, 0);
    console.log(width*height);
    console.log(getPixelValue(width,height,20));

apiCall('GET', '/img/heatmap.png');

/*****************
** heatmap reader
******************/

function getPixelValue(x,y,radius){
    var colors = {
        values: [],
    };
    for (var i = 0; i < y; i+=(radius/2)) {
        for (var j = 0; j < x; j+=(radius/2)) {
            var rgba = ctx.getImageData(i,j, radius/2,radius/2).data;
            var rect = ctx.fillRect(i,j, radius/2,radius/2);
            ctx.fillStyle = "rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+rgba[3]+")";
            ctx.fill();
            colors.values.push({
                r:rgba[0],
                g:rgba[1],
                b:rgba[2],
                a:rgba[3]
            });
        }
    }

    colors.percentage = colors.values.reduce(function(total, current, index){
        var iteration = {r:current.r,g:current.g,b:current.b};
        total.r = total.r + (total.r - current.r)/100*255;
        total.g = total.g + (total.g - current.g)/100*255;
        total.b = total.b + (total.b - current.b)/100*255;
        return total;
    },{r:0,g:0,b:0});

    return colors;
}
/*****************
** sockets
******************/
  socket.emit('new heatmap', heatmap.getDataURL());

  socket.on('new image', function(data){
      console.log(data);
  });


/*****************
** Api call
******************/
function apiCall(method, url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(data,body) {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this);
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}
