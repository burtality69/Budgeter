budgeterDirectives.directive('transactionValueEditor',
['clsTransactionValue','transactionValueMgr','translistDropdowns','notifications',
function (clsTransactionValue,transactionValueMgr,translistDropdowns,notifications) {
// This motherfucker has it's own scope for modifying or inserting TransactionValues
// It uses an instance of the TransactionValueMgr which interacts with the API
// If it's called in a create context, it creates a new model, otherwise it copies an existing for edit

    return {
        restrict: 'EA',
        scope: {
          tv: '=',
          transID: '='
        },
        
        controllerAs: 'tvEditCtrl',

        controller: function (translistDropdowns,notifications) {
            
            var tvEditCtrl = this;
            
            var backup = undefined;
            var newrecord = false;

            this.collapse = function() {
              tvEditCtrl.tv.editable = false;
            };

            translistDropdowns.getTransactionFrequencies().then(
              function(response) {
                tvEditCtrl.frequencies = response;
              });

            //Populate model depending on context
            if (this.tv == undefined) {
              tvEditCtrl.tv = new clsTransactionValue;
              tvEditCtrl.tv.TransactionID = tvEditCtrl.id;
              newrecord = true;
            } else {
              backup = clsTransactionValue.build(tvEditCtrl.tv);
              newrecord = false;
              tvEditCtrl.transID = tvEditCtrl.tv.TransactionID;
            };

            this.submit = function () {

              if (newrecord) {
                transactionValueMgr.post(tvEditCtrl.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Task Updated'});
                    tvEditCtrl.collapse();
                  });
              } else {
                transactionValueMgr.put(tvEditCtrl.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Your task posted successfully'});
                    tvEditCtrl.collapse();
                  });
              };
            };

            this.cancel = function() {

              if (newrecord) {
                tvEditCtrl.cancel();
              } else {
                tvEditCtrl.tv = backup;
                tvEditCtrl.tv.editable = false;
              };
            };

            this.delete = function () {
              transactionValueMgr.delete(tvEditCtrl.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task deleted'});
                });
            };
        },

        templateUrl: '/Views/Templates/transactionValueEditor.html', 

        link: function (tvEditCtrl, element, attrs) {

        }
    };
}]);
