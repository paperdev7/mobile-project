define(['angular','services/page01_3Serv'], function (angular) {
	return angular.module('starter.page01_3Ctrl', ['starter.page01_3Serv'])


	// A simple controller that fetches a list of data from a service
	.controller('page01_3Ctrl', function($scope,$stateParams,page01_3Serv) {
		$scope.menuId = parseInt($stateParams.pid)-1;
        $scope.articleLists = [];
        $scope.remoteServer  = getRemoteServer()+"/images";
        //console.log($stateParams.articleId);
            $scope.create = function(isValid) {
                if (isValid) {
                    //console.log(this);
                    var article = new page01_3Serv({
                        title: this.title,
                        content: this.content//,
                        //files:$scope.files
                    });

                    article.$save(function(response) {
                        console.log(response);
                        //$location.path('articles/' + response._id);
                    });

                    this.title = '';
                    this.content = '';
                } else {
                    $scope.submitted = true;
                }
            };
	});
});
