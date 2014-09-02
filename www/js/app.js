define(['angular', 'angularIonic','nsPopover'
       ,'controllers/sideMenuCtrl','controllers/page01Ctrl'
       ,'controllers/page02Ctrl','controllers/page02_1Ctrl'
       ,'controllers/page02_2Ctrl'], function (angular) {
  // Ionic Starter App


  return angular.module('starter', ['ionic','starter.sideMenuCtrl'
                                   ,'starter.page01Ctrl','starter.page02Ctrl'
                                   ,'starter.page02_1Ctrl','starter.page02_2Ctrl'])
  .controller('rootCtr', function($scope,$ionicNavBarDelegate) {
    //back button global
    $scope.goBack = function() {
      $ionicNavBarDelegate.back();
    };

  })

  .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    //$httpProvider.defaults.useXDomain = true;
   // $httpProvider.defaults.headers.common = 'Content-Type: application/json';
   // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/sideMenu/sideMenu.html",
        controller:'sideMenuCtrl'
      })

      // the pet tab has its own child nav-view and history
      .state('tab.page01', {
        url: '/page01',
        views: {
          'talking': {
            templateUrl: 'templates/page01/page01.html',
            controller:'page01Ctrl'
          }
        }
      })
       // the pet tab has its own child nav-view and history
      .state('tab.page02', {
        url: '/page02',
        views: {
          'map': {
            templateUrl: 'templates/page02/page02.html',
            controller:'page02Ctrl'
          }
        }
      })

       // 주소검색
      .state('page02_1', {
        url: '/page02_1',
        templateUrl: 'templates/page02/page02_1.html',
            controller:'page02_1Ctrl'
      })

      // 길찾기
      .state('page02_2', {
        url: '/page02_2',
        templateUrl: 'templates/page02/page02_2.html',
            controller:'page02_2Ctrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/page01');

  });
});