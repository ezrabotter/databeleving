/**
 *    @project: databeleving.dev
 *    @author: Ezra Botter
 *    @copyright Ezra Botter - info@ezrabotter.com
 *    @date: 28-12-13, 17:24
 */

(function (window) {

	// __construct
	function d3Map() {
		this.proj = this.getProjection();
		this.t = this.getTranslate(this.proj);
		this.s = this.getScale(this.proj);
		this.path = this.getPath(this.proj);
	}

	// __prototype
	d3Map.prototype = {

		geoJSON: '',
		id: '#map',
		width: 600,
		height: 400,
		map: {},
		data: {},
		counter: 0,

		/**
		 * @param geoJSON
		 */
		setGeoJSON: function(geoJSON) {
			this.geoJSON = geoJSON;
		},

		/**
		 * @param width
		 */
		setWidth: function(width) {
			this.width = width;
		},

		/**
		 * @param height
		 */
		setHeight: function(height) {
			this.height = height;
		},

		/**
		 * @param id
		 */
		setId: function(id) {
			this.id = id;
		},

		/**
		 * @param id
		 */
		setWorld: function(id) {
			this.world = this.map.append("svg:g").attr("id", id);
		},

		/**
		 * @description create x and y axes
		 */
		setAxis: function() {

			// style it with #axes
			var axes = this.map.append("svg:g").attr("id", "axes");

			this.xAxis = axes.append("svg:line")
				.attr("x1", this.t[0])
				.attr("y1", 0)
				.attr("x2", this.t[0])
				.attr("y2", this.height);

			this.yAxis = axes.append("svg:line")
				.attr("x1", 0)
				.attr("y1", this.t[1])
				.attr("x2", this.width)
				.attr("y2", this.t[1]);
		},

		/**
		 * @description create the d3 map
		 */
		init: function() {

			var self = this;

			// initialize the d3 map dom element
			this.map = d3.select(this.id)
				.append("svg:svg")
				.attr("width", this.width)
				.attr("height", this.height);
			this.setAxis();
			this.setWorld('world');

			this.map.call(d3.behavior.zoom().on("zoom", function() {
				// d3.event.translate (an array) stores the current translation from the parent SVG element
				// t (an array) stores the projection's default translation
				// we add the x and y vales in each array to determine the projection's new translation
				var tx = self.t[0] * d3.event.scale + d3.event.translate[0];
				var ty = self.t[1] * d3.event.scale + d3.event.translate[1];
				self.proj.translate([tx, ty]);

				// zoom onto the mouse point
				self.proj.scale(self.s / d3.event.scale);

				// redraw the map
				self.world.selectAll("path").attr("d", self.path);

				// redraw the x axis
				self.xAxis.attr("x1", tx).attr("x2", tx);

				// redraw the y axis
				self.yAxis.attr("y1", ty).attr("y2", ty);

			}));

			console.log('/* d3Map is initialized */');
			console.log('/* geoJSON file: ' + this.geoJSON + ' */');
			console.log('/* map id: ' + this.id + ' */');
			console.log('/* map width: ' + this.width + ' */');
			console.log('/* map height: ' + this.height + ' */');
		},

		process: function() {

			var self = this;
			var speed = 1000;

			//Load in GeoJSON data
			d3.json(this.geoJSON, function(data) {

				// all countries
				self.world.selectAll("path")
					.data(data.features)
					.enter().append("svg:path")
					.attr("d", self.path);

				// show country name
				self.world.selectAll('t')
					.data(data.features)
					.enter().append('text')
					.attr("x", self.width / 2)
					.attr("y", self.height / 2)
					.attr("text-anchor", "middle")
					.transition()
					.delay(function(d, i) { return i * speed; })
					.duration(speed)
					.text(function (d) {  return d.properties["name"]; })
					.remove();

				// fill single country
				self.world.selectAll("path")
					.transition()
					.delay(function(d, i) { return i * speed; })
					.attr("class", "selected")
					.attr("style", function(d, i) { return "fill:" + self.getColor(i); })
					.duration(speed)
			});

		},

		/**
		 * Public Functions
		 */
		getProjection: function() {
			return d3.geo.mercator();
		},

		getPath: function(proj) {
			return d3.geo.path().projection(proj);
		},

		getTranslate: function(proj) {
			return proj.translate();
		},

		getScale: function(proj) {
			return proj.scale();
		},

		/**
		 * @param i
		 * @returns {*}
		 * @description returns next color from array by counter
		 */
		getColor: function(i) {
			var colors = ['#ff2e2e','#123e90','#EA942F','#2BC759','#C8C829','#FF43D4','#9E6AFF'];

			// loop counter
			this.counter++;
			if(this.counter >= colors.length) {
				this.counter = 0;
			}

			return colors[this.counter];
		}

	}

	// use class outside the scope
	window.d3Map = d3Map;

})(window);