var AuthController = function($scope,AuthFactory,SessionService,$modal) {
  
  var authCtrl = this; 
  
  authCtrl.loginForm = { username: undefined, password: undefined, errorMessage: undefined };

  authCtrl.registerForm = { Email: undefined, password: undefined, confirmPassword: undefined, errorMessage: undefined };
  
  authCtrl.loggedIn = function () {
        return SessionService.getToken() !== undefined;
  };
    
  authCtrl.openModal = function () {

    authCtrl.modalInstance = $modal.open({
    templateUrl: '/Views/Templates/LoginRegister.html',
    controller: function($modalInstance,$rootScope){
      
      var loginModalCtrl = this;
      
      loginModalCtrl.login = function() {

        AuthFactory.login(loginModalCtrl.loginForm.username,loginModalCtrl.loginForm.password)
          .then(function(response){
            SessionService.setSession(response);
            $modalInstance.close()
            $rootScope.$broadcast('redrawChart');
          }, function(response){
              loginModalCtrl.loginForm.errorMessage = response.error_description;
          });
      };

      loginModalCtrl.register = function (registerForm) {
    
        AuthFactory.register(registerForm)
          .then(function (response) {
              console.log(response);
          });
      };

      loginModalCtrl.tabs = [{Header: "Log in",title: 'Login',url: 'Login.html'}, 
        {Header: "Create an account",title: 'Register',url: 'Register.html'
      }];

      loginModalCtrl.currentTab = 'Login.html';
    
      loginModalCtrl.onClickTab = function (tab) {
        loginModalCtrl.currentTab = tab.url;
      };

      loginModalCtrl.isActiveTab = function (tabUrl) {
        return tabUrl === loginModalCtrl.currentTab;
      };
    },
    controllerAs: 'loginModalCtrl',
    size: 'sm'
    });
  };
};

AuthController.$inject = ['$scope','AuthFactory','SessionService','$modal'];
