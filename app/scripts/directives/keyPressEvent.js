/**
 * Created by megha on 2/1/15.
 */
'use strict';

angular.module('m-keyPress',[])
.directive('ngEnter', function(){
    return function(scope, element, attrs){
      element.bind("keydown keypress", function(event){
        if(event.which === 13){
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });