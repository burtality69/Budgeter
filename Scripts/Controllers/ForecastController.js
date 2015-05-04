var forecastController = function ($scope,forecastParams) {

  var forecastController = this; 
  
  forecastController.forecastview = 'graph';

  forecastController.forecastParams = forecastParams.getparams();

  forecastController.headlines = {
      balance: 0,
      savings: 0,
      income: 0,
      outgoing: 0
  };
  
  //Chart Stuff
  forecastController.showParameters = function () {
      forecastController.parametersOn = !forecastController.parametersOn;
  };
  
  forecastController.refresh = function() {
      
      forecastParams.setparams(forecastController.forecastParams);
      
      if(forecastController.forecastview == 'graph') {
          $scope.$broadcast('redrawChart');
      } else {
          $scope.$broadcast('redrawGrid');
      }
  };

};

forecastController.$inject = ['$scope','forecastParams'];
