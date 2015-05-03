var ForecastController = function ($rootScope,$scope,ForecastMgr) {

    //Defaults

    var startdate = new Date();
    var enddate = new Date();
    enddate.setDate(enddate.getDate() + 90);

    $scope.forecastview = 'graph';

    $scope.forecastParams = {
        startbal: 0,
        startdate: startdate,
        enddate: enddate
    };

    $scope.headlines = {
        balance: 0,
        savings: 0,
        income: 0,
        outgoing: 0
    };

//Chart Stuff

  $scope.showParameters = function () {
      $scope.parametersOn = !$scope.parametersOn;
  };

};

ForecastController.$inject = ['$rootScope','$scope','ForecastMgr','BudgetMgr','clsBudgetModel'];
