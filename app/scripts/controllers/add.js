'use strict';

/**
 * @ngdoc function
 * @name testAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testAngularApp
 */
angular.module('TodoApp')
  .controller('AddController',['$scope','$state', function ($scope, $state) {
    $scope.newitem = [];
    $scope.newTask = function(ntask){
      $scope.newitem.push(ntask);
      $scope.nTask = '';
      return $scope.newitem;
    }
  }]);
