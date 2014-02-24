var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat');

gulp.task('default', ['styles', 'scripts', 'images']);

gulp.task('clean-images', function() {
    return gulp.src('static/build/img/*', {read: false})
        .pipe(clean());
});

gulp.task('clean-scripts', function() {
    return gulp.src('static/build/js/*', {read: false})
        .pipe(clean());
});

gulp.task('clean-styles', function() {
    return gulp.src('static/build/css/*', {read: false})
        .pipe(clean());
});

gulp.task('images', ['clean-images'], function() {
    return gulp.src('static/src/img/*')
        .pipe(gulp.dest('static/build/img'));
});

gulp.task('scripts', ['clean-scripts'], function() {
    return gulp.src('static/src/js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('static/build/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('static/build/js'));
});

gulp.task('styles', ['clean-styles'], function(){
    return gulp.src('static/src/css/*.css')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('static/build/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/build/css'));
});

gulp.task('watch', function() {
    gulp.watch('static/src/css/*.css', ['styles']);
    gulp.watch('static/src/js/*.js', ['scripts']);
    gulp.watch('static/src/images/*', ['images']);
});
