/*
    File: main.js
    Author: Jonathan Rowny
    Description: Loads up all the things you need to make a fun app with Angular, Ionic, and Cordova
*/
require.config({
    paths: {
       // cordova: '../cordova',
        angular: '../lib/js/angular/angular',
        angularAnimate: '../lib/js/angular/angular-animate',
        angularTouch: '../lib/js/angular/angular-touch',
        angularSanitize: '../lib/js/angular/angular-sanitize',
        uiRouter: '../lib/js/angular-ui/angular-ui-router',
        ionic: '../lib/js/ionic',
        angularIonic: '../lib/js/ionic-angular',
        text: '../bower_components/requirejs-text/text',
		googleMapLodash: '../app/bower_components/lodash/dist/lodash.underscore.min',
	    googleMap : '../app/bower_components/angular-google-maps/dist/angular-google-maps.min',
        nsPopover : '../lib/nsPopover/nsPopover'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularAnimate' : ['angular'],
        'angularTouch' : ['angular'],
        'angularSanitize' : ['angular'],
        'uiRouter' : ['angular'],
        'ionic' :  {'exports' : 'ionic'},
        'angularIonic': ['angular', 'ionic','uiRouter', 'angularAnimate', 'angularTouch', 'angularSanitize'],
        'googleMapLodash':['angularIonic'],
        'googleMap':['googleMapLodash'],
        'nsPopover':['angularIonic']
    },
    priority: [
        "angular"
    ]
});

require( [
  //  'cordova',
    'ionic',
    'angular',
    'app'], function(ionic, angular, app) {
    'use strict';

    var start  = function(){
        angular.bootstrap(document, [app['name']]);
    }
     try{
        (document.body && device) ? start() : ionic.Platform.ready(start);
    }catch(e){
        (document.body) ? start() : ionic.Platform.ready(start);
    }

});
