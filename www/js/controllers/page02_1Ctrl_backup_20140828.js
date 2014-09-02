define(['angular'], function (angular) {//,'../../app/bower_components/lodash/dist/lodash.underscore.min','../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	return angular.module('starter.page02_1Ctrl', [])
	// A simple controller that fetches a list of data from a service
	.controller('page02_1Ctrl', function($scope,$stateParams, $ionicLoading, $compile,$timeout,$state,$rootScope) {
		//$scope.menuId   = parseInt($stateParams.pid)-1;
		$scope.addressValue = "";
		$scope.address = "";
		$scope.addressResults = [];
		//주소지 검색
		$scope.changeAddress = function(addr){
			$scope.geocoder = new google.maps.Geocoder();
			 $scope.geocoder.geocode({  
		        'address': addr 
			    }, function(results, status){  
			        if (status == google.maps.GeocoderStatus.OK) {  
			           $scope.addressResults = results;
			        } else {  
			           // r.innerHTML = "검색 결과가 없습니다."+status;   
			           //$scope.addressResults = [formatted_address:"결과 없습니다."];           
			        }  
			   });  
		};

		//좌표를 얻어 지도에 보여주기
		$scope.showMap = function(result){
			//console.log(result);
			//값을 최고 scope에 할당 rootScope는 모든 controller service filter directive에서 모두 사용가능
			$rootScope.lat           = result.geometry.location.k;
			$rootScope.lng           = result.geometry.location.B;
			$rootScope.address       = //result.address_components[6].long_name+" "+
				                       result.address_components[4].long_name+" "
			                          +result.address_components[3].long_name+" "+result.address_components[2].long_name+" "
								      +result.address_components[1].long_name+" "+result.address_components[0].long_name;
			$rootScope.markerTitle   = result.address_components[0].short_name;
			//console.log($scope.lag+","+$scope.lng);
			//$window.location.href = "#/tab/page02";
			//$state.go('tab.page02', {groupId: -3});
			$state.go('tab.page02',{pid: 2});
			//$window.history.go(-1);
		}

	});
});
