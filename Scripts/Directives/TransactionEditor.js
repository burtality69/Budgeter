var transactionEditor = function (clsTransaction, TransactionMgr,TransListdropdowns,notifications,$rootscope) {
  //This has a dependency on transactionmanager which interfaces with the API

    return {
        restrict: 'EA',
        scope: {
          cancel: '=',
          trans: '=',
          transactions: '='
        },
        
        controller: function ($scope) {

          var newrecord = false;
          
          TransListdropdowns.getTransactionTypes().then(
              function(response) {
                $scope.types = response;
              });
          
          TransListdropdowns.getTransactionFrequencies().then(
            function(response) {
              $scope.freqs = response;
            });


          //What context is this being called in?
          if ($scope.trans == undefined) {
            $scope.Trans = new clsTransaction;
            newrecord = true;
          } else {
            $scope.Trans = clsTransaction.build($scope.trans);
            newrecord = false;
          };

          $scope.submit = function () {

            if (newrecord) {
              TransactionMgr.post($scope.Trans).then(
                function (response) {
                  console.log(response);
                  $rootScope.$broadcast('redrawChart');
                  notifications.showSuccess({message: 'Task Updated'});
                });
            } else {
              TransactionMgr.put($scope.Trans).then(
                function (response) {
                  $scope.Trans.message = response;
                });
            };
          };

          $scope.collapseTrans = function() {
            $scope.cancel($scope.tv)
          }

          $scope.delete = function () {
            TransactionValueMgr.delete($scope.Trans.ID).then(
              function (response) {
                $scope.Trans.message = response;
              });
          };

          $scope.clear = function() {
            $scope.tvToEdit = new clsTransaction;
          }

        },
        template: '<form class="form-inline transactionEditor">'+
                        '<h4> Add new transaction </h4>' +
                        '<div class="form-group form-inline">'+
                            '<label for="newitemName">Name</label>'+
                            '<input class="input-xs-flat" type="text" ng-model="Trans.Name" placeholder="name" />'+
                        '</div>'+
                        '<div class="form-group form-inline">'+
                            '<label for="newitemDescription">Type</label>'+
                            '<select class="input-xs-flat" type="text" ng-options="type.ID as type.Description for type in types" placeholder="type" ng-model="Trans.TypeID" />' +
                        '</div>'+
                        '<div class="form-group form-inline">'+
                            '<label for="newitemAmount">Amount</label>'+
                            '<input class="input-xs-flat" type="number" step=10 ng-model="Trans.TransactionValues[0].Value" placeholder="amount" />' +
                        '</div>'+
                        '<div class="form-group form-inline">'+
                            '<label for="newitemFreq">Occurs</label>'+
                            '<select class="input-xs-flat" type="text" ng-options="freq.ID as freq.Description for freq in freqs" placeholder="frequency" ng-model="Trans.TransactionValues[0].FrequencyID" />' +
                        '</div>'+
                        '<div class="form-group form-inline">'+
                            '<label for="newitemDay">On Day</label>'+
                            '<input class="input-xs-flat" type="number" step=1 max="30" ng-model="Trans.TransactionValues[0].Day" placeholder="day" />' +
                        '</div>'+
                        '<div class="form-group form-inline">'+
                            '<label for="newitemStart">Start Date</label>'+
                            '<input class="input-xs-flat" type="date" ng-model="Trans.TransactionValues[0].Start_date" />' +
                        '</div>'+
                        '<div class="form-group form-inline">'+
                            '<label for="newitemStart">End Date</label>'+
                            '<input class="input-xs-flat" type="date" ng-model="Trans.TransactionValues[0].End_date" />' +
                        '</div>'+
                        '<p>{{Trans.Message}}</p>'+
                        '<div class="newTransactionControls" style="float:right; padding:5px;">'+
                            '<button class="btn btn-xs btn-primary" type="button" ng-click="submit()">Add</button>'+
                            '<button class="btn btn-xs btn-danger" type="button" ng-click="cancel()">Cancel</button>'+
                        '</div>'+
                    '</form>'

    };
};

transactionEditor.$inject = ['clsTransaction', 'TransactionMgr','TransListdropdowns','notifications'];
