(function () {
	angular.module('loginController', [])
		.controller('loginController', loginController);
	loginController.$inject = ['$http', '$window'];
	function loginController($http, $window) {
		var self = this;
		self.email = '';
		self.$http = $http;
		self.register = register;
		self.signIn = signIn;
		self.authenticated = null;
		self.wrongPassword = '';
		self.onInit = onInit;
		function onInit() {

		}
		function signIn() {
			var body = {
				email: self.email,
				password: self.password
			};
			self.$http.post('/api/login', body).then(function (response) {
					self.authenticated = response.data;
					console.log(self.authenticated);
					var object = {
						token: self.authenticated
					};
					self.$http.post('/api/checkUser', object).then(function(response) {
						console.log(response);
						// self.$http.post('/api/updateUser', object).then(function (response) {
						// 	console.log(response);
						// 	$window.location.href = './admin/index.html';
						// })
					});
			})
		}

		function register() {
			var body = {
				email: self.eaddress,
				password: self.password
			};
			self.$http.post('/api/register', body).then(function (response) {
				console.log(response);
			})
		}

	}

}());
