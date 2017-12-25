$.getJSON("data/populations.json", function(jsonData){
	var colData = [];

  // TODO
  // populate colData
 for(var v = 0; v<jsonData.USA.length; v++){
 	 colData.push([jsonData.USA[v]['age'] , jsonData.USA[v]['value']]);
 }

	chart = c3.generate({
		bindto: "#population-chart",
		size: {
			height: 450
		},	
		data: {
			columns: colData,
			type : 'pie'
		}
	});	
});
