(function () {
    'use strict';
    angular.module('blogService', [])
        .service('blogService', blogService);

    blogService.$inject = ['$filter', '$timeout', '$state', '$stateParams', 'Upload', 'S3UploadService', '$http'];
    function blogService($filter, $timeout, $state, $stateParams, Upload, S3UploadService, $http) {
        var self = this;
        self.blogs = [];
        self.getChange = getChange;
        self.addPostParam = addPostParam;
        self.init = init;
        self.getBlogs = getBlogs;
        self.$http = $http;
        self.returnBlogs = returnBlogs;
        self.addBlog = addBlog;
        init();
        function returnBlogs() {
            self.getBlogs();
            return self.blogs;
        }
        function getBlogs() {
            self.$http.get('/api/getPosts').then(function(response) {
                self.blogs = response.data;
                console.log(self.blogs);
            })
        }
        function init() {
            self.getBlogs();
        }
        function getChange(blog) {
            self.$http.put('/api/updatePost', blog).then(function(response) {
                self.blogs = response.data;
            });
        }
        function addPostParam(blog) {
            var postParam = $filter('removeSpacesThenLowercase')(blog.title);
            blog.param = postParam;
            self.getChange(blog);
        }
        function addBlog() {
            self.$http.post('/api/addPost', {
                name: 'Jennifer Teagle',
                postDate: '',
                date: newdate,
                avatar: '',
                url: '/jen',
                content: '',
                title: 'Placeholder ' + index,
                category: '',
                location: '',
                season: '',
                county: '',
                cparam: '',
                featured: '',
                param: 'placeholder' + '+' + index,
                posted: false,
                comments: []
            }).then(response => {
                self.blogs = response.data;
                self.$http.get('/api/getPosts').then(response => {
                    self.blogs = response.data;
                });
            });
            index++;
        }
    }
    
})();
// function blogService($filter, $timeout, $state, $stateParams, Upload, S3UploadService, $http) {
//     var self = this;
//     var date = Date.now();
//     var newdate = $filter('date')(new Date(), 'MM/dd/yyyy');
//     var newtime = $filter('date')(new Date(), 'HH:mm:ss');
//     var index = 1;
//     self.$http = $http;
//     self.blogs = [];
//     self.addBlog = addBlog;
//     self.getChange = getChange;
//     self.removeBlog = removeBlog;
//     self.getPost = getPost;
//     self.addPostParam = addPostParam;
//     self.addCountyParams = addCountyParams;
//     self.addCategoryParams = addCategoryParams;
//     self.getCounties = getCounties;
//     self.getCategories = getCategories;
//     self.category = '';
//     self.county = '';
//     self.newUser = {};
//     self.post = {};
//     self.uploadFiles = uploadFiles;
//     self.deleteFeatured = deleteFeatured;
//     self.addCategory = addCategory;
//     self.file = {};
//     self.Files = {};
//     self.index = 1;
//     self.file.Success = false;
//     self.file.progress = 0;
//     self.counties = [];
//     self.categories = [];
//     self.seasons = [];
//     self.init = init;
//     self.addComment = addComment;
//     self.gB = gB;
//     self.gCat = gCat;
//     self.init();
//
//     function addComment(user, message) {
//
//         if (self.post['comments'] == null) {
//             var comment = [{name: user, content: message, reference: 'new comment', blog: $stateParams.blogParam, date: newdate, time: newtime}];
//             self.post['comments'] = comment;
//         }
//         else {
//             comment = {name: user, content: message, reference: 'new comment', blog: $stateParams.blogParam, date: newdate, time: newtime};
//             self.post['comments'].push(comment);
//         }
//         self.$http.put('/api/comment', self.post).then(function(response) {
//             self.blogs = response.data;
//         });
//     }
//     function gB() {
//         self.$http.get('/api/getPosts').then(response => {
//             self.blogs = response.data;
//         });
//     }
//     function gCat() {
//         self.$http.get('/api/categories').then(response => {
//             self.categories = response.data;
//         });
//     }
//     function init() {
//         self.$http.get('/api/getPosts').then(response => {
//             self.blogs = response.data;
//         });
//         self.$http.get('/api/categories').then(response => {
//             self.categories = response.data;
//         });
//         self.$http.get('/api/counties').then(response => {
//             self.counties = response.data;
//         });
//         self.$http.get('/api/seasons').then(response => {
//             self.seasons = response.data;
//         });
//     }
//     function addCategory(category) {
//         self.categories.push({name: category});
//         self.post.category = category;
//         self.getChange(self.post);
//     }
//     function deleteFeatured () {
//         self.post.featured = '';
//         self.getChange(self.post);
//     }
//     function uploadFiles(files) {
//         var self = this;
//         self.Files = files;
//         if (files && files.length > 0) {
//             angular.forEach(self.Files, function (file, key) {
//                 S3UploadService.Upload(file).then(function (result) {
//                     // Mark as success
//                     self.file = file;
//                     var newname = $filter('spaceless')(self.file.name);
//                     self.post.featured = 'https://s3-us-west-2.amazonaws.com/doingutahdaily/' + newname;
//                     self.getChange(self.post);
//                     self.file.Success = true;
//                     //self.file = file;
//                 }, function (error) {
//                     // Mark the error
//                     self.file.Error = error;
//                 }, function (progress) {
//                     // Write the progress as a percentage
//                     self.file.Progress = (progress.loaded / progress.total) * 100
//                 });
//             });
//         }
//     }
//     function getCategories(catParam) {
//         angular.forEach(self.blogs, function(blog) {
//             if (blog.catParam == catParam) {
//                 self.category = blog.category;
//             }
//         })
//
//     }
//     function getCounties(cParam) {
//         angular.forEach(self.blogs, function(blog) {
//             if (blog.cParam == cParam) {
//                 self.county = blog.county;
//             }
//         })
//     }
//     function addCountyParams(blog, county) {
//         blog.cParam = county;
//         self.getChange(blog);
//     }
//     function addCategoryParams(blog, category) {
//         blog.catParam = category;
//         self.getChange(blog);
//     }
//     function addPostParam(blog) {
//         var postParam = $filter('removeSpacesThenLowercase')(blog.title);
//         blog.param = postParam;
//         self.getChange(blog);
//     }
//     function removeBlog(blog) {
//
//     }
//     function getChange(blog) {
//         self.$http.put('/api/updatePost', blog).then(function(response) {
//             self.blogs = response.data;
//         });
//         self.gB();
//         self.getPost();
//     }
//     function getPost() {
//         angular.forEach(self.blogs, function (blogname) {
//             if (blogname.param === $stateParams.blogParam) {
//                 self.post = blogname;
//             }
//         });
//     }

// }