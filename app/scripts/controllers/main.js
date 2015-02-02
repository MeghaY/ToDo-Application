'use strict';

/**
 * @ngdoc function
 * @name testAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testAngularApp
 */
angular.module('TodoApp')
  .controller('MainController',['$scope','$state', function ($scope,$state) {
    $scope.addNew = function(){
      $state.go('addnew');
    };
    $scope.listOfTodos = ['list1','list2','list3','list4','list5'];
  }]);
