define(['angular'], function (angular) {
  return angular.module('starter.page02_2Serv', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('page02_2Serv', ['$http',function($http) {
    // Might use a resource here that returns a JSON array
    
    var placeAutoComplete = function(scope){//오류 발생시 로컬에 있는 메뉴 호출
      /*
                              $http.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json'
                                      , {
                                             key : maps.key,
                                          sensor : false,
                                            input:'cgv'})
                                  .success(function(data) {
                                      console.log(data);
                                  })
                                  .error(function(error) {
                                       
                                  });
                           };
                           */
                           /*
                           $http({
                                  method: "POST",
                                  headers:  {
                                              'Access-Control-Allow-Origin' : '*',
                                              'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                                              'Content-Type': 'application/json',
                                              'Accept': 'application/json'
                                            },
                                  url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
                                  data: {"query":"cgv","sensor":"true","key":maps.key}
                                }).success(function(result) {
                                    console.log("Auth.signin.success!")
                                    console.log(result);
                                }).error(function(data, status, headers, config) {
                                    console.log("Auth.signin.error!")
                                    console.log(data);
                                    console.log(status);
                                    console.log(headers);
                                    console.log(config);
                                });
*/
                                                     
                                $.ajax({
                                    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=cgv&sensor=true&key=AIzaSyA5FyN62tRGDOVTRJeLjjGUnGrlSvrnIfc',
                                   // data: {"query":"cgv","sensor":"true","key":maps.key},
                                    type: 'GET',
                                    cache: false,
                                    async: false,
                            jsonpCallback:'json_response',
                           // contentType: "application/json",
                            dataType: 'jsonp',
                                    success: function(data) {JSON.stringify(data) },
                                    error: function() { alert('Failed!'); }
                                   // beforeSend: setHeader
                                });
function json_response(data){
    alert("works");
}
                              }
    
    return {
      placeAutoComplete: function(scope) {
         placeAutoComplete(scope);
      }
    }
  }]);
});