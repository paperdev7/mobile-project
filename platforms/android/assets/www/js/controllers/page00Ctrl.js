define(['angular','services/page00Serv'], function (angular) {
	return angular.module('starter.page00Ctrl', ['starter.page00Serv'])

	// A simple controller that fetches a list of data from a service
	.controller('page00Ctrl', function(page00Serv,$scope,$stateParams,$state,$rootScope) {
		$scope.items = [
                        {'name':'회원가입','path':''},
                        {'name':'로그인','path':'#/tab/page00_1'}
                       ];

        // This object will be filled by the form
        $scope.user = {};

        // Register the login() function
        $scope.login = function() {
            page00Serv.login($scope.user);
        };
	});
});
