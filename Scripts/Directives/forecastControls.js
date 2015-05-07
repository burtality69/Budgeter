budgeterDirectives.directive('forecastControls',['forecastParams',
function(forecastParams) {
	
	return {
		restrict: 'EA',
		templateUrl: '/Views/Templates/forecastControls.html',
		bindToController: true,
		controllerAs: 'fCtrl',
		transclude: true,
		scope: {},
		controller: ['$scope',function($scope) {
			
			console.log('Compiled the fCtrl')
			console.log($scope.$$listeners);
			console.log($scope.$$listenerCount);
			
			var fCtrl = this;
			
			fCtrl.gEx = false;
			fCtrl.tEx = false; 
					
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
		          	$scope.$broadcast('renderChart');
			      } else {
				  	$scope.$broadcast('renderGrid');
		          	fCtrl.tEx = true;
			      }
  			};
		}],
		link: function(scope,elem,attrs) {
			console.log('hit the link function of fCtrl');	
			console.log(scope);
			console.log(elem);
			console.log(scope.$$listeners);
			console.log(scope.$$listenerCount);
		}
		
	};
	
}]);
