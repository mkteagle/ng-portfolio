(function() {
    angular.module('myApp',
        [
            'ngMaterial',
            'ui.router',
            'blogService',
            'blogController',
            'blogDirective',
            'froala',
            'blogFilter',
            'truncate',
            'dirPagination',
            'md.data.table',
            'ngAnimate',
            'ngFileUpload',
            'uploaderApp',
            'editPostController'
        ])
        .config(function ($stateProvider, $urlRouterProvider, $mdIconProvider) {
        $urlRouterProvider.otherwise("/edit");
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);
        $stateProvider
            .state('login', {
                url:'/login',
                templateUrl: './templates/login.html',
                controller: 'loginController as lc'
            })
            .state("home", {
                url: "/home",
                templateUrl: "./templates/home.html",
                controller: "HomeController as hc"
            })
            .state("newhome", {
                url: "/newhome",
                templateUrl: "./templates/newhome.html"
            })
            .state("jen", {
                url: "/jen",
                templateUrl: "./templates/jen.html"
            })
            .state("post", {
                url: "/posts/:blogParam",
                templateUrl: "./templates/post.html",
                controller: "BlogController as bc"
            })
            .state("edit", {
                url: "/edit/:blogParam",
                templateUrl: "./templates/edit-post.html",
                controller: "editPostController as bc"
            })
            .state("editor", {
                url:"/editor",
                templateUrl: "./templates/editor.html",
                controller: "BlogController as bc"
            })
            .state("masterlist", {
                url:"/master",
                templateUrl: "./templates/masterlist.html",
                controller: "BlogController as bc"
            })
            .state("about", {
                url:"/about",
                templateUrl: "./templates/about.html",
                controller: "BlogController as bc"
            })
            .state("counties", {
                url:"/counties/:cParam",
                templateUrl: "./templates/counties.html",
                controller: "BlogController as bc"
            })
            .state("categories", {
                url:"/categories/:catParam",
                templateUrl: "./templates/categories.html",
                controller: "BlogController as bc"
            })
            .state("posts", {
                url: "/posts",
                templateUrl: "./templates/posts.html",
                controller: 'BlogController as bc'
            });

        // if none of the above states are matched, use this as the fallback

        //$locationProvider.html5Mode(true);
    });
    $('.selector').froalaEditor({
        imageUploadToS3: {
            bucket: 'doingutahdaily',
            // Your bucket region.
            region: 's3-us-west-2',
            keyStart: 'uploads/',
            callback: function (url, key) {
                // The URL and Key returned from Amazon.
                console.log (url);
                console.log (key);
            },
            params: {
                acl: 'public-read', // ACL according to Amazon Documentation.
                AWSAccessKeyId: 'AKIAIRV6GSVS5RXFBRPQ', // Access Key from Amazon.
                policy: 'POLICY_STRING', // Policy string computed in the backend.
                signature: '' // Signature computed in the backend.
            }
        }
    });
})();

//
//});