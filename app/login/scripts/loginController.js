(function() {
	angular.module('loginController', [])
		.controller('loginController', loginController);
	loginController.$inject =['$http'];
	function loginController($http) {
		var self = this;
		self.eaddress = '';
		self.$http = $http;
		self.register = register;
		self.signIn = signIn;
		self.googleLogin = googleLogin;
		self.facebookLogin = facebookLogin;
		self.authenticated = null;

		function facebookLogin() {

		}
		function googleLogin() {
			self.$http.post('/api/googleLogin').then(function(response){
				console.log(response);
			})
		}
		function signIn() {
			var body = {
				email: self.eaddress,
				password: self.password
			};
			self.$http.post('/api/login', body).then(function(response) {
				var object = {
					udid: response.data.uid,
					email: response.data.email
				};
				console.log(object);
				self.$http.post('/api/updateUser', object).then(function(response){
					console.log(response);
				})
			})
		}

		function register() {
			var body = {
				email: self.eaddress,
				password: self.password
			};
			self.$http.post('/api/register', body).then(function(response) {
				console.log(response);
			})
		}

	}

}());
