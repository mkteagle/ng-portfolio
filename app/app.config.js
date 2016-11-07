(function() {
    angular.module('ngPortfolio.config', [])
		.config(configureRouter);

	configureRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

		function configureRouter ($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise("/home");
			$stateProvider
				.state("home", {
					url: "/home",
					templateUrl: "../assets/templates/home.html"
				})
				.state("contact", {
					url: "/contact",
					templateUrl: "../assets/templates/contact.html",
					controller: "ngController as nc"
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
					templateUrl: "../assets/portfolio/donut-clicker.html",
					controller: "ngController as nc"
				})
				.state("xactware", {
					url:"/portfolio/xactware",
					templateUrl: "../assets/portfolio/xactware.html"
				})
				.state("register", {
					url:"/register",
					templateUrl: "../assets/templates/register.html",
					controller: "ngController as nc"
				})
				.state("flappy-bird", {
					url:"/portfolio/flappy-bird",
					templateUrl: "../assets/portfolio/flappy-bird.html",
					controller: "ngController as nc"
				});
			$locationProvider.html5Mode(true);
	}
}());