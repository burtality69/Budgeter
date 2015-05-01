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

    $scope.expandNewTV= function () {
        $scope.addTVExpanded = true;
    };

    $scope.cancelNewTV = function () {
      $scope.addTVExpanded = false;
    };

    $scope.closeTVEditor = function(tv) {
      if(tv === undefined) {
        $scope.addTVExpanded = false;
      }
    };

    $scope.deleteTransaction = function(t) {
      TransactionMgr.delete(t).then(
        function (response) {
        $scope.Message = response;
      });
    };

    //GET
    var refreshTransactions = function () {
        TransactionMgr.get().then(
        function (response) {
            $scope.transactions = response.map(clsTransaction.build);
        });
    };

    refreshTransactions();

};
TransactionListController.$inject = ['$rootScope','$scope','clsTransaction','TransactionMgr'];
