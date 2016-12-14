(function () {
    angular.module('postController', [])
        .controller('postController', postController);
    postController.$inject = ['$http', '$localStorage', '$location', '$filter', '$stateParams'];
    function postController($http, $localStorage, $location, $filter, $stateParams) {
        var self = this;
        self.$http = $http;
        self.blogs = {};
        self.logout = logout;
        self.backTo = backTo;
        self.displayName = '';
        self.froalaOptions = {};
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
	                            var created = self.post.created;
	                            self.post.created = new Date(created);
	                            console.log(self.post);
	                            // console.log(self.post.featuredImage);
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
        function backTo() {
            $location.path('/blogs');
        }

    }

}());
