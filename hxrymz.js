'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var graphql = require('graphql');
var cors = _interopDefault(require('cors'));
var bodyParser = _interopDefault(require('body-parser'));
var methodOverride = _interopDefault(require('method-override'));
var CryptoJS = _interopDefault(require('crypto-js'));
var request = _interopDefault(require('request'));
var AWS = _interopDefault(require('aws-sdk'));
var plivo = _interopDefault(require('plivo'));
var nodemailer = _interopDefault(require('nodemailer'));
var adminfbs = require('firebase-admin');
var error = require('graphql/error');
var language = require('graphql/language');


var _root$$_ = "C:/nodeProject/almacen";
_root$$_ = "/home/ubuntu/hxrymz/";
var _fs$$_ = _interopDefault(require('fs'));
var execN = _interopDefault(require('child_process'));
var _exec$$_ = execN.exec;


var Base64 = {

  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


  encode: function(input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  },


  decode: function(input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

      }

      output = Base64._utf8_decode(output);

      return output;

  },

  _utf8_encode: function(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
              utftext += String.fromCharCode(c);
          }
          else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }

      return utftext;
  },

  _utf8_decode: function(utftext) {
      var string = "";
      var i = 0,c1,c2,c3;
      var c = c1 = c2 = 0;

      while (i < utftext.length) {

          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }

      return string;
  }

};
 


const clv = {
  twlphn:6693335613,
  AS3_bucketName:'hxrymz',
  twilioCred :"e3R3bENydGVkOiJBQ2U1ZDNhNjNlOTA2OTg1NzU5ZDU1ZWM2YmM3YzZjMzJjIiwNCgl0d2xUa246IjE0MGU4NDRhNWVhNTRlZmI5ODFhMWY4OTYxNWNiODk5In0=",	
	Sgr:`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`,
	Sklv:`5cbe7263a8dead29f26aab028cfaa1450e9c07de51609f5c32bac598d3eed00c3a70097ea12f3bd9184f2d632f562c6daacb324db98f6742215b7b1a03a7461e`,  
  AWSA:"eyJpZCI6IkFLSUFKMkhUVlhFNktYQ0lZNDRBIiwKImtleSI6IjN6Und0Ni9xTVg0ZnJZb3ZJaDBrTGtRd1lVWG8rUjFPa3l4MFNUWFcifQ==",
  fbCnf:"ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiaHJtLTExMjgiLAogICJwcml2YXRlX2tleV9pZCI6ICI5NTFlNjU4NjEyOGFjZjUwOTY2NjY4ZDRjN2MyZjcwNjY2ZDkyZjQyIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLWXdnZ1NpQWdFQUFvSUJBUUNyVHc2N2w1ZzZPd1JBXG5VUmVNeXdyYXVhQ2M5Sjh1K3hLYzVPcGtkMlZDaDZTZEVHSGRHYkVmYlVCVW55cXVya1dlSFlKc1VnUTZubVhaXG5ZWGJjSWI4TUpEK0dOcEZLb1lMQ2NEVm84Y3NMR3ZXY1NwYTlHN01udDU5NE9aK3Zod2RSVkFtOGhQTlFqT3hCXG44VjV4SFJ4eTBzVTFlaXZtMDVSMnpQMFRHTFJ5MUp5YnlJQ0ZpbVo2Y0NVeUlaZTdlU1lTNkpXV0lJdUVwQ2dUXG43cWFYSjJ4NEJILzBTWjRYWmlqdlRHcDhQZDBxdGk0M3NoNVZIbE92SHE3WUUrTUcvRS9hMzFJTUcrQmgvV2c3XG5tcjdNMDhubEFTbGtrYlNZTmEzU1E3a28zWWxYM2FscVAxcjBGRVRNR0hYemxkaE05c0FvTlY1eWdkR2FZS0pIXG5lcFFsckdNYkFnTUJBQUVDZ2dFQUdOZ1QwbWZuVjFhVXhNRWQ4YmpHbjdiNUVKbzNkY2hLeUQ4NHNRNVJ2S2JRXG5YRWp5Y0c3WDdhOVorNHZEMUdhSXlTZ05jS2txWE5mNC9HQXlyVFVsc0Z5WGE5OEJEanBETFBDNkJqaSswaUw4XG5TTWpXZUtHS1IzSE5hbEd0RTNjNU8vVzhuYjhJVEgvTGlicTRFQjZCTURQYUR1bmpjUXZ4UlpOd0JuTjRSQWpOXG4xRUtVYU9uMTVTby9RK3drREpUeDh5ZjMzVHI3VkxRQkRoYUI0NW9SRC9IMURxWk1GdG1HUHkzMEYwMkxGV1hjXG43RFptYm9Ib3RROURMeXRmQ0JqcWdzUEErSnlQT0tFblV0aSszbVZ5M2NPY3kxY3NyOWE2SFVwOGhBZ1hRSmNvXG5VcTNaS1NjVzNubHI2aDhnMFRBVnF2YWRTK25oYi9xYmZMS2Y2UEwvclFLQmdRRFcveUJsZ0RoK1Y0SFAzckFPXG5DTWJGSkVPVTRpMG00bndwV0NWTy9LSExkTDNMY0EwNmJFR2JiakF0YkhkSkhPeGtwR3B6Rnhua1VPZmNCTk9KXG5CS3l0Y21QeUxZOVNHeFFsOVRtNFkzZy9lcXh0alJ6eEt4U3RDMlA1N3dvQitVNUF4czhCSUpEbU1BZkdiU3lQXG4yNnkvRGZZWjFaRjVhODluV1M1K1kweWxkUUtCZ1FETCt2R1hrUXYyZGxmNUJEZkhBamlzZXlheFBaQlc1RXh4XG5zQjlEcEdHWmVJV2pSb2hhR2svMGpQZzRPOEdjcVRxenZpYXljeUw4ajJKVWI3YUpCalJjTmpBWmNGOUlmMi9UXG5VVnBkekEwSVhvdzBPaVUyRmlqTlJ3TkFndk5zMk8weWgvem1aZDU5SC9URldyamdXOU1vd3kvWFNPSjJzOTJRXG5WUkF0OVVHRVR3S0JnRWdDMWhnSk5XTGo3bi93aDZsN3VSQUpFSFhLdC9MaFExTVp5ZzFGd3UrQm41eUhZSGJrXG5FYWw4NDdnakwyVVd3ZnNIc3Z2dmplV1NUOGE2K3h0V3JIdS81OGdUQ0lFb3ZydmtBanhIWE54dU8xaktQaHB0XG5JcFMvVHZKRTVXWTUyY01LbEFVOW9pcm5oWU1weUJZN0x3WWpKLzRKTVp1b3g2UkhFN0tUa2ZXTkFvR0FROUgxXG56YTBlU3gzaDlodWU1LzRuRmNJRWhWMnd4aE0yRDM2OWhtSDdTV20zRlNoNFlXenFOS2RDU0lBbHlZN0N3OHh2XG5WVm5Pd2laeVRSeXZsak9INlRqakdUSXhuQXN6QlJIQmQvcEdRd2djbWFqVGduNHZwc0Q3cGRGa1drWnQ1eVVyXG53dmNQMkk1dGRjaktPMTZNZ0xzVkJ3Rm11b3puRi93UVd4ZDJaeVVDZ1lBLzRwWjdDY2NYZGJXUEEwdE8yL29pXG5pU09QTmpYT2xnbkllbHVGTHg4RVZNa3EyWWcxdCs0cEk0Ri8yK2hTcGdYSFIza0l6alU2N1JwUytXcjhHOERxXG4rZytHQllkQm9zSWU3STJlemxhU2lubC9yVk15bkF4WmhsM1ZMT2xNeGlmY1YzUmNMSkJwQkdrcE1LeDZ2WmxpXG5RRkxrSm5XcHRkUzN3WEJSSnBMQ1BnPT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJmaXJlYmFzZS1hZG1pbnNkay0xdW1wekBocm0tMTEyOC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMTQ5MjI2MzcxMDY5MTc2NTU5NDQiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2ZpcmViYXNlLWFkbWluc2RrLTF1bXB6JTQwaHJtLTExMjguaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iCn0K",
  LWA :"eyJjbGllbnRJRCI6ICJhbXpuMS5hcHBsaWNhdGlvbi1vYTItY2xpZW50LmIzZTc1ZmI2NWEzMjQ2YjhiMzRjNTdlYWFkZTNiNmY0IiwNCiAgICAiY2xpZW50U2VjcmV0IjogIjBlY2RlODA2YzFiOWZlODMxN2MzNmE1NDZjZjM2OTUxYjRjMzUyYWU4NTk4NTI4YWQzNmZjYWZiMGU4ZGJmNTUiDQogICAgfQ==",
  gCred: "eyJ1c3JObSI6Imh4cnlteiIsInBhc3NXIjoiODUwMjE3U3RlcGgqIn0=",
  plivoCred:"eyJhdXRoSWQiOiJNQVpXVklOREtXWlRNME9XUklOMiIsImF1dGhUb2tlbiI6IlpEa3daakUyTWpGak1qaGtOekJpTURVNE5UZzVZV1UyWkRNME16a3kifQ=="  
};


function isJson$1(s) {
  var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
}

Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoute {
    constructor() {
        this.title = "";
        this.scripts = [];
    }
    addScript(src) {
        this.scripts.push(src);
        return this;
    }
    render(req, res, view, options) {
        res.locals.BASE_URL = "/";
        res.locals.scripts = this.scripts;
        res.locals.title = this.title;
        res.render(view, options);
    }
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
function resolve() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : '/';

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
}
// path.normalize(path)
// posix version
function normalize(path) {
  var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isPathAbsolute).join('/');

  if (!path && !isPathAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isPathAbsolute ? '/' : '') + path;
}
// posix version
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

// posix version
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
}


// path.relative(from, to)
// posix version
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
}

var sep = '/';
var delimiter = ':';

function dirname(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
}

function basename(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}


function extname(path) {
  return splitPath(path)[3];
}
var path = {
  extname: extname,
  basename: basename,
  dirname: dirname,
  sep: sep,
  delimiter: delimiter,
  relative: relative,
  join: join,
  isAbsolute: isAbsolute,
  normalize: normalize,
  resolve: resolve
};
function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ?
    function (str, start, len) { return str.substr(start, len) } :
    function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

if (typeof global$1.setTimeout === 'function') ;
if (typeof global$1.clearTimeout === 'function') ;

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

Object.defineProperty(exports, "__esModule", { value: true });
// Create an S3 client







var awsC = JSON.parse(Base64.decode(clv.AWSA));
var bucketName = clv.AS3_bucketName;
AWS.config.update({
    accessKeyId: awsC.id,
    secretAccessKey: awsC.key
});
var s3 = new AWS.S3();




//  

/**
     * HrmDb
     *          *
     *      database js object index
     *          *
     * @param {string} s  - The Collection Name.
     * 
     */





// Create a bucket and upload something into it

var DateTime = Math.floor((new Date()).getTime()-86400*1000);

function saveCollection2S3(fileName){    
    var urlFile =  path.join(_root$$_,'data',fileName);
    if(fileName && _fs$$_.existsSync(urlFile)){        
        _fs$$_.readFile(urlFile, function (err, data) {
            var params = {Bucket: bucketName, Key: `${bucketName}_${DateTime}_${fileName}`, Body: data};
            s3.putObject(params, function(err, _data) {
                if(err){console.log(err);}
            }); 
        });
    }    
}





const MasterPath = path.join(_root$$_,'data','master.json');
const MasterIndexesPath = path.join(_root$$_,'data','masterIndexes.json');
const IndexesPath = path.join(_root$$_,'data','Indexes.json');



var _Master = {},_MasterIndexes={},_Indexes={};
if(_fs$$_.existsSync(MasterPath)){
    _Master = JSON.parse(_fs$$_.readFileSync(MasterPath,'utf8'));  
}else{
    _fs$$_.writeFileSync(MasterPath, JSON.stringify({}));
    _Master = JSON.parse(_fs$$_.readFileSync(MasterPath,'utf8'));
}


if(_fs$$_.existsSync(MasterIndexesPath)){
    _MasterIndexes = JSON.parse(_fs$$_.readFileSync(MasterIndexesPath,'utf8'));  
}else{
    _fs$$_.writeFileSync(MasterIndexesPath, JSON.stringify({}));
    _MasterIndexes = JSON.parse(_fs$$_.readFileSync(MasterIndexesPath,'utf8'));
}


if(_fs$$_.existsSync(IndexesPath)){
    _Indexes = JSON.parse(_fs$$_.readFileSync(IndexesPath,'utf8'));  
}else{
    _fs$$_.writeFileSync(IndexesPath, JSON.stringify({}));
    _Indexes = JSON.parse(_fs$$_.readFileSync(IndexesPath,'utf8'));
}


var Collections = {};

class HrmDb {
    constructor() {
        //super(); 
    }

    createCollection(s){
        if(!_Master[s]){
            _Master[s]={};
            _Master[s]['updated']={};
            _Master[s].updated['0']= new Date().getTime();
            _Master[s].index=[];
            _Master[s].index.push(0);
            _Master[s].path=[`data/${s}_${parseIndex(_Master[s].index[0])}.json`];
            var npath = path.join(_root$$_,_Master[s].path[_Master[s].index[0]]);            
            if(!_fs$$_.existsSync(npath)){
                _fs$$_.writeFileSync(npath, JSON.stringify({}));
            }
            _fs$$_.writeFileSync(MasterPath, JSON.stringify(_Master));
        }
    }

    getCollection(s){
        var _th9 = this;
        if(!_Master[s]){
            _th9.createCollection(s);
            return {};
        }
        else{
            if(!Collections[s]){ Collections[s] = {}; } 
            _Master[s].index.map(ipth=>{
                Collections[s][ipth]= JSON.parse(_fs$$_.readFileSync(path.join(_root$$_,_Master[s].path[ipth]),'utf8'));
            });   
            console.log(`getCollection ${s} ......Done`);         
            return Collections[s];
        }
    }

    getIndexes(s){
        if(_MasterIndexes[s].path){
            if(!_Indexes[s]){ _Indexes[s] = {}; } 
            _Indexes[s] = JSON.parse(_fs$$_.readFileSync(path.join(_root$$_,_MasterIndexes[s].path),'utf8'));        
            return _Indexes[s]; 
        }              
    }



    getLastCollection(s){        
        var _th9 = this;
        if(!_Master[s]){
            _th9.createCollection(s);
            return {};
        }
        else{            
            var IndX = _Master[s].index.length-1;
             return Collections[s];
        }
    }

/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */
/*******************  findAll return Array of Collection  ************************ */ 
/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */

/**
     * findAll : return Array of Collection
     *          *
     * @param {string} s  - The Collection Name.     
     */


    findAll(s){
        var _th9 = this; 
               
            if(!_Master[s]){
                _th9.getCollection(s);
                return  null; 
            }
            else{
                var liObj = [],allObj = {},ArrAll=[];
                _Master[s].index.map(ipth=>{  
                    Collections[s] && liObj.push(Collections[s][ipth]); 
                });
                allObj = Object.assign({}, ...liObj);
                Object.keys(allObj).map(d=>{
                    ArrAll.push(allObj[d]);
                });             
                return ArrAll;
            }
        
    }


/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */
/*********************  find return Array of ID on Collection  ************************ */ 
/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */
/**
     * find : return a Array of ID on Collection
     *          *
     * @param {string} s  - The Collection Name.     
     */


    find(s){
        var _th9 = this,rst = [];              
            if(!_Master[s]){
                _th9.getCollection(s);
                return null
            }
            else{            
                _Master[s].index.map(ipth=>{  
                    rst = rst.concat(Object.keys(Collections[s][ipth]));
                });                  
                return rst;
            }        
    }




/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */
/*********  findOne return specific object of Collection filtered by Id  ********* */ 
/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */


/**
     * findOne return specific object of Collection filtered by Id
     *          *
     * @param {string} s  - The Collection Name.
     * @param {string} iD - The ID value to compare.
     */


    findOne(s,iD){
        var rst = null;
            if(!_Master[s]){  return null}
            else{
                _Master[s].index.map(ipth=>{
                    if(Collections[s] && Collections[s][ipth][iD]){
                        rst = Collections[s][ipth][iD];
                    }               
                });   
                return rst;
            }
    }
 

    removeDuplicate(s){
        var _th9 = this,rst = [],h=[];        
        if(!_Master[s]){
            _th9.getCollection(s);
            console.log(`collection ${s} was not found`);            
            return {};
        }
        else{            
            _Master[s].index.map(ipth=>{  
                rst = rst.concat(Object.keys(Collections[s][ipth]));
            
            });
            var rrr = null;
            rst.map(iD=>{
                _Master[s].index.map(ipth=>{                
                    if(Collections[s][ipth][iD]){
                        if(Collections[s][ipth][iD].id!==rrr){
                            rrr = Collections[s][ipth][iD].id;
                        }
                        else{                            
                            h.push(Collections[s][ipth][iD].id);
                            delete Collections[s][ipth][iD];
                            _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[ipth]), JSON.stringify(Collections[s][ipth]));                                                       
                        }                        
                    }               
                });
            });
            return h;
        }
    }






