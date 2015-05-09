/* global budgeterDirectives */
budgeterDirectives.directive('transactionList',['ClsTransaction','transactionMgr','notifications',
function (ClsTransaction,transactionMgr,notifications) {
	
	return {
		templateUrl: 'Views/Templates/transactionList.html',
		scope: {},
		controllerAs: 'tListCtrl',
		controller: function () {
			
			var tListCtrl = this; 
			this.listmgr = {
		      addMode: false,
		      selecteditem: undefined,
		    };

    		//New Transaction
	    	this.expandAddTransaction= function () {
	        	tListCtrl.listmgr.addMode = true;
			};
			
			//Transaction is visible when (not in add mode and selected) OR (no selection)
			this.visible = function (index) {
				var t = tListCtrl.listmgr;
      			if (t.addMode) {
					  return false; 
				  } else if (t.selecteditem== undefined) {
					  return true;
				  } else if (t.selecteditem == index) {
				  	return true;
				  } 
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
			
			this.deleteTrans = function(index) {
				transactionMgr.delete(index).then(
					function (success) {
						notifications.showSuccess({message: 'Task added successfully'});		
					}, function (error) {
						notifications.showError({message: error})
					});
			};
			
			refresh();
			
		}
		
	};
		
}]);