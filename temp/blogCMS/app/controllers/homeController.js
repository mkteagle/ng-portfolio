(function() {
    angular
        .module('homeController', [])
        .controller('HomeController', function () {
            var self = this;
            self.slides = [
                {image: 'http://localhost:63342/mkteagle.github.io/portfolio.new/blog/app/img/img00.jpg', description: 'Image 00'},
                {image: '../app/img/img01.jpg', description: 'Image 01'},
                {image: '../app/img/img02.jpg', description: 'Image 02'},
                {image: '../app/img/img03.jpg', description: 'Image 03'},
                {image: '../app/img/img04.jpg', description: 'Image 04'}
            ];
            self.currentIndex = 0;

            self.setCurrentSlideIndex = function (index) {
                self.currentIndex = index;
            };

            self.isCurrentSlideIndex = function (index) {
                return self.currentIndex === index;
            };
            self.prevSlide = function () {
                self.currentIndex = (self.currentIndex < self.slides.length - 1) ? ++self.currentIndex : 0;
            };

            self.nextSlide = function () {
                self.currentIndex = (self.currentIndex > 0) ? --self.currentIndex : self.slides.length - 1;
            };
        })
        .animation('.slide-animation', function () {
            return {
                addClass: function (element, className, done) {
                    if (className == 'ng-hide') {
                        TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done});
                    }
                    else {
                        done();
                    }
                },
                removeClass: function (element, className, done) {
                    if (className == 'ng-hide') {
                        element.removeClass('ng-hide');

                        TweenMax.set(element, { left: element.parent().width() });
                        TweenMax.to(element, 0.5, {left: 0, onComplete: done });
                    }
                    else {
                        done();
                    }
                }
            };
        });
})();
