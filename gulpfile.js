var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var minifyCss = require('gulp-minify-css');

var js = 'public/js/*.js';
var css = 'public/css/*.css';
var fonts = 'public/fonts/*.woff';
var index = 'public/index.html';
var templates = 'public/templates/*.html'
var dest = 'dist';

//linting 
gulp.task('lint', function(){
  return gulp.src(js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//browserify and min js
gulp.task('jsmin', function(){
  return gulp.src('public/js/main.js')
    .pipe(browserify())
    .pipe(gulp.dest(dest))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

//concat and min css
gulp.task('cssmin', function(){
  return gulp.src(css)
    .pipe(concat('all.css'))
    .pipe(gulp.dest(dest))
    .pipe(rename('all.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest));
});

/*
gulp.task('tpl', function(){
  return gulp.src(templates)
    .pipe(gulp.dest(dest + '/templates'));
});
*/

gulp.task('html', function(){
  return gulp.src(index)
    .pipe(gulp.dest(dest));
});

gulp.task('fonts', function(){
  return gulp.src(fonts)
    .pipe(gulp.dest( dest + '/fonts'));
});

gulp.task('watch', function(){
  gulp.watch(js, ['lint', 'jsmin']);
  gulp.watch(css, ['lint', 'cssmin']);
  gulp.watch(index, ['html']);
});

gulp.task('serve', function(){
  nodemon({
    script: 'app/index.js',
    ext: 'js html'
  })
});

gulp.task('default', ['lint', 'jsmin', 'cssmin', 'html',  'fonts', 'serve', 'watch']);
