define(['angular','services/page00Serv'], function (angular) {
	return angular.module('starter.page00Ctrl', ['starter.page00Serv'])

	// A simple controller that fetches a list of data from a service
	.controller('page00Ctrl', function(page00Serv,$scope,$stateParams,$state,$rootScope) {
		$scope.items = [
                        {'name':'회원가입','path':'#/tab/page00_3'},
                        {'name':'로그인','path':'#/tab/page00_1'}
                       ];
        $scope.user = $rootScope.user;
            console.log($scope.user);
        
	})
    .controller('page00_1Ctrl', function(page00Serv,$scope,$stateParams,$state,$rootScope) {
           // This object will be filled by the form
        $scope.user = {};

        // Register the login() function
        $scope.login = function() {
            page00Serv.login($scope.user,function(res){
                $rootScope.user = res.user;
                $rootScope.isLogin = true;
                $state.go('tab.page00', {});
            },function(err){});
        };
       })
    .controller('page00_2Ctrl', function(page00Serv,$scope,$stateParams,$state,$rootScope) {
           $scope.user = $rootScope.user;
            console.log($scope.user);
       })
    .controller('page00_3Ctrl', function(page00Serv,$scope,$stateParams,$state,$rootScope) {
            $scope.imageUrl = "";
            $scope.showImage = function(){
                window.imagePicker.getPictures(
                    function(results) {
                        for (var i = 0; i < results.length; i++) {
                           // console.log('Image URI: ' + results[i]);
                            $scope.$apply(function(){
                                $scope.imageUrl = results[i];
                            });
                        }
                    }, function (error) {
                        console.log('Error: ' + error);
                    }, {
                        maximumImagesCount: 1
                    }
                );
            };


       })
    ;
});
