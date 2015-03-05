/**
 * Created by megha on 2/18/15.
 */

angular.module('TodoApp')
  .controller('SignupController',['$scope','$state','$sessionStorage','$todoParse','$alert',
    function($scope,$state, $sessionStorage,$todoParse, $alert){
      var signup = {};

      $scope.signupSubmit = function(){
        var userData = {
          firstName: $scope.signup.firstname,
          lastName: $scope.signup.lastname,
          username: $scope.signup.username,
          email: $scope.signup.username,
          phone: $scope.signup.phone,
          password: $scope.signup.password
        };
        $todoParse.users.save(userData)
          .$promise.then(function(user){
            console.log('User data: '+ user);
            $sessionStorage.currentUser = user;
            $scope.userid = $sessionStorage.currentUser.objectId;
            console.log($sessionStorage.currentUser);
            $state.go('addnew');
          },
          function(error){
            console.log('signup failed');
            console.log(error);
            if (error && error.data && error.data.error) {
              $alert.addAlert(error.data.error.error, 'danger',3000);
            }
          });
      }

  }]);
