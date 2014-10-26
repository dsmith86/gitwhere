'use strict';

angular.module('gitwhere.controllers', [])
.controller('MainController', ['$scope', function($scope) {

	$scope.statusMessage = "All good!";

	var mapOptions = {
          center: { lat: 0, lng: 0},
          zoom: 2
        };

    var marker;

	var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

	if (navigator.geolocation) {
		$scope.statusMessage = "Acquiring location";

		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pos);
			map.setZoom(8);

			marker = new google.maps.Marker({
				position: pos
			}).setMap(map);

			var onIdleListener = google.maps.event.addListener(map, 'idle', function() {
				$scope.statusMessage = "All done!";
				$scope.$apply();

				google.maps.event.removeListener(onIdleListener);
			});
		}, function() {
			$scope.statusMessage = "Can't determine location due to user permissions";
			$scope.$apply();
		});
	} else {
		$scope.statusMessage = "Can't determine location because the browser doesn't support it";
	}

}]);
