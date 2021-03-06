'use strict';

angular.module('gitwhere.directives', []).

directive('searchBar', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'app/partials/search-bar.html'
	}
}).

directive('developerList', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'app/partials/developer-list.html'
	}
}).

directive('developerDetails', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'app/partials/developer-details.html'
	}
});