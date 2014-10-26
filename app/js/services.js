'use strict';

angular.module('gitwhere.services', []).

factory('googleMapsAPIAdapter', function($http, $q) {
	var APIKey = "AIzaSyBMll9bq1l5y4-GKVcL3aNk-BaYmI5xdbg";

	return {
		reverseGeocode: function(lat, lng) {
			var requestUri = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + APIKey + "&result_type=postal_code";

			var deferred = $q.defer();

			$http.get(requestUri).success(function(response) {
				deferred.resolve(response.results[0]);
			});

			return deferred.promise;
		}
	};
});