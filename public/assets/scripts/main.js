(function() {
    angular.module('ngPortfolio', ['ngController']);

}());
(function() {
    angular.module('ngController', [])
        .controller('ngController', ngController);
    function ngController() {
    	var self = this;
	    self.options = false;
        
    }

}());