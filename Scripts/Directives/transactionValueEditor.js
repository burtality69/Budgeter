var transactionValueEditor = function (clsTransactionValue,TransactionValueMgr,TransListdropdowns,notifications) {
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

        controller: function (TransListdropdowns,notifications) {
            
            var tvEditCtrl = this;
            
            var backup = undefined;
            var newrecord = false;

            tvEditCtrl.collapse = function() {
              tvEditCtrl.tv.editable = false;
            }

            TransListdropdowns.getTransactionFrequencies().then(
              function(response) {
                tvEditCtrl.frequencies = response;
              });

            //Populate model depending on context
            if (tvEditCtrl.tv == undefined) {
              tvEditCtrl.tv = new clsTransactionValue;
              tvEditCtrl.tv.TransactionID = tvEditCtrl.id;
              newrecord = true;
            } else {
              backup = clsTransactionValue.build(tvEditCtrl.tv);
              newrecord = false;
              tvEditCtrl.transID = tvEditCtrl.tv.TransactionID;
            };

            tvEditCtrl.submit = function () {

              if (newrecord) {
                TransactionValueMgr.post(tvEditCtrl.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Task Updated'});
                    tvEditCtrl.collapse();
                  });
              } else {
                TransactionValueMgr.put(tvEditCtrl.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Your task posted successfully'});
                    tvEditCtrl.collapse();
                  });
              };
            };

            tvEditCtrl.cancel = function() {

              if (newrecord) {
                tvEditCtrl.cancel();
              } else {
                tvEditCtrl.tv = backup;
                tvEditCtrl.tv.editable = false;
              };
            }

            tvEditCtrl.delete = function () {

              TransactionValueMgr.delete(tvEditCtrl.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task deleted'});
                });
            };
        },

        templateUrl: '/Views/Templates/transactionValueEditor.html', 

        link: function (tvEditCtrl, element, attrs) {

        }
    };
};
