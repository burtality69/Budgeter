var BudgetMgr = function($http, $q, SessionService) {

  var token = SessionService.getToken();
  var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  var apiroot = SessionService.apiUrl;

  return {

    getBudget: function (params) {

        var result = $q.defer();
        var querystring = '?startdate=' + params.startdate.toLocaleDateString('en-US') + '&enddate=' + params.enddate.toLocaleDateString('en-US');

        $http({method: 'GET',url: SessionService.apiUrl + '/api/forecast/getbudget' + querystring , headers: headers})
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });


        return result.promise;
      }
    }
};

BudgetMgr.$inject =['$http','$q','SessionService'];
