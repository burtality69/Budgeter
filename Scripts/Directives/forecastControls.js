/* global budgeterDirectives */
budgeterDirectives.directive('forecastControls',['forecastParams',
function(forecastParams) {
	
	return {
		restrict: 'EA',
		templateUrl: '/Views/Templates/forecastControls.html',
		bindToController: true,
		controllerAs: 'fCtrl',
		transclude: true,
		scope: {},
  		templateUrl: '/Views/templates/forecastControls.html',
		controller: ['$scope',function($scope) {
		
			var fCtrl = this;
					
			this.forecastview = 'graph';
			
			var s = new Date();
		    var e = new Date();
		    e.setDate(e.getDate() + 90);
			
			var startdate = s;
			var enddate = e;
			var startbal = 0; 
			
  			this.forecastParams = {
				  startdate: startdate,
				  enddate: enddate,
				  startbal: startbal
			 };

		  	this.headlines = {
		      balance: 0,
		      savings: 0,
		      income: 0,
		      outgoing: 0
		  	};
  
  			this.showParameters = function () {
  				fCtrl.parametersOn = !fCtrl.parametersOn;
  			};
			
  			this.refresh = function() {
  			
			      forecastParams.setparams(fCtrl.forecastParams);
	      
			      if(fCtrl.forecastview == 'graph') {
		          	$scope.$broadcast('renderChart');
			      } else {
		          	$scope.$broadcast('renderGrid');
			      }
  			};
			
		}]		
	};
	
}]);
