var width = $(document).width();
var height = $(document).height();

var d3Map = new d3Map();
	d3Map.setGeoJSON('json/countries.geo.json');
	d3Map.setWidth(width);
	d3Map.setHeight(height);
	d3Map.setId('#map');
	d3Map.init();
	d3Map.process();

// @source GeoJSON file https://github.com/johan/world.geo.json/blob/master/countries.geo.json
