'use strict';

angular.module('gitwhere.controllers', [])
.controller('MainController', ['$scope', 'googleMapsAPIAdapter', 'mapElementFactory', 'gitwhereAPIAdapter', function($scope, googleMapsAPIAdapter, mapElementFactory, gitwhereAPIAdapter) {

	var map = mapElementFactory.init();

	$scope.statusMessage = "Acquiring location";

	googleMapsAPIAdapter.getCurrentPosition(map, $scope.statusMessage).then(function(response) {
		$scope.statusMessage = response;
	});

	$scope.searchByLocation = function(location) {
		googleMapsAPIAdapter.getNewPosition(map, location).then(function(response) {
			console.log(response);
		});

		$scope.developerList = gitwhereAPIAdapter.developersByLocation(location).query(function() {
		});
	};

	$scope.getUserDetails = function(username) {
	};

}]);
