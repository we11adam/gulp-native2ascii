var n2a = require('../');
var rename = require('../node_modules/gulp-rename');
var gulp = require('../node_modules/gulp');


gulp.src('./**/default.js')
    .pipe(n2a({
                  reverse: false
              }))
    .pipe(rename(function (path) {
              console.dir(path);
              path.basename += "-converted";
          }))
    .pipe(gulp.dest('./'));

gulp.src('./**/reverse.js')
    .pipe(n2a({
                  reverse: true
              }))
    .pipe(rename(function (path) {
              console.dir(path);
              path.basename += "-converted";
          }))
    .pipe(gulp.dest('./'));
