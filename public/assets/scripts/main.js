(function() {
    angular.module('ngPortfolio', ['ngController', 'ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/home");
		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "../assets/templates/home.html"
			})
			.state("contact", {
				url: "/contact",
				templateUrl: "../assets/templates/contact.html"
			})
			.state("resume", {
				url: "/resume",
				templateUrl: "../assets/templates/resume.html"
			})
			.state("doing-utah-daily", {
				url:"/portfolio/doing-utah-daily",
				templateUrl: "../assets/portfolio/doing-utah-daily.html"
			})
			.state("donut-clicker", {
				url:"/portfolio/donut-clicker",
				templateUrl: "../assets/portfolio/donut-clicker.html"
			})
			.state("xactware", {
				url:"/portfolio/xactware",
				templateUrl: "../assets/portfolio/xactware.html"
			})
			.state("flappy-bird", {
				url:"/portfolio/flappy-bird",
				templateUrl: "../assets/portfolio/flappy-bird.html"
			});
	});
}());
(function() {
    angular.module('ngController', [])
        .controller('ngController', ngController);
    function ngController() {
    	var self = this;
	    self.options = false;
	    self.dud = false;
        
    }

}());
