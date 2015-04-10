/**
 * Created by megha on 2/2/15.
 */

var nconf = require('nconf'),
  request = require('request'),
  q = require('q'),
  responseHandler = require('./response-handler');

//Users
exports.signup = function(req,res){
  'use strict';

//  console.log('body: '+ JSON.stringify(req.body));
  var deferred = q.defer();

  request.post({
    url: nconf.get('parse:apiUserEndpoint'),
    sendImmediately: true,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'Content-Type': 'application/json'
    },
    json: req.body
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
      .then(function(response) {
        console.log('User data saved successfully.'+ response);
        res.send(201, response);
      },function(error){
        console.log('Error saving user data:' + JSON.stringify(error));
        res.send(500, {message: 'An error occurred while saving user information.', error: error});
      });
  });
};

exports.login = function(req,res){
  'use strict';

//  console.log('user: '+ req.query.username);
//  console.log('pass: '+ req.query.password);
  var deferred = q.defer();

  request.get({
    url: nconf.get('parse:apiLoginEndpoint')+ '?username='+ req.query.username + '&password='+ req.query.password,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey')
    }
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
    .then(function(response) {
      console.log('Login  successful.'+ response);
      res.send(201, response);
    },function(error){
      console.log('Error logging in:' + JSON.stringify(error));
      res.send(500, {message: 'An error occurred while logging user.', error: error});
    });
  });
};

exports.updateUser = function(req,res){
  'use strict';

//  console.log('userid: '+ req.query.userId);
//  console.log('session token: '+ req.query.sessionToken);
  var deferred = q.defer();

  request.put({
    url: nconf.get('parse:apiUserEndpoint') +'/'+ req.query.userId,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'X-Parse-Session-Token': req.query.sessionToken,
      'Content-Type': 'application/json'
    },
    json: req.body
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
      .then(function(response) {
        console.log('User information updated successfully: '+ response);
        res.send(201, response);
      },function(error){
        console.log('Error updating user information:' + JSON.stringify(error));
        res.send(500, {message: 'An error occurred while updating user information. ', error: error});
      });
  });
};


//Todos related task
exports.todoTask = function(req,res){
  'use strict';

//  console.log('body: '+ JSON.stringify(req.body));
  var deferred = q.defer();

  request.post({
    url: nconf.get('parse:apiEndPoint') + '/todos',
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'Content-Type': 'application/json'
    },
    json: req.body
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
      .then(function(response) {
        console.log('Todo task saved successfully: '+ response);
        res.send(201, response);
      },function(error){
        console.log('Error saving todo task:' + JSON.stringify(error));
        res.send(500, {message: 'An error occurred while saving todo task. ', error: error});
      });
  });
};

exports.getTodos = function(req,res){
  'use strict';

  console.log('get sessionToken: '+ req.query.session);
  var deferred = q.defer();

  request.get({
    url: nconf.get('parse:apiEndPoint') + '/todos',
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'X-Parse-Session-Token': req.query.session,
      'Content-Type': 'application/json'
    }
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
      .then(function(response) {
        console.log('retrieved todos successfully.'+ response);
        res.send(201, response);
      },function(error){
        console.log('Error getting all the todos:' + JSON.stringify(error));
        res.send(500, {message: 'An error occurred while retrieving all todo items.', error: error});
      });
  });
};


exports.deleteTodo = function(req,res){
  'use strict';

//  console.log('delete TodoObjectId: '+ req.query.todoId);
//  console.log('delete sessionToken: '+ req.query.session);

  var deferred = q.defer();

  request.del({
    url: nconf.get('parse:apiEndPoint') + '/todos/'+ req.query.todoId,
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'X-Parse-Session-Token': req.query.session,
      'Content-Type': 'application/json'
    }
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
      .then(function(response) {
        console.log('Deleted todo item successfully.'+ response);
        res.send(201, response);
      },function(error){
        console.log('Error deleting todo item:' + JSON.stringify(error));
        res.send(500, {message: 'An error occurred while deleting the todo item.', error: error});
      });
  });
};

exports.updateTodo = function(req,res){
  'use strict';

//  console.log('update object Id: '+ req.query.todoId);
//  console.log('update sessionToken: '+ req.query.session);
//  console.log('update body: '+ JSON.stringify(req.body));

  var deferred = q.defer();

  request.put({
    url: nconf.get('parse:apiEndPoint') + '/todos/'+ req.query.todoId,
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'X-Parse-Session-Token': req.query.session,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }, function(err, resp, body) {
    responseHandler.processResponse(err, resp, body)
      .then(function(result){
        deferred.resolve(result);
      }, function(error){
        deferred.reject(error);
      });
    return deferred.promise
      .then(function(response) {
        console.log('Updated todo item successfully.'+ response);
        res.send(201, response);
      },function(error){
        console.log('Error updating todo item:' + JSON.stringify(error));
        res.send(500, {message: 'An error occurred while updating the todo item.', error: error});
      });
  });
};