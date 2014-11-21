define(['angular','services/page01Serv'], function (angular) {
	return angular.module('starter.page01_2Ctrl', ['starter.page01Serv'])


	// A simple controller that fetches a list of data from a service
	.controller('page01_2Ctrl', function($scope,$stateParams,page01Serv) {
		$scope.menuId = parseInt($stateParams.pid)-1;
        $scope.articleLists = [];
        $scope.remoteServer  = getRemoteServer()+"/images";
        //console.log($stateParams.articleId);
        page01Serv.get({
            articleId: $stateParams.articleId
        }, function(article) {
            console.log(article);
            $scope.article = article;
        });
	});
});
