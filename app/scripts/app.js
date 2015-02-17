'use strict';

/**
 *
 * Main module of the application.
 */
angular
  .module('TodoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'cgBusy',
    'xeditable',
    'ParseService',
    'AlertService'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('addnew', {
        url: '/newItems',
        templateUrl: 'views/addNew.html',
        controller: 'TodoController',
        authenticate: false
      });
    $urlRouterProvider.otherwise('/newItems');
  });

