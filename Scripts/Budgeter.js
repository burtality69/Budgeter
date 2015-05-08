/// <reference path="../typings/angularjs/angular.d.ts"/>
var Budgeter = angular.module('Budgeter', [
'ngRoute', 
'ngCookies', 
'ui.bootstrap', 
'ngAnimate',
'ngNotificationsBar',
'budgeterControllers',
'budgeterDirectives',
'budgeterServices',
'budgeterFactories',
'budgeterModels'
]);

var budgeterServices = angular.module('budgeterServices', []);
var budgeterControllers = angular.module('budgeterControllers', []);
var budgeterDirectives = angular.module('budgeterDirectives', []);
var budgeterFactories = angular.module('budgeterFactories', []);
var budgeterModels = angular.module('budgeterModels', []);

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
