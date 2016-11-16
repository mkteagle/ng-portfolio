(function () {
    angular.module('blogController', [])
        .controller('blogController', blogController);
    blogController.$inject = ['$http', '$localStorage', '$location', '$stateParams'];
    function blogController($http, $localStorage, $location, $stateParams) {
        var self = this;
        self.$http = $http;
        self.authenticated = null;
        self.wrongPassword = '';
        self.logout = logout;
        self.createPost = createPost;
        self.displayName = '';
        self.onInit = onInit;
        self.adminPage = adminPage;
        self.blogs = [];

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
                        console.log(self.blogs);
                    }).catch(function(err) {
                        if (err) throw err;
                    })
                }).catch(function(err) {
                    if (err) throw err;
                })
            }
        }
        self.onInit();
        
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

    }

}());
