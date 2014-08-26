define(['angular','services/sideMenuServ'
	 //   ,'../../app/bower_components/lodash/dist/lodash.underscore.min'
	 //   ,'../../app/bower_components/angular-google-maps/dist/angular-google-maps.min'
	    ], function (angular) {
	return angular.module('starter.sideMenuCtrl', ['starter.sideMenuServ'])


	// A simple controller that fetches a list of data from a service
	.controller('sideMenuCtrl', function($rootScope,$window,$scope,$location,$ionicSideMenuDelegate,$ionicLoading,sideMenuServ) {
		if (userOS.indexOf('Android')!=-1){//page01시 backbutton 클릭 나가기
			  backBtnFunc(function(){
					if($location.$$url=="/side/page01/1"){
					  exitFunc();
					}else{
						$ionicLoading.hide();
						$window.history.back();
					}
				});
	  	 }
		
		$scope.menuFunc = function(){
			$ionicSideMenuDelegate.toggleLeft($scope);
		};

		sideMenuServ.all($scope);
	});
});
