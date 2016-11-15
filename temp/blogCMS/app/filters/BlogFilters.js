(function () {
    'use strict';
    angular.module('blogFilters', [])
        .filter('oddList', function() {
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if (item % 2 !== 0)
                    filtered.push(item);
            });
            return filtered;
        };
    });

})();