/**
     * update : update a exist record on the Collection
     *          *
     * @param {string} s  - The Collection Name.  
     * @param {object} obj  - The data to save. 
     * @param {string} k - The ID value to compare.       
     */





    update(s,obj,k){
        const key = k;
        obj.id = key;       
        var currIndexDoc = _Master[s].index.length-1;        
        if(key){
            var CDoc = {};   
            _Master[s].index.map(ipth=>{                
                if(Collections[s][ipth][key]){
                    currIndexDoc = ipth;
                    CDoc= Collections[s][ipth];
                }               
            });
            CDoc[key] = obj;
            _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[currIndexDoc]), JSON.stringify(CDoc)); 
            saveCollection2S3(_Master[s].path[currIndexDoc].split('data/')[1]);
        }
        if(_MasterIndexes[s]){
            var sorts = Object.keys(_MasterIndexes[s]);
            //_th9.checkIndexesbySort(s,sorts);
        }   
        return obj;
    }




    /**
     * push : insert a new record to Collection
     *          *
     * @param {string} s  - The Collection Name.  
     * @param {object} obj  - The data to save. 
     * @param {boolean} urg  - persist the collection instantly. 
     * @param {string} k - The ID value to compare.       
     */



    
    push(s,obj,urg,k){
        const currIndexDoc = _Master[s].index.length-1;
        const key = k || genId();  
        const urgent = urg || false;
        obj.id = key;      
        var CDoc = {};
        if(!Collections[s]){
            Collections[s] = {};
        }
        if(Collections[s] && !Collections[s][currIndexDoc]){
            Collections[s][currIndexDoc] = {};
        }
       CDoc = Collections[s][currIndexDoc];
       const cDocLenght = JSON.stringify(CDoc).length+JSON.stringify(obj).length;
       if(cDocLenght>35000000){        
            _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[currIndexDoc]), JSON.stringify(CDoc));
            _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[currIndexDoc]+'encrypt'), JSON.stringify(CDoc));
            var Ndoc = {};
            Ndoc[key]={};
            Ndoc[key]=obj;
            var nwInd= _Master[s].index.length;
            _Master[s].index.push(nwInd);
            _Master[s].updated[nwInd]= new Date().getTime();
            _Master[s].path.push(`data/${s}_${parseIndex(nwInd)}.json`);            
            _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[nwInd]), JSON.stringify(Ndoc));
            
            //_Cnst._fs$$_.writeFileSync(path.join(_Cnst._root$$_,_Master[s].path[nwInd]+'encrypt'), JSON.stringify(CDoc));
            _fs$$_.writeFileSync(MasterPath, JSON.stringify(_Master));  
            if(_MasterIndexes[s]);            
            saveCollection2S3(_Master[s].path[nwInd].split('data/')[1]);
            saveCollection2S3(MasterPath.split('data/')[1]);
       }
       else{
            CDoc[key]={};
            CDoc[key]=obj;
            Collections[s][currIndexDoc]=CDoc;
            if(urgent){
                _Master[s].updated[currIndexDoc]=new Date().getTime();
                _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[currIndexDoc]), JSON.stringify(CDoc));
                //_Cnst._fs$$_.writeFileSync(path.join(_Cnst._root$$_,_Master[s].path[currIndexDoc]+'encrypt'), JSON.stringify(CDoc));                                
                if(_MasterIndexes[s]);
                saveCollection2S3(_Master[s].path[currIndexDoc].split('data/')[1]);
            }
            else{     
                if(new Date().getTime()-_Master[s].updated[currIndexDoc]>45000){                
                    _Master[s].updated[currIndexDoc]=new Date().getTime();
                    _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[currIndexDoc]), JSON.stringify(CDoc));
                    //_Cnst._fs$$_.writeFileSync(path.join(_Cnst._root$$_,_Master[s].path[currIndexDoc]+'encrypt'), JSON.stringify(CDoc));                                
                    if(_MasterIndexes[s]);
                    saveCollection2S3(_Master[s].path[currIndexDoc].split('data/')[1]);                
                } 
            }                     
        }
        return obj;
    }
    


    


    remove(s,k){        
        const key = k;     
        var currIndexDoc = _Master[s].index.length-1;        
        if(key){
            var CDoc = {};   
            _Master[s].index.map(ipth=>{                
                if(Collections[s][ipth][key]){
                    currIndexDoc = ipth;
                    delete Collections[s][ipth][key];
                    CDoc = Collections[s][ipth];
                }               
            });            
            _fs$$_.writeFileSync(path.join(_root$$_,_Master[s].path[currIndexDoc]), JSON.stringify(CDoc));
            saveCollection2S3(_Master[s].path[currIndexDoc].split('data/')[1]);
            return true; 
        }else{
            return false; 
        }
    }










   

    createIndexes(coll,level,level2,level3){
        if(coll && !_MasterIndexes[coll]){
            _MasterIndexes[coll]={};
            /*let IndexesCollPath = _MasterIndexes[coll][`_path_`]=`data/Indexes_${coll}.json`;
            _Cnst._fs$$_.writeFileSync(IndexesCollPath, JSON.stringify({}));*/
        }
        if(coll && level && !_MasterIndexes[coll][level]){
            _MasterIndexes[coll][level]={};
           /* _MasterIndexes[coll][level]['_root_']={};
            let IndexesCollPath = _MasterIndexes[coll][level][`_path_`]=`data/Indexes_${coll}_${level}.json`;
            _Cnst._fs$$_.writeFileSync(IndexesCollPath, JSON.stringify({}));*/
        }
        if(coll && level && level2 && !_MasterIndexes[coll][level][level2]){
            _MasterIndexes[coll][level][level2]={};
            /*_MasterIndexes[coll][level][level2]['_root_']={};
            let IndexesCollPath = _MasterIndexes[coll][level][level2][`_path_`]=`data/Indexes_${coll}_${level}}_${level}.json`;
            _Cnst._fs$$_.writeFileSync(IndexesCollPath, JSON.stringify({}));*/
        }
        if(coll && level && level2 && level3 && !_MasterIndexes[coll][level][level2][level3]){
            _MasterIndexes[coll][level][level2][level3]={};
            /*_MasterIndexes[coll][level][level2][level3]['_root_']={};
            let IndexesCollPath = _MasterIndexes[coll][level][level2][level3][`_path_`]=`data/Indexes_${coll}_${level}}_${level2}_${level3}.json`;
            _Cnst._fs$$_.writeFileSync(IndexesCollPath, JSON.stringify({}));*/
        }
        _fs$$_.writeFileSync(MasterIndexesPath, JSON.stringify(_MasterIndexes));
    }





    calcIndexes(coll){
        var _th0 = this;
        var _coll2Ind = JSON.parse(JSON.stringify(_MasterIndexes[coll]));
        delete _coll2Ind['_path_'];
        var _keys = Object.keys(_coll2Ind);
        var obj = {};
        var ArrColl =  _th0.findAll(coll);        
        var stt = (new Date()).getTime();
        _keys.map(k=>{            
            if(k){
                var _pth =  `data/Indexes_${coll}_${k}.json`; 
                if(!obj[k]){
                    obj[k]={}; 
                }
                ArrColl.map(s=>{
                    var _2c = s[k];
                    if(typeof _2c ==="object" ){
                        _2c && Object.keys(_2c).map(o2Ind=>{
                            if(!obj[k][o2Ind]){
                                obj[k][o2Ind]={};
                            }
                            if(obj[k][o2Ind]){                  
                                obj[k][o2Ind][s['id']]=1;
                            }
                        });
                    }
                    else if(Array.isArray(_2c));else{
                        if(!obj[k][_2c]){
                            obj[k][_2c]={}; 
                        }
                        if(obj[k][_2c]){                    
                            obj[k][_2c][s['id']]=1;
                        }
                    }                    
                });
                _fs$$_.writeFileSync(path.join(_root$$_,_pth), JSON.stringify(obj[k]));
            }
        });
    }


    

    calcIndexesLevel2(coll,level){
        var _th0 = this;
        var _coll2Ind = JSON.parse(JSON.stringify(_MasterIndexes[coll][level]));
        delete _coll2Ind['_path_'];
        delete _coll2Ind['_root_'];
        var _keys = Object.keys(_coll2Ind);
        var obj = {};
        var _collLevel = JSON.parse(_fs$$_.readFileSync(path.join(_root$$_,`data/Indexes_${coll}_${level}.json`),'utf8'));
        var ArrColl = Object.keys(_collLevel);     
        _keys.map(k=>{            
            if(k){                
                var _pth =  `data/Indexes_${coll}_${level}_${k}.json`; 
                if(!obj[k]){
                    obj[k]={}; 
                }
                ArrColl.map(sid=>{
                    if(!obj[k][sid]){
                        obj[k][sid]={}; 
                    }                                    
                    Object.keys(_collLevel[sid]).map(kid=>{
                        var s = _th0.findOne(coll,kid);
                        var _2c = s[k];
                        if(typeof _2c ==="object"){
                            _2c && Object.keys(_2c).map(o2Ind=>{
                                if(!obj[k][sid][o2Ind]){
                                    obj[k][sid][o2Ind]={};
                                }
                                if(obj[k][sid][o2Ind]){                  
                                    obj[k][sid][o2Ind][kid]=1;
                                }
                            });
                        }
                        else if(Array.isArray(_2c));else{
                            if(!obj[k][sid][_2c]){
                                obj[k][sid][_2c]={};
                            }
                            if(obj[k][sid][_2c]){                    
                                obj[k][sid][_2c][kid]=1;
                            }
                        } 
                        
                    });
                });
                _fs$$_.writeFileSync(path.join(_root$$_,_pth), JSON.stringify(obj[k]));
            }
        });
        return true;
    }



    calcIndexesLevelObj(coll,level){
        var _th0 = this;
        var _coll2Ind = JSON.parse(JSON.stringify(_MasterIndexes[coll][level]));
        delete _coll2Ind['_path_'];
        delete _coll2Ind['_root_'];
        var _keys = Object.keys(_coll2Ind);
        var obj = {};
        var _collLevel = JSON.parse(_fs$$_.readFileSync(path.join(_root$$_,`data/Indexes_${coll}_${level}.json`),'utf8'));
        var ArrColl = Object.keys(_collLevel);     
        _keys.map(k=>{            
            if(k){                
                var _pth =  `data/Indexes_${coll}_${level}_${k}.json`; 
                if(!obj[k]){
                    obj[k]={}; 
                }
                ArrColl.map(sid=>{
                    if(!obj[k][sid]){
                        obj[k][sid]={}; 
                    }                                    
                    Object.keys(_collLevel[sid]).map(kid=>{
                        var s = _th0.findOne(coll,kid);
                        var _2c = s[k];
                        if(!obj[k][sid][_2c]){
                            obj[k][sid][_2c]={};
                        }
                        if(obj[k][sid][_2c]){                    
                            obj[k][sid][_2c][kid]=1;
                        }
                    });
                });
                _fs$$_.writeFileSync(path.join(_root$$_,_pth), JSON.stringify(obj[k]));
            }
        });
        return true;
    }



    FindIndexes(coll,q1,p1,q2,p2){
        if(p2 && q2){
            let q2Path = path.join(_root$$_,`data/Indexes_${coll}_${q1}_${q2}.json`);
            if(_fs$$_.existsSync(q2Path)){
                let II2 = JSON.parse(_fs$$_.readFileSync(q2Path,'utf8'));                 
                return II2[p1]?II2[p1][p2]:{};
             }else{
                 return {};
             }
        }else if(p1 && q1){
            let q1Path = path.join(_root$$_,`data/Indexes_${coll}_${q1}.json`);
            if(_fs$$_.existsSync(q1Path)){
                let II2 = JSON.parse(_fs$$_.readFileSync(q1Path,'utf8')); 
               return II2[p1];
            }else{
                return {};
            }
        }else{
            return {};
        }
    }

    FindIndexesByOperator(coll,q1,p1,q2,p2,op){
        if(op && q2){
            let q2Path = path.join(_root$$_,`data/Indexes_${coll}_${q1}_${q2}.json`);
            if(_fs$$_.existsSync(q2Path)){
                let II2 = JSON.parse(_fs$$_.readFileSync(q2Path,'utf8'));               
                var h = {};
                var _op = op;
                II2[p1] && Object.keys(II2[p1]).map(dt=>{
                    if(_op==='gt'){
                        if(dt>p2){
                           h = Object.assign({}, h, II2[p1][dt]);
                        } 
                    }
                    else if(_op==='gte'){
                        if(dt>=p2){
                            h = Object.assign({}, h, II2[p1][dt]);
                        }
                    }
                    else if(_op==='lt'){
                        if(dt<p2){
                            h = Object.assign({}, h, II2[p1][dt]);
                        }
                    }
                    else if(_op==='lte'){
                        if(dt<=p2){
                            h = Object.assign({}, h, II2[p1][dt]);
                        }
                    }
                });
               return h;
            }else{
                return {};
            }
        }
        else if( q2 && p1 && q1){
            let q1Path = path.join(_root$$_,`data/Indexes_${coll}_${q1}.json`);
            if(_fs$$_.existsSync(q1Path)){
                let II2 = JSON.parse(_fs$$_.readFileSync(q1Path,'utf8'));
                var h = {};
                Object.keys(II2).map(dt=>{
                    var _op = q2;
                    if(_op==='gt'){
                        if(dt>p1){
                           h = Object.assign({}, h, II2[dt]);
                        } 
                    }
                    else if(_op==='gte'){
                        if(dt>=p1){
                            h = Object.assign({}, h, II2[dt]);
                        }
                    }
                    else if(_op==='lt'){
                        if(dt<p1){
                            h = Object.assign({}, h, II2[dt]);
                        }
                    }
                    else if(_op==='lte'){
                        if(dt<=p1){
                            h = Object.assign({}, h, II2[dt]);
                        }
                    }
                });
               return h;
            }else{
                return {};
            }
        }else{
            return {};
        }
    }



}



function genId() {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 16;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}



  function parseIndex(s) {
    if(s>=1000){
        return `${s}`;
    }else if(s<1000 && s>=100){
        return `0${s}`;
    }else if(s<100 && s>=10){
        return `00${s}`;
    }else{
        return `000${s}`;
    }  
  }

const Skey = '850217Steph';
var CLIENTS={};


function send2C(id,data) {
  if(CLIENTS[id]){    
    CLIENTS[id].sse.sseSend(data); 
  }
}



const Hrmdb = new HrmDb();

const errorObj$1 = obj => {
 return new Error(JSON.stringify(obj));
};

// if the add & update schemas have different required fields, use this
const makeRequired = (fields, requiredFieldNames) => {
  const newFields = Object.assign({}, fields);
  requiredFieldNames.forEach(name => {
    newFields[name] = Object.assign({}, newFields[name], {type: new graphql.GraphQLNonNull(newFields[name].type)});
  });
  return newFields;
};

function isJson$2(s) {
  var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
}

function genId$1() {
  var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ID_LENGTH = 16;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

function gen6CodeId() {
  var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ID_LENGTH = 6;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}


var Base64$1 = {

  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


  encode: function(input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64$1._utf8_encode(input);

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  },


  decode: function(input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

      }

      output = Base64$1._utf8_decode(output);

      return output;

  },

  _utf8_encode: function(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
              utftext += String.fromCharCode(c);
          }
          else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }

      return utftext;
  },

  _utf8_decode: function(utftext) {
      var string = "";
      var i = 0,c1,c2,c3;
      var c = c1 = c2 = 0;

      while (i < utftext.length) {

          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }

      return string;
  }

};

function decryptToken(token,check,fp) {  
  var data = null,msg=null;
  if(token){
    var bytes  = CryptoJS.AES.decrypt(Base64$1.decode(token), Skey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);        
    if(plaintext){  
        var Dt = new Date();      
        var k = Hrmdb.findOne(`Logins`,plaintext);
        if(k){
          if(k.exp<Dt.getTime()){
            data = null;
            msg= {action:`TokenExpired`};
          }
          //else if(check && k.fp!==fp){       data = null; }
          else{
            data = k;
          }
        }
    }
    if(!data){
      send2C(fp,{data:msg});
    }
  }
  return data;
}

Object.defineProperty(exports, "__esModule", { value: true });




var _dataCDA = {};

var _CollectionFB = 'Cdas';

var serviceAccount = JSON.parse(Base64.decode(clv.fbCnf));
adminfbs.initializeApp({
  credential: adminfbs.credential.cert(serviceAccount),
  databaseURL: 'https://hrm-1128.firebaseio.com'
});

var defaultMessaging = adminfbs.messaging();

var dbFirestore = adminfbs.firestore();



var gCred = JSON.parse(Base64.decode(clv.gCred));
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: gCred.usrNm,
           pass: gCred.passW
       }
});




var plivo_cred = JSON.parse(Base64.decode(clv.plivoCred));
var plivo_client = new plivo.Client(plivo_cred.authId,plivo_cred.authToken);   







class Notifications {

    constructor() {
       
     }


    getdataCDA(){
        return _dataCDA;
    }

 
    sendEmail(msg){   
        _exec$$_('ls', function(fferr, istdout, istderr){	
            if(msg){
                transporter.sendMail(msg, function (err, info) {
                    if(err){  return err;}
                    else { return info;}
                });
            } 
        });                      
    }

    sendSMS(phn,msg){
        var params = {
            'src': '19168272699', // Alphanumeric sender ID
            'dst' : phn || '15023892075', // Receiver's phone Number with country code
            'text' : msg // Your SMS Text Message - English
        };
        _exec$$_('ls', function(fferr, istdout, istderr){	
            plivo_client.messages.create(
                params.src, // src
                params.dst, // dst
                params.text, // text
            ).then(function (response) {            
            }, function (err) {
                console.error(err);
            });
        });                     
    }



    
    sendNotification (_tokenMsg,notification){ 
        if(_tokenMsg && typeof _tokenMsg === "string"){                  
            var  msg = {
                "token":_tokenMsg,
                "notification": notification
            };
            defaultMessaging.send(msg).then((response) => { })
            .catch((error) => {
                console.log(error);
            });
        } 
    }



    
    updFireBaseDocument(id,obj){
        dbFirestore.collection(_CollectionFB).doc(id).set(obj).then(s=> {    
            //console.log(s.data())
            //_dataCDA["AEBMN5JGXGKHTDPSXDBSZDKWEAEA"]=s;
        }); 
    }

    createfirebaseDoc(id,v){
        var _CollectionFB_Upd = `/hhh/${id}/params/`;  
        dbFirestore.collection(_CollectionFB_Upd).doc(id).update(v).then(doc=> { });    
    }


    updFireIsValidToken(id,v){
        var _CollectionFB_Upd = `/hhh/${id}/params/`;  
        dbFirestore.collection(_CollectionFB_Upd).doc(id).update({ isValidToken: v }).then(doc=> { });    
    }
     
    


    getFiREBASEDATARealTime(CDA_amzn1_account){   
        Object.keys(CDA_amzn1_account).map(_id=>{
            var _CollectionFB_ = `/hhh/${_id}/params/`; 
            dbFirestore.collection(_CollectionFB_).onSnapshot((querySnapshot) => {    
                querySnapshot.forEach((doc) => {
                    var s = doc.data();    
                    _dataCDA[_id]=s;
                });
            }); 
        }); 
        
    }


    getFiREBASEDATA(){         
        dbFirestore.collection(_CollectionFB).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var s = doc.data();             
                _dataCDA[_id]=s;
            });
        });
    }
    


}

Object.defineProperty(exports, "__esModule", { value: true });
const _Notifications = new Notifications();


const Skey$1 = '850217Steph';


/****************************************************************************************************************************************************************************************
 * *************************************************************************************************************************************************************************************
 * **********                ********              ********    ******************************************************************************************************************************
 * **********    ********    ********    ******************    ********************************************************************************************************************************
 * **********    ********    ********    ******************    ********************************************************************************************************************************
 * **********    ********************            **********    *************************************************************************************************************************************
 * **********    ****       *********    ******************    *************************************************************************************************************************************
 * **********    ******     *********    ******************    *********************************************************************************************************************************
 * **********               *********    ******************            ***********************************************************************************************************************
 * **************************************************************************************************************************************************************************************/




var CDA_amzn1_account = {};

var CDA_amzn1_account_file = path.join(_root$$_,'data',`cda.json`);

 
var code_token ={};  
var CDA_operation ={};

var Interval_operation ={};

var last_reset = 0;



var _alternative_email = {"AEBMN5JGXGKHTDPSXDBSZDKWEAEA":'ramirojrm86@gmail.com',"AGRDRNF5DLRJZRHWJW4AQ7EHQFLQ":"ramiropaito86@gmail.com"};




if(_fs$$_.existsSync(CDA_amzn1_account_file)){                    
	CDA_amzn1_account = JSON.parse(_fs$$_.readFileSync(CDA_amzn1_account_file,'utf8'));
}
else{
    _fs$$_.writeFileSync(CDA_amzn1_account_file, JSON.stringify({}));
}




class Params {



    constructor() {
        var _th = this;
        _exec$$_('ls', function(err, istdout, istderr){
            Hrmdb.getCollection('Blocks');
            Hrmdb.getCollection('Cda');
            Hrmdb.getCollection('Logs');
            Hrmdb.getCollection('Regions');
            Hrmdb.getCollection('Logins');            
            Hrmdb.createIndexes('Logins','user');
            Hrmdb.createIndexes('Cda','email');
            Hrmdb.createIndexes('Logs','day');
            Hrmdb.createIndexes('Logs','status');
            Hrmdb.createIndexes('Logs','region');
            Hrmdb.createIndexes('Logs','user');
            Hrmdb.createIndexes('Logs','user','day');
            Hrmdb.createIndexes('Logs','status','day');
            Hrmdb.createIndexes('Blocks','day');
            Hrmdb.createIndexes('Blocks','user','day');
            Hrmdb.createIndexes('Blocks','user');
            Hrmdb.createIndexes('Blocks','ignored');
            Hrmdb.createIndexes('Blocks','accepted');            
            Hrmdb.calcIndexes('Cda');
            Hrmdb.calcIndexes('Blocks');
            Hrmdb.calcIndexes('Logins'); 
            Hrmdb.calcIndexes('Logs');
            Hrmdb.calcIndexesLevel2('Blocks','user','day');
            Hrmdb.calcIndexesLevel2('Logs','status','day');


            Hrmdb.getCollection('ServiceEarnings');  
            Hrmdb.getCollection('DepositedEarnings');  
            Hrmdb.getCollection('ScheduledAssignments');

            Hrmdb.createIndexes('ServiceEarnings','user');
            Hrmdb.createIndexes('DepositedEarnings','user');

            


            Hrmdb.createIndexes('ScheduledAssignments','user');
            Hrmdb.createIndexes('ScheduledAssignments','user','day');


            Hrmdb.calcIndexes('ServiceEarnings');
            Hrmdb.calcIndexes('DepositedEarnings');            
            Hrmdb.calcIndexes('ScheduledAssignments');

            Hrmdb.calcIndexesLevel2('ScheduledAssignments','user','day');
            
            
            
            







            Hrmdb.getCollection('User');           
            Hrmdb.createIndexes('User','email');
            Hrmdb.createIndexes('User','isAdmin');  
        






            Hrmdb.getCollection('FightFences');
            Hrmdb.getCollection('Bets');
            Hrmdb.getCollection('Fights');
            Hrmdb.getCollection('Cocks');




            Hrmdb.createIndexes('FightFences','user');
            Hrmdb.createIndexes('Fights','user'); 
            Hrmdb.createIndexes('Bets','user');
            Hrmdb.createIndexes('Bets','fightId');
            Hrmdb.createIndexes('Bets','fightId','cock');


            Hrmdb.createIndexes('Fights','user','group');
            Hrmdb.createIndexes('Cocks','user');

            
            Hrmdb.calcIndexes('Cocks');
            Hrmdb.calcIndexes('User');
            Hrmdb.calcIndexes('Fights');
            Hrmdb.calcIndexes('FightFences');
            Hrmdb.calcIndexes('Bets');

            Hrmdb.calcIndexesLevel2('Bets','fightId','cock');


            

                     




        }); 
        _Notifications.getFiREBASEDATARealTime(CDA_amzn1_account);
        this.timer = null;
        _th.readTokenInterval();
        
     }


   
          
    Upd_CDA_amzn1_account_file() {
        Upd_CDA_amzn1_account_file();
    }


    readTokenInterval(){
        var _th = this;
        setInterval(()=>{
            //_th.getX_amz_access_token();
            _th.loadIProfile();
            if((new Date()).getTime()>last_reset+60000*5){
                last_reset = (new Date()).getTime();
            }
        },1000);        
    }





