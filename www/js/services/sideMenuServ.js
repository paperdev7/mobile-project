define(['angular'], function (angular) {
  return angular.module('starter.sideMenuServ', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('sideMenuServ', ['$http',function($http) {
    // Might use a resource here that returns a JSON array
    var fnGetMenu = function(scope){//오류 발생시 로컬에 있는 메뉴 호출
      try{//192.168.10.102
          $http.get('http://192.168.200.195:3000/mobileMenu/list/', {})
              .success(function(data) {
                try{
                  if(data.length>0){
                   // scope.$apply(function(){
                      scope.menus = data;
                    //});
                    if(!getLocalStorage("myIonicDb")){
                      ActiveT.createT();
                    }
                    ActiveT.deleteT('sideMenu');
                    ActiveT.insertT(getymdhisx(),'N',JSON.stringify(data),'sideMenu','','','');
                  
                  }
                }catch(e){
                    ActiveT.selectT(function(tx,results){
                      var resultLen =  results.rows.length;
                     
                      //scope.$apply(function(){
                         scope.menus = JSON.parse(results.rows.item(0).ETC1);  
                      //});
                    },'sideMenu');
                }
               
              })
              .error(function(error) {
                ActiveT.selectT(function(tx,results){
                      var resultLen =  results.rows.length;
                      console.log(results.rows.item(0).ETC1+","+4);
                    //   scope.$apply(function(){
                         scope.menus = JSON.parse(results.rows.item(0).ETC1);  
                     // });
                    },'sideMenu');         
             });
          }catch(e){
              ActiveT.selectT(function(tx,results){
                var resultLen =  results.rows.length;
                
               // scope.$apply(function(){
                         scope.menus = JSON.parse(results.rows.item(0).ETC1);  
                //      });
              },'sideMenu');
          }
    };
    
    return {
      all: function(scope) {
         fnGetMenu(scope);
      }
    }
  }]);
});