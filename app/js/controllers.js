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

	$scope.getDeveloperDetails = function(username, index) {
		var results = gitwhereAPIAdapter.developerDetails(username).get(
			function() {
				$scope.developerList[index] = results;
		});
	};

	$scope.getHttp = function(index) {
		var link = $scope.developerList[index].website;

		if (link === null) {
			return "";
		}

	    if (link.search(/^http[s]?\:\/\//) == -1) {
	        link = 'http://' + link;
	    }
	    return link;
	}

}]);
