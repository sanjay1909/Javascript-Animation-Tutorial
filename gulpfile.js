var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
    HTML: 'src/index.html',
    ALL: ['src/js/*.jsx', 'src/js/**/*.jsx', 'src/index.html'],
    JSX: ['src/js/*.jsx', 'src/js/**/*.jsx'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'src/dist/src',
    DEST_BUILD: 'src/dist/build',
    DEST: 'src/dist'
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

gulp.task('default', ['watch']);
