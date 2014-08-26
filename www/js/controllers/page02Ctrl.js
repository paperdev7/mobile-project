define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', ['nsPopover'])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($rootScope,$scope,$stateParams, $state,$compile,$timeout,$state, $ionicLoading) {
		    $scope.menuId = parseInt($stateParams.pid)-1;
		    //console.log($rootScope.lag);
			$ionicLoading.show({
			     content: 'Loading...'
			});
			$scope.geocoder = new google.maps.Geocoder();

		    $scope.page02Lat   = "";
		    $scope.page02Lng   = "";
			$scope.page02Zoom  = 13;
			$scope.showContent = "";
			//$scope.markerTitle = "";
			$scope.currAddress = "";
		    if($rootScope.lat){
		    	$scope.page02Lat   = $rootScope.lat;
		    	$scope.page02Lng   = $rootScope.lng;
				$scope.currAddress     = $rootScope.address;
				$scope.markerTitle = $rootScope.markerTitle;
				$scope.page02Zoom  = 18;
		    }else{
		    	$scope.page02Lat= 37.487;
		    	$scope.page02Lng = 126.913;
				$scope.page02Zoom = 13;
		    }
		    //map 초기화
			function initialize() {
				 $scope.markers = [];
				  var mapOptions = {
				    zoom: $scope.page02Zoom,
				    center: new google.maps.LatLng($scope.page02Lat, $scope.page02Lng),
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  }
				 $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);//맵 사입

				 $scope.marker = new google.maps.Marker({//위치 아이콘 지정
							    position : new google.maps.LatLng($scope.page02Lat,$scope.page02Lng),
							    title:$scope.markerTitle,
								draggable:true,
								animation: google.maps.Animation.DROP
							});

							// To add the marker to the map, call setMap();
				$scope.marker.setMap($scope.map);
				
				$scope.infowindow = new google.maps.InfoWindow({
					  content: $scope.currAddress
				  });

				google.maps.event.addListener($scope.marker, 'click', function() {//아이콘 click 이벤트
					$scope.infowindow.open($scope.map,$scope.marker);
				  });
				google.maps.event.addListener($scope.marker,'dragend',function(event){
						$scope.getCurrAddress(event.latLng);
				  });
				$ionicLoading.hide();
			 }

		   initialize();
		   $scope.getCurrent = function(){//내 위치 찾기
			    $ionicLoading.show({
				  content: 'Getting current location...'
				});
				navigator.geolocation.getCurrentPosition(function(pos) {
				  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
				  $scope.page02Zoom = 18;
				  $scope.getCurrAddress(latlng);
				  $ionicLoading.hide();
				}, function(error) {
				  alert('Unable to get location: ' + error.message);
				});
		   };
		   //현재위치의 주소 얻기
		   $scope.getCurrAddress = function(latlng){
			    $scope.infowindow.close();
				$scope.geocoder.geocode({'latLng': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				  if (results[1]) {
					$scope.map.setCenter(latlng);
					$scope.map.setZoom($scope.page02Zoom);
				    $scope.marker.setPosition(latlng);
				    $scope.marker.setTitle(results[1].address_components[0].short_name);
					$scope.currAddress = // results[1].address_components[4].long_name+" "
			                         // +results[1].address_components[3].long_name+" "+
									   results[1].address_components[2].long_name+" "
								      +results[1].address_components[1].long_name+" "+results[1].address_components[0].long_name;
					//console.log( results);
					
					google.maps.event.addListener($scope.marker, 'click', function() {//아이콘 click 이벤트
					  $scope.infowindow.setContent($scope.currAddress);
					});
				  } else {
					alert('No results found');
				  }
				} else {
				  alert('Geocoder failed due to: ' + status);
				}
			  });
		   };
			
		   //위치 검색
		   $scope.search = function(){
		   		//$window.location.href = "#/tab/page02_1";
		   		$state.go('tab.page02_1');
		   };

	});
});
