(function() {
    angular.module('forgotController', [])
        .controller('forgotController', forgotController);
    forgotController.$inject =['$http'];
    function forgotController($http) {
        var self = this;
        self.email = '';
        self.$http = $http;
        self.forgotPassword = forgotPassword;
        function forgotPassword() {
            var body = {
                email: self.email
            };
            self.$http.post('/api/forgot', body).then(function(response){
                console.log(response.data);
                self.email = '';
                alert(response.data);
            })
        }
    }

}());
