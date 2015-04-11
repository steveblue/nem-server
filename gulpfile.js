// gulpfile.js
var gulp = require('gulp');
var server = require('gulp-express');
var gulpDoxx = require('gulp-doxx');

gulp.task('dev', function () {
    server.run(['server.js']);
    gulp.watch(['*.js','app/**/*.js'],[server.run]);

});


gulp.task('docs', function() {

  gulp.src(['*.js', '*/**/*.js', 'README.md'])
    .pipe(gulpDoxx({
      title: 'Node RESTful API',
      urlPrefix: '/docs'
    }))
    .pipe(gulp.dest('./docs'));

});
