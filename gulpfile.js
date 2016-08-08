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
		del = require('del');


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
		return gulp.src('app/*.html')
			.pipe(gulp.dest('public/'));
	});
	gulp.task('clean', function() {
		return del(['public/assets/styles', 'public/assets/scripts', 'public/assets/img', 'public/']);
	});

	gulp.task('default', ['clean'], function() {
		gulp.start('styles', 'scripts', 'images', 'html', 'serverjs', 'addcss');
	});

	gulp.task('serverjs', function() {
		gulp.src('app/server.js')
			.pipe(gulp.dest('./public'));
	});

	gulp.task('nodeman', [], function(){
		nodemon({ script: 'public/server.js'
			, ext: 'html js'
			, ignore: ['ignored.js']
			, tasks: [] })
			.on('restart', function () {
				console.log('restarted!')
			});
	});

	gulp.task('develop', ['clean', 'styles', 'scripts', 'images','html', 'serverjs', 'addcss','nodeman'], function(){
		var port = gutil.env.port || 3000;
		var uiPort = gutil.env['ui-port'] || (port + 1);

		browserSync.init({
			proxy: "http://localhost:8080",
			files: ["public/**/*.*"],
			browser: "google chrome",
			port: port,
			ui: {
				port: uiPort
			}
		});
	});

	gulp.task('watch', function() {

		// Watch .scss files
		gulp.watch('app/assets/styles/**/*.scss', ['styles']);

		// Watch .js files
		gulp.watch('app/assets/scripts/**/*.js', ['scripts']);

		// Watch image files
		gulp.watch('app/assets/img/**/*', ['images']);

		// Create LiveReload server
		livereload.listen();

		// Watch any files in dist/, reload on change
		gulp.watch(['public/**']).on('change', livereload.changed);

	});
})();
