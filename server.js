/**
 * Created by megha on 1/30/15.
 */
'use strict';

var express = require('express'),
  morgan  = require('morgan'),
  bodyParser= require('body-parser'),
  methodOverride = require('method-override'),
  nconf = require('nconf'),
  api = require('./lib/api/apiCall'),
  path = require('path');

var app = express();

nconf.env()
  .file({ file: 'config/development.json' });

app.set('port', process.argv[2]|| 8080);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);

app.post('/api/todos', api.todoTask);
app.get('/api/todos', api.getTodos);
app.delete('/api/deleteTodo', api.deleteTodo);
app.put('/api/updateTodo', api.updateTodo);


app.listen(app.get('port'));
console.log('Todo app listening on port http://localhost:',  app.get('port'));


