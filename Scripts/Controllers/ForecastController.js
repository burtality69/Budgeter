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

  $scope.refreshChart = function () {
      $scope.data = undefined;
      ForecastMgr.getForecast($scope.forecastParams).then(
        function (response) {

            $scope.data = response;

            var lastrow = response[response.length - 1];
            var income = 0;
            var outgoing = 0;

            for (var i = 0; i < response.length; i++) {
                income += response[i].total_payments;
                outgoing += response[i].total_deductions;
            }

            $scope.headlines.balance = lastrow.balance;
            $scope.headlines.savings = lastrow.total_savings;
            $scope.headlines.income = income;
            $scope.headlines.outgoing = outgoing;
        });
  };

  $scope.refreshChart();

  $scope.$on('redrawChart',$scope.refreshChart());

};

ForecastController.$inject = ['$rootScope','$scope','ForecastMgr','BudgetMgr','clsBudgetModel'];
