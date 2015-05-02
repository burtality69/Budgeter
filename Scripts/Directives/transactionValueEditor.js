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

        controller: function ($scope,TransListdropdowns,notifications) {
            
            var tvEditCtrl = this;
            
            var backup = undefined;
            var newrecord = false;

            var collapse = function() {
              $scope.tv.editable = false;
            }

            TransListdropdowns.getTransactionFrequencies().then(
              function(response) {
                $scope.frequencies = response;
              });

            //Populate model depending on context
            if ($scope.tv == undefined) {
              $scope.tv = new clsTransactionValue;
              $scope.tv.TransactionID = $scope.id;
              newrecord = true;
            } else {
              backup = clsTransactionValue.build($scope.tv);
              newrecord = false;
              var transID = $scope.tv.TransactionID;
            };

            $scope.submit = function () {

              if (newrecord) {
                TransactionValueMgr.post($scope.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Task Updated'});
                    $scope.collapse();
                  });
              } else {
                TransactionValueMgr.put($scope.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Your task posted successfully'});
                    collapse();
                  });
              };
            };

            $scope.cancel = function() {

              if (newrecord) {
                $scope.cancel();
              } else {
                $scope.tv = backup;
                $scope.tv.editable = false;
              };
            }

            $scope.delete = function () {

              TransactionValueMgr.delete($scope.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task deleted'});
                });
            };
        },

        templateUrl: '/Views/Templates/transactionValueEditor.html', 

        link: function ($scope, element, attrs) {

        }
    };
};
