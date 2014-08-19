define(['angular','googleMapLodash','googleMap'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02Ctrl', ['google-maps'])
	// A simple controller that fetches a list of data from a service
	.controller('page02Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout,$log) {
		$scope.menuId = parseInt($stateParams.pid)-1;
		//##### default로 위치지정
		$scope.map = {
				    center: {
				        latitude: 37.482,
				        longitude: 126.896
				    },
				    zoom: 8
				};
		 $scope.marker = {
					id:0,
					coords: {
						latitude: 37.482,
						longitude: 126.896
					},
					options: { draggable: true },
					events: {
						dragend: function (marker, eventName, args) {
							$log.log('marker dragend');
							$log.log(marker.getPosition().lat());
							$log.log(marker.getPosition().lng());
						}
					}
				}
        $scope.options = {scrollwheel: false};
        //### default로 위치지정
		//@@@ 현재 위치 획득
        $scope.getCurrent = function(){
		 $scope.loading = $ionicLoading.show({
           content: 'Getting current location...',
           showBackdrop: false
         });
		 //좌표 획득
		 navigator.geolocation.getCurrentPosition(function(position){
		 	var latitude = position.coords.latitude;
		 	var longitude = position.coords.longitude;
		 	$scope.$apply(function(){
				$scope.map = {
							center: {
								latitude: latitude,
								longitude: longitude
							},
							zoom: 16
						};
				
				 $scope.marker = {
					id:0,
					coords: {
						latitude: latitude,
						longitude: longitude
					},
					options: { draggable: true },
					events: {
						dragend: function (marker, eventName, args) {
							$log.log('marker dragend');
							$log.log(marker.getPosition().lat());
							$log.log(marker.getPosition().lng());
						}
					}
				}
		 	});
			//좌표 획득
			$ionicLoading.hide();
		 },function(error){
		 	alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
		 });
		}
		//@@@ 현재 위치 획득
	});
});
