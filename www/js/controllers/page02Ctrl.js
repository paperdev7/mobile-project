define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', ['nsPopover'])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($scope,$stateParams, $ionicLoading, $state,$compile,$timeout,$rootScope,$state) {
		    $scope.menuId = parseInt($stateParams.pid)-1;
		    //console.log($rootScope.lag);
		    $scope.page02Lat = "";
		    $scope.page02Lng = "";
		    if($rootScope.lat){
		    	$scope.page02Lat = $rootScope.lat;
		    	$scope.page02Lng = $rootScope.lng;
		    }else{
		    	$scope.page02Lat= 37.487;
		    	$scope.page02Lng = 126.913;
		    }
		    
			function initialize() {

				 $scope.markers = [];
				  var mapOptions = {
				    zoom: 13,
				    center: new google.maps.LatLng($scope.page02Lat, $scope.page02Lng),
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  }
				 $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

				 $scope.marker = new google.maps.Marker({
							    position : new google.maps.LatLng($scope.page02Lat,$scope.page02Lng),
							    title:"Hello World!"
							});

							// To add the marker to the map, call setMap();
				$scope.marker.setMap($scope.map);
			 }

		   initialize();
		   $scope.search = function(){
		   		//$window.location.href = "#/side/page02_1";
		   		$state.go('side.page02_1');
		   };
	});
});
