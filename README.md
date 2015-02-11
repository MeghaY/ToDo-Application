My name is Megha Desai. This is my portfolio as a developer

Todo Application
================

A Todo Application designed using AngularJS as a Front-end, NodeJS as a server-side backend and Parse framework as a database

## Setup

1. `git clone https://github.com/MeghaY/ToDo-Application.git`
  1. cloning the project in ToDo-Application folder

2. `cd ToDo-Application`

3. `npm install`
  1. its not ideal but use `sudo npm install` if the permissions in your directory structure require it

4. `bower install`
  1. this command will load all the angular related dependencies needed in the project in app/bower_components folder

5. Create **development.json** file inside config folder(you can use sample.json file in `config/sample.json` as an example)
  1. Fill out your Parse app's Application Key, Javascript Key and Rest Api Key
  2. Parse Api endpoint is already added in `config/sample.json` file, you can use that for making REST calls (GET, POST,DELETE,etc)

## To run the application

1. `node server.js`
  1. Once all the above steps are completed, use this command to run the server
  2. You will see a message saying "Todo app listening on port `http://localhost:8080`"

2. open your browser and go to this url `http://localhost:8080` and app will be loaded.

3. Start adding todo tasks and you will see a table populated with values.

## Functionality

1. Creating a new todo item and saving it in Parse using Rest API calls
2. Deleting a particular todo from the list
3. Updating a todo item (using Angular-xeditable component for better UI)
4. Marking the todo item as done/undone using the checkbox
