budgeterDirectives.directive('transactionValue',['ClsTransactionValue','transactionValueMgr','notifications', 
function (ClsTransactionValue,transactionValueMgr,notifications) {
// This is a

    return {
        restrict: 'EA',
        scope: {tv: '='},
        replace: true,
        transclude: true,
        controllerAs: 'tvCtrl',
        bindToController: true,
        controller: function () {
            
            var tvCtrl = this;
            
            this.edit = function () {
              tvCtrl.tv.editable = true;
            };

            this.delete = function () {
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
