(function(){
	'use strict';
	angular
		.module('ngLogin', [
			'loginController',
			'ui.router',
			'froala',
			'ngPassword',
			'ngMessages',
			'ngFileUpload',
			'ngStorage',
			'ngLogin.config',
			'adminController',
			'registerController',
			'blogController',
			"createController",
			"blogFilter",
			"forgotController",
			"postController",
			"angularMoment",
			"ngMaterial",
			'ngAnimate',
			'ngAria',
			"md.data.table",
			"angular.filter",
			"editController"
		])
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('blue-grey')
				.accentPalette('blue-grey');
		})
})();
