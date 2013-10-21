/**
 *    @project: databeleving.dev
 *    @author: Ezra Botter
 *    @date: 21-10-13, 11:50
 */
d3.csv("assets/data/dataset_abtest.csv", function(rows){

	// new chart class
	var chart = new Chart();

	// get all data seperate (don't need all data, but just for in case)
	var visit = chart.getDataFromColumn(rows,'Visit',1);
	var visitNew = chart.getDataFromColumn(rows,'VisitNew',1);
	var visitReturn = chart.getDataFromColumn(rows,'VisitReturn',1);
	var visitMobile = chart.getDataFromColumn(rows,'VisitMobile',1);
	var visitTablet = chart.getDataFromColumn(rows,'VisitTablet',1);
	var visitDesktop = chart.getDataFromColumn(rows,'VisitDesktop',1);
	var conversies = chart.getDataFromColumn(rows,'Conversies',1);
	var conversiesNew = chart.getDataFromColumn(rows,'ConversiesNew',1);
	var conversiesReturn = chart.getDataFromColumn(rows,'ConversiesReturn',1);
	var conversiesMobile = chart.getDataFromColumn(rows,'ConversiesMobile',1);
	var conversiesTablet = chart.getDataFromColumn(rows,'ConversiesTablet',1);
	var conversiesDesktop = chart.getDataFromColumn(rows,'ConversiesDesktop',1);

	var visitA = [];
	var visitB = [];
	var visitNewA = [];
	var visitNewB = [];
	var visitReturnA = [];
	var visitReturnB = [];
	var visitMobileA = [];
	var visitMobileB = [];
	var visitTabletA = [];
	var visitTabletB = [];
	var visitDesktopA = [];
	var visitDesktopB = [];
	var conversiesA = [];
	var conversiesB = [];
	var conversiesNewA = [];
	var conversiesNewB = [];
	var conversiesReturnA = [];
	var conversiesReturnB = [];
	var conversiesMobileA = [];
	var conversiesMobileB = [];
	var conversiesTabletA = [];
	var conversiesTabletB = [];
	var conversiesDesktopA = [];
	var conversiesDesktopB = [];
	
	$.each(rows, function(i,item){
		if(item['Version']=='A') {
			visitA.push(parseFloat(item['Visit']/1000));
			visitNewA.push(parseFloat(item['VisitNew']/1000));
			visitReturnA.push(parseFloat(item['VisitReturn']/1000));
			visitMobileA.push(parseFloat(item['VisitMobile']/1000));
			visitTabletA.push(parseFloat(item['VisitTablet']/1000));
			visitDesktopA.push(parseFloat(item['VisitDesktop']/1000));
			conversiesA.push(parseFloat(item['Conversies']/1000));			
			conversiesNewA.push(parseFloat(item['ConversiesNew']/1000));
			conversiesReturnA.push(parseFloat(item['ConversiesReturn']/1000));
			conversiesMobileA.push(parseFloat(item['ConversiesMobile']));
			conversiesTabletA.push(parseFloat(item['ConversiesTablet']));
			conversiesDesktopA.push(parseFloat(item['ConversiesDesktop']));
		} else {
			visitB.push(parseFloat(item['Visit']/1000));
			visitNewB.push(parseFloat(item['VisitNew']/1000));
			visitReturnB.push(parseFloat(item['VisitReturn']/1000));
			visitMobileB.push(parseFloat(item['VisitMobile']/1000));
			visitTabletB.push(parseFloat(item['VisitTablet']/1000));
			visitDesktopB.push(parseFloat(item['VisitDesktop']/1000));
			conversiesB.push(parseFloat(item['Conversies']/1000));
			conversiesNewB.push(parseFloat(item['ConversiesNew']/1000));
			conversiesReturnB.push(parseFloat(item['ConversiesReturn']/1000));
			conversiesMobileB.push(parseFloat(item['ConversiesMobile']));
			conversiesTabletB.push(parseFloat(item['ConversiesTablet']));
			conversiesDesktopB.push(parseFloat(item['ConversiesDesktop']));
		}
	});

	// needed data
	var mobile = [parseInt(chart.getTotal(conversiesMobileA)),parseInt(chart.getTotal(conversiesMobileB))];
	var tablet = [parseInt(chart.getTotal(conversiesTabletA)),parseInt(chart.getTotal(conversiesTabletB))];
	var desktop = [parseInt(chart.getTotal(conversiesDesktopA)),parseInt(chart.getTotal(conversiesDesktopB))];
	var data = [conversiesA,conversiesB];

	// line chart
	chart.setData(data);
	var options = {visibleX: true, visibleY: true, ticksX: 14, ticksY: 5, maxH: d3.max(data[1]), maxW: data[0].length};
	chart.makeChart('chartA','line',800,200,20,options);

	// pie chart A
	var options = {r: 100, ir: 0, domains: [22, 162], colors: ['#f1f072','#008612']};
	chart.setData(mobile);
	chart.makeChart('pieA','pie',200,200,20,options);

	// pie chart B
	chart.setData(tablet);
	chart.makeChart('pieB','pie',200,200,20,options);

	// pie chart C
	chart.setData(desktop);
	chart.makeChart('pieC','pie',200,200,20,options);

});