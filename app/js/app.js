'use strict';

angular.module('gitwhere', [
	'gitwhere.controllers',
	'gitwhere.directives',
	'gitwhere.services',
	'ngRoute',
	'ngResource'
	])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/partials/gitwhere.html',
		controller: 'MainController'
	});
}]);