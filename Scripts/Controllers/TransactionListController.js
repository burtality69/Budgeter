var TransactionListController = function ($rootScope, $scope, clsTransaction, TransactionMgr) {


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
        TransactionMgr.get().then(
        function (response) {
            $scope.transactions = response.map(clsTransaction.build);
        });
    };
    
    
    refreshTransactions();
    
    $scope.$on('refreshTList',refreshTransactions());

};
TransactionListController.$inject = ['$rootScope','$scope','clsTransaction','TransactionMgr'];
