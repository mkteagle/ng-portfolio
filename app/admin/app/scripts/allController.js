(function () {
	angular.module('editController', [])
		.controller('editController', editController);
	editController.$inject = ['$http', '$localStorage', '$location', '$filter', '$stateParams', 'Upload', '$filter'];
	function editController($http, $localStorage, $location, $filter, $stateParams, Upload, $filter) {
		var self = this;
		self.$http = $http;
		self.logout = logout;
		self.manageBlogs = manageBlogs;
		self.post = {};
		self.onInit = onInit;
		self.counties = {};
		self.county = '';
		self.countiesList = [];
		self.blogs = {};

		function onInit() {
			if ($localStorage.currentUser) {
				var object = {
					uid: $localStorage.currentUser.uid
				};
				self.$http.post('/api/locateUser', object).then(function(response) {
					self.displayName = response.data.displayName;
					var object = {};
					self.$http.post('/api/all', object).then(function(response) {
						self.blogs = angular.fromJson(response.data);
						angular.forEach(self.blogs, function(blog) {
							self.temp = [];
							self.temp.push(blog.county);
							self.countiesList = self.temp;
						});
						// angular.forEach(self.blogs, function(blog){
						// 	if (blog.param === $stateParams.param) {
						// 		self.post = blog;
						// 	}
						// })
					}).catch(function(err) {
						if (err) throw err;
					})
				}).catch(function(err) {
					if (err) throw err;
				})
			}
			self.$http.get('../assets/static/counties.json').then(function(response) {
				self.counties = response.data.counties;
				angular.forEach(self.countiesList, function(countytmp) {
					angular.forEach(self.counties, function(county) {
						if (county.name == countytmp) {

						}
					})
				})

			}).catch(function(err) {
				if (err) {
					throw err;
				}
			});

		}
		self.onInit();

		function logout() {
			delete $localStorage.currentUser;
			self.$http.defaults.headers.common.Authorization = '';
			console.log($localStorage.currentUser);
			$location.path('/login');
		}
		function manageBlogs() {
			$location.path('/blogs');
		}

	}

}());