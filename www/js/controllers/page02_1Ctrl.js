define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02_1Ctrl', [])
	// A simple controller that fetches a list of data from a service
	.controller('page02_1Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout,$log) {
		$scope.menuId = parseInt($stateParams.pid)-1;
			function initialize() {

				 $scope.markers = [];
				  $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  });

				  var defaultBounds = new google.maps.LatLngBounds(
				      new google.maps.LatLng(-33.8902, 151.1759),
				      new google.maps.LatLng(-33.8474, 151.2631));
				  $scope.map.fitBounds(defaultBounds);

				  // Create the search box and link it to the UI element.
				  var input = /** @type {HTMLInputElement} */(
				      document.getElementById('pac-input'));
				  $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				  $scope.searchBox = new google.maps.places.SearchBox(
				    /** @type {HTMLInputElement} */(input));
				  
				  $scope.$watch('searchBox', function() {
				    console.log($scope.searchBox);
				  });
				  // [START region_getplaces]
				  // Listen for the event fired when the user selects an item from the
				  // pick list. Retrieve the matching places for that item.
				  google.maps.event.addListener($scope.searchBox, 'places_changed', function() {
				    var places = $scope.searchBox.getPlaces();

				    if (places.length == 0) {
				      return;
				    }
				    for (var i = 0, marker; marker = markers[i]; i++) {
				      marker.setMap(null);
				    }

				    // For each place, get the icon, place name, and location.
				    $scope.markers = [];
				    var bounds = new google.maps.LatLngBounds();
				    for (var i = 0, place; place = places[i]; i++) {
				      var image = {
				        url: place.icon,
				        size: new google.maps.Size(71, 71),
				        origin: new google.maps.Point(0, 0),
				        anchor: new google.maps.Point(17, 34),
				        scaledSize: new google.maps.Size(25, 25)
				      };

				      // Create a marker for each place.
				  $scope.marker = new google.maps.Marker({
				        map: $scope.map,
				       // icon: image,
				        title: place.name,
				        position: place.geometry.location
				      });

				      $scope.markers.push($scope.marker);

				      bounds.extend(place.geometry.location);
				    }

				    $scope.map.fitBounds(bounds);
				  });
				  // [END region_getplaces]

				  // Bias the SearchBox results towards places that are within the bounds of the
				  // current map's viewport.
				  google.maps.event.addListener($scope.map, 'bounds_changed', function() {
				    var bounds = $scope.map.getBounds();
				    $scope.searchBox.setBounds(bounds);
				  });
				}

			initialize();
			//google.maps.event.addDomListener(window, 'load', initialize);
		   
	});
});