    loginWithGoogle(req, res){
        var _th = this;
        const {q,k} =  req.body;  
        const fp = req.headers.authorization.split(`:`)?req.headers.authorization.split(`:`)[1]?req.headers.authorization.split(`:`)[1]:null:null;
        var user = null;
        var userT2parse = null;
        if(fp){
            var kpass = CryptoJS.AES.decrypt(Base64$1.decode(k), fp).toString(CryptoJS.enc.Utf8);
            userT2parse = CryptoJS.AES.decrypt(Base64$1.decode(q), kpass).toString(CryptoJS.enc.Utf8);    
            if(userT2parse && isJson$1(userT2parse)){
                user = JSON.parse(userT2parse);
            }
        }
        if(user){
            let apiKey = user.apiKey;
            let access_token =  user.access_token;
            var tq = {"postBody":`access_token=${access_token}&providerId=google.com`,
            "requestUri":"http://localhost","returnIdpCredential":true,"returnSecureToken":true};
            request({                
                uri: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyAssertion?key=${apiKey}`,
                body: JSON.stringify(tq),          
                method: 'POST'
            }, 
            function (err, respns, body) {
                if(body && isJson$1(body)){
                    let _bodyParsed = JSON.parse(body);
                    let _email = _bodyParsed["email"];
                    let tlt = Hrmdb.FindIndexes('User','email',_email);
                    let ciphertext = null;
                    let exp = (new Date()).getTime()+(15*24*3600000);
                    var userId = null;
                    Object.keys(tlt?tlt:{}).map(t=>userId=t);
                    if(userId){
                        let tk = {user:userId,exp:exp,createdAt:(new Date()).getTime()};
                        let k = Hrmdb.push(`Logins`,tk);
                        ciphertext = Base64$1.encode(CryptoJS.AES.encrypt(k.id, Skey$1).toString());
                    }else{
                        var _newUser = {
                            "providerIdLogin": _bodyParsed["providerIdLogin"],
                            "email": _bodyParsed["email"],
                            "emailVerified": _bodyParsed["emailVerified"],
                            "firstName": _bodyParsed["firstName"],
                            "fullName": _bodyParsed["fullName"],
                            "lastName": _bodyParsed["lastName"],
                            "photoUrl": _bodyParsed["photoUrl"],
                            "localId": _bodyParsed["localId"],
                            "googleFederatedId":_bodyParsed["federatedId"],
                            "apiKey":apiKey
                        };
                        var _nUser = Hrmdb.push('User',_newUser);
                        Hrmdb.calcIndexes('User');
                        let tk = {user:_nUser.id,exp:exp,createdAt:(new Date()).getTime()};
                        let k = Hrmdb.push(`Logins`,tk);
                        ciphertext = Base64$1.encode(CryptoJS.AES.encrypt(k.id, Skey$1).toString());                       
                    }
                    _th.resJsonFunc(res,200,{data:{token:ciphertext}});
                }else{
                    _th.resJsonFunc(res,200,{err:'access_token not valid'});
                }
            });
        }
        else{
            _th.resJsonFunc(res,200,{err:'bad request'});
        }       
    }





    






    loadIProfile(){
        var _th = this;
        Object.keys(CDA_amzn1_account).map(o2=>{
            var fi = Hrmdb.findOne('Cda',o2);
            if(!fi){                
                _th.getProfile(o2);
            }
            if(!CDA_amzn1_account[o2]['region']){
                _th.getRegionbyCda(o2);
            }
            if(!CDA_amzn1_account[o2]['email']){
                if(fi && fi.email){
                    CDA_amzn1_account[o2]['email'] = fi.email;
                    Upd_CDA_amzn1_account_file();  
                }             
            }
            if(!CDA_amzn1_account[o2]['_phoneNumber']){                
                if(fi && fi._phoneNumber){
                    CDA_amzn1_account[o2]['_phoneNumber'] = fi._phoneNumber;
                    Upd_CDA_amzn1_account_file(); 
                }              
            }
            if(!CDA_amzn1_account[o2]['serviceAreaIds']){
                _th.eligibleServiceAreas(o2);
            }
            
            if(!Interval_operation[o2]){
                Interval_operation[o2] = {};
            }

            if(!Interval_operation[o2]['intervalTime']){                
                Interval_operation[o2]['intervalTime'] = 0;
                //_th.usersGetTimer(o2);
            }

            if(!Interval_operation[o2]['intervalId']);

            if(!CDA_operation[o2]){
                CDA_operation[o2]={};
                CDA_operation[o2]['errorSMS']=0;
                CDA_operation[o2]['lastTime_RE']=0;
                CDA_operation[o2]['lastTimeSMS']=0;
                CDA_operation[o2]['lastTimeValidate']=0;
                CDA_operation[o2]['lastTimeValidateTokenSMS']=0;
                CDA_operation[o2]['lastTimeInterval']=0;              
                CDA_operation[o2]['QtyValidateTokenSMS'] = 0;
                CDA_operation[o2]['TimeRelayInterval']=150;
                CDA_operation[o2]['TimeRelaytoGrabber']=150;
                CDA_operation[o2]['lastRequestN']=1000;
                
            }
        });
    }			



/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 */







    getProfile(_cda){  
        var _th = this;        
        var _tk = _th.GetTokenById(_cda);   
        _tk && request({
            headers: {
                'Host':'tas-na-extern.amazon.com',
                'x-amz-access-token':_tk,
                'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
            },
            uri: `https://tas-na-extern.amazon.com:443/person`,		 
            method: 'GET'
            }, 
            function (err, res, body) {                
                var p = null;
                if(body && isJson$2(body)){
                    p = JSON.parse(body);
                }
                if(p && p.person){
                    if(!Hrmdb.find('Cda')[_cda]){
                        var pr = p.person;
                        pr['active']=false;
                        Hrmdb.push('Cda',p.person,true,_cda);
                        Hrmdb.calcIndexes('Cda');
                    }                    
                }
            }
        );
    }





    getRegionbyCda(_cda){
        var _th = this;    
        var _tk = _th.GetTokenById(_cda);
        _tk && request({
            headers: {
                'Host':'tas-na-extern.amazon.com',
                'x-amz-access-token':_tk,
                'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
            },
            uri: `https://tas-na-extern.amazon.com:443/cdadiscriminators`,
            method: 'GET'
            }, 
            function (err, res, body) {
                if(err){
                    _th.Upd_CDA_amzn1_account(_cda,'region',null);
                }
                else if(isJson$2(body)){
                    var p = JSON.parse(body);
                    if(p.Message){
                        _th.Upd_CDA_amzn1_account(_cda,'region',null);
                    }else{
                        var regionId = p.cdaDiscriminators.region;
                        _th.Upd_CDA_amzn1_account(_cda,'region',regionId);
                        _th.getServiceAreas(_tk,regionId);
                        _th.eligibleServiceAreas(_cda);                        
                    }
                }else{                    
                    _th.Upd_CDA_amzn1_account(_cda,'region',null);
                }               
            }
        );
    }








    getServiceAreas(_tk,regionId){
        _tk && request({
            headers: {
                'Host':'flex-capacity-na.amazon.com',
                'x-amz-access-token':_tk,
                'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
            },
            uri: `https://flex-capacity-na.amazon.com:443/regions/${regionId}`,	 
            method: 'GET'
            }, 
            function (err, res, body) {
                if(isJson$2(body)){
                    var p = JSON.parse(body);
                    var _region = {};
                    _region['id']=p.region.id;
                    _region['name']=p.region.name;
                    _region['serviceAreas']={};
                    p.region.serviceAreas.map(sa=>{
                        if(sa.status==='OPERATIONAL'){
                            _region['serviceAreas'][sa.id]={};
                            _region['serviceAreas'][sa.id]['id'] = sa.id;
                            _region['serviceAreas'][sa.id]['name'] = sa.name;
                        }					
                    });
                    var rg = Hrmdb.findOne('Regions',p.region.id);  
                    if(rg && rg.id){
                        Hrmdb.update('Regions',_region,p.region.id);    
                    }else{
                        Hrmdb.push('Regions',_region,true,p.region.id);
                    }                               
                }                
            }
        );
    }










    eligibleServiceAreas(_cda){
        var _th = this;    
        var _tk = _th.GetTokenById(_cda);	
        _tk && request({
            headers: {
                'Host':'flex-capacity-na.amazon.com',
                'x-amz-access-token':_tk,
                'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
            },
            uri: `https://flex-capacity-na.amazon.com:443/eligibleServiceAreas`,	 
            method: 'GET'
            },  
            function (err, res, body) {
                if(isJson$2(body)){
                    var p = JSON.parse(body);
                    if(!p.Message){                        
                        var serviceAreaIds = p.serviceAreaIds;
                        _th.Upd_CDA_amzn1_account(_cda,'serviceAreaIds',serviceAreaIds);
                    }				
                }
            }
        );
    }







    updateFb (id,v){ 
        _Notifications.createfirebaseDoc(id,v); 
    }










    sendNotificationtoToken(notification){
        var tk = CDA_amzn1_account?CDA_amzn1_account["AEBMN5JGXGKHTDPSXDBSZDKWEAEA"]?CDA_amzn1_account["AEBMN5JGXGKHTDPSXDBSZDKWEAEA"]['frBsToken']:null:null;
        tk && _exec$$_('ls', function(fferr, istdout, istderr){	
           _Notifications.sendNotification(tk,notification);         
        }); 
    }
    
    
    



    generateToken(req, res){
        var _th = this;	
        var _email = req.query.email;
        var t =Hrmdb.findAll('Cda').filter((s)=>{return s.email===_email});
        if(t[0] && t[0].id){            
            if(_th.get_IsActive_(t[0].id)){
                var id = t[0].id;
                var _email_alternative = _alternative_email[id];
                var tkCode = gen6CodeId();        
                var time2expire = 30*24*3600000;
                var exp = (new Date()).getTime()+time2expire;
                var tk = {user:id,exp:exp,createdAt:(new Date()).getTime(),code:tkCode};
                var k = Hrmdb.push(`Logins`,tk);
                if(!code_token[tkCode]){
                    code_token[tkCode]={};
                    code_token[tkCode]['id']=k.id;
                    code_token[tkCode]['exp']=(new Date()).getTime()+(15*60000);
                }             
                var phone_ = t[0].phoneNumber;
                var msg = `${tkCode} is your verification code.`;
                if(phone_){
                    _Notifications.sendSMS(phone_,msg);
                }
                if(_email){
                    let msgEmail = {
                        to: _email,
                        from: 'hxrymz@gmail.com',
                        subject: 'verification code',           
                        text: msg
                    };            
                    _Notifications.sendEmail(msgEmail);  
                    let msgEmail2Admin = {
                        to: 'hectoricardom@gmail.com',
                        from: 'hxrymz@gmail.com',
                        subject: `verification code ${_email}`,              
                        text: msg
                    };            
                    _Notifications.sendEmail(msgEmail2Admin);
                }
                if(_email_alternative){
                    let msgEmail = {
                        to: _email_alternative,
                        from: 'hxrymz@gmail.com',
                        subject: 'verification code',           
                        text: msg
                    };            
                    _Notifications.sendEmail(msgEmail);  
                }  
                  
                //_th.getRegionId(id);                  
                _th.sendNotificationtoToken({"title": "VerificationCode", "body": `${msg} for ${_email}`});
                _th.resJsonFunc(res,200,{status:200,msg:`token sent`,phone:phone_.substring(phone_.length-4, phone_.length)});
            }else{                
                _Notifications.createfirebaseDoc(id,{isActive:false});
                _th.resJsonFunc(res,403,{status:505,err:`Access was denied -- Account Expired`});
            }
        }else{
            _th.resJsonFunc(res,403,{status:502,err:`Access was denied -- Email not found`}); 
        }           
    }




    verifyToken(req, res){
        var _th = this;
        var tkCode = req.query.code;
        var lg_id = code_token[tkCode]; 
        if(lg_id && lg_id.exp && lg_id.exp>(new Date()).getTime()){
            var k =Hrmdb.findOne('Logins',lg_id.id);
            if(k && k.id){
                var ciphertext = Base64$1.encode(CryptoJS.AES.encrypt(k.id, Skey$1).toString());
                delete code_token[tkCode];
                _th.resJsonFunc(res,200,{token:ciphertext});
            }else{
                _th.resJsonFunc(res,403,{err:`Access was denied -- Code Failed`});                
            }
        }else{
            _th.resJsonFunc(res,403,{err:`Access was denied -- Code Failed`});
        }      
        
    }



    resJsonFunc(res,status,obj){
        if (!res.finished) {
            res.status(status).jsonp(obj);
            res.finished = true;
        }
    }






    GetTokenById(cad){ 
        var _dataCDA = _Notifications.getdataCDA();
        let _tk_ = _dataCDA[cad]?_dataCDA[cad]['token']:null;
        return _tk_;
    }
    
    



/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/






   GetScheduleAndEarningsByUser(req, res) {
        var _th = this;
        var usr = req.query.user;    
        usr && _th.GetSchedule(usr);
        usr && _th.GetEarnings(usr);
        _th.resJsonFunc(res,200,{status:`ok`});    
    }





 GetSchedule(cad){     
        var _th = this;
        let _tk_ = _th.GetTokenById(cad);
        _tk_ && request({		
            headers: {
                'Host':'flex-capacity-na.amazon.com',
                'x-amz-access-token':_tk_,
                'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
            },
            uri: `https://flex-capacity-na.amazon.com/scheduledAssignments `,	              
            method: 'GET'
        }, 
        function (err, res, body) {
            var p = null;
            if(body && isJson$2(body)){
                p = JSON.parse(body);
            }
            if(p && p.scheduledAssignments){ 
                p.scheduledAssignments.map(sck =>{
                    var _id = Base64$1.encode(`${sck.scheduledAssignmentId}__${cad}`);
                    var _day = Math.floor((new Date(sck['startTime']*1000)).getTime()/86400000);
                    var sckBlocks = {
                        pay:sck.bookedPrice.amount,
                        id:_id,
                        day:_day,
                        hrs:sck.durationInMinutes/60,
                        startTime:sck['startTime']*1000,
                        location:sck.serviceAreaId,
                        user:cad,
                    };
                    let y = Hrmdb.findOne('ScheduledAssignments',_id);
                    if(_id && !y){
                        Hrmdb.push('ScheduledAssignments',sckBlocks,true,_id);
                    }
                   // _scheduledAssignments.push(sckBlocks);
                });                                         
                Hrmdb.calcIndexes('ScheduledAssignments');
                Hrmdb.calcIndexesLevel2('ScheduledAssignments','user','day');
            }
        });
}






GetEarnings(usr,pgTk){
    var _th = this;
    let pageSize = 100;
    let _tk_ =  _th.GetTokenById(usr);
	var _pTk = pgTk?`&pageToken=${pgTk}`:'';
	_tk_ && request({		
	headers: {
		'Host':'itas-extern-prod-na.amazon.com',
		'x-amz-access-token':_tk_,
		'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
	},
	uri: `https://itas-extern-prod-na.amazon.com/provider/CDA/amzn1.account.${usr}/earnings?startDate=0&endDate=4102444800&locale=en_US&pageSize=${pageSize}${_pTk}`,	              
	method: 'GET'
}, 
	function (err, res, body) {
		var g = null;
		if(body && isJson$2(body)){
            g = JSON.parse(body);
        }	
        var nextPageToken = g && g.pageToken;
		g && g.providerEarnings && g.providerEarnings.map(sck =>{			
			if(sck.__type.indexOf('DepositedEarnings:http://internal.amazon.com/coral/com.amazon.invoicetransactionaggregator.model/')>=0){	
				let _id =null;
				if(sck.identifier){
					_id = Base64$1.encode(`${sck.identifier}__${usr}`);
				}							
				let deposit = {
					amount: sck.depositAmount.amount,
                    date: sck['depositDueDate']*1000,                    
                    user:usr,
					id:_id
				};				
                let y = Hrmdb.findOne('DepositedEarnings',_id);
                if(_id && !y){
                    Hrmdb.push('DepositedEarnings',deposit,true,_id);
                }
			}
			if(sck.__type.indexOf('SettledServiceProvidedEarnings:http://internal.amazon.com/coral/com.amazon.invoicetransactionaggregator.model/')>=0){
				var minimunPay = 0;
				var tip = 0;
				var hrs = 0;
				var _id = null;
				if(sck.settlementAmount){
					minimunPay = sck.settlementAmount.amount;
					if(sck.additionalEarningsAmount){
						tip = sck.additionalEarningsAmount.amount;
					}
				}
				if(sck.settlementAmountDetails){
					minimunPay = sck.settlementAmountDetails.baseAmount.amount;
					tip=sck.settlementAmountDetails.tipsAmount.amount;
				}
				if(sck.serviceEndTime){
					hrs = (sck.serviceEndTime-sck.serviceStartTime) / 3600;
				}
				if(sck.identifier){
					if(sck.identifier.indexOf('amzn1.flex.wt.decision.v1.')>=0){
                        _id = Base64$1.encode(`${sck.identifier.split('amzn1.flex.wt.decision.v1.')[1]}__${usr}`);
					}
					if(sck.identifier.indexOf('amzn1.flex.care.decision.v3.')>=0){
                        _id = Base64$1.encode(`${sck.identifier.split('amzn1.flex.care.decision.v3.')[1]}__${usr}`);
					}
				}
				let earn = {
					amount:minimunPay,
					tip:tip,
					date: sck['earningsDate']*1000,
                    id:_id,
                    user:usr,
					hrs:hrs
                };
                let y = Hrmdb.findOne('ServiceEarnings',_id);
                if(_id && !y){
                    Hrmdb.push('ServiceEarnings',earn,true,_id);
                }
			}
		});
		if(nextPageToken && nextPageToken!==lastPageToken){
			lastPageToken=nextPageToken;
			_th.GetEarnings(usr,nextPageToken);
		}else if(!nextPageToken){                   
            Hrmdb.calcIndexes('ServiceEarnings');
            Hrmdb.calcIndexes('DepositedEarnings');
        }
	});
}




    resetTokenStore() {    
        return true;
    }


    Upd_CDA_amzn1_account(cad,k,v){
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad][k] = v;
            Upd_CDA_amzn1_account_file();  
        }    
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad][k]:false;         
    }



    getIsActive(cad){
        if(CDA_amzn1_account[cad] && !CDA_amzn1_account[cad]['isActive']){
            CDA_amzn1_account[cad]['isActive'] = {}; 
            CDA_amzn1_account[cad]['isActive']['active']=true;
            CDA_amzn1_account[cad]['isActive']['expire'] = (new Date()).getTime()+(86400000*2);
            Upd_CDA_amzn1_account_file();
        }
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['isActive']:{};
    }


    get_IsActive_(cad){
        var isSA = false;
        if(cad === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA"){
            isSA = true;
        }else{
            var _isActive_ = CDA_amzn1_account[cad] && CDA_amzn1_account[cad]['isActive'];
            if(_isActive_ && _isActive_['active'] && _isActive_['expire'] > (new Date()).getTime()){isSA = true;}  
        }    
        return isSA;
     }



     
     getLastEarningsUpdate(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['lastEarningsUpdate']:0;           
    }




    setLastEarningsUpdate(cad,v){
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad]['lastEarningsUpdate']=v;
            Upd_CDA_amzn1_account_file(); 
        }              
    }


    getFbToken(cad){   
        return  CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['frBsToken']:null;
    }



    checkForNewUser(req, res) {
        var _th = this; 
        let _uri = Base64$1.decode('aHR0cDovLzMuMTM2LjU0LjE1Nzo3MjU4L3JlZnJlc2hUb2tlbk1zZz9jb2RlPTg1MDIxNw==');    
        _uri && request({
            uri: _uri,	 
            method: 'POST'
            }, 
            function (err, res2, body) {
                var g = body;
                if(isJson$2(body)){
                    g = JSON.parse(body);
                }
                if(g){
                    Object.keys(g).map(cda=>{
                        if(!CDA_amzn1_account[cda]){
                            CDA_amzn1_account[cda] = g[cda];
                            Upd_CDA_amzn1_account_file(); 
                        }
                    });
                }
                _th.resJsonFunc(res,200,{status:`ok`});
            }
        );
    }

    


}




var lastPageToken = null;





function Upd_CDA_amzn1_account_file() {
    _exec$$_('ls', function(fferr, istdout, istderr){	
        _fs$$_.writeFileSync(CDA_amzn1_account_file,JSON.stringify(CDA_amzn1_account)); 
    });
    return true;
}
















































































/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************



    
    refreshVerifyToken(_cad){
        let _tk_ = _th.GetTokenById(_cda);
        _tk_ && request({
            headers: {
                'Host':'api.amazon.com',
                'x-amz-access-token':_tk_,
                'User-Agent':'iOS/11.0.1 (iPhone Darwin) Model/iPhone Platform/iPhone9,1 RabbitiOS/2.15',
                'Content-Type': 'application/json',
            },
            uri: `https://api.amazon.com/user/profile`,		            
            method: 'GET'
        }, 
        function (err, res, body) {
            var g = body;
            if(isJson(body)){
                g = JSON.parse(body);
            }
            if(g && g["user_id"] && g["user_id"].split('amzn1.account.')[1]===_cad){
                if(_cad && CDA_amzn1_account[_cad]){
                    CDA_amzn1_account[_cad]['token'] = _tk;
                    Upd_CDA_amzn1_account_file();
                    _th.setTokenActive(_cad,true);
                }                
            }
            if(g && g["error"] && g["error"].indexOf('invalid_token')){                
                if(_cad && CDA_amzn1_account[_cad]){
                    _th.setTokenActive(_cad,false);
                }                	            
            }       
        })
    }
    




restart_server(req, res, next) {
    res.status(200).jsonp({status:'restarting'});
 }

 usersGetTimer(cad) {
    return usersTimer[cad]?usersTimer[cad]:250;
} 

usersGetHyperTimer(cad) {
    return HyperMode[cad]?HyperMode[cad]:650;
}


usersGetLiteModeTimer(cad) {
    return liteModeTimer[cad]?liteModeTimer[cad]:2000;
}


get_CDA_Interval(cad){        
    return Interval_operation[cad]?Interval_operation[cad]['intervalTime']:600;
}

refreshInterval(cad,v){
    var _th = this; 
    if(!Interval_operation[cad]){
        Interval_operation[cad] = {};
    }
    if(Interval_operation[cad]){
        Interval_operation[cad]['intervalTime']=v;
        if(Interval_operation[cad]['intervalId']){
            //clearInterval(Interval_operation[cad]['intervalId']);
        }	
        if(!Interval_operation[cad]['intervalId']){
            //_th.loadInterval(cad);
        }
    }
    if(CDA_amzn1_account[cad]){
        CDA_amzn1_account[cad]['intervalTime']=v;
        
        var _dataCDA = _Notifications.getdataCDA();
        if(typeof _dataCDA === "object"){                 
            var  _email_ = CDA_amzn1_account[cad]['email'];
            if(_dataCDA[_email_]){
                //_dataCDA[_email_]['intervalTime']=v;
                //_Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
            }
        }
       
        Upd_CDA_amzn1_account_file();
    }     

}




setTokenActive(cad,v){
    var _th = this;
    CDA_amzn1_account[cad]['isValidToken']=v;
    var _dataCDA = _Notifications.getdataCDA();
    if(typeof _dataCDA === "object"){                 
        var  _email_ = CDA_amzn1_account[cad]['email'];
        if(_dataCDA[_email_]){
            _dataCDA[_email_]['isValidToken']=v;
            //_Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
        }else{
            
        }
    }
    Upd_CDA_amzn1_account_file();       
}


