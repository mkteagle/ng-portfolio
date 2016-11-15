(function () {
	angular.module('loginController', [])
		.controller('loginController', loginController);
	loginController.$inject = ['$http', '$localStorage', '$location'];
	function loginController($http, $localStorage, $location) {
		var self = this;
		self.email = '';
		self.$http = $http;
		self.register = register;
		self.signIn = signIn;
		self.authenticated = null;
		self.wrongPassword = '';
		self.onInit = onInit;
		self.logout = logout;
		function onInit() {
			console.log($localStorage.currentUser);
		}
		self.onInit();
		function signIn() {
			var body = {
				email: self.email,
				password: self.password
			};
			self.$http.post('/api/login', body).then(function (response) {
					self.authenticated = response.data;
					var object = {
						token: self.authenticated
					};
					self.$http.post('/api/checkUser', object).then(function(response) {
						$localStorage.currentUser = {uid: response.data, token: self.authenticated};
						self.$http.defaults.headers.common.Authorization = 'Bearer ' + self.authenticated;
						$location.path('/');
						console.log($localStorage.currentUser);
					});
			})
		}

		function logout() {
			delete $localStorage.currentUser;
			self.$http.defaults.headers.common.Authorization = '';
			console.log($localStorage.currentUser);
			$location.path('/login');
		}
		
		function createPost() {
			self.$http.post()
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
