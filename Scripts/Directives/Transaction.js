var transaction = function(clsTransaction,clsTransactionValue) {

  return {
    restrict: 'EA',
    replace: true,
    scope: {
        trans: '=',
        listmgr: '=',
        index: '='
    },
    
    bindToController: true,
    controllerAs: 'transCtrl',
    controller: function () {
      
      var transCtrl = this;
      
      transCtrl.visible = function() {
          return !transCtrl.listmgr.addmode && transCtrl.index == transCtrl.listmgr.selecteditem || transCtrl.listmgr.selecteditem == undefined;
      };
      
      transCtrl.barclass = function() {
        var v = transCtrl.trans.TypeDescription;
        return v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger');
      };
      
      transCtrl.labelclass = function() {
        var v = transCtrl.trans.TypeDescription;
        return v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
      };

      transCtrl.expandTransaction = function () {
        if(!transCtrl.trans.expanded) {
          transCtrl.listmgr.selecteditem = transCtrl.index;
          transCtrl.trans.expanded = true;
        } else {
          transCtrl.listmgr.selecteditem = undefined;
          transCtrl.trans.expanded = false;
        };
      };
      
      transCtrl.addTV = function () {
        transCtrl.addTVMode = true;
      };

    },

    templateUrl: '/Views/Templates/Transaction.html'

  }


};

transaction.$inject = ['clsTransaction','clsTransactionValue']
