(function(){
	'use strict';
	angular
		.module('ngLogin', [
			'loginController',
			'ui.router',
			'froala',
			'ngStorage',
			'ngLogin.config',
			'adminController',
			'registerController',
			'blogController',
			"createController"
		])
})();
