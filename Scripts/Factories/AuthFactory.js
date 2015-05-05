budgeterFactories.factory('authFactory',['$http','$q','sessionService',function($http,$q,sessionService){
  return {

    login: function(username,password){

      var result = $q.defer();
      var params = {grant_type: "password",userName: username, password: password};
      var headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'};

      $http({
        method: 'POST',
        url: sessionService.apiUrl + '/token',
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: params,
        headers: headers
      })
      .success(function(response){
        result.resolve(response);
      })
      .error(function(response){
        result.reject(response);
      });

      return result.promise;
    },

    register: function(registerForm) {

      var result = $q.defer();
      var params = registerForm;
      var headers = {'Content-Type': 'application/json'};

      $http({method: 'POST',url: sessionService.apiUrl + '/api/Account/register',data: params,headers: headers})
          .success(function(response){
            result.resolve(response);
        })
          .error(function(response){
            result.reject(response);
      });

      return result.promise;
    },

    getUser: function() {
      var result = $q.defer();

      $http({
        method: 'GET',
        url: sessionService.apiUrl + '/api/Account/UserInfo',
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + sessionService.getToken()}
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
