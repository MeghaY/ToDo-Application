
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
    'ui.bootstrap',
    'ngStorage',
    'cgBusy',
    'xeditable',
    'ParseService',
    'AlertService'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    'use strict';

    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupController',
        authenticate: false
      })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      authenticate: false
    })
      .state('addnew', {
        url: '/newItems/:userId',
        templateUrl: 'views/addNew.html',
        controller: 'TodoController',
        authenticate: true
      });
    $urlRouterProvider.otherwise('/login');
  })
  .run(['$rootScope', '$sessionStorage', '$state',
    function($rootScope, $sessionStorage, $state) {
      'use strict';

      //// if route requires authentication and current user is not logged in then this will redirect the user back to login page
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.authenticate && !$sessionStorage.currentUser) {
          $state.go('login');
          event.preventDefault();
        }
      });
    }]);