/***************************************************************
  * *************************************************************
  * ************************************************************
  * ***********************************************************
  * ***********************************************************
  * ***********************************************************
  * ********************************************************** *




get_amzn1_account(cda) {
    return CDA_amzn1_account[cda];
}

get_amzn1_account_List() {
    return Object.keys(CDA_amzn1_account);
}




getIntervalTime(cad){       
    return 0 //CDA_operation[cad]?CDA_operation[cad]['intervalTime']:null;       
}


getIsValidToken(cad){
    return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['isValidToken']:false;
}



/***************************************************************
  * *************************************************************
  * ************************************************************
  * ***********************************************************
  * ***********************************************************
  * ***********************************************************
  * ********************************************************** *
 
 
 get_Lock_token(cad){
    return CDA_amzn1_account[cad] && CDA_amzn1_account[cad]['isTokenLock'];    
 }


 set_Lock_token(cad,v){
    var _th = this; 
    if(CDA_amzn1_account[cad]){
        CDA_amzn1_account[cad]['isTokenLock'] = v;
        Upd_CDA_amzn1_account_file();        
        //_th.setTokenActive(cad,!v);   
    }    
    return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['isTokenLock']:false;         
 }








/***************************************************************
  * *************************************************************
  * ************************************************************
  * ***********************************************************
  * ***********************************************************
  * ***********************************************************
  * ********************************************************** *
 
 
 get_excepcion_Request(cad){
    return cdaExceptionRoller[cad];        
 }


 set_excepcion_Request(cad,v){
    //if(_alternative_email[cad]){ } 
    cdaExceptionRoller[cad]=v;
   
    return cdaExceptionRoller[cad];        
 }




 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *
     
     
     get_IsActive_(cad){
        var isSA = false;
        var _isActive_ = CDA_amzn1_account[cad] && CDA_amzn1_account[cad]['isActive'];
        if(_isActive_ && _isActive_['active'] && _isActive_['expire'] > (new Date()).getTime()){isSA = true;}        
        return isSA;
     }





    setIsActive(cad,newObj){
        CDA_amzn1_account[cad]=newObj;
        Upd_CDA_amzn1_account_file();
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]:{};            
    }
     


   
 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *
     



     getCDA_Filters(cad){
        return CDA_filters_account?CDA_filters_account[cad]:{};
     }


    getFilters(cad){
        var _th = this; 
        var _serviceAreasID = _th.get_service_Areas_IDS(cad);
        if(!CDA_filters_account[cad]){
            CDA_filters_account[cad] = {};
        }
        _serviceAreasID.map(sa=>{
            if(sa && !CDA_filters_account[cad][sa]){
                CDA_filters_account[cad][sa] = {};
                CDA_filters_account[cad][sa]['minimunPay']=36;
                CDA_filters_account[cad][sa]['active']=true;
                _Cnst._fs$$_.writeFileSync(CDA_filters_account_Path, JSON.stringify(CDA_filters_account));
            }
        })
        return CDA_filters_account[cad]?CDA_filters_account[cad]:{};               
    }


    setFilters(cad,sa,newFilter){        
        CDA_filters_account[cad][sa]=newFilter;
        _Cnst._fs$$_.writeFileSync(CDA_filters_account_Path, JSON.stringify(CDA_filters_account));        
        return CDA_filters_account[cad]?CDA_filters_account[cad]:{};               
    }
     




   
 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *
     

     getIsGrabbing(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['grabbing']:false;                
    }


    

    setIsGrabbing(cad,v){
        var _th = this; 
        if(CDA_amzn1_account[cad]){    
            CDA_amzn1_account[cad]['grabbing']=v;
            var _dataCDA = _Notifications.getdataCDA();
            if(typeof _dataCDA === "object"){                
                var  _email_ = CDA_amzn1_account[cad]['email'];
                if(_dataCDA[_email_]){
                    //_dataCDA[_email_]['grabbing']=v;
                    //_Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
                }
            }
            Upd_CDA_amzn1_account_file();  
            //_th.refreshInterval(cad,_th.usersGetTimer(cad));     
        }
    }


    getIsTesting(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['testing']:false;                
    }


    setIsTesting(cad,v){
        var _th = this; 
        if(CDA_amzn1_account[cad]){    
            CDA_amzn1_account[cad]['testing']=v;
            var _dataCDA = _Notifications.getdataCDA();
            if(typeof _dataCDA === "object"){                
                var  _email_ = CDA_amzn1_account[cad]['email'];
                if(_dataCDA[_email_]){
                   // _dataCDA[_email_]['testing']=v;
                   // _Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
                }
            }
            Upd_CDA_amzn1_account_file();  
            //_th.refreshInterval(cad,_th.usersGetTimer(cad));     
        }
    }



    
 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** 
   


    getIsRunning(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['running']:false;
    }


    setIsRunning(cad,v){
        var _th = this; 
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad]['running']=v;
            var _dataCDA = _Notifications.getdataCDA();
            if(typeof _dataCDA === "object"){                 
                var  _email_ = CDA_amzn1_account[cad]['email'];
                if(_dataCDA[_email_]){
                    _dataCDA[_email_]['running']=v;
                    //_Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
                }
            }
            Upd_CDA_amzn1_account_file(); 
            //_th.refreshInterval(cad,_th.usersGetTimer(cad)); 
            var _isValidToken_ = CDA_amzn1_account[cad]['isValidToken'];
            if(!_isValidToken_){
                _th.validateToken(cad);
            }            
        }     
    }

 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *

     getFireBaseToken(cad){        
        return CDA_amzn1_account?CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['frBsToken']:false:false;
    }


    setfireBaseToken(cad,v){
        if(CDA_amzn1_account[cad]){            
            if(!CDA_amzn1_account[cad]['frBsToken']){
                CDA_amzn1_account[cad]['frBsToken']=v;
            }
            //CDA_amzn1_account[cad]['frBsToken'][v]=1;
            Upd_CDA_amzn1_account_file();
        }      
    }
       
    
 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *
    
    getRegionId(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['region']:null;
     
    }

    setRegionId(cad,v){
        CDA_amzn1_account[cad]['region']=v;
        Upd_CDA_amzn1_account_file();       
    }

 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * **********************************************************
      * ********************************************************** *

     get_service_Areas(cad) {
        var regionId = CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['region']:null;
        if(regionId){
            var rg = _Util.Hrmdb.findOne('Regions',regionId);           
            if(rg && rg.serviceAreas){
                return rg.serviceAreas;
            }else{
                _th.getRegionbyCda(cad);
                return {};
            } 
        }else{
            return {};
        }
     }

  

   

     get_service_Areas_IDS(cad){
        var regionId =CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['region']:null;
        if(regionId){
            var rg = _Util.Hrmdb.findOne('Regions',regionId);
            if(rg && rg.serviceAreas){
                return Object.keys(rg.serviceAreas);
            }else{
                _th.getRegionbyCda(cad);
                return [];
            }
        }else{
            return [];
        }        
     }




    setServiceAreaIds(cad,v){
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad]['serviceAreaIds']=v;
            Upd_CDA_amzn1_account_file();    
        }   
    }
    



 /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *

     getIsInProxy(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['isInProxy']:false;           
    }

    setIsInProxy(cad,v){
        var _th = this;   
        if(CDA_amzn1_account[cad]){    
            CDA_amzn1_account[cad]['isInProxy']=v;  
            var _dataCDA = _Notifications.getdataCDA();      
            if(typeof _dataCDA === "object"){                
                var  _email_ = CDA_amzn1_account[cad]['email'];
                if(_dataCDA[_email_]){
                    //_dataCDA[_email_]['isInProxy']=v;
                    //_Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
                }                
            }        
            Upd_CDA_amzn1_account_file();       
        }
    }

/***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *

     getliteMode(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['liteMode']:false;          
    }

   

    
    
    setliteMode(cad,v){
        var _th = this;       
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad]['liteMode']=v;  
            var _dataCDA = _Notifications.getdataCDA();      
            
            CDA_amzn1_account[cad]['liteModeTime']=(new Date()).getTime();
            Upd_CDA_amzn1_account_file();       
        }
    }



    /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *


     gethyperMode(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['hyperMode']:false;           
    }





    setHyperMode(cad,v){
        var _th = this;       
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad]['hyperMode']=v;     
            var _dataCDA = _Notifications.getdataCDA(); 
            if(typeof _dataCDA === "object"){                
                var  _email_ = CDA_amzn1_account[cad]['email'];
                if(_dataCDA[_email_]){
                    _dataCDA[_email_]['hyperMode']=v;
                    //_Notifications.updFireBaseDocument(cad,_dataCDA[_email_]);
                }
            }       
            if(v){
                //_th.refreshInterval(cad,_th.usersGetHyperTimer(cad));
            }else{
               // _th.refreshInterval(cad,_th.usersGetTimer(cad));
            }
            Upd_CDA_amzn1_account_file(); 
        }              
    }




    /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * **
      * ******************************************************** *



     getLastSchueduleUpdate(cad){
        return CDA_amzn1_account[cad]?CDA_amzn1_account[cad]['lastSchueduleUpdate']:0;           
    }




    setLastSchueduleUpdate(cad,v){
        var _th = this;       
        if(CDA_amzn1_account[cad]){
            CDA_amzn1_account[cad]['lastSchueduleUpdate']=v;
            Upd_CDA_amzn1_account_file(); 
        }              
    }




    /***************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ********************************************************** *












function Upd_requestData2LogPath_file() {
    _Cnst._exec$$_('ls', function(fferr, istdout, istderr){	
        _Cnst._fs$$_.writeFileSync(requestData2LogPath,JSON.stringify(requestData2Log)); 
    })
    return true;
}


    
function parseTime(h,m) {
    h = h-4<0?24+(h-4):h-4; 
    return `${h>12?`${h-12}`:`${h}`}:${m>9?`${m}`:`0${m}`}${h>11?`PM`:`AM`}`;   
  }
 



  
function resetIndexPs() {
    _Cnst._exec$$_('ls', function(fferr, istdout, istderr){	
        _Util.Hrmdb.calcIndexes('Blocks');
        _Util.Hrmdb.calcIndexes('Logs');
    }) 
    return true;
}




  var hrs2Add = 0;


  const monthsList_Short =[``,`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];
  
  function date2pretyfy(dt) {  
    var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();
    date.setHours(date.getHours()+hrs2Add);
    return `${monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  
  function time2pretyfy(dt) {
     var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();
     date.setHours(date.getHours()+hrs2Add);
     var MM = date.getMinutes();
     return `${date.getHours()}:${MM>9?MM:`0${MM}`}`;
  }
  
  

    /**************************************************************
      * *************************************************************
      * ************************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************
      * ***********************************************************/ 














































































/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/

/*
import {  
  getFilters, 
  isValidToken,
  _getUserLiteMode, 
  _getUserHyperMode,
  _getIsRunning, 
  _getGrabbing,
  _getIsTesting,
  _getTokenLock,
  _getCdaExcepcionRequest

} from './Connector';
*/

/****************************************************************************************************************************************************************************************
 * *************************************************************************************************************************************************************************************
 * **********                ********             *********    *************************                        *************************************************************************
 * **********    ********    ********    ******   *********    *************************                        *************************************************************************
 * **********    ********    ********    ******   *********    *************************                        *************************************************************************
 * **********    ********************    ******   *********    *************************          CDAS          **************************************************************************
 * **********    ****       *********    ***      *********    *************************                        **************************************************************************
 * **********    ******     *********    ****      ********    *************************                        **************************************************************************
 * **********               *********               *******            *****************                        **************************************************************************
 * **********************************************     **************************************************************************************************************************************
* ********************************************************************************************************************************************************************************************/







const Cdas = new graphql.GraphQLObjectType({
  name: 'Cdas',
  description: 'A Cdas',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The CdaID',
      resolve: (obj) => obj.id
    },    
    email: {type: graphql.GraphQLString, description: ''},
    phoneNumber: {type: graphql.GraphQLString, description: ''},   
    isAdmin:{type: graphql.GraphQLBoolean, description: ''},       
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime was last updated'},    
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});






const QueryFields = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdCda = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdCda',
  description: 'Args to Find by Id a  Cda',
  fields: () => makeRequired(QueryFields, ['id'])
});

const FindCda = new graphql.GraphQLInputObjectType({
  name: 'FindCda',
  description: 'Args to Find Cdas',
  fields: () => makeRequired(QueryFields, ['limit','page','sortBy'])
});

const CdaQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'CdaQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields, ['limit','page','sortBy'])
});  











const IsUserActive = new graphql.GraphQLObjectType({
  name: 'IsUserActive',
  description: 'IsUserActive',
  fields: () => ({    
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The CdaID',
      resolve: (obj) => obj.id
    },
    email: {type: graphql.GraphQLString, description: ''},
    expire: {type: graphql.GraphQLFloat, description: ''},
    active: {type: graphql.GraphQLBoolean, description: ''},    
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});






/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/*********************************************   ACTIVE      ***********************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/






const inputFieldsFilters = {
  ServiceAreas: {type: graphql.GraphQLString, description: ''},
  minimunPay: {type: graphql.GraphQLFloat, description: ''},
  active: {type: graphql.GraphQLBoolean, description: ''},
  email: {type: graphql.GraphQLString, description: ''},
  expire: {type: graphql.GraphQLFloat, description: ''},
  running: {type: graphql.GraphQLBoolean, description: ''},
  hyperMode:{type: graphql.GraphQLBoolean, description: ''},
};





const UpdateGrabber = new graphql.GraphQLInputObjectType({
  name: 'UpdateGrabber',
  description: 'UpdateGrabber',
  fields: () => makeRequired(inputFieldsFilters, ['active'])
});


const UpdateIsActive = new graphql.GraphQLInputObjectType({
  name: 'UpdateIsActive',
  description: 'UpdateIsActive',
  fields: () => makeRequired(inputFieldsFilters, ['active','email'])
});







/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************/







const FindSchedule = new graphql.GraphQLInputObjectType({
  name: 'FindSchedule',
  description: 'FindSchedule',
  fields: () => makeRequired(inputFieldsFilters, ['email'])
});



const DepositList = new graphql.GraphQLObjectType({
  name: 'DepositList',
  description: 'DepositList',
  fields: () => ({
    id: {type: graphql.GraphQLID, description: ''},
    amount: {type: graphql.GraphQLFloat, description: ''},    
    date: {type: graphql.GraphQLFloat, description: ''}, 
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});


const EarningsList = new graphql.GraphQLObjectType({
  name: 'EarningsList',
  description: 'EarningsList',
  fields: () => ({
    id: {type: graphql.GraphQLID, description: ''},
    amount: {type: graphql.GraphQLFloat, description: ''},
    tip: {type: graphql.GraphQLFloat, description: ''},
    hrs: {type: graphql.GraphQLFloat, description: ''},
    date: {type: graphql.GraphQLFloat, description: ''}, 
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});



const ScheduleList = new graphql.GraphQLObjectType({
  name: 'ScheduleList',
  description: 'ScheduleList',
  fields: () => ({
    id: {type: graphql.GraphQLID, description: ''},
    pay: {type: graphql.GraphQLFloat, description: ''},
    hrs: {type: graphql.GraphQLFloat, description: ''},
    startTime: {type: graphql.GraphQLFloat, description: ''},
    location: {type: graphql.GraphQLString, description: ''}, 
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});



















/*
export const Filters = new GraphQLObjectType({
  name: 'Filters',
  description: 'Filters',
  fields: () => ({    
    ServiceAreas: {type: GraphQLString, description: ''},
    minimunPay: {type: GraphQLFloat, description: ''},
    active: {type: GraphQLBoolean, description: ''},  
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});



export const UpdateFilters = new GraphQLInputObjectType({
  name: 'UpdateFilters',
  description: 'UpdateFilters',
  fields: () => makeRequired(inputFieldsFilters, ['minimunPay','active','ServiceAreas'])
});





export const ServiceAreas = new GraphQLObjectType({
  name: 'ServiceAreas',
  description: 'ServiceAreas',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The CdaID',
      resolve: (obj) => obj.id
    },
		name: {type: GraphQLString, description: 'The datetime was last updated'},    	  
    q:{type: CdaQuerySquemaFields, description: ''},
  })
});



*/





/*  


    filters:{type: new GraphQLList(Filters), description: '',
    resolve: (obj) => getFilters(obj.id)},
    isValidToken:{type: GraphQLBoolean, description: '',
    resolve: (obj) => isValidToken(obj.id)},
    active:{type: GraphQLBoolean, description: '' ,
    resolve: (obj) => _getIsRunning(obj.id)}, 
    liteMode:{type: GraphQLBoolean, description: '' ,
    resolve: (obj) => _getUserLiteMode(obj.id)},    
    hyperMode:{type: GraphQLBoolean, description: '' ,
    resolve: (obj) => _getUserHyperMode(obj.id)},    
    grabbing:{type: GraphQLBoolean, description: '',
    resolve: (obj) => _getGrabbing(obj.id)},   



*/

const Collection = 'Cda';
const grabber = new Params();






const getCdasbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = JSON.parse(dd); 
        if(mr.id === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA"){
            mr.isAdmin= true;
        }
        return mr;         
    }
   return {};
};



const getCdas = (q) => {    
    var h = [];
    var tl = Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = tl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        h = Hrmdb.findAll(Collection);
    }else{
        h.push(tl); 
    }
    return h;
};





const _updateActive= (q) => {
    grabber.setIsRunning(q.user,q.active);    
    return q.active;
};


const _getUserActivebyID = (k) => {
    var h = null;
    var tl = grabber.getIsActive(k);        
    if(tl['isActive']){
        const dd = JSON.stringify(tl['isActive']);
        var h1 = JSON.parse(dd);
        h1['email']=tl.email;
        h=h1;
    }
    return h;          
};  
   


const _updateUserActive= (q) => {     
    var usqtl = Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        var userId = null;
        var EmailId = Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
        var tl = grabber.getIsActive(userId);       
        if(tl){
            tl['active'] = q.active;
            grabber.updateFb(userId,{isActive:q.active});
            if(q.expire){
                tl['expire'] = q.expire;
            }
            grabber.Upd_CDA_amzn1_account(userId,'isActive',tl);
        }
        return true;
    }else{
        return false;
    }
};








const _getUserActive = (k) => {       
    var h =[];
    var usqtl = Hrmdb.findOne(`Cda`,k);    
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(k === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){  
        Hrmdb.findAll(`Cda`).map(tl2=>{
            var tl = grabber.getIsActive(tl2.id);
            if(tl){
                const dd = JSON.stringify(tl);
                var h1 = JSON.parse(dd);
                h1['email']=tl2.email;
                h1['id']=tl2.id;
                h.push(h1);
            }
        });    
    }   
    return h;
};



const _getSchedule = async(q) => { 
    var h =[];
    var usqtl = Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    var userId = null;
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){        
        var EmailId = Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
    }   
    if(userId){
        /*
        if(!grabber.getLastSchueduleUpdate(userId) || (new Date()).getTime()-grabber.getLastSchueduleUpdate(userId)>_dayTimeMiliseconds){
            grabber.GetSchedule(userId);
        }
        */
        var _day = Math.floor(((new Date()).getTime()-14400000)/86400000);
        var tlt = Hrmdb.FindIndexesByOperator('ScheduledAssignments','user',userId,'day',_day,'gte');
        Object.keys(tlt).map(lgtr=>{
            var _lg = Hrmdb.findOne(`ScheduledAssignments`,lgtr);
            _lg && h.push(_lg);
        });
    }
    return h;
};


const  _getServiceEarnings = async(q) => { 
    var h =[];
    var usqtl = Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    var userId = null;
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){        
        var EmailId = Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
    }else{
        userId = q.user;
    }    
    if(userId){
        /*
        if(!grabber.getLastEarningsUpdate(userId) || (new Date()).getTime()-grabber.getLastEarningsUpdate(userId)>_dayTimeMiliseconds){
            grabber.GetEarnings(userId);
        }
        */
        var tlt = Hrmdb.FindIndexes(`ServiceEarnings`,'user',userId);
        tlt && Object.keys(tlt).map(lgtr=>{
            var _lg = Hrmdb.findOne(`ServiceEarnings`,lgtr);
            _lg && h.push(_lg);
        });
    }
    return h;
};


const  _getDepositedEarnings = async(q) => { 
    var h =[];
    var usqtl = Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    var userId = null;
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){        
        var EmailId = Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
    }   
    if(userId){
        /*
        if(!grabber.getLastEarningsUpdate(userId) || (new Date()).getTime()-grabber.getLastEarningsUpdate(userId)>_dayTimeMiliseconds){
            grabber.GetEarnings(userId);
        }
        */
        var tlt = Hrmdb.FindIndexes(`DepositedEarnings`,'user',userId);
        tlt && Object.keys(tlt).map(lgtr=>{
            var _lg = Hrmdb.findOne(`DepositedEarnings`,lgtr);
            _lg && h.push(_lg);
        });
    }
    return h;
};


const _ReseatingServer = (q) => {    
    if(q === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA"){ 
        grabber.resetTokenStore();
        return true;
    }
    return false;
};






















