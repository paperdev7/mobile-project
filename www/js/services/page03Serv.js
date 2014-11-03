define(['angular'], function (angular) {
  return angular.module('starter.sideMenuServ', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('sideMenuServ', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var menus = [
      { id: 0, name: 'Malking',disable:true},
      { id: 1, name: 'Map',disable:true},
      { id: 2, name: 'Other', disable:true}
    ];

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
      all: function() {
        return menus;
      },
      reg:function(){
          return reg;
      }
    }
  });
});