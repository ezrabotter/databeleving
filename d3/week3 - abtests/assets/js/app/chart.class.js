/**
 *    @project: Databeleving / D3 / AB-tests / Opdracht 3 A en B
 *    @author: Ezra Botter
 *    @date: 17-10-13, 21:54
 *    @description omdat ik al ervaring heb met OOP heb ik besloten om een class te schrijven voor het maken van charts in D3 wat van toepassing is op de opdracht.
 */

(function (window) {

	function Chart() {

	}

	Chart.prototype = {

		chart : {},
		data : [],

		/**
		 * @param data
		 */
		setData : function(data) {
			this.data = data;
		},

		/**
		 * @param id
		 * @param type
		 * @param w
		 * @param h
		 * @param margin
		 * @param options (for line options must be object {visibleX: bool, visibleY: bool, ticksX, ticksY,maxH,maxW})
		 */
		makeChart : function(id,type,w,h,margin,options) {

			// create chart for DOM element
			this.chart = d3.select("#" + id)
				.append("svg:svg")
				.attr("width", w)
				.attr("height", h);

			// check chart type
			switch(type) {
				case 'pie':
					var color = d3.scale.category20c().domain(options.domains).range(options.colors),
						pie = d3.layout.pie().sort(null),
						arc = d3.svg.arc().innerRadius(options.ir).outerRadius(options.r);

					this.chart.append("svg:g")
						.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
						.selectAll("path")
						.data(pie(this.data))
						.enter().append("svg:path")
						.attr("fill", function(d, i) { return color(i); })
						.attr("d", arc);

					break;
				case 'line':
					// x and y values
					var y = d3.scale.linear().domain([0, options.maxH]).range([0 + margin, h - margin]),
						x = d3.scale.linear().domain([0, options.maxW]).range([0 + margin, w - margin]);

					var g = this.chart.append("svg:g")
						.attr("transform", "translate(0, " + h + ")");

					// create line
					var line = d3.svg.line()
						.x(function(d,i) { return x(i); })
						.y(function(d) { return -1 * y(d); });

					// for multiple lines (data must be like: [[v,v,v,v,v],[v,v,v,v,v],[v,v,v,v,v,]])
					$.each(this.data,(function(index,value) {
						g.append("svg:path")
							.attr("d", line(value))
							// for every line another class (line0,line1,line2)
							.attr("class", 'line' + index);
					}));

					g.append("svg:line")
						.attr("x1", x(0))
						.attr("y1", -1 * y(0))
						.attr("x2", x(w))
						.attr("y2", -1 * y(0));

					// create the Axis
					if(options.visibleX) {
						g.selectAll(".xLabel")
							.data(x.ticks(options.ticksX))
							.enter().append("svg:text")
							.attr("class", "xLabel")
							.text(String)
							.attr("x", function(d) { return x(d) })
							.attr("y", 0)
							.attr("text-anchor", "middle");

						g.selectAll(".xTicks")
							.data(x.ticks(options.ticksX))
							.enter().append("svg:line")
							.attr("class", "xTicks")
							.attr("x1", function(d) { return x(d); })
							.attr("y1", -1 * y(0))
							.attr("x2", function(d) { return x(d); })
							.attr("y2", -1 * y(-0.3));
					}

					if(options.visibleY) {
						g.selectAll(".yLabel")
							.data(y.ticks(options.ticksY))
							.enter().append("svg:text")
							.attr("class", "yLabel")
							.text(String)
							.attr("x", 0)
							.attr("y", function(d) { return -1 * y(d) })
							.attr("text-anchor", "right")
							.attr("dy", 4);

						g.selectAll(".yTicks")
							.data(y.ticks(options.ticksY))
							.enter().append("svg:line")
							.attr("class", "yTicks")
							.attr("y1", function(d) { return -1 * y(d); })
							.attr("x1", x(-0.3))
							.attr("y2", function(d) { return -1 * y(d); })
							.attr("x2", x(0));
					}

					break;
			}

		},

		/**
		 * @desc get values of a row into another array
		 * @param rows
		 * @param column
		 * @param divide
		 * @return {Array}
		 */
		getDataFromColumn : function(rows,column,divide) {
			var data = [];
			$.each(rows, function(i,item){
				data.push(parseFloat(item[column]/divide));
			});
			return data
		},

		getTotal : function(data) {
			var total = 0;
			$.each(data, function(i,value) {
				total += value;
			});
			return Math.round(total);
		}

	};

	// use Chart outside the scope
	window.Chart = Chart;

})(window);