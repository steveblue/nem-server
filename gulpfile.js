// gulpfile.js
var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('dev', function () {
    // Start the server at the beginning of the task
    server.run(['server.js']);

    // Restart the server when file changes
    gulp.watch(['*.js','app/**/*.js'],[server.run]);

});
