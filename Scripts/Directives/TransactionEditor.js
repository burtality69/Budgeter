budgeterDirectives.directive('transactionEditor',
['ClsTransaction','transactionMgr','translistDropdowns','notifications','$rootScope','transactionValueMgr',
function (ClsTransaction, transactionMgr,transListdropdowns,notifications,$rootScope,transactionValueMgr) {
  //This has a dependency on transactionmanager which interfaces with the API

    return {
        restrict: 'EA',
        scope: {
          cancel: '=',
          trans: '=',
          transactions: '='
        },
        
        bindToController: true,
        controllerAs: 'transEdit',
        controller: function ($scope,$rootScope) {
          
          var transEdit = this;
          var newrecord = false;
          
          transListdropdowns.getTransactionTypes().then(
              function(response) {
                transEdit.types = response;
              });
          
          transListdropdowns.getTransactionFrequencies().then(
            function(response) {
              transEdit.freqs = response;
            });


          //What context is this being called in?
          if ($scope.trans == undefined) {
            transEdit.Trans = new ClsTransaction;
            newrecord = true;
          } else {
            transEdit.Trans = ClsTransaction.build(transEdit.trans);
            newrecord = false;
          };

          this.submit = function () {

            if (newrecord) {
              transactionMgr.post(transEdit.Trans).then(
                function (response) {
                  console.log(response);
                  $rootScope.$broadcast('redrawChart');
                  notifications.showSuccess({message: 'Task Updated'});
                });
            } else {
              transactionMgr.put(transEdit.Trans).then(
                function (response) {
                  transEdit.Trans.message = response;
                });
            };
          };

          this.collapseTrans = function() {
            transEdit.cancel(transEdit.tv)
          }

          this.delete = function () {
            transactionValueMgr.delete(transEdit.Trans.ID).then(
              function (response) {
                transEdit.Trans.message = response;
              });
          };

          this.clear = function() {
            transEdit.tvToEdit = new ClsTransaction();
          };
          
          this.cancel = function() {
            transEdit.cancel();
          }

        },
        templateUrl: "/Views/Templates/transactionEditor.html"

    };
}]);

