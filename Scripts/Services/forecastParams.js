budgeterServices.service('forecastParams',['$q',function () {
	
	var s = new Date();
    var e = new Date();
    e.setDate(e.getDate() + 90);
	
	this.startdate = s;
	this.enddate = e;
	this.startbal = 0; 
	
	this.setparams = function(params) {
		this.startdate = params.startdate;
		this.enddate = params.enddate;
		this.startbal = params.startbal; 	
	};
	
	this.getparams = function() {
		return {
			startdate: this.startdate,
			enddate: this.enddate,
			startbal: this.startbal
		}
	};
	
}]);