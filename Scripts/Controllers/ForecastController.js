var ForecastController = function ($rootScope,$scope,forecastParams) {

  var ForecastController = this; 
  
  ForecastController.forecastview = 'graph';

  ForecastController.forecastParams = forecastParams.getparams();

  ForecastController.headlines = {
      balance: 0,
      savings: 0,
      income: 0,
      outgoing: 0
  };
      //Chart Stuff
  ForecastController.showParameters = function () {
      ForecastController.parametersOn = !ForecastController.parametersOn;
  };
  
  ForecastController.refresh = function() {
      
      forecastParams.setparams(ForecastController.forecastParams);
      
      if(ForecastController.forecastview = 'graph') {
          $scope.$broadcast('redrawChart');
      } else {
          $scope.$broadcast('redrawGrid');
      }
  };

};

ForecastController.$inject = ['$rootScope','$scope','forecastParams'];
