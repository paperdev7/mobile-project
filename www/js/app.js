define(['angular', 'angularIonic','nsPopover',
        'controllers/sideMenuCtrl','controllers/page01Ctrl','controllers/page02Ctrl','controllers/page02_1Ctrl'], function (angular) {
  // Ionic Starter App


  return angular.module('starter', ['ionic', 'starter.sideMenuCtrl', 
                                    'starter.page01Ctrl','starter.page02Ctrl','starter.page02_1Ctrl'])


  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('side', {
        url: "/side",
        abstract: true,
        templateUrl: "templates/sideMenu/sideMenu.html",
        controller:'sideMenuCtrl'
      })

      // the pet tab has its own child nav-view and history
      .state('side.page01', {
        url: '/page01/:pid',
        views: {
          'menuContent': {
            templateUrl: 'templates/page01/page01.html',
            controller:'page01Ctrl'
          }
        }
      })
       // the pet tab has its own child nav-view and history
      .state('side.page02', {
        url: '/page02/:pid',
        views: {
          'menuContent': {
            templateUrl: 'templates/page02/page02.html',
            controller:'page02Ctrl'
          }
        }
      })

       // the pet tab has its own child nav-view and history
      .state('side.page02_1', {
        url: '/page02_1',
        views: {
          'menuContent': {
            templateUrl: 'templates/page02/page02_1.html',
            controller:'page02_1Ctrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/side/page01/1');

  });
});