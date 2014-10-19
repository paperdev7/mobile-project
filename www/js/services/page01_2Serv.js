define(['angular'], function (angular) {
  return angular.module('starter.page01_2Serv', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('page01_2Serv',['$resource',function($resource) {
              return $resource('articles/:articleId', {
                  articleId: '@_id'
              }, {
                  update: {
                      method: 'PUT'
                  }
              });
          }
      ]);
});