(function () {
	var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cssnano = require('gulp-cssnano'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		notify = require('gulp-notify'),
		cache = require('gulp-cache'),
		livereload = require('gulp-livereload'),
		nodemon = require('gulp-nodemon'),
		open = require('gulp-open'),
		clean = require('gulp-clean'),
		supervisor = require('gulp-supervisor'),
		del = require('del');

	gulp.task('delete', function () {
		return gulp.src('public/', {read: false})
			.pipe(clean());
	});
	gulp.task('styles', function() {
		return sass('app/assets/styles/main.scss', { style: 'expanded' })
			.pipe(autoprefixer('last 2 version'))
			.pipe(gulp.dest('public/assets/styles'))
			.pipe(rename({suffix: '.min'}))
			.pipe(cssnano())
			.pipe(gulp.dest('public/assets/styles'));
	});
	gulp.task('addcss', function() {
		return sass('app/assets/styles/main.scss', { style: 'expanded' })
			.pipe(autoprefixer('last 2 version'))
			.pipe(gulp.dest('app/assets/styles'))
			.pipe(rename({suffix: '.min'}))
			.pipe(cssnano())
			.pipe(gulp.dest('app/assets/styles'));
	});

	gulp.task('scripts', function() {
		return gulp.src('app/assets/scripts/**/*.js')
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('default'))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('public/assets/scripts'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('public/assets/scripts'));
	});

	gulp.task('images', function() {
		return gulp.src('app/assets/img/**/*')
			.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
			.pipe(gulp.dest('public/assets/img'));
	});

	gulp.task('html', function() {
		gulp.src('app/*.html')
			.pipe(gulp.dest('public/'));
		gulp.src('app/*.js')
			.pipe(gulp.dest('public/'));
		gulp.src(['app/assets/templates/**/*'])
			.pipe(gulp.dest('./public/assets/templates'));
		gulp.src(['app/assets/portfolio/**/*'])
			.pipe(gulp.dest('./public/assets/portfolio'));
	});
	gulp.task('thirdparty', function(){
		gulp.src(['app/assets/thirdparty/**/*'])
			.pipe(gulp.dest('./public/assets/thirdparty'));
	});
	gulp.task('donutclicker', function(){
		gulp.src(['app/donut-clicker/www/**/*'])
			.pipe(gulp.dest('./public/donutclicker'));
	});
	gulp.task('deploy', gulp.series('delete', 'thirdparty', 'html', 'scripts', 'styles', 'images', 'donutclicker', 'addcss'), function() {
		supervisor('public/server.js');
	});

	gulp.task('develop', gulp.series('delete', 'styles', 'scripts', 'images', 'html', 'thirdparty', 'donutclicker', 'addcss'), function(){
		supervisor('public/server.js');
	});


	// gulp.task('watch', function() {
	//
	// 	// Watch .scss files
	// 	gulp.watch('app/assets/styles/**/*.scss', ['styles']);
	//
	// 	// Watch .js files
	// 	gulp.watch('app/assets/scripts/**/*.js', ['scripts']);
	//
	// 	// Watch image files
	// 	gulp.watch('app/assets/img/**/*', ['images']);
	//
	// 	// Create LiveReload server
	// 	livereload.listen();
	//
	// 	// Watch any files in dist/, reload on change
	// 	gulp.watch(['public/**']).on('change', livereload.changed);
	//
	// });
})();
