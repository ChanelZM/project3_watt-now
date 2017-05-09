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


/*****************
** API cals
******************/
var img = new Image();
console.dir(img);
img.src = heatmap.getDataURL();
axios.get('http://mkweb.bcgsc.ca/color-summarizer/?url='+img+'&precision=PRECISION&text=1')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
