define(['angular','services/page02_2Serv'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02_2Ctrl', ['starter.page02_2Serv'])
	// A simple controller that fetches a list of data from a service
	.controller('page02_2Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout,$state,$rootScope,page02_2Serv) {
		$scope.rootMap = $scope.rootMap;
		$scope.searchResults = [];
		$scope.startPlace = "";
		$scope.endPlace = "";
		$scope.type = "";
		//console.log($scope.rootMap);
		$scope.isShow = false;
		$scope.callback = function(results, status,pagination) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					$scope.$apply(function(){
						for(var i=0;i<results.length;i++){
							$scope.searchResults.push(results[i]);
						}
						//console.log(results);
						if (pagination.hasNextPage) {
							//$scope.searchResults.push({name:'더보기'});
							var moreButton = document.getElementById('moreBtn');
     					    $scope.isShow = true;
							google.maps.event.addDomListenerOnce(moreButton, 'click',function() {
								$ionicLoading.show({
								     content: 'Loading...'
								});
						        $scope.isShow = false;
						        pagination.nextPage();
						    });
						    $timeout(function(){
						    	$ionicLoading.hide();
						    },500);
					    }else{
					    	$scope.isShow = false;
					    	$timeout(function(){
						    	$ionicLoading.hide();
						    },500);
					    }
					});
				}
	    }

	    $scope.rootMap.service = new google.maps.places.PlacesService($scope.rootMap.map);
	    //input change
	    $scope.placeChange = function(val,type){
	    	$scope.type = type;
	    	if(val.trim().length>0){
		    	$scope.request = {
					location: $scope.rootMap.latLng,
					radius: '500',
					//types: []
					 query:val
				};
				$scope.searchResults = [];
				$scope.isShow = false;
				$scope.rootMap.service.textSearch($scope.request,$scope.callback);
			}else{
				$scope.searchResults = [];
				$scope.isShow = false;
			}
		}

		$scope.setPlace = function(result){
			//result.geometry.location.k;
			//result.geometry.location.B;
			if($scope.type=="startPlace"){
				$scope.rootMap.page02Lng = $scope.rootMap.page02_2_1Lng = result.geometry.location.k;
				$scope.rootMap.page02Lat = $scope.rootMap.page02_2_1Lat = result.geometry.location.B;
			}else{
				$scope.rootMap.page02Lng = $scope.rootMap.page02_2_2Lng = result.geometry.location.k;
				$scope.rootMap.page02Lat = $scope.rootMap.page02_2_2Lat = result.geometry.location.B;
			}
			
			$scope[$scope.type] = result.name;
			$("#"+$scope.type).val(result.name);
			//console.log($scope[$scope.type]);
		};

		
		$scope.computeTotalDistance = function(result) {
			  var total = 0;
			  var myroute = result.routes[0];
			  for (var i = 0; i < myroute.legs.length; i++) {
			    total += myroute.legs[i].distance.value;
			  }
			  total = total / 1000.0;
			  console.log(total + ' km');
			  //document.getElementById('total').innerHTML = total + ' km';
		}
		$scope.calcRoute = function() {
			  console.log(parseFloat($scope.rootMap.page02_2_1Lng)+","+parseFloat($scope.rootMap.page02_2_1Lat));
			  console.log(parseFloat($scope.rootMap.page02_2_2Lng)+","+parseFloat($scope.rootMap.page02_2_2Lat));
			  var origin = new google.maps.LatLng($scope.rootMap.page02_2_1Lng,$scope.rootMap.page02_2_1Lat);
			  var destination = new google.maps.LatLng($scope.rootMap.page02_2_2Lng,$scope.rootMap.page02_2_2Lat);
			  $scope.rootMap.direcRequest = {
							    origin: origin,//new google.maps.LatLng(37.490598,126.907200999),
							    destination: destination,//new google.maps.LatLng(37.48396,126.899257000),
							    //waypoints:[{location: 'Bourke, NSW'}, {location: 'Broken Hill, NSW'}],
							    region:'ko',
							    travelMode: google.maps.TravelMode.TRANSIT
							  };
				//console.log($scope.rootMap.direcRequest);
			  $scope.rootMap.directionsService.route($scope.rootMap.direcRequest, function(response, status) {
			  	console.log(status);
			    if (status == google.maps.DirectionsStatus.OK) {
			    //	console.log(response);
			      $scope.rootMap.directionsDisplay.setDirections(response);
			      $rootScope.rootMap.directionsDisplay = $scope.rootMap.directionsDisplay;
			      $rootScope.rootMap.routeResponse = response;
			      $rootScope.rootMap.fromPage = "page02_2";
			      $state.go('tab.page02');
			    }
			  });
			}

		$scope.setDirection = function(){
			$scope.rootMap.rendererOptions = {
			  draggable: true
			};
			$scope.rootMap.directionsDisplay = new google.maps.DirectionsRenderer($scope.rootMap.rendererOptions);;
			$scope.rootMap.directionsService = new google.maps.DirectionsService();
			$scope.rootMap.directionsDisplay.setMap($scope.rootMap.map);
			//console.log($scope.rootMap.directionsDisplay);
		   // $scope.rootMap.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
		    google.maps.event.addListener($scope.rootMap.directionsDisplay, 'directions_changed', function() {
		    	console.log($scope.rootMap.directionsDisplay.getDirections());
		      $scope.computeTotalDistance($scope.rootMap.directionsDisplay.getDirections());
		    });

		    $scope.calcRoute();
		}

		

		


		//page02_2Serv.placeAutoComplete($scope.rootMap);
	});
});
