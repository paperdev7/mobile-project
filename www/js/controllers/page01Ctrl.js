define(['angular'], function (angular) {
	return angular.module('starter.page01Ctrl', [])


	// A simple controller that fetches a list of data from a service
	.controller('page01Ctrl', function($scope,$stateParams) {
		$scope.menuId = parseInt($stateParams.pid)-1;
	});
});
