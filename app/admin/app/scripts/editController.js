(function () {
    angular.module('editController', [])
        .controller('editController', editController);
    editController.$inject = ['$http', '$localStorage', '$location', '$filter', '$stateParams', 'Upload', '$state'];
    function editController($http, $localStorage, $location, $filter, $stateParams, Upload, $state) {
        var self = this;
        self.$http = $http;
        self.logout = logout;
        self.manageBlogs = manageBlogs;
        self.updateBlog = updateBlog;
        self.uploadFeatured = uploadFeatured;
        self.froalaOptions = {};
        self.blogEditor = '';
        self.post = {};
        self.counties = {};
        self.onInit = onInit;
        self.blogPage = blogPage;
        self.adminPage = adminPage;
        self.createPost = createPost;

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
                        angular.forEach(self.blogs, function(blog){
                            if (blog.param === $stateParams.param) {
                                self.post = blog;
                                var created = self.post.created;
                                self.post.created = new Date(created);
                                console.log(self.post);
                            }
                        })
                    }).catch(function(err) {
                        if (err) throw err;
                    })
                }).catch(function(err) {
                    if (err) throw err;
                })
            }
            self.$http.get('../assets/static/counties.json').then(function(response) {
                self.counties = response.data.counties;
                if (self.post.county == '' || self.post.county == null) {
                    self.post.county = self.county;
                }
                else {
                    self.county = self.post.county;
                }
            })

        }

        self.onInit();
        function blogPage() {
            $state.go('blogs');
        }
        function createPost() {
            $state.go('create');
        }
        function adminPage() {
            $state.go('home');
        }

	    function uploadFeatured(file) {

		    Upload.upload({
			    url: 'api/uploadFeatured',
			    data: {file: file}
		    }).then(function (resp) {
			    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			    console.log(resp.data);
			    self.post.featuredImage = resp.data.link;
			    self.$http.post('/api/updateBlog', self.post).then(function(post) {

			    }).catch(function(err) {
				    if (err) throw err;
			    })
		    }, function (resp) {
			    console.log('Error status: ' + resp.status);
		    }, function (evt) {
			    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		    });
	    }
        function logout() {
            delete $localStorage.currentUser;
            self.$http.defaults.headers.common.Authorization = '';
            console.log($localStorage.currentUser);
            $location.path('/login');
        }
        function manageBlogs() {
            $location.path('/blogs');
        }
        function updateBlog() {
	        if (self.county == null) {
	            self.county = self.post.county;
            }
            console.log(self.post.content);
            var titleParams = $filter('removeSpacesThenLowercase')(self.post.title);
            // var uids = $filter('removeSpaces')(date + self.post.title);
            var object = {
                uid: self.post.uid,
                title: self.post.title,
                created: self.post.created,
                featuredImage: self.post.featuredImage,
                content: self.post.blogContent,
                author: self.displayName,
                param: titleParams,
                county: self.county,
	            posted: self.post.posted
            };
            console.log(object);
            self.$http.post('/api/updateBlog', object).then(function(response) {
            }).catch(function(err){
                if (err) throw err;
            })
        }

    }

}());
