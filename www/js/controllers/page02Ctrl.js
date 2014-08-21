define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', [])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout,$log) {
		$scope.menuId = parseInt($stateParams.pid)-1;
		
			var directions = new google.maps.DirectionsService(),
		        clickTimer = null,
		        markers = [];
		    var myLatlng = new google.maps.LatLng(37.482,126.896);
		    var mapOptions = {
			      center: myLatlng,
			      zoom: 15,
			      draggableCursor: "crosshair",
			      disableDoubleClickZoom: true
			    };

			var map = $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			//Marker + infowindow + angularjs compiled ng-click
	        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
	        var compiled = $compile(contentString)($scope);

	        var infowindow = new google.maps.InfoWindow({
	          content: compiled[0]
	        });

		    var marker = new google.maps.Marker({
		          position: myLatlng,
		          map: map,
		          title: 'Uluru (Ayers Rock)'
		        });

	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.open(map,marker);
	        });
		      
		    $scope.getCurrent = function(){
				  if(!$scope.map) {
			          return;
			        }

			        $scope.loading = $ionicLoading.show({
			          content: 'Getting current location...',
			          showBackdrop: true
			        });

			        navigator.geolocation.getCurrentPosition(function(pos) {
			          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			          var marker = new google.maps.Marker({
				          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
				          map: map,
				          title: 'Uluru (Ayers Rock)'
				        });
			          $ionicLoading.hide();
			        }, function(error) {
			          alert('Unable to get location: ' + error.message);
			        });
			};
		    

	});
});
