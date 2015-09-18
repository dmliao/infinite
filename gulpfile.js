var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webserver = require('gulp-webserver');

gulp.task('webpack', function() {
    return gulp.src('src/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('watch', function() {
    gulp.watch('./src/**', ['webpack']);
});

gulp.task('default', ['webpack', 'watch', 'webserver']);