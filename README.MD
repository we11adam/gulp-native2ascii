# [gulp-native2ascii]()
## About
Converts a file with characters in any supported character encoding to one with ASCII and/or Unicode escapes, or visa versa.


## Usage

```js
var gulp = require('gulp');
var n2a = require('gulp-native2ascii');

gulp.task('n2a', function() {
  gulp.src('./src/foo.js')
    .pipe(n2a({reverse: false}))
    .pipe(gulp.dest('./build'))
});
```

## Options
```reverse```: Can be ```true``` or ```false```. When it's set to ```true```, the plugin performs the reverse operation: Convert a file encoded in ISO-8859-1 with Unicode escapes to another one.
