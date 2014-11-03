define(['angular'], function (angular) {
	return angular.module('starter.imagePickerCtrl', [])


	// A simple controller that fetches a list of data from a service
	.controller('imagePickerCtrl', function($rootScope,$window,$scope,$location,$ionicSideMenuDelegate,$ionicLoading) {
            window.imagePicker.getPictures(
                function(results) {
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                    }
                }, function (error) {
                    console.log('Error: ' + error);
                }
            );
	});
});
