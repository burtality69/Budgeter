budgeterFactories.factory('forecastMgr',['$http','$q','sessionService',function ($http, $q, sessionService) {

    var token = sessionService.getToken();
    var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };
    var apiroot = sessionService.apiUrl;

    return {

    getForecast: function (forecastParams) {

      var result = $q.defer();
      var querystring = 'startdate=' + forecastParams.startdate.toLocaleDateString('en-US') + '&enddate=' + forecastParams.enddate.toLocaleDateString('en-US') + '&startbal=' + forecastParams.startbal;

      $http({
         method: 'GET',
         url: apiroot + '/api/Forecast?' + querystring,
         headers: headers
      })
      .success(function(response){
          result.resolve(response);
      })
      .error(function(response){
          result.reject(response);
      });

      return result.promise;
    }
  };
}]);
