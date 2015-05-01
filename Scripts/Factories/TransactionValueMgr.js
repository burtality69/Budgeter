var TransactionValueMgr = function ($http, $q, SessionService, clsTransactionValue) {

    var token = SessionService.getToken();
    var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    var apiroot = SessionService.apiUrl + '/api/transactionValues';

    return {

    get: function() {

      var result = $q.defer();

      $http({method: 'GET',url: apiroot ,headers: headers})
          .success(function (response){
              result.resolve(response);
          })
          .error(function(response){
            result.reject(response);
          });

      return result.promise;
    },

    post: function(clsTransactionValue) {

        var result = $q.defer();

        //var tv = clsTransactionValue.formatforApi();

        $http({method: 'POST',url: apiroot ,headers: headers,data: tv })
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    },

    put: function (clsTransactionValue) {

        var result = $q.defer();

        var tv = clsTransactionValue.formatforApi();

        $http({method: 'PUT', url: apiroot + '/' + tv.ID, headers: headers, data: tv})
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    },

    delete: function(id) {

        var result = $q.defer();

        $http({method: 'DELETE',url: apiroot + '/' + id , headers: headers})
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

TransactionValueMgr.$inject = ['$http','$q','SessionService','clsTransactionValue'];
