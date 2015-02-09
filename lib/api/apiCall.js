/**
 * Created by megha on 2/2/15.
 */
var nconf = require('nconf'),
  Parse = require('parse').Parse,
  request = require('request'),
  q = require('q'),
  log = require('winston');

//Enter your application's parse application key, javascript key and restapi Key to the sample.json or development.json file
//Also add the rest api endpoint which you can get access to using nconf.get() from sample.json or development.json for making any change to the parse objects

exports.todoTask = function(req,res){
  console.log('body: '+ JSON.stringify(req.body));

  request.post({
    url: nconf.get('parse:apiEndPoint') + '/todos',
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }, function(err, resp, body){
    //changing the buffer response to json representation
    var response = body.toString('utf8');
//    console.log('Body: '+ JSON.stringify(response));

    if(err){
      res.send(500, {message: 'An error occurred while adding the todos.', error: error});
    }
    if(resp){
      res.send(201, response);
    }
  });
};

exports.getTodos = function(req,res){

  request.get({
    url: nconf.get('parse:apiEndPoint') + '/todos',
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'Content-Type': 'application/json'
    }
  }, function(err, resp, body){
    var response = body.toString('utf8');

    if(err){
      res.send(500, {message: 'An error occurred while adding the todos.', error: error});
    }
    if(resp){
      res.send(201, response);
    }
  });
};

exports.deleteTodo = function(req,res){
//  console.log('TodoObjectId: '+ req.query.todoId);
  request.del({
    url: nconf.get('parse:apiEndPoint') + '/todos/'+ req.query.todoId,
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'Content-Type': 'application/json'
    }
  }, function(err, resp, body){
    var response = body.toString('utf8');
//    console.log('Body: '+ JSON.stringify(response));

    if(err){
      res.send(500, {message: 'An error occurred while adding the todos.', error: error});
    }
    if(resp){
      res.send(201, response);
    }
  });
};

exports.updateTodo = function(req,res){

  request.put({
    url: nconf.get('parse:apiEndPoint') + '/todos/'+ req.query.todoId,
    encoding: null,
    headers: {
      'X-Parse-Application-Id': nconf.get('parse:appId'),
      'X-Parse-REST-API-Key': nconf.get('parse:restKey'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }, function(err, resp, body){
    var response = body.toString('utf8');
//    console.log('Body: '+ JSON.stringify(response));

    if(err){
      res.send(500, {message: 'An error occurred while adding the todos.', error: error});
    }
    if(resp){
      res.send(201, response);
    }
  });
};