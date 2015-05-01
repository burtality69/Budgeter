var SessionService = function($cookies){

//This service manipulates an authorisation cookie for session

  this.token = undefined;
  this.user = undefined;
  this.apiUrl = 'http://budgeter.azurewebsites.net';
  //this.apiUrl = 'http://localhost:52243';

  this.setSession = function(token) {
      $cookies.Authtoken = token.access_token;
      $cookies.User = token.userName;
  };

  this.getToken = function() {
    if(!$cookies['Authtoken']){
        if(!this.token){
            return undefined;
        }
        this.setToken(this.token);
    }
    return $cookies['Authtoken'];
  };

  this.getUser = function () {
      if(!$cookies['Authtoken']){
          if(!this.token){
              return undefined;
          }
          this.setToken(this.token);
      }
      return $cookies['Authtoken'];
  };

  this.destroySession = function() {
    $cookies.remove('Authtoken');
    $cookies.remove('userName');
  };

};

SessionService.$inject = ['$cookies'];
