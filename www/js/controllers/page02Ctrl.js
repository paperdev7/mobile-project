define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', ['nsPopover'])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($rootScope,$scope,$stateParams, $state,$compile,$timeout,$state, $ionicLoading,$ionicSideMenuDelegate) {
		    $scope.menuId = parseInt($stateParams.pid)-1;
		    $scope.rootMap = {};
		    //console.log($rootScope.lag);
			$ionicLoading.show({
			     content: 'Loading...'
			});
			
		    $scope.rootMap.page02Lat   = "";
		    $scope.rootMap.page02Lng   = "";
			$scope.rootMap.page02Zoom  = 17;
			$scope.rootMap.showContent = "";
			//$scope.rootMap.markerTitle = "";
			$scope.rootMap.currAddress = "";
			$scope.rootMap.latLng = "";
		    if($rootScope.lat){
		    	//$scope.rootMap.page02Lat   = $rootScope.lat;
		    	//$scope.rootMap.page02Lng   = $rootScope.lng;
		    	$scope.rootMap.latLng = new google.maps.LatLng($scope.rootMap.page02Lat, $scope.rootMap.page02Lng);
				$scope.rootMap.currAddress     = $rootScope.address;
				$scope.rootMap.markerTitle = $rootScope.markerTitle;
				//$scope.rootMap.page02Zoom  = 18;
		    }else{
		    	$scope.rootMap.latLng = new google.maps.LatLng(37.487, 126.913);
		    	//$scope.rootMap.page02Lat= 37.487;
		    	//$scope.rootMap.page02Lng = 126.913;
				//$scope.rootMap.page02Zoom = 13;
		    }
		    $scope.rootMap.directionsDisplay;
			$scope.rootMap.directionsService = new google.maps.DirectionsService();//길찾기 서비스
			$scope.rootMap.geocoder = new google.maps.Geocoder();//주소 검색 서비

		   //지역 검색
		   $scope.getAutoComplatePalce = function(){
		   		//주소지 검색
				$scope.rootMap.input = /** @type {HTMLInputElement} */(
						      document.getElementById('pac-input'));
			   // $scope.rootMap.types = document.getElementById('type-selector');
			    //$scope.rootMap.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.rootMap.input);
			    //$scope.rootMap.map.controls[google.maps.ControlPosition.TOP_LEFT].push([]);
			    $scope.rootMap.options = {
					  //types: ['(cities)'],
					  componentRestrictions: {country: 'kr'}
					};
			    $scope.rootMap.autocomplete = new google.maps.places.Autocomplete($scope.rootMap.input,$scope.rootMap.options);
			    $scope.rootMap.autocomplete.bindTo('bounds', $scope.rootMap.map);
		        //$scope.rootMap.autocomplete.setTypes([]);

			   google.maps.event.addListener($scope.rootMap.autocomplete, 'place_changed', function() {
			     $scope.rootMap.infowindow.close();
			     $scope.rootMap.marker.setVisible(false);
			     $scope.rootMap.place = $scope.rootMap.autocomplete.getPlace();
			     if (!$scope.rootMap.place.geometry) {
			       return;
			     }
			     $scope.rootMap.latLng = $scope.rootMap.place.geometry.location;
			     // If the place has a geometry, then present it on a map.
			     if ($scope.rootMap.place.geometry.viewport) {
			       $scope.rootMap.map.fitBounds($scope.rootMap.place.geometry.viewport);
			     } else {
			       $scope.rootMap.map.setCenter($scope.rootMap.latLng);
			       $scope.rootMap.map.setZoom($scope.rootMap.page02Zoom);  // Why 17? Because it looks good.
			     }
			     //아이콘 세팅  현재는 default
			     //$scope.rootMap.marker.setIcon(/** @type {google.maps.Icon} */({
			      /* url: $scope.rootMap.place.icon,
			       size: new google.maps.Size(71, 71),
			       origin: new google.maps.Point(0, 0),
			       anchor: new google.maps.Point(17, 34),
			       scaledSize: new google.maps.Size(35, 35)
			     }));
					*/

			     $scope.rootMap.marker.setPosition($scope.rootMap.latLng);
			     $scope.rootMap.marker.setVisible(true);

			     $scope.rootMap.address = '';
			     if ($scope.rootMap.place.address_components) {
			       $scope.rootMap.address = [
			         ($scope.rootMap.place.address_components[0] && $scope.rootMap.place.address_components[0].short_name || ''),
			         ($scope.rootMap.place.address_components[1] && $scope.rootMap.place.address_components[1].short_name || ''),
			         ($scope.rootMap.place.address_components[2] && $scope.rootMap.place.address_components[2].short_name || '')
			       ].join(' ');
			     }

			     $scope.rootMap.infowindow.setContent('<div><strong>' + $scope.rootMap.place.name + '</strong><br>' + $scope.rootMap.address);
			     $scope.rootMap.infowindow.open($scope.rootMap.map, $scope.rootMap.marker);
			   });
		   };

		   $scope.getCurrent = function(){//내 위치 찾기
			    $ionicLoading.show({
				  content: 'Getting current location...'
				});
				navigator.geolocation.getCurrentPosition(function(pos) {
				  $scope.rootMap.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				  $scope.rootMap.page02Zoom = 18;
				  $scope.getCurrAddress($scope.rootMap.latLng);
				  $ionicLoading.hide();
				}, function(error) {
				  alert('Unable to get location: ' + error.message);
				});
		   };
		   //현재위치의 주소 얻기
		   $scope.getCurrAddress = function(latlng){
			    $scope.rootMap.infowindow.close();
				$scope.rootMap.geocoder.geocode({'latLng': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				  if (results[1]) {
					$scope.rootMap.map.setCenter(latlng);
					$scope.rootMap.map.setZoom($scope.rootMap.page02Zoom);
				    $scope.rootMap.marker.setPosition(latlng);
				    $scope.rootMap.marker.setTitle(results[1].address_components[0].short_name);
					$scope.rootMap.currAddress = // results[1].address_components[4].long_name+" "
			                         // +results[1].address_components[3].long_name+" "+
									   results[1].address_components[2].long_name+" "
								      +results[1].address_components[1].long_name+" "+results[1].address_components[0].long_name;
					//console.log( results);
					
					google.maps.event.addListener($scope.rootMap.marker, 'click', function() {//아이콘 click 이벤트
					  $scope.rootMap.infowindow.setContent($scope.rootMap.currAddress);
					});
				  } else {
					alert('No results found');
				  }
				} else {
				  alert('Geocoder failed due to: ' + status);
				}
			  });
		   };
		   
		   //map 초기화
		   $scope.initialize = function() {	
				$scope.rootMap.mapOptions = {
				    center: $scope.rootMap.latLng,
				    zoom: $scope.rootMap.page02Zoom
				 };
				$scope.rootMap.map = new google.maps.Map(document.getElementById('map-canvas'),$scope.rootMap.mapOptions);
				$scope.rootMap.infowindow = new google.maps.InfoWindow();
			    $scope.rootMap.marker = new google.maps.Marker({
			    	position : $scope.rootMap.latLng,
			              map: $scope.rootMap.map,
			        draggable:true,
			      anchorPoint: new google.maps.Point(0, -29)
			    });
			    $scope.rootMap.marker.setMap($scope.rootMap.map);
			    $scope.rootMap.infowindow = new google.maps.InfoWindow({
					  content: $scope.rootMap.currAddress
				  });
			   
				 google.maps.event.addListener($scope.rootMap.marker, 'click', function() {//아이콘 click 이벤트
					$scope.rootMap.infowindow.open($scope.rootMap.map,$scope.rootMap.marker);
				  });
				 google.maps.event.addListener($scope.rootMap.marker,'dragend',function(event){
						$scope.getCurrAddress(event.latLng);
				  });
				$scope.getAutoComplatePalce();
				$ionicLoading.hide();
				try{
					if($rootScope.rootMap.fromPage=="page02_2"){
			   			$scope.rootMap.directionsDisplay = $rootScope.rootMap.directionsDisplay;
			   			$scope.rootMap.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
			   			$scope.rootMap.directionsDisplay.setMap($scope.rootMap.map);
			   			$scope.rootMap.directionsDisplay.setDirections($scope.rootMap.routeResponse);
					}
				}catch(e){}
			 }

		   $scope.initialize();

		   //주소검색 검색
		   $scope.goPage02_1 = function(){
		   		//$window.location.href = "#/tab/page02_1";
		   		$rootScope.rootMap = $scope.rootMap;
		   		$state.go('page02_1');
		   };

		   //주소검색 검색
		   $scope.goPage02_2 = function(){
		   		//$window.location.href = "#/tab/page02_1";
		   		$rootScope.rootMap = $scope.rootMap;
		   		$state.go('page02_2');
		   };

		   $scope.onSwipeRight = function(){
		   	$ionicSideMenuDelegate.toggleLeft();
		   }

	});
});
