'use strict';

angular.module('gitwhere.directives', []).

directive('searchBar', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'app/partials/search-bar.html'
	}
});