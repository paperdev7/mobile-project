define(['angular','services/page01Serv'], function (angular) {
	return angular.module('starter.page01Ctrl', ['starter.page01Serv'])


	// A simple controller that fetches a list of data from a service
	.controller('page01Ctrl', function($scope,$stateParams,page01Serv,$state,$rootScope) {

        console.log($rootScope.user);
        $scope.isLogin = false;
        if($rootScope.user){
            $scope.isLogin = true;
        }
		$scope.menuId = parseInt($stateParams.pid)-1;
        $scope.articleLists = [];
        //page01Serv.articleLists($scope);
        page01Serv.query(function(articles) {
           $scope.articleLists = articles;
            //console.log(articles);
        });
        $scope.goDetail = function(id){
            $state.go('tab.page01_2', {articleId: id });
        };
        $scope.goCreate = function(){
            $state.go('page01_3', {});
        };
	});
});
