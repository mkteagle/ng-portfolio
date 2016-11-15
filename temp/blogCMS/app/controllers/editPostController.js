(function(){
    angular
        .module('editPostController', [])
        .controller('editPostController', editPostController)
        .controller('DialogController', DialogController);
    editPostController.$inject = ['blogService', '$mdDialog', '$stateParams', '$http', '$filter'];
    function editPostController (blogService, $mdDialog, $stateParams, $http, $filter) {
        var self = this;
        self.initPost = initPost;
        self.$http = $http;
        self.blogs = blogService.blogs;
        self.post = {};
        self.getChange = getChange;
        self.addPostParam = addPostParam;
        function addPostParam(blog) {
            blogService.addPostParam(blog);
            self.blogs = blogService.returnBlogs();
        }
        function initPost() {
            self.blogs = blogService.returnBlogs();
            console.log(self.blogs);
            angular.forEach(self.blogs, function (blog) {
                if (blog.param === $stateParams.blogParam) {
                    self.post = blog;
                    console.log(self.post);
                }
            });
        }
        function getChange(blog) {
            blogService.getChange(blog);
        }
    }
    function DialogController($scope, $mdDialog, blog) {
        $scope.blog = blog;
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.postCheck = function () {
            console.log(blog);
        };
    }
    
})();
