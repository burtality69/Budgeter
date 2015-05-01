var AuthController = function($scope,AuthFactory,SessionService) {

  $scope.loginForm = { username: undefined, password: undefined, errorMessage: undefined };

  $scope.registerForm = { Email: undefined, password: undefined, confirmPassword: undefined, errorMessage: undefined };

  $scope.login = function() {

    AuthFactory.login($scope.loginForm.username,$scope.loginForm.password)
      .then(function(response){
        SessionService.setSession(response);
      }, function(response){
          $scope.loginForm.errorMessage = response.error_description;
      });
  };

  $scope.register = function (registerForm) {

      AuthFactory.register(registerForm)
        .then(function (response) {
            console.log(response);
        });
  };

  $scope.tabs = [{
      Header: "Log in",
      title: 'Login',
      url: 'Login.html'
  }, {
      Header: "Create an account",
      title: 'Register',
      url: 'Register.html'
  }];

  $scope.currentTab = 'Login.html';

  $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
  }

  $scope.isActiveTab = function (tabUrl) {
      return tabUrl === $scope.currentTab;
  }
};

AuthController.$inject = ['$scope','AuthFactory','SessionService'];
