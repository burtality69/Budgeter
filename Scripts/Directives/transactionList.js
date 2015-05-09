/* global budgeterDirectives */
budgeterDirectives.directive('transactionList',['ClsTransaction','transactionMgr','notifications','$rootScope',
function (ClsTransaction,transactionMgr,notifications,$rootScope) {
	
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
						notifications.showSuccess({message: 'Transaction deleted successfully'});
						tListCtrl.transactions.splice(index);		
					}, function (error) {
						notifications.showError({message: 'Unable to delete this item'});
					});
			};
			
			this.addTrans = function (trans) {

				if (trans.ID == undefined) {
	              transactionMgr.post(trans).then(
	                function (success) {
	                  $rootScope.$broadcast('renderChart');
	                  notifications.showSuccess({message: 'Task added successfully'});
	                }, function(failure) {
	                 notifications.showError({message: failure}); 
	                });
	            } else {
	              transactionMgr.put(trans).then(
	                function (response) {
	                  notifications.showSuccess({message: 'Transaction updated..'})
	                });
	            };
          };
			
			refresh();
			
		}
		
	};
		
}]);