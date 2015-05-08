/* global budgeterDirectives */
budgeterDirectives.directive('transactionList',['ClsTransaction','transactionMgr',
function (ClsTransaction,transactionMgr) {
	
	return {
		templateUrl: 'Views/Templates/transactionList.html',
		scope: {},
		controllerAs: 'tListCtrl',
		controller: function () {
			
			var tListCtrl = this; 
			this.listmgr = {
		      addmode: false,
		      selecteditem: undefined,
		      zoomed: false
		    };

    		//New Transaction
	    	this.expandAddTransaction= function () {
	        	tListCtrl.listmgr.addMode = true;
			};

		    this.cancelNewTransaction = function () {
		        tListCtrl.listmgr.addMode = false;
		    };

		    //GET
		    var refresh = function () {
		        transactionMgr.get().then(
		        function (response) {
		            tListCtrl.transactions = response.map(ClsTransaction.build);
		        });
		    };
			
			refresh();
			
		}
		
	};
		
}]);