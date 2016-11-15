(function(){
    angular.module('commentService', [])
        .service('commentService', commentService);

    commentService.$inject = ['$filter', 'blogService', '$stateParams', '$http'];

    function commentService ($filter, blogService, $stateParams, $http) {
        var self = this;
        var newtime = $filter('date')(new Date(), 'HH:mm:ss');
        var newdate = $filter('date')(new Date(), 'MM/dd/yyyy');
        self.$http = $http;
        self.selected = blogService.post;
        self.blogs = blogService.blogs;
        self.add = add;
        self.gB = gB;
        self.commentCollection = [];
        // self.getComments = getComments;
        function gB() {
            self.$http.get('/api/getPosts').then(response => {
                self.blogs = response.data;
            });
        }
        function add () {
            console.log($stateParams.blogParam);
            var comment = [{name: 'mike', content: 'this is cool content', reference: 'new comment', blog: $stateParams.blogParam, date: newdate, time: newtime}];
            console.log(self.selected);
            self.selected['comments'] = comment;
            console.log(self.selected);
            self.$http.put('/api/comment', self.selected).then(function(response) {
                self.blogs = response.data;
            });
            // self.gB();
        }
    }
})();