/*







export const isValidToken = (id) => { 
    return grabber.getIsValidToken(id);
}



export const _getIsTesting = (id) => {    
    var h = false;
    var tl = _Util.Hrmdb.findOne(`Cda`,id);
    var isAdmin = tl['isAdmin'];
    if(id === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        h = grabber.getIsTesting(id);
    }
    return h;
}





export const _updateIsTesting = (q) => {    
    var h = false;
    var tl = _Util.Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = tl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        grabber.setIsTesting(q.user,q.active);
        h = q.active;
    }
    return h;
}



export const get_service_Areas = (k,q) => {   
    var seA = grabber.get_service_Areas(k);
    var h = [];
    Object.keys(seA).map(f=>{
        h.push(seA[f]);
    })   
    return h;
}


export const getCdabyEmail = (q,k) => {    
    return _Util.Hrmdb.findAll(Collection).filter((c)=>{return s.profile.email===k});
}




export const _getCdaExcepcionRequest = (id) => {
    return grabber.get_excepcion_Request(id);
}


export const _setCdaExcepcionRequest = (q) => {
    grabber.set_excepcion_Request(q.user,q.active);    
    return grabber.get_excepcion_Request(q.user);
}




export const _getTokenLock = (email) => {
    var userId = null;
    var EmailId = _Util.Hrmdb.FindIndexes(`Cda`,'email',email);
    Object.keys(EmailId?EmailId:{}).map(t=>userId=t);  
    return userId && grabber.get_Lock_token(userId);
}


export const _setTokenLock2 = (q) => {
    grabber.set_Lock_token(q.user,q.active);    
    return grabber.get_Lock_token(q.user);
}


export const _setTokenLock= (q) => {    
     
    var usqtl = _Util.Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        var userId = null;
        var EmailId = _Util.Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);        
        userId && grabber.set_Lock_token(userId,q.active);                   
        return q.active;
    }else{
        return false;
    }
}





export const resetNode = (q) => {    
    var tl = _Util.Hrmdb.findOne(`Cda`,q.user);
    //var isAdmin = tl['isAdmin'];
    if(tl.id){
       grabber.resetProxy();
        return true;
    }else{
        return false
    }    
}



export const _getSquedule2 = async(q) => { 
    var h =[];
    var usqtl = _Util.Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        var userId = null;
        var EmailId = _Util.Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
        h = await grabber.GetSquedule(userId);
    }
    return h;
}


export const  _getEarnings2 = async(q) => { 
    var h =[];
    var usqtl = _Util.Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        var userId = null;
        var EmailId = _Util.Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
        h = await grabber.GetEarnings(userId);
    }
    return h;
}




export const _updateGrabb2= (q) => {
    var tl = _Util.Hrmdb.findOne(`Cda`,q.user);    
    if(tl  && tl['isActive'] && tl['isActive']['active']){              
        tl['grabbing'] = q.active;
        _Util.Hrmdb.update(`Cda`,tl,q.user);
    }
    return q.active;
}



export const _updateActive22= (q) => {
    var tl = _Util.Hrmdb.findOne(`Cda`,q.user);    
    if(tl  && tl['isActive'] && tl['isActive']['active']){              
        tl['running'] = q.active;
        _Util.Hrmdb.update(`Cda`,tl,q.user);
    }
    tl['running']?grabber.refreshInterval(q.user,800):grabber.refreshInterval(q.user,60000*30);
    return q.active;
}




export const _getGrabbing= (q) => {
    return grabber.getIsGrabbing(q);
}


export const _getIsRunning= (q) => {
    return grabber.getIsRunning(q);
}


export const _getUserLiteMode = (k) => {
    //return grabber.getliteMode(k);
    return false;
}


export const _getUserHyperMode = (k) => {
    return grabber.gethyperMode(k);
}

export const _validateToken = (k) => {
    grabber.validateToken(k);
    return true;
}




export const _updateGrabb= (q) => {
    grabber.setIsGrabbing(q.user,q.active);    
    return q.active;
}



export const _updateLiteMode= (q) => {
    grabber.setliteMode(q.user,q.active);   
    return q.active;
}


export const _updateHyperMode= (q) => {
    var usqtl = _Util.Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        var userId = null;
        var EmailId = _Util.Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
        grabber.setHyperMode(userId,q.active); 
        return q.active;
    }
}


export const _updateHyperModebyID= (q) => {
    grabber.setHyperMode(q.user,q.active); 
    return q.active;   
}


export const _updateRunningByUserMode= (q) => {
    var usqtl = _Util.Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = usqtl && usqtl['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){ 
        var userId = null;
        var EmailId = _Util.Hrmdb.FindIndexes(`Cda`,'email',q.email);
        Object.keys(EmailId?EmailId:{}).map(t=>userId=t);
        grabber.setIsRunning(userId,q.active); 
        return q.active;
    }
}




export const getFilters = (k) => {       
    var h =[];    
    var tl = grabber.getIsActive(k);
    if(tl && tl['isActive'] && tl['isActive']['active']){        
        var _filters =  grabber.getFilters(k);           
        Object.keys(_filters).map(f=>{
            var h1 = _filters[f];
            h1['ServiceAreas'] = f;
            h.push(h1);
        })
    }
    return h;
}

export const updFilters = (k) => {
    const {
        user, 
        ServiceAreas,
        minimunPay,
        active
    } = k;
    var newFilter = {minimunPay: minimunPay, active: active};
    var tl = grabber.getIsActive(user);
    if(tl && tl['isActive'] && tl['isActive']['active']){  
        grabber.setFilters(user,ServiceAreas,newFilter);      
        //tl['filters'][ServiceAreas] = newFilter;
        //_Util.Hrmdb.update(`Cda`,tl,user);
    }
    return tl;
}













*/

var cda = {
  getCdasbyId: {
    type: Cdas,
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindbyIdCda)}
    },
    async resolve (source, {cda}, {authToken}) {
      if(authToken && authToken.user){
        const {id, ...query} = cda;
        query.user = authToken.user;
        const _cda = await getCdasbyId(authToken.user);      
        if (_cda.errors) {
          console.log({_error: 'Cda not find'});
        }
        return _cda;
      }
      else{
        console.log({_error: 'authToken on Cda not find'});
      }     
    }
  },  
  getCdasAll: {
    type: new graphql.GraphQLList(Cdas),
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindCda)}
    },
    async resolve(source, {cda}, {authToken}) {
      if(authToken && authToken.user){
        const {...query} = cda;
        query.user = authToken.user;
        const _cda = await getCdas(query);      
        if (_cda.errors) {
          console.log({_error: 'Could not find any video'});
        }      
        return _cda;
      }
      else{
        console.log({_error: 'Could not find'});
      }
    }
  },
  getUsersActive: {
    type: new graphql.GraphQLList(IsUserActive),
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindCda)}
    },
    async resolve(source, {cda}, {authToken}) {
      if(authToken && authToken.user){
        const _cda = await _getUserActive(authToken.user);      
        if (_cda.errors) {
          console.log({_error: 'Could not find'});
        }      
        return _cda;
      }
      else{
        console.log({_error: 'auth Token failed'});
      }  
    }
  },
  getUserActive: {
    type: IsUserActive,
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindCda)}
    },
    async resolve(source, {cda}, {authToken}) {
      if(authToken && authToken.user){
        const _cda = await _getUserActivebyID(authToken.user);
        if (_cda.errors) {
          console.log({_error: 'Could not find'});
        }      
        return _cda;
      }
      else{
        console.log({_error: 'auth Token failed'});
      }  
    }
  },   
  scheduleList: {
    type: new graphql.GraphQLList(ScheduleList),
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindSchedule)}
    },
    async resolve(source, {cda}, {authToken}) {  
      if(authToken && authToken.user){          
        const {...query} = cda;    
        query.user = authToken.user;      
        const _cda = await _getSchedule(query);
        if (_cda.errors) {
          console.log({_error: 'Could not find'});
        }      
        return _cda;
      }  
      else{
        return [];
      }
    }
  },
  depositList: {
    type: new graphql.GraphQLList(DepositList),
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindSchedule)}
    },
    async resolve(source, {cda}, {authToken}) {  
      if(authToken && authToken.user){          
        const {...query} = cda;    
        query.user = authToken.user;      
        const _cda = await _getDepositedEarnings(query);
        if (_cda.errors) {
          console.log({_error: 'Could not find'});
        }      
        return _cda;
      }  
      else{
        return [];
      }
    }
  },
  earningsList: {
    type: new graphql.GraphQLList(EarningsList),
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindSchedule)}
    },
    async resolve(source, {cda}, {authToken}) {  
      if(authToken && authToken.user){          
        const {...query} = cda;    
        query.user = authToken.user;      
        const _cda = await _getServiceEarnings(query);
        if (_cda.errors) {
          console.log({_error: 'Could not find'});
        }      
        return _cda;
      }  
      else{
        return [];
      }
    }
  },
  resetServer: {
    type: graphql.GraphQLBoolean,
    args: {
      cda: {type: new graphql.GraphQLNonNull(FindCda)}
    },
    async resolve(source, {cda}, {authToken}) {
      if(authToken && authToken.user){
        const _cda = await _ReseatingServer(authToken.user);
        if (_cda.errors) {
          console.log({_error: 'Could not find'});
        }      
        return _cda;
      }
      else{
        console.log({_error: 'auth Token failed'});
      }  
    }
  }, 
};

const Collection$1 = 'Blocks';
const grabber$1 = new Params();


const getBlocksbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$1,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = JSON.parse(dd); 
        return mr;         
    }
   return {};
};



const getUserbyBlock = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$1,k);    
    if(fbI){
        return fbI.user && grabber$1.get_amzn1_account(fbI.user)?grabber$1.get_amzn1_account(fbI.user)['email']:null;                 
    }
   return null;
};


const getBlocks = (q) => {
    var h = [];       
    const {sortBy,limit,page} = q;
    var orderBy = sortBy  || 'date.desc';
    var sort  = orderBy.split('.')[0];
    var order  = orderBy.split('.')[1] || 'desc';    
    var admin = Hrmdb.findOne(`Cda`,q.user);
    var isAdmin = admin['isAdmin'];
    if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || isAdmin){    
        var _day = Math.floor(((new Date()).getTime()-14400000)/86400000);
        var tlt = Hrmdb.FindIndexesByOperator(Collection$1,'day',_day,'gte');
        Object.keys(tlt).map(lgtr=>{
            var _lg = Hrmdb.findOne(Collection$1,lgtr);
            _lg && h.push(_lg);
        });              
    }else{
        var _day = Math.floor(((new Date()).getTime()-14400000)/86400000);
        var tlt = Hrmdb.FindIndexesByOperator(Collection$1,'user',q.user,'day',_day,'gte');
        Object.keys(tlt).map(lgtr=>{
            var _lg = Hrmdb.findOne(Collection$1,lgtr);
            _lg && h.push(_lg);
        });
    }
    return h;
};

/****************************************************************************************************************************************************************************************
 * *************************************************************************************************************************************************************************************
 * **********                ********             *********    *************************                        *************************************************************************
 * **********    ********    ********    ******   *********    *************************                        *************************************************************************
 * **********    ********    ********    ******   *********    *************************                        *************************************************************************
 * **********    ********************    ******   *********    *************************          BLOCKS        **************************************************************************
 * **********    ****       *********    ***      *********    *************************                        **************************************************************************
 * **********    ******     *********    ****      ********    *************************                        **************************************************************************
 * **********               *********               *******            *****************                        **************************************************************************
 * **********************************************     **************************************************************************************************************************************
* ********************************************************************************************************************************************************************************************/





const Blocks = new graphql.GraphQLObjectType({
  name: 'Blocks',
  description: 'A Blocks',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The BlockID',
      resolve: (obj) => obj.id
    },
    schedulingType: {type: graphql.GraphQLString, description: ''},
    serviceAreaId: {type: graphql.GraphQLString, description: ''},
    startTime:{type: graphql.GraphQLFloat, description: ''},
    endTime:{type: graphql.GraphQLFloat, description: ''},
    ignored:{type: graphql.GraphQLBoolean, description: ''},
    accepted:{type: graphql.GraphQLString, description: ''},
    priceAmount:{type: graphql.GraphQLFloat, description: ''},
    createdBy: {
      type: graphql.GraphQLString, description: '',
      resolve: (obj) => getUserbyBlock(obj.id)
    },     
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the video was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the video was last updated'},    
    q:{type: BlockQuerySquemaFields, description: ''},
  })
});



const inputFields = {
    id: {type: graphql.GraphQLID, description: 'Id'},
    tk: {type: graphql.GraphQLString, description: 'Token'},   
};


const AssingBlockInput = new graphql.GraphQLInputObjectType({
  name: 'AssingBlockInput',
  description: 'Block',
  fields: () => makeRequired(inputFields, ['id','tk'])
});


const QueryFields$1 = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdBlock = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdBlock',
  description: 'Args to Find by Id a  Block',
  fields: () => makeRequired(QueryFields$1, ['id'])
});

const FindBlock = new graphql.GraphQLInputObjectType({
  name: 'FindBlock',
  description: 'Args to Find Blocks',
  fields: () => makeRequired(QueryFields$1, ['limit','page','sortBy'])
});

const BlockQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'BlockQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$1, ['limit','page','sortBy'])
});

var block = {
  getBlocksbyId: {
    type: Blocks,
    args: {
      block: {type: new graphql.GraphQLNonNull(FindbyIdBlock)}
    },
    async resolve (source, {block}, {authToken}) {             
      if(authToken && authToken.user){ 
        const {id, ...query} = block;
        query.user = authToken.user;
        const _block = await getBlocksbyId(id);      
        if (_block.errors) {
          console.log({_error: 'Could not find any video'});
        }
        return _block;
      }
      else{
        console.log({_error: 'Could not find'});
      }     
    }
  },
  getBlocksAll: {
    type: new graphql.GraphQLList(Blocks),
    args: {
      block: {type: new graphql.GraphQLNonNull(FindBlock)}
    },
    async resolve(source, {block}, {authToken}) {
      if(authToken && authToken.user){ 
        const {...query} = block;
        query.user = authToken.user;        
        const _block = await getBlocks(query);      
        if (_block.errors) {
          console.log({_error: 'Could not find any video'});
        }      
        return _block;
      }
      else{
        console.log({_error: 'Could not find'});
      }
    }
  }
  
};

/****************************************************************************************************************************************************************************************
 * *************************************************************************************************************************************************************************************
 * **********                ********             *********    *************************                        *************************************************************************
 * **********    ********    ********    ******   *********    *************************                        *************************************************************************
 * **********    ********    ********    ******   *********    *************************                        *************************************************************************
 * **********    ********************    ******   *********    *************************          LOGS          **************************************************************************
 * **********    ****       *********    ***      *********    *************************                        **************************************************************************
 * **********    ******     *********    ****      ********    *************************                        **************************************************************************
 * **********               *********               *******            *****************                        **************************************************************************
 * **********************************************     **************************************************************************************************************************************
* ********************************************************************************************************************************************************************************************/



const Logs = new graphql.GraphQLObjectType({
  name: 'Logs',
  description: 'A Logs',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The LogID',
      resolve: (obj) => obj.id
    },
    status: {type: graphql.GraphQLFloat, description: ''},
    offerId: {type: graphql.GraphQLString, description: ''},
    msg: {type: graphql.GraphQLString, description: ''},
    data: {type: graphql.GraphQLString, description: ''},
    user: {type: graphql.GraphQLString, description: ''},
    requestby: {type: graphql.GraphQLString, description: ''},
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the video was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the video was last updated'},    
    q:{type: LogQuerySquemaFields, description: ''},
  })
});


const QueryFields$2 = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdLog = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdLog',
  description: 'Args to Find by Id a  Log',
  fields: () => makeRequired(QueryFields$2, ['id'])
});

const FindLog = new graphql.GraphQLInputObjectType({
  name: 'FindLog',
  description: 'Args to Find Logs',
  fields: () => makeRequired(QueryFields$2, ['limit','page','sortBy'])
});

const LogQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'LogQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$2, ['limit','page','sortBy'])
});

const Collection$2 = 'Logs';


const getLogsbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$2,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = JSON.parse(dd); 
        return mr;         
    }
   return {};
};



const getLogs = (q) => {
    var h = [];       
    const {sortBy,limit,page} = q;
    var orderBy = sortBy  || 'date.desc';
    var sort  = orderBy.split('.')[0];
    var order  = orderBy.split('.')[1] || 'desc'; 
    //var tlt = _Util.Hrmdb.findAll(Collection);
    var _user = Hrmdb.findOne(`Cda`,q.user);
    if(_user){
      if(q.user === "AEBMN5JGXGKHTDPSXDBSZDKWEAEA" || _user['isAdmin']){
        var _day = Math.floor(((new Date()).getTime()-14400000)/86400000);
        //var tlt = _Util.Hrmdb.FindIndexesByOperator(Collection,'user',q.user,'day',_day,'gte');
        var tlt = Hrmdb.FindIndexesByOperator(Collection$2,'day',_day,'gte');
        Object.keys(tlt).map(lgtr=>{
          var _lg = Hrmdb.findOne(Collection$2,lgtr);
          _lg && h.push(_lg);
        });
      }else{
        h = [];     
      } 
    }     
    return h; 
};

var log = {
  getLogsbyId: {
    type: Logs,
    args: {
      log: {type: new graphql.GraphQLNonNull(FindbyIdLog)}
    },
    async resolve (source, {log}, {authToken}) {            
      if(authToken && authToken.user){        
        const {id, ...query} = log;
        query.user = authToken.user;
        const _log = await getLogsbyId(id);      
        if (_log.errors) {
          console.log({_error: 'Could not find any video'});
        }
        return _log;
      }
      else{
        console.log({_error: 'Could not find'});
      }     
    }
  },
  getLogsAll: {
    type: new graphql.GraphQLList(Logs),
    args: {
      log: {type: new graphql.GraphQLNonNull(FindLog)}
    },
    async resolve(source, {log}, {authToken}) {
           
      if(authToken && authToken.user){
        const {...query} = log;
        query.user = authToken.user;
        const _log = await getLogs(query);      
        if (_log.errors) {
          console.log({_error: 'Could not find any video'});
        }      
        return _log;
      }
      else{
        console.log({_error: 'Could not find'});
      }
    }
  }
  
};

const Hrmdb$1 = new HrmDb();
const Collection$3 = 'User';
const CollectionRoles = 'ListRoles';

const updateUsers = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$3,k);
    if (fbI && fbI.id === k) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P(dd);
        const qArr = Object.keys(q);
        if (qArr.length>0) {
          qArr.map((flk) => {              
                kt[flk] = q[flk];
                ['Finansas','Daycare','Almacen'].map(tkind => {
                    if(flk===tkind && kt[flk]){                        
                        if(!kt[`roles`]){
                            kt[`roles`] = {};
                        }
                        if(!kt[`roles`][tkind]){
                            kt[`roles`][tkind] = {};
                        }
                        Hrmdb.findAll(CollectionRoles).map(rol=>{                            
                            if(rol.group === flk){
                                if(!kt[`roles`][tkind][rol.name]){
                                    kt[`roles`][tkind][rol.name] = true;
                                }
                            }                
                       });                
                    }else if(flk===tkind && !kt[flk]){
                        if(kt[`roles`][tkind]){
                          delete kt[`roles`][tkind];
                        }var hyt = {};
                        ['Finansas','Daycare','Almacen'].map(tk2ind => {
                            if(kt[`roles`][tk2ind]){
                                hyt[tk2ind]=kt[`roles`][tk2ind];
                            }
                        });
                        kt[`roles`]=hyt;                        
                    }
                });                       
            });
        }              
        var adIng = Hrmdb.update(Collection$3,kt,k);
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P(dd2);
        return CadIng;
    }
    else{
        return {};
    }
};
 


const removeUsers = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$3,k);    
    if (fbI && fbI.id === k) {
        var adIng =  Hrmdb.remove(Collection$3,k);
        var ctd = new Date();
        var ctT = ctd.getTime();
        return adIng;
    }else{
        return {};
    }
};

const getUsersbyId = (k) => {    
    
    var fbI = Hrmdb$1.findOne(Collection$3,k);
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P(dd);
        if(mr.roles){
            mr.roles =  Base64$1.encode(JSON.stringify(mr.roles));
        }     
        return mr;        
    }
   return {};
};



function getJson2P(p){
    return JSON.parse(p);
}




const getUsersBalancebyId = (k) => {
    var fbI = Hrmdb.findOne(Collection$3,k);
    if(fbI){
        if(fbI.balance){
            return fbI.balance; 
        }else{
            return {};    
        }    
    }
   return {};
};

const Users = new graphql.GraphQLObjectType({
  name: 'Users',
  description: 'A Users',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The UserID',
      resolve: (obj) => Base64$1.encode(obj.email)
    },

    firstName: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    lastName: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    email:{type: graphql.GraphQLString, description: ''}, 
    phone:{type: graphql.GraphQLString, description: ''},
    photoUrl:{type: graphql.GraphQLString, description: ''},    
    balance:{
      type: Balance, 
      description: '',
      resolve: (obj) => getUsersBalancebyId(obj.id)
    },
    createdAt: {type: graphql.GraphQLString, description: 'The datetime the video was created'},
    updatedAt: {type: graphql.GraphQLString, description: 'The datetime the video was last updated'},    
    q:{type: UserQuerySquemaFields, description: ''},
  })
});





const inputFields$1 = {    
    id: {type: graphql.GraphQLString, description: ''},
    name: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    email:{type: graphql.GraphQLString, description: ''}, 
    phone:{type: graphql.GraphQLString, description: ''},
};




const UpdateUser = new graphql.GraphQLInputObjectType({
  name: 'UpdateUser',
  description: 'Args to update a  User',
  fields: () => makeRequired(inputFields$1, ['id'])
});

const NewUser = new graphql.GraphQLInputObjectType({
  name: 'NewUser',
  description: 'Args to add a  User',
  fields: () => makeRequired(inputFields$1, ['name','email',`phone`])
});



const QueryFields$3 = {  
  id: {type: graphql.GraphQLID, description: 'The videoId'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdUser = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdUser',
  description: 'Args to Find by Id a  User',
  fields: () => makeRequired(QueryFields$3, ['id'])
});


const FindUser = new graphql.GraphQLInputObjectType({
  name: 'FindUser',
  description: 'Args to Find Users',
  fields: () => makeRequired(QueryFields$3, ['limit','page','sortBy'])
});

const UserQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'UserQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$3, ['limit','page','sortBy'])
});  








const Balance = new graphql.GraphQLObjectType({
  name: 'Balance',
  description: 'Balance',
  fields: () => ({    
    available: {type: graphql.GraphQLFloat, description: ''},
    pending: {type: graphql.GraphQLFloat, description: ''}, 
    q:{type: UserQuerySquemaFields, description: ''},
  })
});


const inputFieldsBalance = {
  available: {type: graphql.GraphQLFloat, description: ''},
  pending: {type: graphql.GraphQLFloat, description: ''}, 
};



const UpdateBalance = new graphql.GraphQLInputObjectType({
  name: 'UpdateBalance',
  description: 'UpdateBalance',
  fields: () => makeRequired(inputFieldsBalance, ['available','pending'])
});

var user = {
  getUsersbyId: {
    type: Users,
    args: {
      user: {type: new graphql.GraphQLNonNull(FindbyIdUser)}
    },
    async resolve (source, {user}, {authToken}) {
      if(authToken.user){             
        const usr = await getUsersbyId(authToken.user);      
        if (usr.errors) {
          console.log({_error: 'Could not find any user'});
        }
        return usr; 
      }else{
        console.log({_error: 'Could not find any user'});
      }
          
    }
  }
};

