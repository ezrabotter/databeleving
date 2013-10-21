/**
 *    @project: Sites
 *    @author: Ezra Botter
 *    @date: 17-10-13, 21:54
 */

(function (window) {

	function Chart() {

	}

	Chart.prototype = {

		chart : {},

		makeChart : function(type,id,row,color,w,h,x,y) {

			switch(type) {
				case 'bar':
					this.chart = d3.select("#" + id)
						.append("svg:svg")
						.attr("width", (w+3) * row.length)
						.attr("height", h)
						.attr("align", "right")
						.attr("class", "chart");

					this.chart.selectAll("rect")
						.data(row)
						.enter().append("rect")
						.attr("x", function(d, i) { return i * (33); })
						.attr("y", function(d) { return h - y(d); })
						.attr("width", w)
						.attr("height", function(d) { return y(d); })
						.attr("fill", color);
					break;
				case 'line':
					this.chart = d3.select("#" + id)
						.append("svg:svg")
						.attr("width", w)
						.attr("height", h);

					var g = this.chart.append("svg:g")
						.attr("transform", "translate(0, 200)");

					var line = d3.svg.line()
						.x(function(d,i) { return x(i); })
						.y(function(d) { return -1 * y(d); });

					g.append("svg:path")
						.attr("d", line(row))
						.attr("class", 'line');

					g.append("svg:line")
						.attr("x1", x(0))
						.attr("y1", -1 * y(0))
						.attr("x2", x(w))
						.attr("y2", -1 * y(0));

					break;
			}

		},

		getAxis : function(scale,ticks,orient,transformA,transformB) {
			var axis = d3.svg.axis()
				.scale(scale)
				.ticks(ticks)
				.orient(orient);

			this.chart.append('g')
				.attr("transform", "translate(" + transformA + "," + transformB + ")")
				.call(axis);

		},

		getDataFromColumn : function(rows,column,divide) {
			var data = [];
			$.each(rows, function(i,item){
				data.push(parseFloat(item[column]/divide));
			});
			return data
		}

	};

	window.Chart = Chart;

})(window);