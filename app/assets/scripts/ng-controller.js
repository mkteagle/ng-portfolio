(function() {
    angular.module('ngController', [])
        .controller('ngController', ngController);
	ngController.$inject =['$http'];
    function ngController($http) {
    	var self = this;
	    self.options = false;
	    self.dud = false;
	    self.post = post;
	    self.name = '';
	    self.email = '';
	    self.content = '';
	    self.$http = $http;

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
        
    }

}());