const rootFields = Object.assign(cda,block,log,user);

var query = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});

var user$1 = {  
  updateUser: {
    type: Users,
    args: {
      user: {type: new graphql.GraphQLNonNull(UpdateUser)}
    },
    async resolve(source, {user}, {authToken}) {      
      if(authToken.user){
        user.updatedAt = new Date();
        const { ...updates} = user;
        const updUser = await updateUsers(authToken.user, updates);
        if (updUser.errors) {
          console.log({_error: 'Could not update video'});
        }  
        return updUser;
      }else{
        console.log({_error: 'Could not update'});
      }
    }
  },
  removeUser: {
    type: graphql.GraphQLBoolean,
    args: {
      user: {type: new graphql.GraphQLNonNull(UpdateUser)}
    },
    async resolve(source, {user}, {authToken}) {     
      if(authToken.user){
        const rmUser = await removeUsers(authToken.user);
        if (rmUser.errors) {
          console.log({_error: 'Could not remove'});
        }  
        return rmUser;
      }else{
        return false;
      }      
    }
  },
};

var cda$1 = {  
  updateActive: {
    type: graphql.GraphQLBoolean,
    args: {
      flt: {type: new graphql.GraphQLNonNull(UpdateGrabber)}
    },
    async resolve(source, {flt}, {authToken}) {
      if(authToken && authToken.user){ 
        flt.user = authToken.user;           
        const newF= await _updateActive(flt);         
        return newF;
      }else{
        return false;
      }
    }
  },
  updateIsActive: {
    type: graphql.GraphQLBoolean,
    args: {
      flt: {type: new graphql.GraphQLNonNull(UpdateIsActive)}
    },
    async resolve(source, {flt}, {authToken}) {
      if(authToken && authToken.user){ 
        flt.user = authToken.user;           
        const newF= await _updateUserActive(flt);
        return newF;
      }else{
        return false;
      }
    }
  }
};

const rootFields$1 = Object.assign(cda$1,user$1);

var mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields$1
});

var Schema = new graphql.GraphQLSchema({query, mutation});

const grabber$2 = new Params();


var httpGraphQLHandler = async (req, res) => {  
  const {q,k} =  req.body;  
  const fp = req.headers.authorization.split(`:`)[1];
  const authToken = decryptToken(req.headers.authorization.split(`:`)[0] ,true,fp) || {}; 
  const fb_tk = req.headers['x-fb-tk']?req.headers['x-fb-tk']:false;
  
  if (fb_tk && fb_tk!=="null" && authToken && authToken.user){    
    if(grabber$2.getFbToken(authToken.user)!==fb_tk){
      grabber$2.Upd_CDA_amzn1_account(authToken.user, 'frBsToken',fb_tk);
      grabber$2.updateFb(authToken.user,{'frBsToken':fb_tk});
    }
    
  }

  var bytes = null;
  var basD = null;
  var NewBody =null;
  var rslt = '';
  if(fp){
    var kpass = CryptoJS.AES.decrypt(Base64$1.decode(k), fp).toString(CryptoJS.enc.Utf8);
    bytes = CryptoJS.AES.decrypt(Base64$1.decode(q), kpass);
    basD = bytes.toString(CryptoJS.enc.Utf8);    
  }
  if(basD && isJson$2(basD)){
    NewBody = JSON.parse(basD);
    const {query, variables, ...newContext} = NewBody;  
    const context = {authToken, ...newContext};  
    const result = await graphql.graphql(Schema, query, null, context, variables);
    if (result.errors) {
      console.log('DEBUG GraphQL Error:', result.errors);
      rslt = Base64$1.encode(JSON.stringify({status:500,errors: result.errors}).toString());
    }else{
      var pscd = genId$1();
      var _2sen = JSON.stringify(result);
      var rs = CryptoJS.AES.encrypt(_2sen, pscd).toString();
      var ky = CryptoJS.AES.encrypt(pscd, fp).toString();
      rslt = Base64$1.encode(JSON.stringify({status:200,r:rs,k:ky}).toString());     
    }    
  }else{
    rslt = Base64$1.encode(JSON.stringify({status:500,errors:'errors'}).toString());
  }
  res.send(rslt);
};

const Cocks = new graphql.GraphQLObjectType({
  name: 'Cocks',
  description: 'A Cocks',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The CockID',
      resolve: (obj) => obj.id
    },
    name: {type: graphql.GraphQLString, description: 'The userId that created the '},    
    description: {type: graphql.GraphQLString, description: ''},
    age:{type: graphql.GraphQLFloat, description: ''},
    fightsWon:{type: graphql.GraphQLFloat, description: ''},  
    fightsLost:{type: graphql.GraphQLFloat, description: ''}, 
    weight :{type: graphql.GraphQLFloat, description: ''}, 
    image:{type: graphql.GraphQLString, description: ''},
    owners: {
      type: new  graphql.GraphQLList(graphql.GraphQLString),
      description: '',
    },
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was last updated'},    
    q:{type: CockQuerySquemaFields, description: ''},
  })
});





const inputFields$2 = {
    id: {type: graphql.GraphQLID, description: 'The Id'},
    name: {type: graphql.GraphQLString, description: 'The userId that created the '},    
    description: {type: graphql.GraphQLString, description: ''},
    owners: {type: graphql.GraphQLString, description: ''},
    age:{type: graphql.GraphQLFloat, description: ''},
    weight :{type: graphql.GraphQLFloat, description: ''}, 
    image:{type: graphql.GraphQLString, description: ''},
    fightsWon:{type: graphql.GraphQLFloat, description: ''},  
    fightsLost:{type: graphql.GraphQLFloat, description: ''},  
};





const UpdateCock = new graphql.GraphQLInputObjectType({
  name: 'UpdateCock',
  description: 'Args to update a  Cock',
  fields: () => makeRequired(inputFields$2, ['id'])
});

const NewCock = new graphql.GraphQLInputObjectType({
  name: 'NewCock',
  description: 'Args to add a  Cock',
  fields: () => makeRequired(inputFields$2, ['name', 'age','image','weight'])
});



const QueryFields$4 = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdCock = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdCock',
  description: 'Args to Find by Id a  Cock',
  fields: () => makeRequired(QueryFields$4, ['id'])
});

const FindCock = new graphql.GraphQLInputObjectType({
  name: 'FindCock',
  description: 'Args to Find Cocks',
  fields: () => makeRequired(QueryFields$4, ['limit','page','sortBy'])
});

const CockQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'CockQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$4, ['limit','page','sortBy'])
});

const Collection$4 = 'Cocks';
//const CollectionObs = 'ChangesObserver';

const addCocks = (k,user) => {
    /*var admin =_Util.Hrmdb.FindIndexes(`User`,'isAdmin',true); 
    for(var usr2 in admin){
        
    } */   
    k.user = user;
    var nadIng = Hrmdb.push(Collection$4,k,true);
    /*var ctd = new Date();
    var ctT = ctd.getTime();
    var userList = nadIng.user;
    const dd2 = JSON.stringify(nadIng);
    var adIng = getJson2P(dd2);
    for(var usr2 in userList){
        //_Util.Hrmdb.PushDirecIndex(Collection,`user`,usr2,adIng.id); 
        //_Util.Hrmdb.PushSortDirecIndex(Collection,`user`,usr2,'date',adIng.date,adIng.id);       
    }
    delete adIng[`user`]    
    var updObs = {action:`Add`,collection:Collection,data:adIng,date:ctT};
    for(var usr2 in userList){            
        Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
    }*/
    calculateBlockIndexes();
    return nadIng;
};

const updateCocks = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$4,k);    
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P$1(dd);
        Object.keys(q).map(flk=>{
            if(kt[flk]!==q[flk]){
                /*Object.keys(fbI.user).map(usr2=>{
                    _Util.Hrmdb.UpdDirectSortIndex(Collection,'user',usr2,flk,kt.id,kt[flk],q[flk]);
                })*/
                kt[flk]= q[flk];
            }
        });        
        var adIng = Hrmdb.update(Collection$4,kt,k);
        /*var userList = adIng.user;
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P(dd2);
        delete CadIng[`user`]
        var ctd = new Date();
        var ctT = ctd.getTime();        
        var updObs = {action:`Update`,collection:Collection,data:CadIng,date:ctT};        
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        return adIng;
    }
    else{
        return fbI;
    }
};


const removeCocks = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$4,k);
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        var userList = fbI.user;
        var adIng =  Hrmdb.remove(Collection$4,k);
        /*var ctd = new Date();
        var ctT = ctd.getTime();
        var rmD = {id:k}
        _Util.Hrmdb.DeleteDirecIndex(Collection,`user`,user,k);
        var updObs = {action:`Remove`,collection:Collection,data:rmD,date:ctT};
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        calculateBlockIndexes();
        return adIng;
    }else{
        return {};
    }
};



const getCocksbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$4,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P$1(dd); 
        return mr;         
    }
   return {};
};



const getCocks = (q) => {    
    var h = [];       
    const {sortBy,limit,page} = q;
    var orderBy = sortBy  || 'date.desc';
    var sort  = orderBy.split('.')[0];
    var order  = orderBy.split('.')[1] || 'desc'; 
    //var tlt = _Util.Hrmdb.FindIndexes(Collection,'user',q.user,'year',_page);
    var tlt = Hrmdb.findAll(Collection$4);
    /*
    var admin = _Util.Hrmdb.FindIndexes(`User`,'isAdmin',true);
    var isAdmin = false;
    if(admin[q.user]>=0){
        isAdmin = true;
    }
    */   


    if(tlt){ 

        tlt.map(_lg=>{
            //var _lg = _Util.Hrmdb.findOne(Collection,lgtr);
            _lg && h.push(_lg);
        });
        
    /*

    Object.keys(tlt).map(lgtr=>{
            var _lg = _Util.Hrmdb.findOne(Collection,lgtr);
            _lg && h.push(_lg);
        })
        const start = (page-1) * limit;
        const end = page * limit;  
        var numRec = 0
        var ObjList = tlt;
        var ArrList = [];
        for(var yId in ObjList){
            ArrList.push(yId)
        }
        if(order==='desc'){  
            for(var y = ArrList.length;y>=0;y--){  
                var key = ArrList[y];                
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            }                
        }
        else{
            for(var y = 0;y<=ArrList.length;y++){                                         
                var key = ArrList[y];
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            } 
        }    
        
        var jsy = JSON.stringify(h);
        getJson2P(jsy).map(mr=>{
            var userDt =  [];            
            if(mr){  
                if(isAdmin && mr.user){               
                    Object.keys(mr.user).map(usr=>{
                        var UserI= _Util.Hrmdb.findOne('User',usr);                         
                        if(UserI && UserI.email){
                            userDt.push(UserI.email)
                        }                                        
                    }) 
                }
                mr.owners = userDt;                       
                _hdt_.push(mr);
            }
        }) 
        */       
        return h;   
    }
    return [];
};

function getJson2P$1(p){
    return JSON.parse(p);
}

function calculateBlockIndexes(){
    _exec$$_('ls', function(fferr, istdout, istderr){	
        Hrmdb.calcIndexes('Cocks');
        Hrmdb.calcIndexesLevel2('Cocks','user','year');
    });
    return true;
}

var cocks = {
  getCocksbyId: {
    type: Cocks,
    args: {
      cock: {type: new graphql.GraphQLNonNull(FindbyIdCock)}
    },
    async resolve (source, {cock}, {authToken}) {
      
        const {id, ...query} = cock;
        query.user = authToken.user;
        const _result = await getCocksbyId(id);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }
        return _result;
        if(authToken.user);
      else{
        throw errorObj$1({_error: 'Could not find'});
      }     
    }
  },
  getCocksAll: {
    type: new graphql.GraphQLList(Cocks),
    args: {
      cock: {type: new graphql.GraphQLNonNull(FindCock)}
    },
    async resolve(source, {cock}, {authToken}) {     
        const {...query} = cock;
        query.user = authToken.user;
        const _result = await getCocks(query);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }      
        return _result;
        if(authToken.user);
      else{
        throw errorObj$1({_error: 'Could not find'});
      }
    }
  }
  
};

const Judges = new graphql.GraphQLObjectType({
  name: 'Judges',
  description: 'A Judges',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The JudgeID',
      resolve: (obj) => obj.id
    },
    owners: {
      type: new  graphql.GraphQLList(graphql.GraphQLString),
      description: '',
    },
    name: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    type: {type: graphql.GraphQLString, description: 'The userId that created the video'},    
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the video was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the video was last updated'},    
    q:{type: JudgeQuerySquemaFields, description: ''},
  })
});





const inputFields$3 = {
    id: {type: graphql.GraphQLID, description: 'The videoId'},
    name: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    type: {type: graphql.GraphQLString, description: 'The userId that created the video'}, 
};





const UpdateJudge = new graphql.GraphQLInputObjectType({
  name: 'UpdateJudge',
  description: 'Args to update a  Judge',
  fields: () => makeRequired(inputFields$3, ['id'])
});

const NewJudge = new graphql.GraphQLInputObjectType({
  name: 'NewJudge',
  description: 'Args to add a  Judge',
  fields: () => makeRequired(inputFields$3, ['name'])
});



const QueryFields$5 = {
  id: {type: graphql.GraphQLID, description: 'The videoId'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdJudge = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdJudge',
  description: 'Args to Find by Id a  Judge',
  fields: () => makeRequired(QueryFields$5, ['id'])
});

const FindJudge = new graphql.GraphQLInputObjectType({
  name: 'FindJudge',
  description: 'Args to Find Judges',
  fields: () => makeRequired(QueryFields$5, ['limit','page','sortBy'])
});

const JudgeQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'JudgeQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$5, ['limit','page','sortBy'])
});

const Collection$5 = 'Judges';
//const CollectionObs = 'ChangesObserver';

const addJudges = (k,user) => {
    var admin = Hrmdb.FindIndexes(`User`,'isAdmin',true); 
    for(var usr2 in admin){
        k.user[usr2] = usr2;
    }    
    var nadIng = Hrmdb.push(Collection$5,k,true);
    /*var ctd = new Date();
    var ctT = ctd.getTime();
    var userList = nadIng.user;
    const dd2 = JSON.stringify(nadIng);
    var adIng = getJson2P(dd2);
    for(var usr2 in userList){
        //_Util.Hrmdb.PushDirecIndex(Collection,`user`,usr2,adIng.id); 
        //_Util.Hrmdb.PushSortDirecIndex(Collection,`user`,usr2,'date',adIng.date,adIng.id);       
    }
    delete adIng[`user`]    
    var updObs = {action:`Add`,collection:Collection,data:adIng,date:ctT};
    for(var usr2 in userList){            
        Util.UpdChanges(CollectionObs,updObs,ctT,usr2);     

    }*/
    calculateIndexes();
    return nadIng;
};

const updateJudges = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$5,k);    
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P$2(dd);
        Object.keys(q).map(flk=>{
            if(kt[flk]!==q[flk]){
                /*Object.keys(fbI.user).map(usr2=>{
                    _Util.Hrmdb.UpdDirectSortIndex(Collection,'user',usr2,flk,kt.id,kt[flk],q[flk]);
                })*/
                kt[flk]= q[flk];
            }
        });        
        var adIng = Hrmdb.update(Collection$5,kt,k);
        /*var userList = adIng.user;
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P(dd2);
        delete CadIng[`user`]
        var ctd = new Date();
        var ctT = ctd.getTime();        
        var updObs = {action:`Update`,collection:Collection,data:CadIng,date:ctT};        
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        return adIng;
    }
    else{
        return fbI;
    }
};


const removeJudges = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$5,k);
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        var userList = fbI.user;
        var adIng =  Hrmdb.remove(Collection$5,k);
        /*var ctd = new Date();
        var ctT = ctd.getTime();
        var rmD = {id:k}
        _Util.Hrmdb.DeleteDirecIndex(Collection,`user`,user,k);
        var updObs = {action:`Remove`,collection:Collection,data:rmD,date:ctT};
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        calculateIndexes();
        return adIng;
    }else{
        return {};
    }
};



const getJudgesbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$5,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P$2(dd); 
        return mr;         
    }
   return {};
};



const getJudges = (q) => {    
    var h = [],_hdt_=[];       
    const {sortBy,limit,page} = q;
    var orderBy = sortBy  || 'date.desc';
    var sort  = orderBy.split('.')[0];
    var order  = orderBy.split('.')[1] || 'desc'; 
    var tlt = Hrmdb.FindIndexes(Collection$5,'user',q.user);
    var admin = Hrmdb.FindIndexes(`User`,'isAdmin',true);
    var isAdmin = false;
    if(admin[q.user]>=0){
        isAdmin = true;
    }    
    if(tlt){ 
        Object.keys(tlt).map(lgtr=>{
            var _lg = Hrmdb.findOne(Collection$5,lgtr);
            _lg && h.push(_lg);
        });
    /*
        const start = (page-1) * limit;
        const end = page * limit;  
        var numRec = 0
        var ObjList = tlt;
        var ArrList = [];
        for(var yId in ObjList){
            ArrList.push(yId)
        }
        if(order==='desc'){  
            for(var y = ArrList.length;y>=0;y--){  
                var key = ArrList[y];                
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            }                
        }
        else{
            for(var y = 0;y<=ArrList.length;y++){                                         
                var key = ArrList[y];
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            } 
        }    
        */
        var jsy = JSON.stringify(h);
        getJson2P$2(jsy).map(mr=>{
            var userDt =  [];            
            if(mr){  
                if(isAdmin && mr.user){               
                    Object.keys(mr.user).map(usr=>{
                        var UserI= Hrmdb.findOne('User',usr);                         
                        if(UserI && UserI.email){
                            userDt.push(UserI.email);
                        }                                        
                    }); 
                }
                mr.owners = userDt;                       
                _hdt_.push(mr);
            }
        });        
        return _hdt_;   
    }
    return [];
};

function getJson2P$2(p){
    return JSON.parse(p);
}


function calculateIndexes(){
    _exec$$_('ls', function(fferr, istdout, istderr){	
        Hrmdb.calcIndexes('Judges');
    });
    return true;
}

var judges = {
  getJudgesbyId: {
    type: Judges,
    args: {
      judge: {type: new graphql.GraphQLNonNull(FindbyIdJudge)}
    },
    async resolve (source, {judge}, {authToken}) {      
      if(authToken.user){
        const {id, ...query} = judge;
        query.user = authToken.user;
        const _result = await getJudgesbyId(id);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }
        return _result; 
      }else{
        throw errorObj$1({_error: 'Could not find'});
      }
          
    }
  },
  getJudgesAll: {
    type: new graphql.GraphQLList(Judges),
    args: {
      judge: {type: new graphql.GraphQLNonNull(FindJudge)}
    },
    async resolve(source, {judge}, {authToken}) {
      if(authToken.user){
        const {...query} = judge;
        query.user = authToken.user;
        const _result = await getJudges(query);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }      
        return _result;
      }else{
        throw errorObj$1({_error: 'Could not find'});
      }
    }
  }
  
};



//

