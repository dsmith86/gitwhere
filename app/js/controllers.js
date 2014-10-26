'use strict';

angular.module('gitwhere.controllers', [])
.controller('MainController', ['$scope', 'googleMapsAPIAdapter', function($scope, googleMapsAPIAdapter) {

	$scope.statusMessage = "All good!";

	var mapOptions = {
          center: { lat: 0, lng: 0},
          zoom: 2
        };

    var marker;
    $scope.location = "";

	var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

	if (navigator.geolocation) {
		$scope.statusMessage = "Acquiring location";

		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pos);
			map.setZoom(9);

			marker = new google.maps.Marker({
				position: pos
			}).setMap(map);

			googleMapsAPIAdapter.reverseGeocode(pos.lat(), pos.lng())
				.then(function(data) {
					var city = data["address_components"][1]["long_name"];
					var state = data["address_components"][2]["short_name"];
					$scope.statusMessage = "Location: " + city + ", " + state;
				});

		}, function() {
			$scope.statusMessage = "Can't determine location due to user permissions";
			$scope.$apply();
		});
	} else {
		$scope.statusMessage = "Can't determine location because the browser doesn't support it";
	}

}]);
