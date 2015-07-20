var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
    HTML: 'react/workflow/index.html',
    ALL: ['react/workflow/*.jsx', 'react/workflow/**/*.jsx', 'react/workflow/index.html'],
    JSX: ['react/workflow/*.jsx', 'react/workflow/**/*.jsx'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'react/workflow/dist/src',
    DEST_BUILD: 'react/workflow/dist/build',
    DEST: 'react/workflow/dist'
};

gulp.task('transform', function () {
    gulp.src(path.JSX)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function () {
    gulp.watch(path.ALL, ['transform', 'copy']);
});

gulp.task('default', ['transform', 'copy']);
