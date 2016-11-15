(function() {
    'use strict';
    angular.module('blogDirective', [])
        .directive("clickTo", function () {
            return {
                restrict: "A",
                templateUrl: "./src/templates/clickto.html"
            }
        })
        .directive("clickToTag", function(){
            return {
                restrict: "A",
                templateUrl: "./src/templates/clicktotag.html"
            }
        })
        .directive("commentDir", commentDir);
        commentDir.$inject = ['blogService', '$http'];
        function commentDir (blogService, $http) {
            var commentController = function () {
                var cc = this;
                cc.$http = $http;
                cc.name = '';
                cc.content = '';
                cc.commentCollection = [];
                cc.comments = [];
                cc.commentCol = [{name: 'Mike', content: 'this should work. why does it not work'}]
                cc.add = add;
                cc.get = get;
                cc.post = blogService.post;
                cc.getGravatar = getGravatar;

                var postAuthorEmail = 'mkteagle@gmail.com';
                function getGravatar (email) {
                    var hash;
                    if (email === void 0) {
                        email = '';
                    }
                    hash = email.trim();
                    hash = hash.toLowerCase();
                    hash = md5(hash);
                    return '//gravatar.com/avatar/' + hash + '?s=104&d=identicon';
                }
                
                function get() {
                    cc.$http.post('/api/comment', cc.post).then(response => {
                        cc.comments = response.data;
                    });
                }
                function add() {
                    blogService.addComment(cc.name, cc.content);
                    cc.get();
                }
            };
            return {
                restrict: "EC",
                templateUrl: "./src/templates/comments.html",
                controller: commentController,
                controllerAs: 'cc',
                bindToController: true
            }
        }

}());
