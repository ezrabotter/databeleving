var dataset = {
	left: {
		koffie: 63, //koffie
		espresso: 36, //espresso
		cappuccino: 31, //cappuccino
		warmechoco: 9,  //warme choco
		warmwater: 0,  //warm water
		overig: 9	 //overig
	},
	right: {
		koffie: 134,
		espresso: 88,
		cappuccino: 31,
		warmechoco: 4,
		warmwater: 2,
		overig: 20
	}
};

var koffie = [dataset.right.koffie, dataset.left.koffie],
	espresso = [dataset.right.espresso, dataset.left.espresso],
	cappuccino = [dataset.right.cappuccino, dataset.left.cappuccino],
	warmeChoco = [dataset.right.warmechoco, dataset.left.warmechoco],
	warmWater = [dataset.right.warmwater, dataset.left.warmwater],
	overig = [dataset.right.overig, dataset.left.overig],
	data = koffie;

var w = 400,
	h = 400,
	r = 200,
	ir = 120,
	color = d3.scale.category20c().domain([22, 162]).range(["#634b30", "#422D1B"]), //rechts - links
	donut = d3.layout.pie().sort(null),
	arc = d3.svg.arc().innerRadius(ir).outerRadius(r);

var svg = d3.select("#chart").append("svg:svg")
	.attr("width", w)
	.attr("height", h)
	.append("svg:g")
	.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

var arcs = svg.selectAll("path")
	.data(donut(data))
	.enter().append("svg:path")
	.attr("class","part")
	.attr("fill", function(d, i) { return color(i); })
	.attr("d", arc)
	.attr("title", function(d) { return d.value; })
	.each(function(d) { this._current = d;});

console.log(arcs);

clickBtn("#koffie",koffie);
clickBtn("#espresso",espresso);
clickBtn("#cappuccino",cappuccino);
clickBtn("#warmeChoco",warmeChoco);
clickBtn("#warmWater",warmWater);
clickBtn("#overig",overig);

function clickBtn(id,cat) {
	$(id).click(function(){
		if(data != cat) {
			data = cat;
			arcs = arcs.data(donut(data));
			arcs.transition().duration(750).attrTween("d", arcTween);
		}
	});
}

function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}

$(function() {
	$( document ).tooltip( {
		track: true
	});
});