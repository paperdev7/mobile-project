define(['angular'], function (angular) {
  return angular.module('starter.page00Serv', [])
   .factory('page00Serv',['$http',
          function($http) {
              var login =  function(params){

                   $http.post(getRemoteServer()+'/login',params)
                   .success(function(response) {
                   // authentication OK
                  // $scope.loginError = 0;
                  // $rootScope.user = response.user;
                 //  $rootScope.$emit('loggedin');
                           console.log(response);
                   //if (response.redirect) {
                   //if (window.location.href === response.redirect) {
                   //This is so an admin user will get full admin page
                   //window.location.reload();
                   //} else {
                   //window.location = response.redirect;
                   //}
                   //} else {
                   //$location.url('/');
                   //}
                   })
                   .error(function() {
                   //$scope.loginerror = 'Authentication failed.';
                   });

              };
             return {
                   login: function(params){login(params)}
               }
          }
      ]);
});