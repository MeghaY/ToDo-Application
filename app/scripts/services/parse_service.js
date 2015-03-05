/**
 * Created by megha on 2/12/15.
 */
'use strict';

//A service module for making server side calls to Parse from client side using Angular Resource.
//$resource service will point to express server url and express-nodejs server will make the actual call to Parse service using
// secured tokens. That way the tokens/keys would not be exposed to client-side and will be secured.
'use strict';
angular.module('ParseService',['ngResource'])
  .factory('$todoParse',['$resource', function($resource){
    var parseUrl = "http://localhost:8080";

    //to transform the response into json for getting an array of results
    var arrayResponse = function (data) {
//      console.log('arrayResponse - JSON.stringify(data):\n' + JSON.stringify(data));
      return angular.fromJson(data).results;
    };

    //to transform the response into json for getting a single object
    var singleResponse = function (data) {
//      console.log('singleResponse - JSON.stringify(data):\n' + JSON.stringify(data));
      return angular.fromJson(data);
    };

    return {
      todos: $resource(parseUrl + '/api/todos', null, {
        all:{
          method: 'GET',
          isArray: true,
          transformResponse: arrayResponse
        },
        get: {
          method:'GET',
          url: '/api/getTodo',
          isArray: false,
          transformResponse: singleResponse
        },
        update: {
          method: 'PUT',
          url: parseUrl+ '/api/updateTodo'
        },
        remove: {
          method:'DELETE',
          url: parseUrl+ '/api/deleteTodo'
        },
        save: {
          method: 'POST',
          url: parseUrl + '/api/todos'
        }
      }),
      users: $resource(parseUrl + '/api/users', null,{
        login: {
          method:'GET',
          url:'/api/login'
        },
        all: {
          method:'GET',
          isArray: true,
          transformResponse: arrayResponse
        },
        save: {
          method: 'POST',
          url: parseUrl + '/api/users',
          isArray: false,
          transformResponse: singleResponse
        },
        update: {
          method:'PUT',
          url: parseUrl + '/api/updateUser'
        },
        get: {
          method: 'GET',
          url: parseUrl + '/api/getUser',
          isArray: false,
          transformResponse: singleResponse
        }
      })
    }
  }]);

