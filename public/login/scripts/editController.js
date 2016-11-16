(function () {
    angular.module('editController', [])
        .controller('editController', editController);
    editController.$inject = ['$http', '$localStorage', '$location', '$filter', '$stateParams'];
    function editController($http, $localStorage, $location, $filter, $stateParams) {
        var self = this;
        self.$http = $http;
        self.logout = logout;
        self.manageBlogs = manageBlogs;
        self.displayName = '';
        self.blogTitle = '';
        self.featuredImage = 'if nothing say nothing.jpg';
        self.blogContent = '';
        self.updateBlog = updateBlog;
        self.froalaOptions = {};
        self.blogEditor = '';
        self.post = {};
        self.onInit = onInit;

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
                            }
                        })
                    }).catch(function(err) {
                        if (err) throw err;
                    })
                }).catch(function(err) {
                    if (err) throw err;
                })
            }

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
        function updateBlog() {
            var titleParams = $filter('removeSpacesThenLowercase')(self.post.title);
            // var uids = $filter('removeSpaces')(date + self.post.title);
            var object = {
                uid: self.post.uid,
                title: self.post.title,
                featuredImage: self.post.featuredImage,
                content: self.post.content,
                author: self.displayName,
                param: titleParams
            };
            console.log(object);
            self.$http.post('/api/updateBlog', object).then(function(response) {
            }).catch(function(err){
                if (err) throw err;
            })
        }

    }

}());
