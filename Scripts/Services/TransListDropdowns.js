var TransListdropdowns = function(SessionService,$http,$q) {

  this.token = SessionService.getToken();
  this.headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token };
  this.apiroot = SessionService.apiUrl;
  this.Transactionfrequencies = undefined;
  this.TransactionTypes = undefined;

  this.getTransactionFrequencies = function() {

      var result = $q.defer();

      if(!this.Transactionfrequencies) {
      $http({method: 'GET',url: this.apiroot + '/api/admin/transactionfrequencies',headers: this.headers})
        .success(function (response) {
            this.Transactionfrequencies = response;
            result.resolve(response);
        });
      } else {
          result.resolve(this.Transactionfrequencies);
      }

      return result.promise;
    };

    this.getTransactionTypes = function() {
      
      var result = $q.defer();
      
      if(!this.TransactionTypes) {
      $http({method: 'GET',url: SessionService.apiUrl + '/api/admin/transactiontypes',headers: this.headers})
        .success(function (response) {
            this.TransactionTypes = response;
            result.resolve(response);
        });
      } else {
        result.resolve(this.TransactionTypes);
      }
      
      return result.promise;
  };
};

TransListdropdowns.$inject = ['SessionService','$http','$q'];
