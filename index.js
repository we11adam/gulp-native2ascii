'use strict';

var through = require('through2'),
    util = require('gulp-util'),
    PluginError = util.PluginError;


// taken from https://github.com/yyfrankyy/native2ascii.js/blob/master/native2ascii.js
function native2ascii(str) {
    var character = str.split('');
    var ascii = '';
    for (var i = 0; i < character.length; i++) {
        var code = Number(character[i].charCodeAt(0));
        if (code > 127) {
            var charAscii = code.toString(16);
            charAscii = new String('0000').substring(charAscii.length, 4) + charAscii;
            ascii += '\\u' + charAscii;
        } else {
            ascii += character[i];
        }
    }
    return ascii;
}

module.exports = function () {

    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        try {
            file.contents = new Buffer(native2ascii(file.contents.toString()));
        } catch (err) {
            this.emit('error', new util.PluginError('gulp-native2ascii', err));
        }

        this.push(file);
        callback();
    });
};