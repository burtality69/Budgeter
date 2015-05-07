budgeterServices.service('forecastParams',['$q',function () {
	
	var s = new Date();
    var e = new Date();
    e.setDate(e.getDate() + 90);
	
	var startdate = s;
	var enddate = e;
	var startbal = 0; 
	
	this.setparams = function(params) {
		startdate = params.startdate;
		enddate = params.enddate;
		startbal = params.startbal; 	
	};
	
	this.getparams = function() {
		return {
			startdate: startdate,
			enddate: enddate,
			startbal: startbal
		};
	};
	
}]);