/**
 *    @project: Sites
 *    @author: Ezra Botter
 *    @date: 18-10-13, 11:36
 */

function inArray(haystack, needle) {
	return (haystack.indexOf(needle) >= 0) ? true : false;
}

function roundDecimals(v,d) {
	val = 1;
	for(var i = 0; i < d; i++) {
		val *= 10;
	}
	return Math.round(v*val)/val;
}