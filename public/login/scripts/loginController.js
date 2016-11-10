(function() {
	angular.module('loginController', [])
		.controller('loginController', loginController);
	loginController.$inject =['$http'];
	function loginController($http) {
		var self = this;
		self.email = '';
		self.$http = $http;
		self.register = register;
		self.signIn = signIn;
		self.authenticated = null;
		self.wrongPassword =  '';

		function signIn() {
			var body = {
				email: self.email,
				password: self.password
			};
			self.$http.post('/api/login', body).then(function(response) {
				console.log(response);
					if (response.data.code = "auth/wrong-password") {
						self.wrongPassword = response.data.message;
						console.log(self.wrongPassword);
					}
					else {
						var object = {
							uid: response.data.uid,
							email: response.data.email
						};
						console.log(object);
						self.$http.post('/api/updateUser', object).then(function(response){
							console.log(response);
						})
					}
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
