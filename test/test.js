var gulp = require('gulp'),
    n2a = require('../'),
    del = require('del');

const TEST_CASE = './test/cases/';
const OUTPUT = './test/test-output/';

/** 1. clean up output files. **/
del([OUTPUT], function (err) {
    if (err) {
        console.error("clean up output files failed.");
    } else {
        testCase();
    }
});

function testCase() {
    /** 2. convert unicode to ascii. **/
    gulp.src(TEST_CASE + 'default.js', {buffer: false})
        .pipe(n2a())
        .pipe(gulp.dest(OUTPUT));

    /** 3. convert ascii to unicode. **/
    gulp.src(TEST_CASE + 'reverse.js')
        .pipe(n2a({
            reverse: true
        }))
        .pipe(gulp.dest(OUTPUT));

    /** 4. fixs error uglify ascii string to unicode **/
    gulp.src(TEST_CASE + 'errMinify.js')
        .pipe(n2a({
            reverse: true
        }))
        .pipe(gulp.dest(OUTPUT));

}
