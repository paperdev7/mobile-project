define(['angular'], function (angular) {
  return angular.module('starter.page00Serv', [])
   .factory('page00Serv',['$http',
          function($http) {
              var login =  function(params,successCallback,errCallback){
                   $http.post(getRemoteServer()+'/login',params)
                   .success(successCallback)
                   .error(errCallback);
              };

              var reg = function(){
                  return $resource('articles/:articleId', {
                      articleId: '@_id'
                  }, {
                      update: {
                          method: 'PUT'
                      }
                  });
              };

             return {
                   login: function(params,successCallback,errCallback){login(params,successCallback,errCallback)},
                   reg:function(){return reg}
               }
          }
      ]);
});