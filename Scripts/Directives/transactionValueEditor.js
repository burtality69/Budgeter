budgeterDirectives.directive('transactionValueEditor',
['ClsTransactionValue','transactionValueMgr','translistDropdowns','notifications',
function (ClsTransactionValue,transactionValueMgr,translistDropdowns,notifications) {
// This motherfucker has it's own scope for modifying or inserting TransactionValues
// It uses an instance of the TransactionValueMgr which interacts with the REST API
// If it's called in a create context, it creates a new model, otherwise it copies an existing for edit

    return {
        restrict: 'EA',
        scope: {tv: '=',transID: '=',cancel: '@'},       
        controllerAs: 'tvEditCtrl',
        bindToController: true,
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
            if (this.tv === undefined) {
              tvEditCtrl.tv = new ClsTransactionValue;
              tvEditCtrl.tv.TransactionID = tvEditCtrl.id;
              newrecord = true;
            } else {
              backup = ClsTransactionValue.build(tvEditCtrl.tv);
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

        template: '<div class="form-inline">' +
                      '<div>' +
                          '<label for="startdate">Start Date</label>' +
                          '<input class="input-xs-flat" type="date" data-ng-model="tvEditCtrl.tv.Start_date">' +
                     '</div>' +
                      '<div>' +
                         '<label for="startdate">Occurs</label>' +
                         '<select class="input-xs-flat" type="text" ng-options="freq.ID as freq.Description for freq in tvEditCtrl.frequencies" data-ng-model="tvEditCtrl.tv.FrequencyID"></select>' +
                      '</div>' +
                      '<div>' +
                          '<label for="day">On day</label>' +
                          '<input class="input-xs-flat" type="number" min=1 data-ng-model="tvEditCtrl.tv.Day">' +
                      '</div>' +
                      '<div>' +
                          '<label for="Value">Value</label>' +
                          '<input class="input-xs-flat" type="number" data-ng-model="tvEditCtrl.tv.Value">' +
                      '</div>' +
                      '<div>' +
                          '<label for="End_date">End date</label>' +
                          '<input class="input-xs-flat" type="date" data-ng-model="tvEditCtrl.tv.End_date">' +
                      '</div>' +
                      '<div class="controlpanel" style="float: right; padding: 5px;">' +
                          '<button class="btn btn-xs btn-danger" ng-click="tvEditCtrl.cancel()">Cancel</button>' +
                          '<button class="btn btn-xs btn-success" ng-click="tvEditCtrl.submit()">Save</button>' +
                      '</div>' +
                    '</div>'
    };
}]);
