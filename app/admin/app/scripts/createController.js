(function () {
    angular.module('createController', [])
        .controller('createController', createController);
    createController.$inject = ['$http', '$localStorage', '$location', '$filter', 'Upload', '$state'];
    function createController($http, $localStorage, $location, $filter, Upload, $state) {
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
        self.uploadFeatured = uploadFeatured;
        self.file = '';
        self.posted = null;
        self.counties = {};
        self.county = '';
        self.blogPage = blogPage;
        self.adminPage = adminPage;


        function onInit() {
            if ($localStorage.currentUser) {
                var object = {
                    uid: $localStorage.currentUser.uid
                };
                self.$http.post('/api/locateUser', object).then(function (response) {
                    console.log(response.data);
                    self.displayName = response.data.displayName;
                }).catch(function (err) {
                    if (err) throw err;
                })
            }
            self.$http.get('../assets/static/counties.json').then(function (response) {
                self.counties = response.data.counties;
            }).catch(function (err) {
                if (err) {
                    throw err;
                }
            });

        }

        self.onInit();
        function blogPage() {
            $state.go('blogs');
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
                self.featuredImage = resp.data.link;
                console.log(self.featuredImage);
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

        function saveBlog() {
            var titleParams = $filter('removeSpacesThenLowercase')(self.blogTitle);
            var uids = $filter('removeSpaces')(Date.now() + self.blogTitle);
            var object = {
                uid: uids,
                title: self.blogTitle,
                featuredImage: self.featuredImage,
                content: self.blogContent,
                author: self.displayName,
                param: titleParams,
                posted: self.posted,
                county: self.county
            };
            self.$http.post('/api/createBlog', object).then(function (response) {
                console.log(response);
                $state.go('blogs');
            }).catch(function (err) {
                if (err) throw err;
            })
        }

    }

}());
