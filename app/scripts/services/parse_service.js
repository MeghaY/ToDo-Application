/**
 * Created by megha on 2/12/15.
 */
'use strict';

//A service module for making server side calls to Parse from client side using Angular Resource
angular.module('ParseService',['ngResource'])
.factory('$todoParse',['$resource', function($resource){
    var parseUrl = "http://localhost:8080";

    //to transform the response into json for getting an array of results
    var arrayResponse = function (data) {
      //console.log('queryResponse - JSON.stringify(data):\n' + JSON.stringify(data));
      return angular.fromJson(data).results;
    };

    //to transform the response into json for getting a single object
    var singleResponse = function (data) {
      //console.log('fetchResponse - JSON.stringify(data):\n' + JSON.stringify(data));
      return angular.fromJson(data);
    };

    return {
      todos: $resource(parseUrl + '/api/todos', null, {
        query:{method: 'GET',isArray: true, transformResponse: arrayResponse },
        get: {method:'GET', isArray: false, transformResponse: singleResponse},
        update: {method: 'PUT',url: parseUrl+ '/api/updateTodo',isArray:false, transformResponse: singleResponse},
        remove: {method:'DELETE', url: parseUrl+ '/api/deleteTodo'},
        save: {
          method: 'POST',
          url: parseUrl + '/api/todos',
          isArray: true,
          transformResponse: function(data){
            return angular.fromJson(data).results;
          }
        }
      })
    }
  }]);

