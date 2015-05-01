var transaction = function(clsTransaction,clsTransactionValue) {

  return {
    restrict: 'EA',
    replace: true,
    scope: {
        trans: '=',
        transactions: '=',
        listmgr: '='
    },

    controller: function ($scope) {

      $scope.visible = function() {
          return !$scope.listmgr.addmode && $scope.$parent.$index == $scope.listmgr.selecteditem || $scope.listmgr.selecteditem == undefined;
      }

      $scope.expandTransaction = function () {
        if(!$scope.trans.expanded) {
          $scope.listmgr.selecteditem = $scope.$parent.$index;
          $scope.trans.expanded = true;
        } else {
          $scope.listmgr.selecteditem = undefined;
          $scope.trans.expanded = false;
        };
      };

    },

    templateUrl: '/Views/Templates/Transaction.html'

  }


};

transaction.$inject = ['clsTransaction','clsTransactionValue']
