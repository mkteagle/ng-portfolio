(function () {
	'use strict';

	angular.module('blogFilter', [])
		.filter('dateNew', function () {
			return function (input) {
				if (input == null) {
					return "";
				}
				return new Date(input);
			}
		})
		.filter('orderByFilter', function () {
			return function (items, field, reverse) {
				var filtered = [];
				angular.forEach(items, function (item) {
					filtered.push(item);
				});
				filtered.sort(function (a, b) {
					return (a[field] > b[field] ? 1 : -1);
				});
				if (reverse) {
					filtered.reverse();
				}
				return filtered;
			}
		})

		.filter('removeSpacesThenLowercase', function () {
			return function (text) {

				var str = text.replace(/\s+/g, '-');
				var str2 = str.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				return str2.toLowerCase();
			};
		})
		.filter('removeSpaces', function () {
			return function (text) {
				var str = text.replace(/\s+/g, '');
				var string = btoa(str);
				return string.toLowerCase();
			}
		})
		.filter('postFilter', function () {
			return function (input) {
				if (input) {
					return 'posted';
				}
				else {
					return 'draft';
				}
			};
		})
		.filter('countiesFilter', function () {
			return function (input) {
				var tmp = [];
				angular.forEach(input, function (value) {
					if (value != null || value != undefined) {
						tmp.push(value);
					}
				});
				return tmp;
			};
		})
		.filter('unique', function () {
			return function (collection, keyname) {
				var output = [],
					keys = [],
					found = [];

				if (!keyname) {

					angular.forEach(collection, function (row) {
						var is_found = false;
						angular.forEach(found, function (foundRow) {

							if (foundRow == row) {
								is_found = true;
							}
						});

						if (is_found) {
							return;
						}
						found.push(row);
						output.push(row);

					});
				}
				else {

					angular.forEach(collection, function (row) {
						var item = row[keyname];
						if (item === null || item === undefined) return;
						if (keys.indexOf(item) === -1) {
							keys.push(item);
							output.push(row);
						}
					});
				}

				return output;
			};
		})
		.filter('dated', function () {
			return function (input) {
				//console.log(input);
				//var date = new Date(input);
				//console.log(date);
				return new Date(input);
			}
		})
		.filter('addCounty', function () {
			return function (input) {
				return input + ' County';
			}
		})
		.filter('spaceless', function () {
			return function (input) {
				if (input) {
					return input.replace(/\s+/g, '+');
				}
			}
		})
		.filter('spaces', function () {
			return function (input) {
				if (input) {
					return input.replace(/\+/g, ' ');
				}
			}
		});


}());
