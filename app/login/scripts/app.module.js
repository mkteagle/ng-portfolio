(function(){
	'use strict';
	angular
		.module('ngLogin', [
			'loginController',
			'ui.router',
			'froala',
			'ngPassword',
			'ngMessages',
            'angularFileUpload',
			'ngStorage',
			'ngLogin.config',
			'adminController',
			'registerController',
			'blogController',
			"createController",
			"blogFilter",
			"forgotController",
			"editController",
			"postController"
		])
})();
