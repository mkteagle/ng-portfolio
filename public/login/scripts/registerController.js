(function () {
    angular.module('registerController', [])
        .controller('registerController', registerController);
    registerController.$inject = ['$http', '$localStorage', '$location'];
    function registerController($http, $localStorage, $location) {
        var self = this;
        self.$http = $http;
        self.authenticated = null;
        self.wrongPassword = '';
        self.createUser = createUser;
        self.displayName = '';
        self.email = '';
        self.password = '';
        
        function createUser() {
            var object = {
                email: self.email,
                password: self.password,
                displayName: self.displayName
            };
            self.$http.post('/api/createUser', object).then(function(response){
                console.log(response.data);
            })
                .catch(function(err) {
                if (err) throw err;
            })
        }

    }

}());