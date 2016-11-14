(function() {
	angular.module('blobController', [])
		.controller('blobController', blobController);
	blobController.$inject =[];

	function blobController() {
		var self = this;
		self.blogContent = '';
		self.froalaOptions = {};
	}

}());
