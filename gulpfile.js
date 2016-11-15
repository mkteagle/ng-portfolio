(function () {
	var gulp = require('gulp'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cssnano = require('gulp-cssnano'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		cache = require('gulp-cache'),
		livereload = require('gulp-livereload'),
		nodemon = require('gulp-nodemon'),
		open = require('gulp-open'),
		clean = require('gulp-clean'),
		del = require('del');

	gulp.task('html', ['delete'], function() {
		gulp.src(['app/config/mkteagle.json'])
			.pipe(gulp.dest('./public/config'));
		gulp.src(['app/donut-clicker/www/**/*'])
			.pipe(gulp.dest('./public/donutclicker'));
		gulp.src(['app/flappy/**/*'])
			.pipe(gulp.dest('./public/flappy'));
		gulp.src(['app/login/**/*'])
			.pipe(gulp.dest('./public/login'));
		gulp.src(['app/forgot/**/*'])
			.pipe(gulp.dest('./public/forgot'));
		gulp.src(['app/register/**/*'])
			.pipe(gulp.dest('./public/register'));
		gulp.src(['app/admin/**/*'])
			.pipe(gulp.dest('./public/admin'));
		gulp.src(['app/uploads/**/*'])
			.pipe(gulp.dest('./public/uploads'));
		gulp.src(['app/assets/thirdparty/**/*'])
			.pipe(gulp.dest('./public/assets/thirdparty'));
		sass('app/assets/styles/main.scss', { style: 'expanded' })
			.pipe(autoprefixer('last 2 version'))
			.pipe(gulp.dest('public/assets/styles'))
			.pipe(rename({suffix: '.min'}))
			.pipe(cssnano())
			.pipe(gulp.dest('public/assets/styles'));
		sass('app/assets/styles/main.scss', { style: 'expanded' })
			.pipe(autoprefixer('last 2 version'))
			.pipe(gulp.dest('app/assets/styles'))
			.pipe(rename({suffix: '.min'}))
			.pipe(cssnano())
			.pipe(gulp.dest('app/assets/styles'));
		gulp.src('app/assets/scripts/**/*.js')
			// .pipe(jshint('.jshintrc'))
			// .pipe(jshint.reporter('default'))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('public/assets/scripts'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('public/assets/scripts'));
		gulp.src('app/assets/img/**/*')
			.pipe(gulp.dest('public/assets/img'));
		gulp.src('app/*.html')
			.pipe(gulp.dest('public/'));
		gulp.src('app/*.js')
			.pipe(gulp.dest('public/'));
		gulp.src('app/assets/templates/*.html')
			.pipe(gulp.dest('public/assets/templates'));
		gulp.src('app/assets/portfolio/*.html')
			.pipe(gulp.dest('public/assets/portfolio'));
	});
	gulp.task('nodeman', [], function(){
		nodemon({ script: 'public/server.js'
			, ext: 'html js'
			, ignore: ['ignored.js']
			, tasks: [] })
			.on('restart', function () {
			});
	});
	gulp.task('delete', function () {
		return gulp.src('public/', {read: false})
			.pipe(clean());
	});
	gulp.task('develop', ['html'], function(){
		
	});
	gulp.task('production', ['html', 'serve'], function(){

	});
	gulp.task('serve', ['nodeman'], function(){

	});
	gulp.task('watch', function() {
	
		// Watch .scss files
		gulp.watch('app/assets/styles/**/*.scss');
	
		// Watch .js files
		gulp.watch('app/assets/scripts/**/*.js');
	
		// Watch image files
		gulp.watch('app/assets/img/**/*');
	
		// Create LiveReload server
		livereload.listen();
	
		// Watch any files in dist/, reload on change
		gulp.watch(['public/**']).on('change', livereload.changed);
	
	});
})();
