var forecastControls = function(forecastParams) {
	
	return {
		restrict: 'EA',
		bindToController: true,
		controllerAs: 'fCtrl',
		scope: {},
		controller: function($scope) {
			
			var fCtrl = this; 
					
			fCtrl.forecastview = 'graph';

  			fCtrl.forecastParams = forecastParams.getparams();

		  	fCtrl.headlines = {
		      balance: 0,
		      savings: 0,
		      income: 0,
		      outgoing: 0
		  	};
  
  			fCtrl.showParameters = function () {
      			fCtrl.parametersOn = !fCtrl.parametersOn;
  			};
						
  			fCtrl.refresh = function() {
      
		      forecastParams.setparams(fCtrl.forecastParams);
      
		      if(fCtrl.forecastview == 'graph') {
		          $scope.$broadcast('redrawChart');
		      } else {
		          $scope.$broadcast('redrawGrid');
		      }
  			};
		},
		
		templateUrl: '/Views/Templates/forecastControls.html'
		
	};
	
};

forecastControls.$inject = ['forecastParams'];