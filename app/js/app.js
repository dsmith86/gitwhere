'use strict';

angular.module('gitwhere', [
	'gitwhere.controllers',
	'gitwhere.directives',
	'ngRoute'
	])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/partials/gitwhere.html',
		controller: 'MainController'
	});
}]);