var gridByMonth = function(BudgetMgr,clsBudgetModel,$filter) {

  return {
    scope: {
      forecastparams:'='
    },

    restrict: 'EA',

    controller: function($scope) {
      
      $scope.budgetdata = [];
      BudgetMgr.getBudget($scope.forecastparams).then(
        function(response){
          $scope.budgetdata = response.map(clsBudgetModel.build);
        });

    },

    link: function(scope,elem,attrs) {

      scope.$watch('budgetdata', function(newData, oldData) {
             if(newData) {

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
               table.addClass("datagrid table");
               var tblbody = angular.element("<tbody>");
               var thead = angular.element('<thead>');
               thead.append('<th></th>');

               //Build header
               for (var a = 0; a < columns.length; a++) {
                 var th = angular.element('<th class="col-md-1">' + columns[a] + '</th>');
                 thead.append(th);
               }

               table.append(thead);


               // Build the rows                
               for (var j =0; j < descriptions.length; j++) {
                 var row = angular.element("<tr>");
                 row.append('<td class="col-md-1">' + descriptions[j] + '</td>');

                 var filtered = $filter('filter')(scope.budgetdata, descriptions[j]);
                 
                 for (i =0; i < columns.length; i++) {
                   var a = $filter('filter')(filtered, columns[i]);
                   if(a.length > 0) {
                     row.append('<td class="col-md-1">'+ a[0].Amount + '</td>');
                   } else {
                     row.append('<td class="col-md-1"></td>');
                   }
                 }
                 tblbody.append(row);
               }
              }

              table.append(tblbody);
              elem.append(table);
              scope.budgetdata = [];
        },true);
    }
  };

};

gridByMonth.$inject = ['BudgetMgr','clsBudgetModel','$filter'];
