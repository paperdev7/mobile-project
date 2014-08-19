define(['angular','../../app/bower_components/lodash/dist/lodash.underscore.min'
	    ,'../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', ['google-maps'])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout) {
		$scope.menuId = parseInt($stateParams.pid)-1;
		$scope.map = {
				    center: {
				        latitude: 43,
				        longitude: 23
				    },
				    zoom: 8
				};
        $scope.options = {scrollwheel: false};

        $scope.getCurrent = function(){
		 navigator.geolocation.getCurrentPosition(function(position){
		 	console.log(
		 		  'Latitude: '          + position.coords.latitude          + '\n' +
		          'Longitude: '         + position.coords.longitude         + '\n' +
		          'Altitude: '          + position.coords.altitude          + '\n' +
		          'Accuracy: '          + position.coords.accuracy          + '\n' +
		          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		          'Heading: '           + position.coords.heading           + '\n' +
		          'Speed: '             + position.coords.speed             + '\n' +
		          'Timestamp: '         + position.timestamp                + '\n'
		          );
		 	var latitude = position.coords.latitude;
		 	var longitude = position.coords.longitude;
		 	$scope.$apply(function(){
		 			$scope.map = {
							    center: {
							        latitude: latitude,
							        longitude: longitude
							    },
							    zoom: 8
							};
                    $scope.options = {scrollwheel: false};
		 	});
		 },function(error){
		 	alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
		 });
		}
	});
});
