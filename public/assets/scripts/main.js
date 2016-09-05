(function() {
    angular.module('ngController', [])
        .controller('ngController', ngController);
	ngController.$inject =['$http', '$window'];
    function ngController($http, $window) {
    	var self = this;
	    self.options = false;
	    self.dud = false;
	    self.post = post;
	    self.name = '';
	    self.email = '';
	    self.content = '';
	    self.$http = $http;
		self.donutclicker = donutclicker;
		self.flappy = flappy;

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
		function donutclicker() {
			$window.location.href = './donutclicker/index.html';
		}
		function flappy() {
			$window.location.href = './flappy/index.html';
		}
        
    }

}());
