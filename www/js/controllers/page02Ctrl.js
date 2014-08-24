define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', ['nsPopover'])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout,$log,$window) {
		$scope.menuId = parseInt($stateParams.pid)-1;
			function initialize() {

				 $scope.markers = [];
				  var mapOptions = {
				    zoom: 13,
				    center: new google.maps.LatLng(40.7711329, -73.9741874),
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  }

				 $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			 }

			initialize();
			//google.maps.event.addDomListener(window, 'load', initialize);
		   $scope.search = function(){
		   		$window.location.href = "#/side/page02_1";
		   };
	});
});
