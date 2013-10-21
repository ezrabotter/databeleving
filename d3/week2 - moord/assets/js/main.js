//data vars
var totaalPerJaar = [], moordWijze = [], data = [], rows,
	M1= 0,M2= 0,M3= 0,M4= 0,M5= 0,M6= 0,M7= 0,
	Y8= 0,Y9= 0,Y10= 0,Y11= 0;

d3.csv("assets/data/moorddata.csv", function(loadedRows) {
	rows = loadedRows;
	handleLoadedRows();
});

var str = {
	ophangen : "Ophangen / verwurgen / verstikken",
	doodslaan : "Doodslaan / schoppen",
	vuurwapen : "Vuurwapen",
	steekwapen : "Steekwapen",
	slagwapen : "Slagwapen",
	overig : "Overige wijze van moord en doodslag",
	onbekend : "Onbekende wijze van moord en doodslag"
}

function handleLoadedRows() {
	$.each(rows, function(i,item){

//		console.log(item);
		switch(item.Moordwijze) {
			case str.ophangen:
				M1 += parseFloat(item.Totaal);
				break;
			case str.doodslaan:
				M2 += parseFloat(item.Totaal);
				break;
			case str.vuurwapen:
				M3 += parseFloat(item.Totaal);
				break;
			case str.steekwapen:
				M4 += parseFloat(item.Totaal);
				break;
			case str.slagwapen:
				M5 += parseFloat(item.Totaal);
				break;
			case str.overig:
				M6 += parseFloat(item.Totaal);
				break;
			case str.onbekend:
				M7 += parseFloat(item.Totaal);
				break;
		}

		switch(item.Jaartal) {
			case "2008":
				Y8 += parseFloat(item.Totaal);
				break;
			case "2009":
				Y9 += parseFloat(item.Totaal);
				break;
			case "2010":
				Y10 += parseFloat(item.Totaal);
				break;
			case "2011":
				Y11 += parseFloat(item.Totaal);
				break;
		}

	});

	totaalPerJaar = [Y8,Y9,Y10,Y11];
	jaren = ["2008","2009","2010","2011"];

	moordWijze = [M1,M2,M3,M4,M5,M6,M7];
	labels = [str.ophangen,str.doodslaan,str.vuurwapen,str.steekwapen,str.slagwapen,"Overig","Onbekend"];
	makeChart("type",moordWijze,labels);
	makeChart("jaar",totaalPerJaar,jaren);

}

function makeChart(type,data,labels) {
	console.log("sort by " + type);
	console.log(data);
	
	var w = 30, h = 320;

	var chart = d3.select("#infographic")
		.append("svg:svg")
		.attr("width", (w+3) * data.length)
		.attr("height", h)
		.attr("align", "right")
		.attr("class", "chart");


	var x = d3.scale.linear()
		.domain([0, h])
		.range([0, w]);

	var y = d3.scale.linear()
		.domain([0, 50])
		.rangeRound([0, h]);

	 chart.selectAll("rect")
	 .data(data)
	 .enter().append("rect")
	 .attr("x", 50)
	 .attr("y", function(d, i) { return i * (33);})
	 .attr("width", function(d) { return y(d);})
	 .attr("height", w)
	 .attr("fill", "#000");

	chart.selectAll("text")
		.data(labels)
		.enter()
		.append("text")
		.text(function(d,i){ return d + " (" + data[i]+ ")"; })
		.attr("x", 55)
		.attr("y", function(d, i) { return i * (33) + 20;})
		.attr("height", w)
		.attr("fill", "#fff")
		.attr("id", function(d){ return d; });

}