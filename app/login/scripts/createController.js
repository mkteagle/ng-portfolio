(function () {
    angular.module('createController', [])
        .controller('createController', createController);
    createController.$inject = ['$http', '$localStorage', '$location', '$filter'];
    function createController($http, $localStorage, $location, $filter) {
        var self = this;
        self.$http = $http;
        self.authenticated = null;
        self.wrongPassword = '';
        self.logout = logout;
        self.manageBlogs = manageBlogs;
        self.displayName = '';
        self.blogTitle = '';
        self.featuredImage = 'if nothing say nothing.jpg';
        self.blogContent = '';
        self.saveBlog = saveBlog;
        self.froalaOptions = {};
        self.blogEditor = '';
        self.onInit = onInit;

        function onInit() {
            if ($localStorage.currentUser) {
                var object = {
                    uid: $localStorage.currentUser.uid
                };
                self.$http.post('/api/locateUser', object).then(function(response) {
                    console.log(response.data);
                    self.displayName = response.data.displayName;
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
        function saveBlog() {
	        var titleParams = $filter('removeSpacesThenLowercase')(self.blogTitle);
	        var date = Date.now();
	        var uids = $filter('removeSpaces')(date + self.blogTitle);
	        var newdate = $filter('date')(new Date(), 'MM/dd/yyyy');
	        var time = $filter('date')(new Date(), 'HH:mm:ss');
            var object = {
                uid: uids,
                createdDate: newdate,
	            createdTime: time,
                title: self.blogTitle,
                featuredImage: self.featuredImage,
                content: self.blogContent,
                author: self.displayName,
	            param: titleParams
            };
            self.$http.post('/api/createBlog', object).then(function(response) {
                console.log(response);
            }).catch(function(err){
                if (err) throw err;
            })
        }

    }

}());
