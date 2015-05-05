budgeterDirectives.directive('transactionValue',['clsTransactionValue','transactionValueMgr','notifications', 
function (clsTransactionValue,transactionValueMgr,notifications) {
// This is a

    return {
        restrict: 'EA',
        scope: {
          tv: '=',
          transID: '='
        },
        
        controllerAs: 'tvCtrl',
        bindToController: true,
        controller: function () {
            
            var tvCtrl = this;
            tvCtrl.edit = function () {
              tvCtrl.tv.editable = true;
            }

            tvCtrl.delete = function () {

              transactionValueMgr.delete(tvCtrl.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task Deleted'});
                });
            };
        },

        templateUrl: '/Views/Templates/transactionValue.html' ,

        replace: true,

        link: function (scope, element, attrs) {

        }
    };
}]);
