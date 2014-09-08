'use strict';

var through = require('through2'),
    pluginError = require('gulp-util').PluginError;

var PLUGIN_NAME = 'gulp-native2ascii';

var stringHandler, contentsHandler;


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


function ascii2native(str) {
    return unescape(str.split('\\').join('%'));
}


function handleStream(contents) {
    return contents.pipe(through(function (chunk, enc, callback) {
        this.push(stringHandler(chunk.toString()));
        callback();
    }));
}


function handleBuffer(contents) {
    return new Buffer(stringHandler(contents.toString()));
}


module.exports = function (options) {

    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        stringHandler = (options && options.reverse) ? ascii2native : native2ascii;

        contentsHandler = file.isBuffer() ? handleBuffer : handleStream;

        try {
            file.contents = contentsHandler(file.contents);
        } catch (err) {
            this.emit('error', new pluginError(PLUGIN_NAME, err));
        }

        this.push(file);
        callback();
    });
};
