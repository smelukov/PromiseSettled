var del = require('del'),
	gulp = require('gulp'),
	jscs = require('gulp-jscs'),
	header = require('gulp-header'),
	mocha = require('gulp-mocha'),
	rename = require('gulp-rename'),
	sourcemap = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	BUILD_NAME = 'promiseSettled';

gulp.task('default', ['clean', 'jscs', 'tests', 'build']);

gulp.task('clean', function() {
	return del.sync('build', {force: true});
});

gulp.task('jscs', function() {
	return gulp.src('src/**/*.js')
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('tests', function() {
	return gulp.src('test/**/*.js')
		.pipe(mocha());
});

gulp.task('build', ['tests'], function() {
	banner = ['/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		''].join('\n');

	return gulp.src('src/main.js')
		.pipe(header(banner, {pkg: require('./package.json')}))
		.pipe(sourcemap.init())
		.pipe(uglify({
			outSourceMap: true,
			preserveComments: 'license'
		}))
		.pipe(rename(BUILD_NAME + '.min.js'))
		.pipe(sourcemap.write('./', {sourceRoot: '../src'}))
		.pipe(gulp.dest('build'));
});
