'use strict';

/**
 * Controller of the TodoApp
 */
angular.module('TodoApp')
  .controller('TodoController',['$scope','$state','$stateParams','$sessionStorage','$todoParse','$alert', function ($scope, $state, $stateParams, $sessionStorage, $todoParse, $alert) {
    $scope.newTodo = {};
    $scope.getAllTodos = [];

    $scope.fname = $sessionStorage.currentUser.firstName;

    //This will load the page with all the todos initially created using angular resource service

    $scope.myPromise = $todoParse.todos.all({session: $sessionStorage.currentUser.sessionToken})
      .$promise.then(function(todos){
        $scope.getAllTodos = todos;
//        console.log('todos: '+ $scope.getAllTodos.length);
      },function(error) {
        console.log(error);
        if (error && error.data && error.data.error){
          $alert.addAlert(error.data.error.error, 'danger',3000);
        }
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
          //setting the ACLs for new todoitem added based on current user's sessiontoken via update call to parse endpoint
          $scope.ACL = {};
          $scope.ACL[$sessionStorage.currentUser.objectId] = {
            "read": true,
            "write": true
          };
          var userACL = {
            ACL: $scope.ACL
          };
          $todoParse.todos.update({todoId:response.objectId,session: $sessionStorage.currentUser.sessionToken}, userACL)
            .$promise.then(function(response){
              console.log(response);
            },function(error) {
              console.log(error);
              if (error && error.data && error.data.error){
                $alert.addAlert(error.data.error.error, 'danger',3000);
              }
            });
        })
        .then(function(){
          $todoParse.todos.all({session: $sessionStorage.currentUser.sessionToken})
            .$promise.then(function(todos){
//              console.log('todos: '+ JSON.stringify(todos, null, 2));
              $scope.getAllTodos = todos;
            },function(error) {
              console.log(error);
              if (error && error.data && error.data.error){
                $alert.addAlert(error.data.error.error, 'danger',3000);
              }
            });
        });
    };


    //function for deleting the todoitem based on the objectid and current user's sessiontoken
    $scope.deleteTodo = function(todoObjectId){
      $todoParse.todos.remove({todoId: todoObjectId,session: $sessionStorage.currentUser.sessionToken})
        .$promise.then(function(response){
          console.log('Response from delete todo: '+ response);
          $scope.myPromise = $todoParse.todos.all({session: $sessionStorage.currentUser.sessionToken})
            .$promise.then(function(todos){
              $scope.getAllTodos = todos;
              return $scope.getAllTodos;
            },function(error) {
              console.log(error);
              if (error && error.data && error.data.error){
                $alert.addAlert(error.data.error.error, 'danger',3000);
              }
            });
        });

    };

    //function for updating the todoitem based on the objectid and current user's sessiontoken
    $scope.updateTodo = function(data, id){
      $todoParse.todos.update({todoId: id,session: $sessionStorage.currentUser.sessionToken}, data)
        .$promise.then(function(){
//          console.log('Response from Update in todoitem: '+ response);
          $scope.myPromise = $todoParse.todos.all({session: $sessionStorage.currentUser.sessionToken})
            .$promise.then(function(todos){
              $scope.getAllTodos = todos;
            },function(error) {
              console.log(error);
              if (error && error.data && error.data.error){
                $alert.addAlert(error.data.error.error, 'danger',3000);
              }
            });
        });
    };

    /*Function for checking if the todoitem is marked as done, if so, it will update the completed field in the
    backend with value true and will change the css style for that item in UI*/
    $scope.isCompleted = function(status, id){
        var data = {
          completed: status
        };
      $todoParse.todos.update({todoId: id, session: $sessionStorage.currentUser.sessionToken}, data)
        .$promise.then(function(response){
          console.log('Response from Update: '+ response);
        },function(error) {
          console.log(error);
          if (error && error.data && error.data.error){
            $alert.addAlert(error.data.error.error, 'danger',3000);
          }
        });
      };
  }]);
