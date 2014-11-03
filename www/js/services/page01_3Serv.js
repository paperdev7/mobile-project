define(['angular'], function (angular) {
  return angular.module('starter.page01_3Serv', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('page01_3Serv',['$resource',function($resource) {
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