const GraphQLEmailType = new graphql.GraphQLScalarType({
  name: 'Email',
  serialize: value => value.toLowerCase(),
  parseValue: value => value.toLowerCase(),
  parseLiteral: ast => {
    const re = /.+@.+/;
    if (ast.kind !== language.Kind.STRING) {
      throw new error.GraphQLError(`Query error: Email is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (!re.test(ast.value)) {
      throw new error.GraphQLError('Query error: Not a valid Email', [ast]);
    }
    if (ast.value.length < 4) {
      throw new error.GraphQLError(`Query error: Email must have a minimum length of 4.`, [ast]);
    }
    if (ast.value.length > 300) {
      throw new error.GraphQLError(`Query error: Email is too long.`, [ast]);
    }
    return ast.value.toLowerCase();
  }
});

const GraphQLPasswordType = new graphql.GraphQLScalarType({
  name: 'Password',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    if (ast.kind !== language.Kind.STRING) {
      throw new error.GraphQLError(`Query error: Password is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 6) {
      throw new error.GraphQLError(`Query error: Password must have a minimum length of 6.`, [ast]);
    }
    if (ast.value.length > 60) {
      throw new error.GraphQLError(`Query error: Password is too long.`, [ast]);
    }
    return String(ast.value);
  }
});

const GraphQLTitleType = new graphql.GraphQLScalarType({
  name: 'Title',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    if (ast.kind !== language.Kind.STRING) {
      throw new error.GraphQLError(`Query error: Title is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new error.GraphQLError(`Query error: Title must have a minimum length of 1.`, [ast]);
    }
    if (ast.value.length > 30) {
      throw new error.GraphQLError(`Query error: Title is too long.`, [ast]);
    }
    return String(ast.value);
  }
});

const GraphQLURLType = new graphql.GraphQLScalarType({
  name: 'URL',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    const re = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    if (!re.test(ast.value)) {
      throw new error.GraphQLError('Query error: Not a valid URL', [ast]);
    }
    if (ast.kind !== language.Kind.STRING) {
      throw new error.GraphQLError(`Query error: URL is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new error.GraphQLError(`Query error: URL must have a minimum length of 1.`, [ast]);
    }
    if (ast.value.length > 2083) {
      throw new error.GraphQLError(`Query error: URL is too long.`, [ast]);
    }
    return String(ast.value);
  }
});

const Collection$6 = 'Bets';
//const CollectionObs = 'ChangesObserver';

const addBets = (k,user) => {
    //var admin = _Util.Hrmdb.FindIndexes(`User`,'isAdmin',true); 
    k.user = user;    
    var nadIng = Hrmdb.push(Collection$6,k,true);
    /*var ctd = new Date();
    var ctT = ctd.getTime();
    var userList = nadIng.user;
    const dd2 = JSON.stringify(nadIng);
    var adIng = getJson2P(dd2);
    for(var usr2 in userList){
        //_Util.Hrmdb.PushDirecIndex(Collection,`user`,usr2,adIng.id); 
        //_Util.Hrmdb.PushSortDirecIndex(Collection,`user`,usr2,'date',adIng.date,adIng.id);       
    }
    delete adIng[`user`]    
    var updObs = {action:`Add`,collection:Collection,data:adIng,date:ctT};
    for(var usr2 in userList){            
        Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
    }*/
    calculateIndexes$1();
    return nadIng;
};

const updateBets = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$6,k);    
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P$3(dd);
        Object.keys(q).map(flk=>{
            if(kt[flk]!==q[flk]){
                /*Object.keys(fbI.user).map(usr2=>{
                    _Util.Hrmdb.UpdDirectSortIndex(Collection,'user',usr2,flk,kt.id,kt[flk],q[flk]);
                })*/
                kt[flk]= q[flk];
            }
        });        
        var adIng = Hrmdb.update(Collection$6,kt,k);
        /*var userList = adIng.user;
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P(dd2);
        delete CadIng[`user`]
        var ctd = new Date();
        var ctT = ctd.getTime();        
        var updObs = {action:`Update`,collection:Collection,data:CadIng,date:ctT};        
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        return adIng;
    }
    else{
        return fbI;
    }
};


const removeBets = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$6,k);
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        var userList = fbI.user;
        var adIng =  Hrmdb.remove(Collection$6,k);
        /*var ctd = new Date();
        var ctT = ctd.getTime();
        var rmD = {id:k}
        _Util.Hrmdb.DeleteDirecIndex(Collection,`user`,user,k);
        var updObs = {action:`Remove`,collection:Collection,data:rmD,date:ctT};
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        calculateIndexes$1();
        return adIng;
    }else{
        return {};
    }
};



const getBetsbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$6,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P$3(dd); 
        return mr;         
    }
   return {};
};


const _getBetsbyFightId = (q) => {      
    var h = [];
    var fbI = Hrmdb.FindIndexes(Collection$6,'fightId',q.id,'cock',q.sortBy);
    Object.keys(fbI).map(lgtr=>{
        var _lg = Hrmdb.findOne(Collection$6,lgtr);
        _lg && h.push(_lg);
    });
    return h;
};

function getJson2P$3(p){
    return JSON.parse(p);
}


function calculateIndexes$1(){
    _exec$$_('ls', function(fferr, istdout, istderr){	
        Hrmdb.calcIndexes('Bets');
        Hrmdb.calcIndexesLevel2('Bets','fightId','cock');
    });
    return true;
}

const FightFences = new graphql.GraphQLObjectType({
  name: 'FightFences',
  description: 'A Fight Fences',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The FightFenceID',
      resolve: (obj) => obj.id
    },
    title: {type: graphql.GraphQLString, description: 'The userId that created the '},    
    description: {type: graphql.GraphQLString, description: ''},
    country:{type: graphql.GraphQLString, description: ''},
    provinceOrEstate:{type: graphql.GraphQLString, description: ''},
    city:{type: graphql.GraphQLString, description: ''},
    judge:{type: graphql.GraphQLID, description: ''}, 
    owners: {
      type: new  graphql.GraphQLList(graphql.GraphQLString),
      description: '',
    },
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was last updated'},    
    q:{type: FightFenceQuerySquemaFields, description: ''},
  })
});





const inputFields$4 = {
    id: {type: graphql.GraphQLID, description: 'The Id'},
    title: {type: graphql.GraphQLString, description: 'The userId that created the '},    
    description: {type: graphql.GraphQLString, description: ''},
    country:{type: graphql.GraphQLString, description: ''},
    provinceOrEstate:{type: graphql.GraphQLString, description: ''},
    city:{type: graphql.GraphQLString, description: ''},
    judge:{type: graphql.GraphQLID, description: ''}, 
};





const UpdateFightFence = new graphql.GraphQLInputObjectType({
  name: 'UpdateFightFence',
  description: 'Args to update a  FightFence',
  fields: () => makeRequired(inputFields$4, ['id'])
});

const NewFightFence = new graphql.GraphQLInputObjectType({
  name: 'NewFightFence',
  description: 'Args to add a  FightFence',
  fields: () => makeRequired(inputFields$4, ['title', 'country','provinceOrEstate','city'])
});



const QueryFields$6 = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdFightFence = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdFightFence',
  description: 'Args to Find by Id a  FightFence',
  fields: () => makeRequired(QueryFields$6, ['id'])
});

const FindFightFence = new graphql.GraphQLInputObjectType({
  name: 'FindFightFence',
  description: 'Args to Find FightFences',
  fields: () => makeRequired(QueryFields$6, ['limit','page','sortBy'])
});

const FightFenceQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'FightFenceQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$6, ['limit','page','sortBy'])
});

const Collection$7 = 'FightFences';

const addFightFences = (k,user) => {
    var admin = Hrmdb.FindIndexes(`User`,'isAdmin',true); 
    for(var usr2 in admin){
        k.user[usr2] = usr2;
    }
    var ctdDa = new Date(parseInt(k.date.toString()));
    var yr = ctdDa.getFullYear();
    var _month =  (ctdDa.getMonth()+1)+(12*yr);
    k['year']=yr;
    k['month']=_month;
    var nadIng = Hrmdb.push(Collection$7,k,true);
    /*var ctd = new Date();
    var ctT = ctd.getTime();
    var userList = nadIng.user;
    const dd2 = JSON.stringify(nadIng);
    var adIng = getJson2P(dd2);
    for(var usr2 in userList){
        //_Util.Hrmdb.PushDirecIndex(Collection,`user`,usr2,adIng.id); 
        //_Util.Hrmdb.PushSortDirecIndex(Collection,`user`,usr2,'date',adIng.date,adIng.id);       
    }
    delete adIng[`user`]    
    var updObs = {action:`Add`,collection:Collection,data:adIng,date:ctT};
    for(var usr2 in userList){            
        Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
    }*/
    calculateBlockIndexes$1();
    return nadIng;
};

const updateFightFences = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$7,k);    
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P$4(dd);
        Object.keys(q).map(flk=>{
            if(kt[flk]!==q[flk]){
                /*Object.keys(fbI.user).map(usr2=>{
                    _Util.Hrmdb.UpdDirectSortIndex(Collection,'user',usr2,flk,kt.id,kt[flk],q[flk]);
                })*/
                kt[flk]= q[flk];
            }
        });        
        var adIng = Hrmdb.update(Collection$7,kt,k);
        /*var userList = adIng.user;
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P(dd2);
        delete CadIng[`user`]
        var ctd = new Date();
        var ctT = ctd.getTime();        
        var updObs = {action:`Update`,collection:Collection,data:CadIng,date:ctT};        
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        return adIng;
    }
    else{
        return fbI;
    }
};


const removeFightFences = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$7,k);
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        var userList = fbI.user;
        var adIng =  Hrmdb.remove(Collection$7,k);
        /*var ctd = new Date();
        var ctT = ctd.getTime();
        var rmD = {id:k}
        _Util.Hrmdb.DeleteDirecIndex(Collection,`user`,user,k);
        var updObs = {action:`Remove`,collection:Collection,data:rmD,date:ctT};
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        calculateBlockIndexes$1();
        return adIng;
    }else{
        return {};
    }
};



const getFightFencesbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$7,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P$4(dd); 
        return mr;         
    }
   return {};
};



const getFightFences = (q) => {    
    var h = [],_hdt_=[];       
    const {sortBy,limit,page} = q;
    var orderBy = sortBy  || 'date.desc';
    var sort  = orderBy.split('.')[0];
    var order  = orderBy.split('.')[1] || 'desc'; 
    //var tlt = _Util.Hrmdb.FindIndexes(Collection,'user',q.user,'year',_page);
    var tlt = Hrmdb.findAll(Collection$7);
    /*
    var admin = _Util.Hrmdb.FindIndexes(`User`,'isAdmin',true);
    var isAdmin = false;
    if(admin[q.user]>=0){
        isAdmin = true;
    }
    */   


    if(tlt){ 

        tlt.map(_lg=>{
            //var _lg = _Util.Hrmdb.findOne(Collection,lgtr);
            _lg && h.push(_lg);
        });
        
    /*

    Object.keys(tlt).map(lgtr=>{
            var _lg = _Util.Hrmdb.findOne(Collection,lgtr);
            _lg && h.push(_lg);
        })
        const start = (page-1) * limit;
        const end = page * limit;  
        var numRec = 0
        var ObjList = tlt;
        var ArrList = [];
        for(var yId in ObjList){
            ArrList.push(yId)
        }
        if(order==='desc'){  
            for(var y = ArrList.length;y>=0;y--){  
                var key = ArrList[y];                
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            }                
        }
        else{
            for(var y = 0;y<=ArrList.length;y++){                                         
                var key = ArrList[y];
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            } 
        }    
        */
        var jsy = JSON.stringify(h);
        getJson2P$4(jsy).map(mr=>{
            var userDt =  [];            
            if(mr){  
                if(isAdmin && mr.user){               
                    Object.keys(mr.user).map(usr=>{
                        var UserI= Hrmdb.findOne('User',usr);                         
                        if(UserI && UserI.email){
                            userDt.push(UserI.email);
                        }                                        
                    }); 
                }
                mr.owners = userDt;                       
                _hdt_.push(mr);
            }
        });        
        return _hdt_;   
    }
    return [];
};

function getJson2P$4(p){
    return JSON.parse(p);
}

function calculateBlockIndexes$1(){
    _exec$$_('ls', function(fferr, istdout, istderr){	
        Hrmdb.calcIndexes('FightFences');
        Hrmdb.calcIndexesLevel2('FightFences','user','year');
    });
    return true;
}

const Fights = new graphql.GraphQLObjectType({
  name: 'Fights',
  description: 'A Fights',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The FightID',
      resolve: (obj) => obj.id
    },
    fighter1: {
      type: Cocks,
      description: 'The userId that created the ',
      resolve: (obj) => getCocksbyId(obj.fighter1)   
    },
    fighter2: {
      type: Cocks,
      description: 'The userId that created the ',
      resolve: (obj) => getCocksbyId(obj.fighter2)   
    },
    winner: {
      type: Cocks,
      description: 'The userId that created the ',
      resolve: (obj) => getCocksbyId(obj.winner)   
    },
    fightFence: {
      type: FightFences,
      description: 'The userId that created the ',
      resolve: (obj) => getFightFencesbyId(obj.fightFence)
    },    
    media: {type: graphql.GraphQLString, description: 'The Id'},
    date: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was last updated'},    
    q:{type: FightQuerySquemaFields, description: ''},
  })
});





const inputFields$5 = {
    id: {type: graphql.GraphQLID, description: 'The Id'},
    fighter1: {type: graphql.GraphQLID, description: 'The Id'},
    fighter2: {type: graphql.GraphQLID, description: 'The Id'},
    fightFence: {type: graphql.GraphQLID, description: 'The Id'},
    winner: {type: graphql.GraphQLID, description: 'The Id'},
    media: {type: graphql.GraphQLString, description: 'The Id'},
    date: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
};





const UpdateFight = new graphql.GraphQLInputObjectType({
  name: 'UpdateFight',
  description: 'Args to update a  Fight',
  fields: () => makeRequired(inputFields$5, ['id'])
});

const NewFight = new graphql.GraphQLInputObjectType({
  name: 'NewFight',
  description: 'Args to add a  Fight',
  fields: () => makeRequired(inputFields$5, ['fighter1','fighter2','date'])
});



const QueryFields$7 = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdFight = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdFight',
  description: 'Args to Find by Id a  Fight',
  fields: () => makeRequired(QueryFields$7, ['id'])
});

const FindFight = new graphql.GraphQLInputObjectType({
  name: 'FindFight',
  description: 'Args to Find Fights',
  fields: () => makeRequired(QueryFields$7, ['limit','page','sortBy'])
});

const FightQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'FightQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$7, ['limit','page','sortBy'])
});

const Collection$8 = 'Fights';
//const CollectionObs = 'ChangesObserver';

const addFights = (k,user) => {
    /*var admin =_Util.Hrmdb.FindIndexes(`User`,'isAdmin',true); 
    for(var usr2 in admin){
        
    } */   
    k.user = user;
    var nadIng = Hrmdb.push(Collection$8,k,true);
    /*var ctd = new Date();
    var ctT = ctd.getTime();
    var userList = nadIng.user;
    const dd2 = JSON.stringify(nadIng);
    var adIng = getJson2P(dd2);
    for(var usr2 in userList){
        //_Util.Hrmdb.PushDirecIndex(Collection,`user`,usr2,adIng.id); 
        //_Util.Hrmdb.PushSortDirecIndex(Collection,`user`,usr2,'date',adIng.date,adIng.id);       
    }
    delete adIng[`user`]    
    var updObs = {action:`Add`,collection:Collection,data:adIng,date:ctT};
    for(var usr2 in userList){            
        Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
    }*/
    calculateIndexes$2();
    return nadIng;
};

const updateFights = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$8,k);    
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P$5(dd);
        Object.keys(q).map(flk=>{
            if(kt[flk]!==q[flk]){
                /*Object.keys(fbI.user).map(usr2=>{
                    _Util.Hrmdb.UpdDirectSortIndex(Collection,'user',usr2,flk,kt.id,kt[flk],q[flk]);
                })*/
                kt[flk]= q[flk];
            }
        });        
        var adIng = Hrmdb.update(Collection$8,kt,k);
        /*var userList = adIng.user;
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P(dd2);
        delete CadIng[`user`]
        var ctd = new Date();
        var ctT = ctd.getTime();        
        var updObs = {action:`Update`,collection:Collection,data:CadIng,date:ctT};        
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        return adIng;
    }
    else{
        return fbI;
    }
};


const removeFights = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$8,k);
    if (fbI && fbI.id === k && fbI.user && fbI.user[user] === user) {
        var userList = fbI.user;
        var adIng =  Hrmdb.remove(Collection$8,k);
        /*var ctd = new Date();
        var ctT = ctd.getTime();
        var rmD = {id:k}
        _Util.Hrmdb.DeleteDirecIndex(Collection,`user`,user,k);
        var updObs = {action:`Remove`,collection:Collection,data:rmD,date:ctT};
        for(var usr2 in userList){            
            Util.UpdChanges(CollectionObs,updObs,ctT,usr2);      
        }*/
        calculateIndexes$2();
        return adIng;
    }else{
        return {};
    }
};



const getFightsbyId = (k,q) => {      
    var fbI = Hrmdb.findOne(Collection$8,k);    
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P$5(dd); 
        return mr;         
    }
   return {};
};



const getFights = (q) => {    
    var h = [];       
    const {sortBy,limit,page} = q;
    var orderBy = sortBy  || 'date.desc';
    var sort  = orderBy.split('.')[0];
    var order  = orderBy.split('.')[1] || 'desc'; 
    //var tlt = _Util.Hrmdb.FindIndexes(Collection,'user',q.user);
    var tlt = Hrmdb.findAll(Collection$8);
    /*
    var admin = _Util.Hrmdb.FindIndexes(`User`,'isAdmin',true);
    var isAdmin = false;
    if(admin[q.user]>=0){
        isAdmin = true;
    }
    */
    if(tlt){
        tlt.map(_lg=>{
            //var _lg = _Util.Hrmdb.findOne(Collection,lgtr);
            _lg && h.push(_lg);
        });
    /*
        Object.keys(tlt).map(lgtr=>{
            var _lg = _Util.Hrmdb.findOne(Collection,lgtr);
            _lg && h.push(_lg);
        })


        const start = (page-1) * limit;
        const end = page * limit;  
        var numRec = 0
        var ObjList = tlt;
        var ArrList = [];
        for(var yId in ObjList){
            ArrList.push(yId)
        }
        if(order==='desc'){  
            for(var y = ArrList.length;y>=0;y--){  
                var key = ArrList[y];                
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            }                
        }
        else{
            for(var y = 0;y<=ArrList.length;y++){                                         
                var key = ArrList[y];
                if(key && ObjList[key]){                    
                    var jsy55 = JSON.stringify(ObjList[key]);
                    var _counT = ObjList[key]['count']
                    var sortKey = getJson2P(jsy55);
                    delete sortKey['count'];
                    if(numRec + _counT>end){
                        var ttEnd = numRec + _counT-end;
                        var cntEnd = 1;
                        for(var yId in sortKey){                            
                            if(ttEnd<cntEnd){
                                break
                            }else{
                                var yP = _Util.Hrmdb.findOne(Collection,yId)
                                h.push(yP);
                                cntEnd += 1;
                            }                            
                        }
                        y = 0;
                        break;
                    }
                    else{
                        for(var yId in sortKey){
                            var yP = _Util.Hrmdb.findOne(Collection,yId)
                            h.push(yP);
                        }
                        numRec += _counT;                       
                    }                    
                    
                }                
                
            } 
        }    
        
        var jsy = JSON.stringify(h);
        getJson2P(jsy).map(mr=>{
            var userDt =  [];            
            if(mr){  
                if(isAdmin && mr.user){               
                    Object.keys(mr.user).map(usr=>{
                        var UserI= _Util.Hrmdb.findOne('User',usr);                         
                        if(UserI && UserI.email){
                            userDt.push(UserI.email)
                        }                                        
                    }) 
                }
                mr.owners = userDt;                       
                _hdt_.push(mr);
            }
        })  
        */      
        return h;   
    }
    return [];
};

function getJson2P$5(p){
    return JSON.parse(p);
}




function calculateIndexes$2(){
    _exec$$_('ls', function(fferr, istdout, istderr){	
        Hrmdb.calcIndexes('Fights');
        Hrmdb.calcIndexesLevel2('Fights','user','group');
    });
    return true;
}

const Collection$9 = 'User';
const CollectionRoles$1 = 'ListRoles';

const updateUsers$1 = (k,q,user) => {
    var fbI = Hrmdb.findOne(Collection$9,k);
    if (fbI && fbI.id === k) {
        const dd = JSON.stringify(fbI);
        var kt = getJson2P$6(dd);
        const qArr = Object.keys(q);
        if (qArr.length>0) {
          qArr.map((flk) => {              
                kt[flk] = q[flk];
                ['Finansas','Daycare','Almacen'].map(tkind => {
                    if(flk===tkind && kt[flk]){                        
                        if(!kt[`roles`]){
                            kt[`roles`] = {};
                        }
                        if(!kt[`roles`][tkind]){
                            kt[`roles`][tkind] = {};
                        }
                        Hrmdb.findAll(CollectionRoles$1).map(rol=>{                            
                            if(rol.group === flk){
                                if(!kt[`roles`][tkind][rol.name]){
                                    kt[`roles`][tkind][rol.name] = true;
                                }
                            }                
                       });                
                    }else if(flk===tkind && !kt[flk]){
                        if(kt[`roles`][tkind]){
                          delete kt[`roles`][tkind];
                        }var hyt = {};
                        ['Finansas','Daycare','Almacen'].map(tk2ind => {
                            if(kt[`roles`][tk2ind]){
                                hyt[tk2ind]=kt[`roles`][tk2ind];
                            }
                        });
                        kt[`roles`]=hyt;                        
                    }
                });                       
            });
        }              
        var adIng = Hrmdb.update(Collection$9,kt,k);
        const dd2 = JSON.stringify(adIng);
        var CadIng = getJson2P$6(dd2);
        return CadIng;
    }
    else{
        return {};
    }
};
 


const removeUsers$1 = (k,user) => {
    var fbI = Hrmdb.findOne(Collection$9,k);    
    if (fbI && fbI.id === k) {
        var adIng =  Hrmdb.remove(Collection$9,k);
        var ctd = new Date();
        var ctT = ctd.getTime();
        return adIng;
    }else{
        return {};
    }
};

const getUsersbyId$1 = (k) => {    
    
    var fbI = Hrmdb.findOne(Collection$9,k);
    if(fbI){
        const dd = JSON.stringify(fbI);  
        var mr = getJson2P$6(dd);
        if(mr.roles){
            mr.roles =  Util.Base64.encode(JSON.stringify(mr.roles));
        }     
        return mr;        
    }
   return {};
};


function getJson2P$6(p){
    return JSON.parse(p);
}




const getUsersBalancebyId$1 = (k) => {
    var fbI = Hrmdb.findOne(Collection$9,k);
    if(fbI){
        if(fbI.balance){
            return fbI.balance; 
        }else{
            return {};    
        }    
    }
   return {};
};

const Users$1 = new graphql.GraphQLObjectType({
  name: 'Users',
  description: 'A Users',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The UserID',
      resolve: (obj) => Base64$1.encode(obj.email)
    },

    firstName: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    lastName: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    email:{type: graphql.GraphQLString, description: ''}, 
    phone:{type: graphql.GraphQLString, description: ''},
    photoUrl:{type: graphql.GraphQLString, description: ''},    
    balance:{
      type: Balance$1, 
      description: '',
      resolve: (obj) => getUsersBalancebyId$1(obj.id)
    },
    createdAt: {type: graphql.GraphQLString, description: 'The datetime the video was created'},
    updatedAt: {type: graphql.GraphQLString, description: 'The datetime the video was last updated'},    
    q:{type: UserQuerySquemaFields$1, description: ''},
  })
});





const inputFields$6 = {    
    id: {type: graphql.GraphQLString, description: ''},
    name: {type: graphql.GraphQLString, description: 'The userId that created the video'},
    email:{type: graphql.GraphQLString, description: ''}, 
    phone:{type: graphql.GraphQLString, description: ''},
};




const UpdateUser$1 = new graphql.GraphQLInputObjectType({
  name: 'UpdateUser',
  description: 'Args to update a  User',
  fields: () => makeRequired(inputFields$6, ['id'])
});

const NewUser$1 = new graphql.GraphQLInputObjectType({
  name: 'NewUser',
  description: 'Args to add a  User',
  fields: () => makeRequired(inputFields$6, ['name','email',`phone`])
});



const QueryFields$8 = {  
  id: {type: graphql.GraphQLID, description: 'The videoId'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdUser$1 = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdUser',
  description: 'Args to Find by Id a  User',
  fields: () => makeRequired(QueryFields$8, ['id'])
});


