angular.module('myApp.services')
	.factory('User', function($http) { // injectables go here
		var backendUrl = "http://localhost:3000";
		var service = { // our factory definition
			user: {},
			setName: function(newName) {
				service.user['name'] = newName;
			},
			setEmail: function(newEmail) {
				service.user['email'] = newEmail;
			},
			save: function() {
				return $http.post(backendUrl + '/users', {
					user: service.user
				});
			}
		};
		return service;
	});