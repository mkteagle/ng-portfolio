(function(){
	'use strict';
	angular
		.module('ngLogin', [
			'loginController',
			'ui.router',
			'ngStorage',
			'ngLogin.config',
			'adminController',
			'registerController',
			'blogController',
			"createController"
		])
})();
