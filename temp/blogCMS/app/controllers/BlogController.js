(function () {
    angular
        .module('blogController', [])
        .controller('BlogController', BlogController);
    BlogController.$inject = ['blogService', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$mdMedia', '$stateParams', '$scope', '$location', '$filter', '$http', '$rootScope'];
    function BlogController(blogService, $mdSidenav, $mdBottomSheet, $mdDialog, $mdMedia, $stateParams, $scope, $location, $filter, $http, $rootScope) {
        var self = this;
        self.$http = $http;
        self.blogs = blogService.blogs;
        self.addBlog = addBlog;
        self.firstList = firstList;
        self.removeBlog = removeBlog;
        self.getPost = getPost;
        self.counties = blogService.counties;
        self.categories = blogService.categories;
        self.seasons = blogService.seasons;
        self.post = blogService.post;
        self.county = blogService.county;
        self.category = blogService.category;
        self.currentPage = 1;
        self.pageSize = 20;
        self.reverse = '';
        self.getCounty = getCounty;
        self.getCounties = getCounties;
        self.location = $location;
        self.showEditBlog = showEditBlog;
        self.show = false;
        self.showdate = false;
        self.Files = blogService.Files;
        self.file = blogService.file;
        self.categoryName = '';
        self.isActive = 'master';
        self.addCategory = addCategory;
        self.getCategories = getCategories;
        self.getCategory = getCategory;
        self.deleteFeatured = deleteFeatured;
        self.addCategoryParams = addCategoryParams;
        self.addCountyParams = addCountyParams;
        self.createCategory = createCategory;
        self.initPost = initPost;
        self.uploadFiles = function (files) {
            blogService.uploadFiles(files);
        };
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
        function deleteFeatured () {
            blogService.deleteFeatured();
        }
        self.sort = function (keyname) {
            self.sortKey = keyname; //set the sortKey to the param passed
            self.reverse = !self.reverse; //if true make it false and vice versa
        };
        function createCategory (category) {
            self.categoryParam = $filter('spaceless')(category);
            self.addCategoryParams(self.post, self.categoryParam);
        }
        function addCategory() {
            blogService.addCategory(self.categoryName);
            self.categoryName = '';
        }
        function addCategoryParams (post, category) {
            blogService.addCategoryParams(post, category);
        }
        function addCountyParams () {
            blogService.addCountyParams(self.post, self.county);
        }
        self.showAdvanced = function (ev, post) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './templates/preview-post.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    blog: post
                }
            });
        };
        function showEditBlog() {
            var reg = /^(?:((?:https?|s?ftp):)\/\/)([^:\/\s]+)(?::(\d*))?(?:\/([^\s?#]+)?([?][^?#]*)?(#.*)?)?/;
            //regex to get first part of path and return it
            if (self.location = '/edit/') {
                self.show = true;
                return self.show;
            }
        }
        function getCounties(cParam) {
            blogService.getCounties(cParam);
        }
        function firstList() {
            self.selected = blogService.blogs[0];
        }
        function getCategory() {
            self.category = $filter('spaces')($stateParams.catParam);
        }
        function getCategories(catParam) {
            blogService.getCategories(catParam);
        }
        function getCounty() {
            self.county = $stateParams.cParam;
        }
        
        function getPost(blog) {
            self.post = blog;
        }
        function removeBlog(blog) {
            blogService.removeBlog(blog);
        }
        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        

        function addBlog() {
            blogService.addBlog(svgArr, svgindex);
            svgindex++;
        }
        self.countOf = function (text) {
            var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
            return s ? s.length : '';
        };
        self.taggerEnabled = false;
        self.editorEnabled = false;
        self.enableEditor = function (dates) {
            self.editorEnabled = true;
            self.editableValue = dates;
        };
        self.disableEditor = function () {
            self.editorEnabled = false;
        };
        self.save = function () {
            self.value = self.editableValue;
            self.disableEditor();
        };
        self.enableTagger = function (tags) {
            self.taggerEnabled = true;
            self.editableTag = tags;
        };
        self.disableTagger = function () {
            self.taggerEnabled = false;
        };
        self.tagSave = function () {
            self.value = self.editableTag;
            self.disableTagger();
        };
    }
    
})();
