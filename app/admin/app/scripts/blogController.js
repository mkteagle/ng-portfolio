(function () {
    angular.module('blogController', [])
        .controller('blogController', blogController);
    blogController.$inject = ['$http', '$localStorage', '$location', '$stateParams', '$filter'];
    function blogController($http, $localStorage, $location, $stateParams, $filter) {
        var self = this;
        self.$http = $http;
        self.authenticated = null;
        self.wrongPassword = '';
        self.logout = logout;
        self.createPost = createPost;
        self.displayName = '';
        self.onInit = onInit;
        self.adminPage = adminPage;
	    self.reverse = '';
        self.blogs = {};
	    self.query = {
		    order: 'title',
		    limit: 5,
		    page: 1,
            count: 0
	    };
	    self.imagePath = imagePath;
        // self.options = {
        //     rowSelection: true,
        //     multiSelect: true,
        //     autoSelect: true,
        //     decapitate: false,
        //     largeEditDialog: false,
        //     boundaryLinks: false,
        //     limitSelect: true,
        //     pageSelect: true
        // };
	    self.deleteBlog = deleteBlog;
	    self.selected = [];

        function onInit() {
            if ($localStorage.currentUser) {
                var object = {
                    uid: $localStorage.currentUser.uid
                };
                self.$http.post('/api/locateUser', object).then(function(response) {
                    self.displayName = response.data.displayName;
                    var object = {};
                    self.$http.post('/api/all', object).then(function(response) {
                        self.temp = angular.fromJson(response.data);
                        self.blogs.data = $filter('toArray')(self.temp);
                        self.blogs.count = self.blogs.data.length;
                    }).catch(function(err) {
                        if (err) throw err;
                    })
                }).catch(function(err) {
                    if (err) throw err;
                })
            }
        }
        self.onInit();

	    self.getBlogs = function () {
		    var object = {};
		    self.$http.post('api/all', object).then(function(response) {
                self.temp = angular.fromJson(response.data);
                self.blogs.data = $filter('toArray')(self.temp);
                self.blogs.count = self.blogs.data.length;
		    }).catch(function(err) {
			    if (err) throw err;
		    })
	    };
	    function deleteBlog(blog) {
		    self.$http.post('/api/deleteBlog', blog).then(function(response) {
		        console.log(response);
		        self.getBlogs();
		    }).catch(function(err) {
			    if (err) throw err;
		    });
	    }
        function adminPage() {
            $location.path('/');
        }
        function logout() {
            delete $localStorage.currentUser;
            self.$http.defaults.headers.common.Authorization = '';
            console.log($localStorage.currentUser);
            $location.path('/login');
        }
        function createPost() {
            $location.path('/create');
        }
        function imagePath(path) {
	        $location.path(path);

        }

    }

}());
