/* global budgeterDirectives */
budgeterDirectives.directive('transaction',['ClsTransaction','clsTransactionValue',
function(ClsTransaction,clsTransactionValue) {

  return {
    restrict: 'EA',
    require: '^transactionList',
    scope: {
        trans: '=',
        listmgr: '=',
        index: '='
    },
    bindToController: true,
    controllerAs: 'transCtrl',
    controller: function () {
      
      var transCtrl = this;
      
      this.visible = function() {
          return !transCtrl.listmgr.addmode && transCtrl.index == transCtrl.listmgr.selecteditem || transCtrl.listmgr.selecteditem == undefined;
      };
      
      this.barclass = function() {
        var v = transCtrl.trans.TypeDescription;
        return v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger');
      };
      
      this.labelclass = function() {
        var v = transCtrl.trans.TypeDescription;
        return v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
      };

      this.expandTransaction = function () {
        if(!transCtrl.trans.expanded) {
          transCtrl.listmgr.selecteditem = transCtrl.index;
          transCtrl.trans.expanded = true;
        } else {
          transCtrl.listmgr.selecteditem = undefined;
          transCtrl.trans.expanded = false;
        };
      };
      
      this.addTV = function () {
        transCtrl.addTVMode = true;
      };

    },

    templateUrl: '/Views/Templates/Transaction.html'

  };

}]);

