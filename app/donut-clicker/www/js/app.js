// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'app.ctrl', 'ngToast', 'app.login', 'firebase', 'gameService', 'gameController', 'upgradeDirective', 'nameFilters', 'angular-toArrayFilter', 'shuffleModule'])
  .constant('firebaseUrl', "https://donutclick2.firebaseio.com/")
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl as ac'
  })

  .state('app.leaderboard', {
    url: '/leaderboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/leaderboard.html'
      }
    }
  })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'loginController as lc'
        }
      }
    })

    .state('app.game', {
      url: '/game',
      views: {
        'menuContent': {
          templateUrl: 'templates/game.html',
          controller: 'gameController as gc'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
