var n2a = require('../');
var rename = require('gulp-rename');
var gulp = require('gulp');


gulp.src('./**/default.js', {buffer: false})
    .pipe(n2a())
    .pipe(rename(function (path) {
              path.basename += "-converted";
          }))
    .pipe(gulp.dest('./'));

gulp.src('./**/reverse.js')
    .pipe(n2a({
                  reverse: true
              }))
    .pipe(rename(function (path) {
              path.basename += "-converted";
          }))
    .pipe(gulp.dest('./'));
