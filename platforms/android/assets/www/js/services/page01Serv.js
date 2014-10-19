define(['angular'], function (angular) {
  return angular.module('starter.page01Serv', [])

  /**
   * A simple example service that returns some data.
   */
   /*
  .factory('page01Serv',['$http', function($http) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var articleLists = function(scope){//오류 발생시 로컬에 있는 메뉴 호출
        //console.log(33);
        $http.get(getRemoteServer()+'/articles', {})
            .success(function(data) {
                if(data.length>0){
                   // console.log(data);
                    scope.articleLists = data;
                }
            })
            .error(function(error) {

            });
    };
    return {
      articleLists: function(scope) {
        articleLists(scope);
      }
    }
  }]);
  */
   .factory('page01Serv',['$resource',
          function($resource) {
              return $resource(getRemoteServer()+'/articles/:articleId', {
                  articleId: '@_id'
              }, {
                  update: {
                      method: 'PUT'
                  }
              });
          }
      ]);
});