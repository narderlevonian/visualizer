'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var source = require('vinyl-source-stream');


gulp.task('css', function() {
    return gulp.src('./src/style/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css/'))
});

 gulp.task('js', function() {
    return browserify({
            entries: './src/js/app.js'
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', function () {
    gulp.watch('./src/style/*.less', gulp.series('css'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
});


gulp.task('build', gulp.parallel('css', 'js', 'watch'));
