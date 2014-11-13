'use strict';

angular.module('gitwhere.services', []).

factory('googleMapsAPIAdapter', function($http, $q) {
	var APIKey = "AIzaSyBMll9bq1l5y4-GKVcL3aNk-BaYmI5xdbg";
	var geocoder = new google.maps.Geocoder();
	var marker = new google.maps.Marker();

	var api = {};

	api.getCurrentPosition = function(map, status) {
		var deferred = $q.defer();

		if (navigator.geolocation) {
			status = "Acquiring location";

			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				setupMap(map, marker, pos, null);

				reverseGeocode(pos.lat(), pos.lng())
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

	api.getNewPosition = function(map, newLocation) {
		var deferred = $q.defer();

		geocode(newLocation)
			.then(function(data) {

				var location = data.results[0].geometry.location;
				var bounds = data.results[0].geometry.bounds;

				var pos = new google.maps.LatLng(location.lat, location.lng);

				setupMap(map, marker, pos, bounds);
			});

		return deferred.promise;
	};

	var reverseGeocode = function(lat, lng) {
		var requestUri = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + APIKey + "&result_type=postal_code"	;

		var deferred = $q.defer();

		$http.get(requestUri).success(function(data, status, headers, config) {
			deferred.resolve(data.results[0]);
		}).error(function(data, status, headers, config) {
			deferred.reject();
		});

		return deferred.promise;
	};

	var geocode = function(location) {
		var uriEncodedLocation = location.replace(/ /g, '+');

		var requestUri = "https://maps.googleapis.com/maps/api/geocode/json?address=" + uriEncodedLocation + "&key=" +
			APIKey;

		var deferred = $q.defer();

		$http.get(requestUri).success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(data, status, headers, config) {
			deferred.reject();
		});

		return deferred.promise;
	};

	var setupMap = function(map, marker, pos, bounds) {
		map.setCenter(pos);
		map.setZoom(9);

		if (bounds) {
			var northeast = new google.maps.LatLng(bounds.northeast.lat, bounds.northeast.lng);
			var southwest = new google.maps.LatLng(bounds.southwest.lat, bounds.southwest.lng);

			var mapBounds = new google.maps.LatLngBounds();
			mapBounds.extend(northeast);
			mapBounds.extend(southwest);

			map.fitBounds(mapBounds);
		}

		marker.setMap(null);

		marker = new google.maps.Marker({
			position: pos
		}).setMap(map);
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