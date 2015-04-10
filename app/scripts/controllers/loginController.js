/**
 * Created by megha on 2/18/15.
 */

angular.module('TodoApp')
  .controller('LoginController',['$scope','$http','$state','$sessionStorage','$todoParse','$alert', function($scope,$http,$state,$sessionStorage,$todoParse,$alert){
    'use strict';

    $scope.login = {};
    $scope.loginSubmit = function(){

      $todoParse.users.login({username: $scope.login.username,password: $scope.login.password})
        .$promise.then(function(user){
          console.log('User data: '+ user);
          $sessionStorage.currentUser = user;

          console.log($sessionStorage.currentUser);
          $state.go('addnew', {
            userId: $sessionStorage.currentUser.objectId
          });
        },
        function(error){
          console.log('login() failed');
          console.log(error);
          if (error && error.data && error.data.error) {
            $alert.addAlert(error.data.error.error, 'danger',3000);
          }
        });
    };

  }]);
