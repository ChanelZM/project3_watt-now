
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
				"red" : (function(){return Math.floor(Math.random()*100)}()),
				"orange" : (function(){return Math.floor(Math.random()*100)}()),
				"yellow":(function(){return Math.floor(Math.random()*100)}()),
				"green":(function(){return Math.floor(Math.random()*100)}())
			},
			{
				"red" : (function(){return Math.floor(Math.random()*100)}()),
				"orange" : (function(){return Math.floor(Math.random()*100)}()),
				"yellow":(function(){return Math.floor(Math.random()*100)}()),
				"green":(function(){return Math.floor(Math.random()*100)}())
			},
			{
				"red" : (function(){return Math.floor(Math.random()*100)}()),
				"orange" : (function(){return Math.floor(Math.random()*100)}()),
				"yellow":(function(){return Math.floor(Math.random()*100)}()),
				"green":(function(){return Math.floor(Math.random()*100)}())
			},
			{
				"red" : (function(){return Math.floor(Math.random()*100)}()),
				"orange" : (function(){return Math.floor(Math.random()*100)}()),
				"yellow":(function(){return Math.floor(Math.random()*100)}()),
				"green":(function(){return Math.floor(Math.random()*100)}())
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

	var text = {
		red:"Erg druk",
		orange:"Druk",
		yellow:"Rustig",
		green:"Erg rustig",
	};

	var pieChart = d3.layout.pie()
	 .value(function(d) {return d })
	.sort(null);
	var pieData = pieChart([crowded, rest ]);

	var pieArc = d3.svg.arc()
		.outerRadius(140)
		.innerRadius(110);

	d3.select(parent)
		.append('text')
		.attr({
			'text-anchor': 'middle',
			'class': 'h2'
		})
		.style('transform', 'translate(0, 1em )')
		.text(text[highest])

	d3.select(parent)
		.append('text')
		.attr({
			'text-anchor': 'middle',
			'class': 'h3'
		})
		.style('transform', 'translate(0, -1em )')
		.text("area "+index);

	var donut = d3.select(parent).selectAll('path')
	.data(pieChart)
		.enter().append('path')
		// .transition().duration(500)
		// donut.exit().remove();
		// donut
		.attr("d", pieArc)
		// .attr("fill", function(d, i) { return backgroundColors[i]; })
		.attr('class', function(d,i){return backgroundColors[i]})
		.each(function(d) { this._current = d; })
		// .transition().duration(500)

		change(pieChart)
		function change(pieChart) {
			//console.log(pieData);
			var value = this.value;
			pieChart.value(function(d){return d[value]}); // change the value function
			donut = donut.data(pieChart); // compute the new angles
			donut.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
		}

	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return pieArc(i(t));
		};
	}


}
