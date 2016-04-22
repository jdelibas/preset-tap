var gulp = require('gulp');
var foreman = require('gulp-foreman');
var watch = require('gulp-watch');

gulp.task('default', ['foreman', 'watch']);

gulp.task('watch', function (argument) {
    var watchList = [
        './api/**/*.js',
        './client/**/*.js',
        './client/**/*.html',
        './client/**/*.css'
    ];
    return watch(watchList, ['foreman']);
});

gulp.task('foreman', function (argument) {
    return foreman({
        procfile: 'Procfile',
        env: 'dev.env'
    });
});
