'use strict';

/**
 * Controller of the TodoApp
 */
angular.module('TodoApp')
  .controller('TodoController',['$scope','$state', '$http','$todoParse','$alert', function ($scope, $state, $http, $todoParse, $alert) {
    $scope.newTodo = {};
    $scope.getAllTodos = [];

    //This will load the page with all the todos initially created using angular resource service

    $scope.myPromise = $todoParse.todos.query({})
      .$promise.then(function(todos){
        $scope.getAllTodos = todos;
        console.log('todos: '+ $scope.getAllTodos);
        return $scope.getAllTodos;
      },function(error) {
        console.log(error);
        $alert.addAlert('You need to add the todo item to see that in the table view', 'danger',3000);
      });

    $scope.closeAlert = $alert.closeAlert;


    //function for storing the new Todoitem and related fields in parse
    $scope.saveTodo = function() {
      var data = {
        todoItem: $scope.newTodo.name,
        completed: false
      };
      $todoParse.todos.save(data)
        .$promise.then(function (response) {
          $scope.newTodo.name = '';
          console.log('Response from Post call: ' + response);
        })
        .then(function(){
          $todoParse.todos.query({})
            .$promise.then(function(todos){
              $scope.getAllTodos = todos;
              return $scope.getAllTodos;
            },function(error) {
              console.log(error);
              $alert.addAlert('Unable to save a todo item', 'danger',3000);
            });
        });
    };


    //function for deleting the todoitem based on the objectid
    $scope.deleteTodo = function(todoObjectId){
      $todoParse.todos.remove({todoId: todoObjectId})
        .$promise.then(function(response){
          console.log('Response from delete todo: '+ response);
          $scope.myPromise = $todoParse.todos.query({})
            .$promise.then(function(todos){
              $scope.getAllTodos = todos;
              return $scope.getAllTodos;
            },function(error) {
              console.log(error);
              $alert.addAlert('Unable to delete the todo item', 'danger',3000);
            });
        });

    };

    $scope.updateTodo = function(data, id){
      $todoParse.todos.update({todoId: id}, data)
        .$promise.then(function(response){
//          console.log('Response from Update in todoitem: '+ response);
          $scope.myPromise = $todoParse.todos.query({})
            .$promise.then(function(todos){
              $scope.getAllTodos = todos;
              return $scope.getAllTodos;
            },function(error) {
              console.log(error);
              $alert.addAlert('Update was not successful', 'danger',3000);
            });
        });
    };

    /*Function for checking if the todoitem is marked as done, if so, it will update the completed field in the
    backend with value true and will change the css style for that item in UI*/
    $scope.isCompleted = function(status, id){
        var data = {
          completed: status
        };
      $todoParse.todos.update({todoId: id}, data)
        .$promise.then(function(response){
          console.log('Response from Update: '+ response);
        });
      };
  }]);
