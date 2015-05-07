budgeterDirectives.directive('forecastControls',['forecastParams',
function(forecastParams) {
	
	return {
		restrict: 'EA',
		templateUrl: '/Views/Templates/forecastControls.html',
		bindToController: true,
		controllerAs: 'fCtrl',
		transclude: true,
		scope: {},
<<<<<<< HEAD
      templateUrl: '/Views/templates/forecastControls.html',
		controller: function($scope) {
=======
		controller: ['$scope',function($scope) {
			
			console.log('Compiled the fCtrl')
			console.log($scope.$$listeners);
			console.log($scope.$$listenerCount);
>>>>>>> origin/master
			
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
<<<<<<< HEAD
		          	$scope.$broadcast('renderGrid');
			      }
  			};
			 
=======
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
>>>>>>> origin/master
		}
		
	};
	
}]);
