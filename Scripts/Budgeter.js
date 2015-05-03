var Budgeter = angular.module('Budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate','ngNotificationsBar']);
Budgeter.factory('ForecastMgr', ForecastMgr);
Budgeter.factory('AuthFactory', AuthFactory);
Budgeter.factory('clsTransaction', clsTransaction);
Budgeter.factory('clsTransactionValue',clsTransactionValue);
Budgeter.factory('TransactionMgr',TransactionMgr);
Budgeter.factory('TransactionValueMgr',TransactionValueMgr);
Budgeter.factory('BudgetMgr', BudgetMgr);
Budgeter.factory('clsBudgetModel',clsBudgetModel);
Budgeter.factory('TransListdropdowns', TransListdropdowns);
Budgeter.controller('AuthController', AuthController);
Budgeter.controller('ForecastController', ForecastController);
Budgeter.controller('TransactionListController', TransactionListController);

Budgeter.directive('stackedBar', stackedBar);
Budgeter.directive('gridByMonth', gridByMonth);
Budgeter.directive('transactionValue', transactionValue);
Budgeter.directive('transactionValueEditor', transactionValueEditor);
Budgeter.directive('transactionEditor', transactionEditor);
Budgeter.directive('transaction',transaction);

Budgeter.service('SessionService', SessionService);
Budgeter.service('DateParser',DateParser);

var ConfigFunction = function($routeProvider,$locationProvider,notificationsConfigProvider) {

  notificationsConfigProvider.setAutoHide(true)

  // delay before hide
  notificationsConfigProvider.setHideDelay(3000)

  $locationProvider.hashPrefix('!').html5Mode(true);

  $routeProvider
  .when('/login', {
    templateUrl: '/Views/Login.html',
    controller: 'AuthController'
  })
  .otherwise({
      redirectTo : '/'
  });
};

ConfigFunction.$inject = ['$routeProvider','$locationProvider','notificationsConfigProvider'];
Budgeter.config(ConfigFunction);
