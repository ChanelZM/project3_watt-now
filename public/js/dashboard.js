// Tell d3 what data to use for the visualisation.
d3.json('/js/dashboard.json', function(data) {
	// Save the SVG in a variable

	var svg = d3.select('svg#dashboard');
		// Append groups to place the pieCharts in
		stageOne = svg.append('g')
					.attr('class', 'stage1');

	console.log(data[0].stage1.red);
	var stageRed = data[0].stage1.red;
	var stageOrange = data[0].stage1.orange;
	var stageYellow = data[0].stage1.yellow;
	var stageGreen = data[0].stage1.green;

	var pieChart = d3.layout.pie();
	var stageOnePie = pieChart([stageRed, stageOrange, stageYellow, stageGreen])
	console.log(stageOnePie);


// var pie = d3.layout.pie()
// 	.sort(null)
// 	.value(function(d) { return d.stage2; });
//
// var path = d3.svg.arc()
// 	.outerRadius(200)
// 	.innerRadius(100);
//
// var arc = stageOne.selectAll(".arc")
//     .data(pie(data))
//     .enter().append("g")
//       .attr("class", "arc");
//
//   arc.append("path")
//       .attr("d", path)
//       .attr("fill", function(d) { return color(d.data.stage2); });

});
