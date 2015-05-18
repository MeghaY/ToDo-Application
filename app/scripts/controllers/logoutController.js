/**
 * Created by Megha on 5/18/15.
 */
angular.module('TodoApp')
  .controller('LogoutController',['$scope', '$state','$sessionStorage', function($scope, $state, $sessionStorage){
    'use strict';

    $sessionStorage.currentUser = null;
    $state.go('login');
  }]);