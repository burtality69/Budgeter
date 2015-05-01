var AppController = function ($scope, SessionService,$modal) {

    $scope.openModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/Views/Templates/LoginRegister.html',
            controller: 'AuthController',
            size: 'sm'
        });

        modalInstance.result.then(function(){
            modalInstance.close();
          });
    };

    $scope.logOut = function () {
      SessionService.destroySession();
    };

    $scope.loggedIn = function () {
        return SessionService.getToken() !== undefined;
    };
};

AppController.$inject = ['$scope', 'SessionService','$modal'];
