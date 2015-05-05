budgeterControllers.controller('transactionListController',['$rootScope','$scope','clsTransaction','transactionMgr',
function ($rootScope, $scope, clsTransaction, transactionMgr) {


    $scope.listmgr = {
      addmode: false,
      selecteditem: undefined,
      zoomed: false
    };

    var redrawForecast = function() {
        $rootScope.$broadcast('redrawChart');
    };

    //New Transaction
    $scope.expandAddTransaction= function () {
        $scope.addMode = true;
    };

    $scope.cancelNewTransaction = function () {
        $scope.addMode = false;
    };

    //GET
    var refreshTransactions = function () {
        transactionMgr.get().then(
        function (response) {
            $scope.transactions = response.map(clsTransaction.build);
        });
    };
    
    
    refreshTransactions();
    
    $scope.$on('refreshTList',refreshTransactions());

}]);
