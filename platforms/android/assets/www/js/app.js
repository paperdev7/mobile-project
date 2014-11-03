define(['angular','angularResource', 'angularIonic','nsPopover'
       ,'controllers/sideMenuCtrl','controllers/imagePickerCtrl'
       ,'controllers/page01Ctrl','controllers/page01_2Ctrl','controllers/page01_3Ctrl'
       ,'controllers/page02Ctrl','controllers/page02_1Ctrl','controllers/page02_2Ctrl'
       ,'controllers/page00Ctrl'
       ], function (angular) {
  // Ionic Starter App


  return angular.module('starter', ['ionic','ngResource','starter.sideMenuCtrl','starter.imagePickerCtrl'
                                   ,'starter.page01Ctrl','starter.page01_2Ctrl','starter.page01_3Ctrl'
                                   ,'starter.page02Ctrl','starter.page02_1Ctrl','starter.page02_2Ctrl'
                                   ,'starter.page00Ctrl'])
  .controller('rootCtr', function($scope,$ionicNavBarDelegate) {
    //back button global
    $scope.goBack = function() {
      $ionicNavBarDelegate.back();
    };
    $scope.remoteServer  = getRemoteServer()+"/images";
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

      // talking list
      .state('tab.page01', {
        url: '/page01',
        views: {
          'talking': {
            templateUrl: 'templates/page01/page01.html',
            controller:'page01Ctrl'
          }
        }
      })
      // talking detail
      .state('tab.page01_2', {
         url: '/page01_2/:articleId',
         views: {
           'talking': {
              templateUrl: 'templates/page01/page01_2.html',
              controller:'page01_2Ctrl'
              }
            }
        })
        // talking create
      .state('page01_3', {
            url: '/page01_3/',
            templateUrl: 'templates/page01/page01_3.html',
            controller:'page01_3Ctrl'
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
      })

    //리스트정보
      .state('tab.page00', {
              url: '/page00',
        views: {
           'info': {
             templateUrl: 'templates/page00/page00.html',
              controller:'page00Ctrl'
           }
        }
      })

        // 개인정보
      .state('tab.page00_1', {
            url: '/page00_1',
            views: {
                'info': {
                    templateUrl: 'templates/page00/page00_1.html',
                    controller:'page00Ctrl'
                }
            }
        })

        // 나의 정보
        .state('tab.page00_2', {
            url: '/page00_2',
            views: {
                'info': {
                    templateUrl: 'templates/page00/page00_2.html',
                    controller:'page00_2Ctrl'
                }
            }
        })

        // 회원가입
        .state('tab.page00_3', {
            url: '/page00_3',
            views: {
                'info': {
                    templateUrl: 'templates/page00/page00_3.html',
                    controller:'page00_3Ctrl'
                }
            }
        }) // 나의 정보
        .state('imagePicker', {
            url: '/imagePicker',
            templateUrl: 'templates/common/imagePicker.html',
            controller:'imagePickerCtrl'


        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/page01');

  });
});