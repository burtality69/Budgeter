var gridByMonth = function(BudgetMgr,clsBudgetModel,$filter) {

  return {
    scope: {
      forecastparams:'='
    },

    restrict: 'EA',
    
    controller: function($scope) {
      BudgetMgr.getBudget($scope.forecastparams).then(
        function(response){
          $scope.budgetdata = response.map(clsBudgetModel.build);
          $scope.loaded = true;
        });
    },
    

    link: function(scope,elem,attrs) {
      
      scope.$watch('budgetdata', function(newVal) {
          if (newVal) {
      
               var descriptions = [];
               var columns = [];

               //Gather descriptions
               for (var i=0; i < scope.budgetdata.length; i++) {
                 if (descriptions.indexOf(scope.budgetdata[i].Description) === -1 && scope.budgetdata[i].Description !== undefined)
                    {
                      descriptions.push(scope.budgetdata[i].Description);
                    }
               }

               //Put dates into columns
                for (var i = 0; i < scope.budgetdata.length; i++) {
                  var v = scope.budgetdata[i].Month; 
                  if (columns.indexOf(v) == -1) {
                      columns.push(v);
                  }
                }
                
               //Create a table
               var table = angular.element('<table>');
               table.addClass("datagrid table table-bordered");
               var tblbody = angular.element("<tbody>");
               var thead = angular.element('<thead>');
               var row = angular.element('<tr>');
               
               row.append('<th></th>');

               //Build header
               for (var a = 0; a < columns.length; a++) {
                 var th = angular.element('<th class="col-md-1">' + columns[a] + '</th>');
                 row.append(th);
               }
               
               thead.append(row); 
               table.append(thead);

               // Build the rows                
               for (var j =0; j < descriptions.length; j++) {
                 var row = angular.element("<tr>");
                 row.append('<td class="col-md-1">' + descriptions[j] + '</td>');

                 var filtered = $filter('filter')(scope.budgetdata, descriptions[j]);
                 
                 for (i =0; i < columns.length; i++) {
                   var a = $filter('filter')(filtered, columns[i]);
                   if(a.length > 0) {
                     var txt = a[0].Amount;
                   } else {
                     txt = "";
                   }
                   row.append('<td class="col-sm-1">'+ txt + '</td>');
                 }
                 
                 tblbody.append(row);
               
               }

              table.append(tblbody);
              elem.append(table);
          };
      });
    }  
  };
};

gridByMonth.$inject = ['BudgetMgr','clsBudgetModel','$filter'];
