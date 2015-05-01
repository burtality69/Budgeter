var TransListdropdowns = function(SessionService,$http,$q){

  var token = SessionService.getToken();
  var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  var apiroot = SessionService.apiUrl;
  var Transactionfrequencies = undefined;
  var TransactionTypes = undefined;

  return {

    getTransactionFrequencies: function() {

      var result = $q.defer();

      if(!Transactionfrequencies) {
      $http({method: 'GET',url: apiroot + '/api/admin/transactionfrequencies',headers: headers})
        .success(function (response) {
            Transactionfrequencies = response;
            result.resolve(response);
        });
      } else {
          result.resolve(Transactionfrequencies);
      };

      return result.promise;
    },

    getTransactionTypes: function() {

      $http({method: 'GET',url: SessionService.apiUrl + '/api/admin/transactiontypes',headers: headers})
        .success(function (response) {
            TransactionTypes = response;
        });
      }
  }

};

TransListdropdowns.$inject = ['SessionService','$http','$q'];
