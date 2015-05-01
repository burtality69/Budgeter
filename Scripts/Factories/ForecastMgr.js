var ForecastMgr = function ($http, $q, SessionService) {

    var token = SessionService.getToken();
    var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    var apiroot = SessionService.apiUrl;

    return {

    getForecast: function (forecastParams) {

      var result = $q.defer();
      var querystring = 'startdate=' + forecastParams.startdate.toLocaleDateString('en-US') + '&enddate=' + forecastParams.enddate.toLocaleDateString('en-US') + '&startbal=' + forecastParams.startbal;

      $http({
         method: 'GET',
         url: SessionService.apiUrl + '/api/Forecast?' + querystring,
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
  }
};

ForecastMgr.$inject = ['$http','$q','SessionService'];
