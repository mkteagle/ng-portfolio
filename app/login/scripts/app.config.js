(function() {
	angular.module('ngLogin.config', [])
		.config(configureRouter)
        .run(run);

	configureRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configureRouter ($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "./templates/home.html",
                controller: "adminController as ac"
            })
	        .state("forgot", {
		        url: "/forgot",
		        templateUrl: "./templates/forgot.html",
		        controller: "forgotController as fc"
	        })
            .state("admin", {
                url: "/admin",
                templateUrl: "./templates/admin.html"
            })
            .state("edit", {
                url: "/edit/:param",
                templateUrl: "./templates/edit.html",
                controller: "editController as ec"
            })
            .state("blogs", {
                url: "/blogs",
                templateUrl: "./templates/blogs.html",
                controller: "blogController as bc"
            })
            .state("create", {
                url: "/create",
                templateUrl: "./templates/create.html",
                controller: "createController as cc"
                
            })
            .state("register", {
                url: "/register",
                templateUrl: "./templates/register.html",
                controller: "registerController as rc"
            })
            .state("post", {
                url: "/post/:param",
                templateUrl: "./templates/post.html",
                controller: "postController as pc"
            })
            .state("login", {
                url: "/login",
                templateUrl: "./templates/login.html",
                controller: "loginController as lc"
            });
	}
    function run($rootScope, $http, $location, $localStorage) {
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
}());