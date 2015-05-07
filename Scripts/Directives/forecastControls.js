budgeterDirectives.directive('forecastControls',['forecastParams',
function(forecastParams) {
	
	return {
		restrict: 'EA',
		bindToController: true,
		controllerAs: 'fCtrl',
		scope: {},
      templateUrl: '/Views/templates/forecastControls.html',
		controller: function($scope) {
			
			var fCtrl = this;
					
			this.forecastview = 'graph';

  			this.forecastParams = forecastParams.getparams();

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
			 
		}
		
	};
	
}]);
