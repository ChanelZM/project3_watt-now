var socket = io()

var text = {
	red:"Erg druk",
	orange:"Druk",
	yellow:"Rustig",
	green:"Erg rustig",
};


var svg = d3.select('svg#dashboard')
			.attr({
				'width': '100%',
				'height': '50vh'
			})

var stages = [
	{
			"red" : 10,
			"orange" : 20,
			"yellow": 40,
			"green": 5
	},
	{
			"red" : 10,
			"orange" : 60,
			"yellow": 20,
			"green": 0
	},
	{
			"red" : 10,
			"orange" : 0,
			"yellow": 20,
			"green": 30
	},
	{
			"red" : 80,
			"orange" : 0,
			"yellow": 10,
			"green": 10
	}
];

	drawInit()
	setInterval(function(){
		stages =  [
			{
				"red" : (function(){return Math.ceil(Math.random()*100)}()),
				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
				"green":(function(){return Math.ceil(Math.random()*100)}())
			},
			{
				"red" : (function(){return Math.ceil(Math.random()*100)}()),
				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
				"green":(function(){return Math.ceil(Math.random()*100)}())
			},
			{
				"red" : (function(){return Math.ceil(Math.random()*100)}()),
				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
				"green":(function(){return Math.ceil(Math.random()*100)}())
			},
			{
				"red" : (function(){return Math.ceil(Math.random()*100)}()),
				"orange" : (function(){return Math.ceil(Math.random()*100)}()),
				"yellow":(function(){return Math.ceil(Math.random()*100)}()),
				"green":(function(){return Math.ceil(Math.random()*100)}())
			}
			]
			drawInit()
	},1000)


function drawInit() {
	d3.selectAll('.h2').remove();
	d3.selectAll('.h3').remove();
	var base = 155;
	var group = svg.selectAll('g').data(stages);
	group.enter().append('g');
	group.exit().remove('g');
	group.attr({
		'class': function(d,i){return 'stage'+ (i+1) },
		'transform' : function(d,i){ return 'translate('+(base+(base*2)*i)+','+base+')' }
	})
	.each(function(d,i) { drawPie(this,d,i);})

}

// draws a pieChart based and appends it to its parent
function drawPie(parent,data, index){
	// source: http://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
	var highest = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b });
	var crowded = data[highest]
	var rest = 100 - crowded;
	index = index+1;
	var backgroundColors = [highest, 'empty'];




	var pieChart = d3.layout.pie()
	 .value(function(d) {return d })
	.sort(null);
	var pieData = pieChart([crowded, rest ]);


	var pieArc = d3.svg.arc()
		.outerRadius(140)
		.innerRadius(110);


	// small text
	d3.select(parent)
		.append('text')
		.attr({
			'text-anchor': 'middle',
			'class': 'h2'
		})
		.style('transform', 'translate(0, 1em )')
		.text(text[highest])


	//big text
	d3.select(parent)
		.append('text')
		.attr({
			'text-anchor': 'middle',
			'class': 'h3'
		})
		.style('transform', 'translate(0, -1em )')
		.text("area "+index);


	var donut = d3.select(parent).selectAll('path').data(pieData);
		donut.enter().insert('path')
		donut.transition().duration(500)
		//transition hack source:http://bl.ocks.org/juan-cb/1984c7f2b446fffeedde
		.attrTween("d", function(d) {
				this._current = this._current || d;
				var interpolate = d3.interpolate(this._current, d);
				this._current = interpolate(0);
				return function(t) {
						return arc(interpolate(t));
				};
		})
		donut.exit().remove();
		donut.attr('class', function(d,i){return backgroundColors[i]})
		//the hack goes hand in hand with this
		donut.transition().duration(750).attrTween("d", arcTween); // redraw the arcs


	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return pieArc(i(t));
		};
	}

}
