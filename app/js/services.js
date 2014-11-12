'use strict';

angular.module('gitwhere.services', []).

factory('googleMapsAPIAdapter', function($http, $q) {
	var APIKey = "AIzaSyBMll9bq1l5y4-GKVcL3aNk-BaYmI5xdbg";
	var geocoder = new google.maps.Geocoder();
	var marker;

	var api = {};

	api.getCurrentPosition = function(map, status) {
		var deferred = $q.defer();

		if (navigator.geolocation) {
			status = "Acquiring location";

			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				map.setCenter(pos);
				map.setZoom(9);

				if (marker) {
					marker.setMap(null);
				}

				marker = new google.maps.Marker({
					position: pos
				}).setMap(map);

				api.reverseGeocode(pos.lat(), pos.lng())
					.then(function(data) {
						var location = data["formatted_address"];
						deferred.resolve("Approximate Location: " + location);
					});

			}, function() {
				status = "Can't determine location due to user permissions";
			});
		} else {
			status = "Can't determine location because the browser doesn't support it";
		}

		return deferred.promise;
	};

	api.reverseGeocode = function(lat, lng) {
		var requestUri = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + APIKey + "&result_type=postal_code"	;

		var deferred = $q.defer();

		$http.get(requestUri).success(function(data, status, headers, config) {
			deferred.resolve(data.results[0]);
		}).error(function(data, status, headers, config) {
			deferred.reject();
		});

		return deferred.promise;
	};
		
	return api;
}).

factory('mapElementFactory', function() {
	var mapOptions = {
          center: { lat: 0, lng: 0},
          zoom: 2
    };

    var map;

    var api = {};

    api.init = function() {
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		return map;
    }

    return api;
}).

factory('gitwhereAPIAdapter', function($resource) {
	var api = {};

	api.developersByLocation = function(query) {
		return $resource("http://gitwhere-api.herokuapp.com/developers/location/:location", {location: query});
	}

	return api;
});