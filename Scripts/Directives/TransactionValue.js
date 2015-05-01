var transactionValue = function (clsTransactionValue,TransactionValueMgr,notifications) {
// This is a

    return {
        restrict: 'EA',
        scope: {
          tv: '=',
          transID: '='
        },

        controller: function ($scope) {

            $scope.edit = function () {
              $scope.tv.editable = true;
            }

            $scope.delete = function () {

              TransactionValueMgr.delete($scope.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task Deleted'});
                });
            };
        },

        templateUrl: '/Views/Templates/transactionValue.html' ,

        replace: true,

        link: function ($scope, element, attrs) {

        }
    };
};
