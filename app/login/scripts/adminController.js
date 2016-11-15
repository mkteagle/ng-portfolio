(function () {
    angular.module('adminController', [])
        .controller('adminController', adminController);
    adminController.$inject = ['$http', '$localStorage', '$location'];
    function adminController($http, $localStorage, $location) {
        var self = this;
        self.$http = $http;
        self.authenticated = null;
        self.wrongPassword = '';
        self.logout = logout;
        self.createPost = createPost;
        self.updateUser = updateUser;
        self.register = register;
        self.displayName = '';
        self.manageBlogs = manageBlogs;
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
        function register() {
            $location.path('/register');
        }
        function createPost() {
            self.$http.post()
        }

        function updateUser() {
            var object = {
                uid: $localStorage.currentUser.uid,
                displayName: self.displayName
            };
            self.$http.post('/api/adminUpdate', object).then(function(response) {
                console.log(response.data);
            }).catch(function(err) {
                if (err) throw err;
            });
        }
        function manageBlogs() {
            $location.path('/blogs')
        }

    }

}());

