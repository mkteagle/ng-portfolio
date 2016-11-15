(function () {
    angular.module('loginController', [])
.controller('loginController', loginController);
    loginController.$inject = ['blogService'];
function loginController(blogService) {
    // controller data and functions
    var vm = this;
    //vm.authData = blogService.user;
    //vm.recorded = gameService.recorded;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.authWithPassword = authWithPassword;
    vm.createUser = createUser;
    vm.email = '';
    vm.password = '';

    function facebookLogin() {
        blogService.facebookLogin();
        vm.email = '';
        vm.password = '';
    }
    function googleLogin() {
        blogService.googleLogin();
        vm.email = '';
        vm.password = '';
    }
    function createUser() {
        blogService.createUser(vm.email, vm.password);
        vm.password = '';
    }
    function authWithPassword() {
        blogService.authWithPassword(vm.email, vm.password);
        vm.password = '';
    }
}
})();