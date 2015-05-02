var transactionEditor = function (clsTransaction, TransactionMgr,TransListdropdowns,notifications,$rootscope) {
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
        controller: function ($scope) {
          
          var transEdit = this;
          var newrecord = false;
          
          TransListdropdowns.getTransactionTypes().then(
              function(response) {
                transEdit.types = response;
              });
          
          TransListdropdowns.getTransactionFrequencies().then(
            function(response) {
              transEdit.freqs = response;
            });


          //What context is this being called in?
          if ($scope.trans == undefined) {
            transEdit.Trans = new clsTransaction;
            newrecord = true;
          } else {
            transEdit.Trans = clsTransaction.build(transEdit.trans);
            newrecord = false;
          };

          transEdit.submit = function () {

            if (newrecord) {
              TransactionMgr.post(transEdit.Trans).then(
                function (response) {
                  console.log(response);
                  $rootScope.$broadcast('redrawChart');
                  notifications.showSuccess({message: 'Task Updated'});
                });
            } else {
              TransactionMgr.put(transEdit.Trans).then(
                function (response) {
                  transEdit.Trans.message = response;
                });
            };
          };

          transEdit.collapseTrans = function() {
            transEdit.cancel(transEdit.tv)
          }

          transEdit.delete = function () {
            TransactionValueMgr.delete(transEdit.Trans.ID).then(
              function (response) {
                transEdit.Trans.message = response;
              });
          };

          transEdit.clear = function() {
            transEdit.tvToEdit = new clsTransaction;
          }

        },
        templateUrl: "/Views/Templates/transactionEditor.html"

    };
};

transactionEditor.$inject = ['clsTransaction', 'TransactionMgr','TransListdropdowns','notifications'];
