define(['angular'], function (angular) {
	return angular.module('starter.page00Ctrl', [])


	// A simple controller that fetches a list of data from a service
	.controller('page00Ctrl', function($scope,$stateParams,$state,$rootScope) {
		$scope.items = [
                        {'name':'회원가입'},
                        {'name':'로그인'}
                       ];
	});
});
