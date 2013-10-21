/**
 *    @project: Databeleving / D3 / AB-tests / Opdracht 3 A
 *    @author: Ezra Botter
 *    @date: 21-10-13, 11:47
 */

d3.csv("assets/data/dataset_target.csv", function(rows){

	// new chart class
	var chart = new Chart();

	// Chart A
	var conversies = chart.getDataFromColumn(rows,'Conversies',1000);
	var total = chart.getTotal(conversies);
	var average = total/conversies.length;
	var averageArr = [];
	for(var i=0;i<=conversies.length;i++) {
		averageArr.push(average);
	}
	var data = [conversies,averageArr];

	chart.setData(data);
	var options = {visibleX: true, visibleY: true, ticksX: 26, ticksY: 5, maxH: d3.max(data[0]), maxW: data[0].length};
	chart.makeChart('chartA','line',800,200,20,options);

	// Chart B
	var conversieRatios = chart.getDataFromColumn(rows,'ConversieRatio',1);
	var total = chart.getTotal(conversieRatios);
	var average = total/conversieRatios.length;
	var averageArr = [];
	for(var i=0;i<=conversieRatios.length;i++) {
		averageArr.push(average);
	}
	var data = [conversieRatios,averageArr];

	chart.setData(data);
	var options = {visibleX: true, visibleY: true, ticksX: 26, ticksY: 6, maxH: d3.max(data[0]), maxW: data[0].length};
	chart.makeChart('chartB','line',800,200,20,options);

});