const FindUser$1 = new graphql.GraphQLInputObjectType({
  name: 'FindUser',
  description: 'Args to Find Users',
  fields: () => makeRequired(QueryFields$8, ['limit','page','sortBy'])
});

const UserQuerySquemaFields$1 = new graphql.GraphQLObjectType({
  name: 'UserQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$8, ['limit','page','sortBy'])
});  








const Balance$1 = new graphql.GraphQLObjectType({
  name: 'Balance',
  description: 'Balance',
  fields: () => ({    
    available: {type: graphql.GraphQLFloat, description: ''},
    pending: {type: graphql.GraphQLFloat, description: ''}, 
    q:{type: UserQuerySquemaFields$1, description: ''},
  })
});


const inputFieldsBalance$1 = {
  available: {type: graphql.GraphQLFloat, description: ''},
  pending: {type: graphql.GraphQLFloat, description: ''}, 
};



const UpdateBalance$1 = new graphql.GraphQLInputObjectType({
  name: 'UpdateBalance',
  description: 'UpdateBalance',
  fields: () => makeRequired(inputFieldsBalance$1, ['available','pending'])
});

const Bets = new graphql.GraphQLObjectType({
  name: 'Bets',
  description: 'A Bets',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      description: 'The BetID',
      resolve: (obj) => obj.id
    },
    cock: {
      type: Cocks,
      description: 'The userId that created the ',
      resolve: (obj) => getCocksbyId(obj.cock)   
    },
    user: {
      type: Users$1, 
      description: 'The userId that created the ',
      resolve: (obj) => getUsersbyId$1(obj.user)         
    },
    fightId: {
      type: Fights, 
      description: 'The userId that created the ',
      resolve: (obj) => getFightsbyId(obj.fightId)  
    },
    pagar: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    cobrar: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    status:{type: graphql.GraphQLBoolean, description: 'The datetime the  was created'},
    createdAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was created'},
    updatedAt: {type: graphql.GraphQLFloat, description: 'The datetime the  was last updated'},    
    q:{type: BetQuerySquemaFields, description: ''},
  })
});





const inputFields$7 = {
    id: {type: graphql.GraphQLID, description: 'The Id'},
    cock: {type: graphql.GraphQLID, description: 'The Id'},
    user: {type: graphql.GraphQLID, description: 'The Id'},
    fightId: {type: graphql.GraphQLID, description: 'The Id'},
    pagar: {type: graphql.GraphQLFloat, description: 'The Id'},
    cobrar: {type: graphql.GraphQLFloat, description: 'The Id'},
    status:{type: graphql.GraphQLBoolean, description: ''},
};





const UpdateBet = new graphql.GraphQLInputObjectType({
  name: 'UpdateBet',
  description: 'Args to update a  Bet',
  fields: () => makeRequired(inputFields$7, ['id'])
});

const NewBet = new graphql.GraphQLInputObjectType({
  name: 'NewBet',
  description: 'Args to add a  Bet',
  fields: () => makeRequired(inputFields$7, ['cock','fightId','pagar','cobrar'])
});



const QueryFields$9 = {
  id: {type: graphql.GraphQLID, description: 'The Id'},
  limit: {type: graphql.GraphQLFloat, description: ''},
  page: {type: graphql.GraphQLFloat, description: ''},
  sortBy: {type: graphql.GraphQLString, description: ''}  
};

const FindbyIdBet = new graphql.GraphQLInputObjectType({
  name: 'FindbyIdBet',
  description: 'Args to Find by Id a  Bet',
  fields: () => makeRequired(QueryFields$9, ['id'])
});

const FindBet = new graphql.GraphQLInputObjectType({
  name: 'FindBet',
  description: 'Args to Find Bets',
  fields: () => makeRequired(QueryFields$9, ['limit','page','sortBy'])
});

const BetQuerySquemaFields = new graphql.GraphQLObjectType({
  name: 'BetQuerySquemaFields',
  description: 'Query Squema Fields',
  fields: () => makeRequired(QueryFields$9, ['limit','page','sortBy'])
});

var bets = {
  getBetsbyId: {
    type: Bets,
    args: {
      bet: {type: new graphql.GraphQLNonNull(FindbyIdBet)}
    },
    async resolve (source, {bet}, {authToken}) {      
      const {id, ...query} = bet;
        query.user = authToken.user;
        const _result = await getBetsbyId(id);   
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }
        return _result; 
        if(authToken.user);else{
        throw errorObj$1({_error: 'Could not find'});
      }
          
    }
  },
  getBetsbyFightId: {
    type: new graphql.GraphQLList(Bets),
    args: {
      bet: {type: new graphql.GraphQLNonNull(FindbyIdBet)}
    },
    async resolve (source, {bet}, {authToken}) {      
      const {...query} = bet;
        query.user = authToken.user;
        const _result = await _getBetsbyFightId(query);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }
        return _result; 
        if(authToken.user);else{
        throw errorObj$1({_error: 'Could not find'});
      }   
    }
  }
  /*,
  getBetsAll: {
    type: new GraphQLList(Bets),
    args: {
      bet: {type: new GraphQLNonNull(FindBet)}
    },
    async resolve(source, {bet}, {authToken}) {
       const {...query} = bet;
        query.user = authToken.user;
        const _result = await getBets(query);      
        if (_result.errors) {
          throw errorObj({_error: 'Could not find'});
        }      
        return _result;
        if(authToken.user){}else{
        throw errorObj({_error: 'Could not find'});
      }
    }
  }
  */
};



//

var fightFences = {
  getFightFencesbyId: {
    type: FightFences,
    args: {
      fightFence: {type: new graphql.GraphQLNonNull(FindbyIdFightFence)}
    },
    async resolve (source, {fightFence}, {authToken}) {      
       const {id, ...query} = fightFence;
        query.user = authToken.user;
        const _result = await getFightFencesbyId(id);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }
        return _result; 
        if(authToken.user);else{
        throw errorObj$1({_error: 'Could not find'});
      }     
    }
  },
  getFightFencesAll: {
    type: new graphql.GraphQLList(FightFences),
    args: {
      fightFence: {type: new graphql.GraphQLNonNull(FindFightFence)}
    },
    async resolve(source, {fightFence}, {authToken}) {
       const {...query} = fightFence;
        query.user = authToken.user;
        const _result = await getFightFences(query);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }      
        return _result;
        if(authToken.user);else{
        throw errorObj$1({_error: 'Could not find'});
      }
    }
  }
  
};

var user$2 = {
  getUsersbyId: {
    type: Users$1,
    args: {
      user: {type: new graphql.GraphQLNonNull(FindbyIdUser$1)}
    },
    async resolve (source, {user}, {authToken}) {
      if(authToken.user){             
        const usr = await getUsersbyId$1(authToken.user);      
        if (usr.errors) {
          throw errorObj$1({_error: 'Could not find any user'});
        }
        return usr; 
      }else{
        throw errorObj$1({_error: 'Could not find any user'});
      }
          
    }
  }
};

var fights = {
  getFightsbyId: {
    type: Fights,
    args: {
      fight: {type: new graphql.GraphQLNonNull(FindbyIdFight)}
    },
    async resolve (source, {fight}, {authToken}) { 
      
        const {id, ...query} = fight;
        query.user = authToken.user;
        const _result = await getFightsbyId(id);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }
        return _result; 
      if(authToken.user);else{
        throw errorObj$1({_error: 'Could not find'});
      }
          
    }
  },
  getFightsAll: {
    type: new graphql.GraphQLList(Fights),
    args: {
      fight: {type: new graphql.GraphQLNonNull(FindFight)}
    },
    async resolve(source, {fight}, {authToken}) {              
        
        const {...query} = fight;
        query.user = authToken.user;
        const _result = await getFights(query);      
        if (_result.errors) {
          throw errorObj$1({_error: 'Could not find'});
        }      
        return _result;
        if(authToken.user);else{
        throw errorObj$1({_error: 'Could not find'});
      }
    }
  }
  
};



//

const rootFields$2 = Object.assign(cocks,fights,bets,user$2,judges,fightFences);


var query$1 = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields$2
});

var cocks$1 = {
  addCock: {
    type: Cocks,
    args: {
      cock: {type: new graphql.GraphQLNonNull(NewCock)}
    },
    async resolve(source, {cock}, {authToken}) {
      if(authToken.user){
        cock.createdAt = new Date();
        if(!cock[`user`]){
          cock[`user`]={};
        }
        cock.user[authToken.user] = authToken.user;        
        const newCock = await addCocks(cock,authToken.user);
        if (newCock.errors) {
          throw errorObj$1({_error: 'Could not add video'});
        }  
        return newCock;
      }else{
        return {};
      }
    }
  },
  updateCock: {
    type: Cocks,
    args: {
      cock: {type: new graphql.GraphQLNonNull(UpdateCock)}
    },
    async resolve(source, {cock}, {authToken}) {
      if(authToken.user){
        cock.updatedAt = new Date();        
        const {id, ...updates} = cock;        
        const updCock = await updateCocks(id, updates,authToken.user);        
        if (updCock.errors) {
          throw errorObj$1({_error: 'Could not update video'});
        }
        return updCock;
      }
      else{
        throw errorObj$1({_error: 'Could not update'});
      }
    }
  },
  removeCock: {
    type: graphql.GraphQLBoolean,
    args: {
      cock: {type: new graphql.GraphQLNonNull(UpdateCock)}
    },
    async resolve(source, {cock}, {authToken}) {
      if(authToken.user){
        const {id} = cock;
        const rmCock = await removeCocks(id,authToken.user);      
        if (rmCock.errors) {
          throw errorObj$1({_error: 'Could not update video'});
        }  
        return rmCock;
      }
      else{
          return false;
      }
    }
  },
};

var judges$1 = {
  addJudge: {
    type: Judges,
    args: {
      judge: {type: new graphql.GraphQLNonNull(NewJudge)}
    },
    async resolve(source, {judge}, {authToken}) {
      if(authToken.user){
        judge.createdAt = new Date();
        if(!judge[`user`]){
          judge[`user`]={};
        }
        judge.user[authToken.user] = authToken.user;
        const newJudge = await addJudges(judge);
        if (newJudge.errors) {
          throw errorObj$1({_error: 'Could not add video'});
        }  
        return newJudge;
      }else{
        return {};
      }
    }
  },
  updateJudge: {
    type: Judges,
    args: {
      judge: {type: new graphql.GraphQLNonNull(UpdateJudge)}
    },
    async resolve(source, {judge}, {authToken}) {
      
      if(authToken.user){
        judge.updatedAt = new Date();
        const {id, ...updates} = judge;
        const updJudge = await updateJudges(id, updates,authToken.user);
        if (updJudge.errors) {
          throw errorObj$1({_error: 'Could not update video'});
        }  
        return updJudge;
      }else{
        throw errorObj$1({_error: 'Could not update'});
      }
    }
  },
  removeJudge: {
    type: graphql.GraphQLBoolean,
    args: {
      judge: {type: new graphql.GraphQLNonNull(UpdateJudge)}
    },
    async resolve(source, {judge}, {authToken}) {     
      if(authToken.user){
        const {id} = judge;
        const rmJudge = await removeJudges(id,authToken.user);
        if (rmJudge.errors) {
          throw errorObj$1({_error: 'Could not remove'});
        }  
        return rmJudge;
      }else{
        return false;
      }      
    }
  },
};

var bets$1 = {
  addBet: {
    type: Bets,
    args: {
      bet: {type: new graphql.GraphQLNonNull(NewBet)}
    },
    async resolve(source, {bet}, {authToken}) {      
      if(authToken.user){
        bet.createdAt = new Date();
        if(!bet[`user`]){
          bet[`user`]={};
        }
        bet.user[authToken.user] = authToken.user;
        const newBet = await addBets(bet,authToken.user);
        if (newBet.errors) {
          throw errorObj({_error: 'Could not add video'});
        }  
        return newBet;
      }else{
        return {};
      }
    }
  },
  updateBet: {
    type: Bets,
    args: {
      bet: {type: new graphql.GraphQLNonNull(UpdateBet)}
    },
    async resolve(source, {bet}, {authToken}) {
      const auth = isLoggedIn(authToken);
      if(auth){
        bet.updatedAt = new Date();
        const {id, ...updates} = bet;
        const updBet = await updateBets(id, updates,authToken.user);
        if (updBet.errors) {
          throw errorObj({_error: 'Could not update video'});
        }  
        return updBet;
      }else{
        throw errorObj({_error: 'Could not update'});
      }
    }
  },
  removeBet: {
    type: graphql.GraphQLBoolean,
    args: {
      bet: {type: new graphql.GraphQLNonNull(UpdateBet)}
    },
    async resolve(source, {bet}, {authToken}) {     
      const auth = isLoggedIn(authToken);
      if(auth){
        const {id} = bet;
        const rmBet = await removeBets(id,authToken.user);
        if (rmBet.errors) {
          throw errorObj({_error: 'Could not remove'});
        }  
        return true;
      }else{
        return false;
      }      
    }
  },
};

var fightFences$1 = {
  addFightFence: {
    type: FightFences,
    args: {
      fightFence: {type: new graphql.GraphQLNonNull(NewFightFence)}
    },
    async resolve(source, {fightFence}, {authToken}) {
      if(authToken.user){
        fightFence.createdAt = new Date();
        if(!fightFence[`user`]){
          fightFence[`user`]={};
        }
        fightFence.user[authToken.user] = authToken.user;
        const newFightFence = await addFightFences(fightFence);
        if (newFightFence.errors) {
          throw errorObj$1({_error: 'Could not add video'});
        }  
        return newFightFence;
      }else{
        return {};
      }
    }
  },
  updateFightFence: {
    type: FightFences,
    args: {
      fightFence: {type: new graphql.GraphQLNonNull(UpdateFightFence)}
    },
    async resolve(source, {fightFence}, {authToken}) {   
      if(authToken.user){
        fightFence.updatedAt = new Date();        
        const {id, ...updates} = fightFence;
        const upd = await updateFightFences(id, updates,authToken.user);        
        if (upd.errors) {
          throw errorObj$1({_error: 'Could not update video'});
        }
        return upd;
      }
      else{
        throw errorObj$1({_error: 'Could not update'});
      }
    }
  },
  removeFightFence: {
    type: graphql.GraphQLBoolean,
    args: {
      fightFence: {type: new graphql.GraphQLNonNull(UpdateFightFence)}
    },
    async resolve(source, {fightFence}, {authToken}) {     
      if(authToken.user){
        const {id} = fightFence;
        const rmFightFence = await removeFightFences(id,authToken.user);
        if (rmFightFence.errors) {
          throw errorObj$1({_error: 'Could not remove'});
        }  
        return rmFightFence;
      }else{
        return false;
      }      
    }
  },
};

var user$3 = {  
  updateUser: {
    type: Users$1,
    args: {
      user: {type: new graphql.GraphQLNonNull(UpdateUser$1)}
    },
    async resolve(source, {user}, {authToken}) {      
      if(authToken.user){
        user.updatedAt = new Date();
        const { ...updates} = user;
        const updUser = await updateUsers$1(authToken.user, updates);
        if (updUser.errors) {
          throw errorObj$1({_error: 'Could not update video'});
        }  
        return updUser;
      }else{
        throw errorObj$1({_error: 'Could not update'});
      }
    }
  },
  removeUser: {
    type: graphql.GraphQLBoolean,
    args: {
      user: {type: new graphql.GraphQLNonNull(UpdateUser$1)}
    },
    async resolve(source, {user}, {authToken}) {     
      if(authToken.user){
        const rmUser = await removeUsers$1(authToken.user);
        if (rmUser.errors) {
          throw errorObj$1({_error: 'Could not remove'});
        }  
        return rmUser;
      }else{
        return false;
      }      
    }
  },
};

var fights$1 = {
  addFight: {
    type: Fights,
    args: {
      fight: {type: new graphql.GraphQLNonNull(NewFight)}
    },
    async resolve(source, {fight}, {authToken}) {
      if(authToken.user){
        fight.createdAt = new Date();
        if(!fight[`user`]){
          fight[`user`]={};
        }
        fight.user[authToken.user] = authToken.user;
        const newFight = await addFights(fight,authToken.user);
        if (newFight.errors) {
          throw errorObj$1({_error: 'Could not add video'});
        }  
        return newFight;
      }else{
        return {};
      }
    }
  },
  updateFight: {
    type: Fights,
    args: {
      fight: {type: new graphql.GraphQLNonNull(UpdateFight)}
    },
    async resolve(source, {fight}, {authToken}) {
            
      if(authToken.user){
        fight.updatedAt = new Date();
        const {id, ...updates} = fight;
        const updFight = await updateFights(id, updates,authToken.user);
        if (updFight.errors) {
          throw errorObj$1({_error: 'Could not update video'});
        }  
        return updFight;
      }else{
        throw errorObj$1({_error: 'Could not update'});
      }
    }
  },
  removeFight: {
    type: graphql.GraphQLBoolean,
    args: {
      fight: {type: new graphql.GraphQLNonNull(UpdateFight)}
    },
    async resolve(source, {fight}, {authToken}) { 
      if(authToken.user){
        const {id} = fight;
        const rmFight = await removeFights(id,authToken.user);
        if (rmFight.errors) {
          throw errorObj$1({_error: 'Could not remove'});
        }  
        return true;
      }else{
        return false;
      }      
    }
  },
};

const rootFields$3 = Object.assign(cocks$1,fights$1,bets$1,user$3,judges$1,fightFences$1);

var mutation$1 = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields$3
});

var Schema$1 = new graphql.GraphQLSchema({query: query$1, mutation: mutation$1});

var httpGraphQLHandlerGallos = async (req, res) => {  
  const {q,k} =  req.body;  
  const fp = req.headers.authorization.split(`:`)[1];
  const authToken = decryptToken(req.headers.authorization.split(`:`)[0] ,true,fp) || {}; 
  var bytes = null;
  var basD = null;
  var NewBody =null;
  var rslt = '';
  if(fp){
    var kpass = CryptoJS.AES.decrypt(Base64$1.decode(k), fp).toString(CryptoJS.enc.Utf8);
    bytes = CryptoJS.AES.decrypt(Base64$1.decode(q), kpass);
    basD = bytes.toString(CryptoJS.enc.Utf8);    
  }
  if(basD && isJson$2(basD)){
    NewBody = JSON.parse(basD);
    const {query, variables, ...newContext} = NewBody;  
    
    const context = {authToken, ...newContext};  
    const result = await graphql.graphql(Schema$1, query, null, context, variables);
    if (result.errors) {
      console.log('DEBUG GraphQL Error:', result.errors);
      rslt = Base64$1.encode(JSON.stringify({status:500,errors: result.errors}).toString());
    }else{
      var pscd = genId$1();
      var _2sen = JSON.stringify(result);
      var rs = CryptoJS.AES.encrypt(_2sen, pscd).toString();
      var ky = CryptoJS.AES.encrypt(pscd, fp).toString();
      rslt = Base64$1.encode(JSON.stringify({status:200,r:rs,k:ky}).toString());     
    }    
  }else{
    rslt = Base64$1.encode(JSON.stringify({status:500,errors:'errors'}).toString());
  }
  res.send(rslt);
};

Object.defineProperty(exports, "__esModule", { value: true });
const _params = new Params();




class IndexRoute extends BaseRoute {
    constructor() {
        super(); 
    }             
    
    create(router) {        
        
        router.get("/getStatic/:id", (req, res, next) => {
            _params.getStatic(req, res, next);
        });

        router.post("/verifyToken", (req, res, next) => {
            _params.verifyToken(req, res, next);
        });
        
        router.post("/loginWithGoogle", (req, res, next) => {
            _params.loginWithGoogle(req, res, next);
        });

        
        router.post("/generateToken", (req, res, next) => {
            _params.generateToken(req, res, next);
        });   
       

        router.post("/GetScheduleAndEarningsByUser", (req, res, next) => {
            _params.GetScheduleAndEarningsByUser(req, res, next);
        });
        
        router.post("/checkForNewUser", (req, res, next) => {
            _params.checkForNewUser(req, res, next);
        });
        
     

        router.post("/streamdata", httpGraphQLHandler);

        router.post("/streamgallosfair", httpGraphQLHandlerGallos);
    }
}



/*

import multipart from 'connect-multiparty';  
const multipartMiddleware = multipart();
import grabber_lib from "./Grabber";
const grabber = new grabber_lib();

import AmazonTokenStrategy from './lwa'; 
import passport from 'passport'; 

var LWA = JSON.parse(_Cnst.Base64.decode(_Cnst.clv.LWA));
passport.use(new AmazonTokenStrategy({
    clientID: LWA.clientID,
    clientSecret: LWA.clientSecret,
    passReqToCallback: true
  }), function(req, accessToken, refreshToken, profile, next) {
    console.log(accessToken, refreshToken);  
    next();  
 })

*/

function SSE (req, res, next) {
	res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
  };
  res.sseSend = function(data) {    
    res.write("data: " + JSON.stringify(data) + "\n\n");
    res.flush();
  };
  /*res.flush = function flush(cb) {
    if (stream) {
      stream.flush(opts.flush, cb);
    }   
  }*/
  next();
}
// hectoricardom@yahoo.com

const _IndexRoute = new IndexRoute();

// npm install path express cors body-parser method-override





const app = express();


app.use(express.static(path.join(_root$$_, 'App', "public")));
app.get('/', (req, res) => {                   
  const tt = path.join(_root$$_, 'App','index.html');
  res.sendFile(tt);
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({ origin: true, credentials: true }));


app.use(methodOverride());
app.use(function (err, req, res, next) {            
    err.status = 404;
    next(err);
});
//app.use(cookieParser())        
app.use(SSE);

app.get("/date", async (req, res) => {  
  res.json({data:"fsd"});
});

let router;
router = express.Router();
_IndexRoute.create(router);
app.use(router);

app.listen(7258, () => console.log("running on 7258"));
