'use strict';

angular.module('gitwhere.controllers', [])
.controller('MainController', ['$scope', 'googleMapsAPIAdapter', 'mapElementFactory', 'gitwhereAPIAdapter', function($scope, googleMapsAPIAdapter, mapElementFactory, gitwhereAPIAdapter) {

	var map = mapElementFactory.init();
	$scope.searchLocation = "";

	$scope.statusMessage = "Acquiring location";

	googleMapsAPIAdapter.getCurrentPosition(map, $scope.statusMessage).then(function(response) {
		$scope.statusMessage = response;
	});

	$scope.searchByLocation = function() {
		$scope.developerList = gitwhereAPIAdapter.developersByLocation($scope.searchLocation).query(function() {
		});
	};

}]);
