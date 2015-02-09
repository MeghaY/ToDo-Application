'use strict';

/**
 * Controller of the TodoApp
 */
angular.module('TodoApp')
  .controller('AddController',['$scope','$state', '$http', function ($scope, $state, $http) {
    $scope.newTodo = {};

    //This wil run the promise behind with initial page load which will get all the todos stored in database and will fill the table
    $scope.myPromise = $http.get('api/todos')
      .then(function(response){
        $scope.getAllTodos = response.data.results;
      });

    //function for storing the new Todoitem and related fields in parse
    $scope.saveTodo = function() {
      var data = {
        todoItem: $scope.newTodo.name,
        completed: false
      };

      $http.post('/api/todos', data, {
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      })
        .then(function (response) {
          $scope.newTodo.name = '';
          console.log('Response from Post call: ' + JSON.stringify(response));
        })
        .then(function(){
          $http.get('/api/todos')
            .then(function(response){
              $scope.getAllTodos = response.data.results;
              return $scope.getAllTodos;
            });
        });
    };


    //function for deleting the todoitem based on the objectid
    $scope.deleteTodo = function(todoObjectId){
      $http.delete('/api/deleteTodo',{
        params: {
          todoId: todoObjectId
        }
      })
        .then(function(response){
          console.log('Response from delete todo: '+ JSON.stringify(response));
          $scope.myPromise = $http.get('/api/todos')
            .then(function(response){
              $scope.getAllTodos = response.data.results;
            });
        })

    };

    /*Function for checking if the todoitem is marked as done, if so, it will update the completed field in the
    backend with value true and will change the css style for that item in UI*/
    $scope.isCompleted = function(status, id){
      if(status === true){
        var data = {
          todoId: id,
          completed: status
        };
        $http.put('/api/updateTodo',data,{
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        })
          .then(function(response){
            console.log('Response from Update: '+ JSON.stringify(response));
          });

      }
    }

  }]);
