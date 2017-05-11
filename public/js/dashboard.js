
var svg = d3.select('svg#dashboard')
			.attr({
				'width': '100%',
				'height': '100vh'
			})

var stages = [
	{
			"red" : 20,
			"orange" : 40,
			"yellow": 10,
			"green": 5
	},
	{
			"red" : 30,
			"orange" : 10,
			"yellow": 50,
			"green": 0
	},
	{
			"red" : 10,
			"orange" : 0,
			"yellow": 50,
			"green": 20
	}
	];

svg.selectAll('g').data(stages)
	.enter().append('g')
	.attr({
		'class': function(d,i){return 'stage'+ (i+1) },
		'transform' : function(d,i){ return 'translate('+(250+210*i)+',250)' }
	})
	.each(function(d,i) { drawPie(this,d,i);})


// draws a pieChart based and appends it to its parent
function drawPie(parent,data, index){
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

	var pieChart = d3.layout.pie().sort(null);
	var pieData = pieChart([crowded, rest ]);

	var pieArc = d3.svg.arc()
		.outerRadius(100)
		.innerRadius(70);
	//
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

	d3.select(parent).selectAll('path')
		.data(pieData)
		.enter()
		.append('path')
		.attr('d', pieArc)
	 	.attr('class', function(d,i){return backgroundColors[i]})

}
