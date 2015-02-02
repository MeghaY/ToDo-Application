'use strict';

/**
 * @ngdoc overview
 * @name testAngularApp
 * @description
 * # testAngularApp
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
    'm-keyPress'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: "/main",
        templateUrl: "views/main.html",
        controller: "MainController"
      })
      .state('addnew',{
        url:"/addnew",
        templateUrl: "views/addNew.html",
        controller: "AddController"
      });
    $urlRouterProvider.otherwise('/main');
  });
