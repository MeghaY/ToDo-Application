/**
 * Created by megha on 2/17/15.
 */

'use strict';
//Alert service for showing & hiding stylish success and error message received from server side on UI
angular.module('AlertService',[])
  .factory('$alert',['$rootScope', '$timeout', function($rootScope, $timeout){
    $rootScope.alerts = [];

    function addAlert(alertmsg, alerttype,alerttimeout){
      $rootScope.alerts.push(
        {
          msg: alertmsg,
          type: alerttype,
          close: function(){
            return closeAlert(this);
          }
        });
      if(alerttimeout){
        $timeout(function(){
          closeAlert(this);
        }, alerttimeout);
      }
    }

    function closeAlert(index){
      $rootScope.alerts.splice(index,1);
    }

    return {
      addAlert:addAlert,
      closeAlert: closeAlert
    };

  }]);
