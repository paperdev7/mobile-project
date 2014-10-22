define(['angular'], function (angular) {
    return angular.module('starter.page00Serv', [])

    /**
     * A simple example service that returns some data.
     */
        .factory('page00Serv', ['$http','$rootScope','$scope',function($http,$rootScope,$scope) {
            return function(params){
/*
                $http.post(getRemoteServer()+'/login',params)
                    .success(function(response) {
                        // authentication OK
                        $scope.loginError = 0;
                        $rootScope.user = response.user;
                        $rootScope.$emit('loggedin');
                        if (response.redirect) {
                            if (window.location.href === response.redirect) {
                                //This is so an admin user will get full admin page
                                window.location.reload();
                            } else {
                                window.location = response.redirect;
                            }
                        } else {
                            $location.url('/');
                        }
                    })
                    .error(function() {
                        $scope.loginerror = 'Authentication failed.';
                    });
*/
            };

          //  return {
           //     login: login
           // }
        }]);
});