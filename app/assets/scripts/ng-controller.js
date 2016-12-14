(function() {
    angular.module('ngController', [])
        .controller('ngController', ngController);
	ngController.$inject =['$http', '$window', '$state'];

    function ngController($http, $window, $state) {
    	var self = this;
	    self.options = false;
	    self.dud = false;
	    self.name = '';
	    self.email = '';
	    self.content = '';
	    self.eaddress = '';
	    self.$http = $http;
		self.donutclicker = donutclicker;
		self.flappy = flappy;
		self.home = home;
	    self.register = register;
	    self.registerPage = registerPage;
	    self.login = login;
	    self.post = post;

	    function post() {
	    	var message = {
	    		name: self.name,
			    email: self.email,
			    content: self.content
		    };

		    self.$http.post('/api/postEmail', message).then(function(response){
		    	console.log(response);
			    self.name = '';
			    self.email = '';
			    self.content = '';
		    });
	    }
		function home() {
			$state.go('home');
		}
		function donutclicker() {
			$window.location.href = './donutclicker/index.html';
		}
		function flappy() {
			$window.location.href = './flappy/index.html';
		}
		function registerPage() {
			$window.location.href = './register/index.html';
		}
		function login() {
			$window.location.href = './admin/index.html';
		}
		function blog() {
			$window.location.href = './blog/index.html';
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
