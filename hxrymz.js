'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
require('graphql');
var CryptoJS = _interopDefault(require('crypto-js'));
var cors = _interopDefault(require('cors'));
var bodyParser = _interopDefault(require('body-parser'));
var methodOverride = _interopDefault(require('method-override'));
var plivo = _interopDefault(require('plivo'));
var nodemailer = _interopDefault(require('nodemailer'));
var adminfbs = require('firebase-admin');
var request = _interopDefault(require('request'));

// var execN = _interopDefault(require('child_process'));

// const _config = require('./config.json');

var _root$$_ = "E:/newProject/Monorepo/AmzFlx/server/";
_root$$_ = "/home/ubuntu/hxrymz/";

var _portNew_ = 7258;
var _host_ = "localhost";

var _fs$$_ = require('fs');
var execN = require('child_process');
var _exec$$_ = execN.exec;




function get_portNew_() {
  return _portNew_;
}


function get_exec$$_() {
  return _exec$$_;
}


function get_root$$_() {
  return _root$$_;
}

function get_fs$$_() {
  return _fs$$_;
}


function get_Host_() {
  return _host_;
}





//_root$$_ = "/home/ubuntu/graber_flx/";

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


function isJson(s) {
  var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
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


/*



export function validateVersion2() {
  let rslt = false;
  if(_Master_k$e$y_){
    if(licenceValidate["signature"]){
      let _auth = licenceValidate["auth"];
      let hh = Math.floor((_auth["expire"] - (new Date()).getTime())/86400000);
      if(hh!==licenceDay){
        licenceDay = hh;
        console.log(`Su licencia expira en ${licenceDay} dias`);
        if(licenceDay<5){
          console.log(`Para obtener una nueva licencia abra el navegador en este direcion \n\n http://${_Cnst.get_Host_()}:${_port_}/requestKey \n\n`);
        }
      }
      if((new Date()).getTime()<_auth["expire"] && _auth["signature"]=== licenceValidate["signature"]){
        rslt = true;
      }
    }else{  
      let sn = getUUID();
      let r = Base64.decode(_Master_k$e$y_);
      if(isJson(r)){
        let lic = JSON.parse(r);        
        var kpass = CryptoJS.AES.decrypt(lic.key, sn).toString(CryptoJS.enc.Utf8);
        let _auth = CryptoJS.AES.decrypt(lic.auth, kpass).toString(CryptoJS.enc.Utf8);
        if(isJson(_auth)){
          licenceValidate["auth"] = JSON.parse(_auth);
          licenceValidate["signature"] = lic.signature;
          if((new Date()).getTime()<_auth["expire"] && _auth["signature"]=== licenceValidate["signature"]){
            rslt = true;
          }
        }
        else{
          console.log(`error en la licencia `+ sn);
        }
      }  
      else{
        console.log(`error en la licencia `+ sn);
      }
    } 
  }
  else{
    loadPemFile();
  }  
  return rslt;
}


/*


export 


function getKey(sn) {
  var pscd = generateUUID();
  var sgn = generateUUID();
  let exp = (new Date()).getTime()+_30day;
  let lic = {
    "sn":sn,
    "signature":sgn,
    "expire":exp
  }
  var _2sen = JSON.stringify(lic);
  var rs = CryptoJS.AES.encrypt(_2sen, pscd).toString();
  var ky = CryptoJS.AES.encrypt(pscd, sn).toString();
  let rslt = Base64.encode(JSON.stringify({signature:sgn,auth:rs,key:ky}).toString());  
  return rslt;
}


yunior -- "71C28570-D623-0000-0000-000000000000"



getKey("71C28570-D623-0000-0000-000000000000") 

*/

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

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
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

/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */
/*******************                HRMDB                 ************************ */ 
/********************************************************************************* */
/********************************************************************************* */
/********************************************************************************* */


function parseIndex(s) {
  if(s>=1000){
      return `${s}`;
  }else if(s<1000 && s>=100){
      return `0${s}`;
  }else if(s<100 && s>=10){
      return `00${s}`;
  }else {
      return `000${s}`;
  }  
}




//  

/**
     * HrmDb
     *          *
     *      database js object index
     *          *
     * @param {string} s  - The Collection Name.
     * 
     */





/*

Create a bucket and upload something into it




var isDateFolder = false;
let TodayFolderName = '';


var awsC = JSON.parse(Base64.decode(clv.AWSA));
var bucketName = clv.AS3_bucketName;
AWS.config.update({
    accessKeyId: awsC.id,
    secretAccessKey: awsC.key
});
var s3 = new AWS.S3();



function saveCollection2S3(fileName){   
  var _now = (new Date());
  let FolderName = `${_now.getFullYear()}@${_now.getMonth()+1}@${_now.getDate()}`;
  //let bucketFolder = `${bucketName}`;  
    var urlFile =  path.join(_Cnst.get_root$$_(),'data',fileName);
    if(fileName && _Cnst.get_fs$$_().existsSync(urlFile)){        
        _Cnst.get_fs$$_().readFile(urlFile, function (err, data) {
            var DateTime = Math.floor((new Date()).getTime()/300000);
            var params = {Bucket: bucketName, Key: `${FolderName}/${bucketName}_${DateTime}_${fileName}`, Body: data};
            s3.putObject(params, function(err, _data) {
                if(err){console.log(err);}
            }); 
        });
    } 
    if(isDateFolder && TodayFolderName === FolderName){

    }else{   
      
  }
       
}

*/





const rootPath = get_root$$_()+'data/';

var Collections = {};

var master = {};
var lastUpdate = {};

var levelObj = {};
var levelSimpleObj = {};


let masterParth = [
  'master',
  'masterIndexes',
  'Indexes',
  'masterSorts'
];


function currentIndex(name){
  if(Collections[name]){
    return Object.keys(Collections[name]).length -1;
  }else {
    return 0
  }
}  



function loadFile(name, dest, is2master){
  if(get_fs$$_().existsSync(dest)){
    if(is2master){
      master[name] = JSON.parse(get_fs$$_().readFileSync(dest,'utf8')); 
    }else {
      Collections[name] = JSON.parse(get_fs$$_().readFileSync(dest,'utf8')); 
    }
  }else {
    get_fs$$_().writeFileSync(dest, JSON.stringify({}));
    master[name] = {};
  }
}

  
class HrmDb {
    
    constructor() {
        //super(); 
        for(let i2 in masterParth){
          let pth = masterParth[i2];
          let dest = rootPath + pth + '.json';
          loadFile(pth, dest, 1);
        }
    }



    /**
     * createCollection : create or verify Collection
     *          *
     * @param {string} name  - The Collection Name.     
     */

    createCollection(name){
      let collPath = rootPath + name +"_"+ parseIndex(0) + '.json';
      loadFile(name, collPath,false);
    }
    

    /**
     * getCollection : load Collection
     *          *
     * @param {string} name  - The Collection Name.     
     */

    getCollection(name){
      let collPath0 = rootPath + name +"_"+ parseIndex(0) + '.json';
      if(!get_fs$$_().existsSync(collPath0)){      
        loadFile(name, collPath0, false);
      }
      let ks = Array.from(Array(20).keys());
      for(let i2 in ks){
        let inD = ks[i2];
        let collPath = rootPath + name +"_"+ parseIndex(inD) + '.json';
        if(get_fs$$_().existsSync(collPath)){
          if(!Collections[name]){
            Collections[name] = {};
          }
          Collections[name][inD] = JSON.parse(get_fs$$_().readFileSync(collPath,'utf8')); 
        }
      }
    }


    /**
     * find : return a Array of ID on Collection
     *          *
     * @param {string} s  - The Collection Name.     
     */


    find(name){
      let ks = Array.from(Array(20).keys());
      let fll = {};
      for(let i2 in ks){
        let inD = ks[i2];
        if(Collections[name] && Collections[name][inD]){
          fll = Object.assign({},fll,Collections[name][inD]);
        }
        let collPath = rootPath + name +"_"+ parseIndex(inD) + '.json';
        if(get_fs$$_().existsSync(collPath)){
          Collections[name][inD] = JSON.parse(get_fs$$_().readFileSync(collPath,'utf8')); 
        }
      }
      return fll
    }

   
    /**
     * findOne return specific object of Collection filtered by Id
     *          *
     * @param {string} name  - The Collection Name.
     * @param {string} iD - The ID value to compare.
     */


    findOne(name,iD){
      var rst = null;
      for(let ipth in Collections[name]){
        //let ipth = _MasterIndexes[name][i2]
        if(Collections[name] && Collections[name][ipth][iD]){
          rst = Collections[name][ipth][iD];
        }               
      }      return rst;
    }






    /**
     * push : insert a new record to Collection
     *          *
     * @param {string} name  - The Collection Name.  
     * @param {object} obj  - The data to save. 
     * @param {boolean} urg  - persist the collection instantly. 
     * @param {string} k - The ID value to compare.       
     */



    
    push(name,obj,urg,k){
      const currIndexDoc =  currentIndex(name);
      const key = k || genId();  
      const urgent = urg || false;
      obj.id = key;      
      var CDoc = {};
      if(!Collections[name]){
        Collections[name] = {};
      }
      if(Collections[name] && !Collections[name][currIndexDoc]){
        Collections[name][currIndexDoc] = {};
      }
      CDoc = Collections[name][currIndexDoc];
      const cDocLenght = JSON.stringify(CDoc).length+JSON.stringify(obj).length;
      if(cDocLenght>15000000){
          let collPath = rootPath + name +"_"+ parseIndex(currIndexDoc) + '.json';
          get_fs$$_().writeFileSync(collPath, JSON.stringify(CDoc));
          var Ndoc = {};
          Ndoc[key]={};
          Ndoc[key]=obj;
          let collNewPath = rootPath + name +"_"+ parseIndex(currIndexDoc+1) + '.json';
          get_fs$$_().writeFileSync(collNewPath, JSON.stringify(Ndoc));                
          //saveCollection2S3(_Master[s].path[nwInd].split('data/')[1]);
          //saveCollection2S3(MasterPath.split('data/')[1]);
      }
      else {
        CDoc[key]={};
        CDoc[key]=obj;
        Collections[name][currIndexDoc]=CDoc;
        if(urgent){
          lastUpdate[name] = new Date().getTime();
          let collPath = rootPath + name +"_"+ parseIndex(currIndexDoc) + '.json';
          get_fs$$_().writeFileSync(collPath, JSON.stringify(CDoc));
        }
        else {     
          let lupd = lastUpdate[name] || 0;
          if(new Date().getTime()-lupd>15000){
            lastUpdate[name] = new Date().getTime();
            let collPath = rootPath + name +"_"+ parseIndex(currIndexDoc) + '.json';
            get_fs$$_().writeFileSync(collPath, JSON.stringify(CDoc));
            //saveCollection2S3(_Master[s].path[currIndexDoc].split('data/')[1]);                
          } 
        }                     
      }
      this.addIndex(name,obj);
      return obj;
  }
  






/**
     * update : update a exist record on the Collection
     *          *
     * @param {string} name  - The Collection Name.  
     * @param {object} obj  - The data to save. 
     * @param {string} k - The ID value to compare.       
     */



    update(name,obj,k){
      const key = k;
      obj.id = key;       
      var currIndexDoc = 0;
      if(key){
        var CDoc = {}; 
        for(let ipth in Collections[name]){
          // let ipth = _MasterIndexes[name][i2]
          if(Collections[name] && Collections[name][ipth][key]){
            currIndexDoc = ipth;
            CDoc= Collections[name][ipth];
            CDoc[key] = obj;
          }               
        }       
        lastUpdate[name] = new Date().getTime();
        let collPath = rootPath + name +"_"+ parseIndex(currIndexDoc) + '.json';
        get_fs$$_().writeFileSync(collPath, JSON.stringify(CDoc));
      }  
      return obj;
  }




  /**
   * remove : delete a exist record on the Collection
   *          *
   * @param {string} name  - The Collection Name.
   * @param {string} k - The ID value to compare.       
   */

  remove(name,k){        
    const key = k;     
    var currIndexDoc = 0;
    if(key){
      var CDoc = {}; 
      for(let ipth in Collections[name]){
        //let ipth = _MasterIndexes[name][i2]
        if(Collections[name] && Collections[name][ipth][key]){
          // rst = Collections[name][ipth][iD];
          currIndexDoc = ipth;
          delete Collections[name][ipth][key];
          CDoc = Collections[name][ipth];
        }               
      }      lastUpdate[name] = new Date().getTime();
      let collPath = rootPath + name +"_"+ parseIndex(currIndexDoc) + '.json';
      get_fs$$_().writeFileSync(collPath, JSON.stringify(CDoc));
      return true; 
    }else {
      return false; 
    }
  }






/*****************************************************************************************************************************************************
 **************************************************************************************************************************************************** 
 **************************************************************************************************************************************************** 
 ****************************************************************************************************************************************************
 ***************************************************************************************************************************************************
 ****************************************************************************************************************************************************/



FindIndexes(coll,q1,p1,q2,p2,q3,p3){
  if(p3 && q3){
    let q3Path = path.join(get_root$$_(),`data/Indexes_${coll}_${q1}_${q2}_${q3}.json`);
    if(get_fs$$_().existsSync(q3Path)){
        let II2 = JSON.parse(get_fs$$_().readFileSync(q3Path,'utf8'));                 
        return II2[p1]?II2[p1][p2]?II2[p1][p2][p3]:{}:{};
    }else {
        return {};
    }
  }else if(p2 && q2){
      let q2Path = path.join(get_root$$_(),`data/Indexes_${coll}_${q1}_${q2}.json`);
      if(get_fs$$_().existsSync(q2Path)){
          let II2 = JSON.parse(get_fs$$_().readFileSync(q2Path,'utf8'));                 
          return II2[p1]?II2[p1][p2]:{};
      }else {
          return {};
      }
  }else if(p1 && q1){
      let q1Path = path.join(get_root$$_(),`data/Indexes_${coll}_${q1}.json`);
      if(get_fs$$_().existsSync(q1Path)){
          let II2 = JSON.parse(get_fs$$_().readFileSync(q1Path,'utf8')); 
        return II2[p1];
      }else {
          return {};
      }
  }else {
      return {};
  }
}






createIndexes(coll,level,level2,level3,level4){
  let _MasterIndexes = master["masterIndexes"];
  if(coll && !_MasterIndexes[coll]){
      _MasterIndexes[coll]={};           
  }
  if(coll && level && !_MasterIndexes[coll][level]){
      _MasterIndexes[coll][level]={};
    
  }
  if(coll && level && level2 && !_MasterIndexes[coll][level][level2]){
      _MasterIndexes[coll][level][level2]={};
  }
  if(coll && level && level2 && level3 && !_MasterIndexes[coll][level][level2][level3]){
      _MasterIndexes[coll][level][level2][level3]={};
  }
  if(coll && level && level2 && level3 && level4 && !_MasterIndexes[coll][level][level2][level3][level4]){
    _MasterIndexes[coll][level][level2][level3][level4]={};
  }
  let dest = rootPath + 'masterIndexes' + '.json';
  master["masterIndexes"] = _MasterIndexes;
  get_fs$$_().writeFileSync(dest, JSON.stringify(_MasterIndexes));
}





createSorts(coll,level){
  let _MasterSort = master["masterSorts"];
  if(_MasterSort){
    if(coll && !_MasterSort[coll]){
      _MasterSort[coll]={};           
    }
    if(coll && level && !_MasterSort[coll][level]){
      _MasterSort[coll][level]={};
    }
    let dest = rootPath + 'masterSorts' + '.json';
    master["masterSorts"] = _MasterSort;
    get_fs$$_().writeFileSync(dest, JSON.stringify(_MasterSort));
  }
}



/*****************************************************************************************************************************************************
 **************************************************************************************************************************************************** 
 **************************************************************************************************************************************************** 
 ****************************************************************************************************************************************************
 ***************************************************************************************************************************************************
 ****************************************************************************************************************************************************/



calcSorts(name,key,obj){
  let _MasterSort = master["masterSorts"];
  if(name && _MasterSort[name]){
    for(let sFld in _MasterSort[name]){

        //console.log(sFld,name,key)
        //sortObjectsByKey(name,obj,sFld)

    }           
  }
  return 1;
}


sortObjectsByKey(name,obj,_key) {
  const _th = this;
  let _list = Object.keys(obj);
  let arrSrt = _list.sort(function(a, b) {
    let objA = _th.findOne(name,a);
    let objB = _th.findOne(name,b);    
    if(objA && objB){
      if(objA[_key] < objB[_key]) { return -1; }
      if(objA[_key] > objB[_key]) { return 1; }
    }
    return 0;
  });
  return arrSrt;
}




calcLevel2(item,level,k,row){
  let lvl = "level2";
  for(let key2 in level){
    //let key2 = level[i22]
    if(key2){
      let keyComplx = k +'_'+ key2;
      if(!levelObj[lvl][keyComplx]){ levelObj[lvl][keyComplx] = {}; }
      if(!levelObj[lvl][keyComplx][row]){ levelObj[lvl][keyComplx][row] = {}; }
      if(levelObj[lvl][keyComplx] && levelObj[lvl][keyComplx][row]){
        let _row2 = item[key2];
        if(typeof _row2 ==="object" ){
          for(let o2Ind in _row2){
            // let o2Ind = _row3[i22]
            if(!levelObj[lvl][keyComplx][row][o2Ind]){ levelObj[lvl][keyComplx][row][o2Ind] = {}; }
            if(levelObj[lvl][keyComplx][row][o2Ind]){
              levelObj[lvl][keyComplx][row][o2Ind][item['id']]=1;
              let _level3 = level[key2];
              this.calcLevel3(item,_level3,k,key2,row,o2Ind);
            }
          }
        }else {
          if(!levelObj[lvl][keyComplx][row][_row2]){ levelObj[lvl][keyComplx][row][_row2] = {}; }
          if(levelObj[lvl][keyComplx][row][_row2]){
            levelObj[lvl][keyComplx][row][_row2][item['id']]=1;
            let _level3 = level[key2];
            this.calcLevel3(item,_level3,k,key2,row,_row2);
          }
        }
      }
    }
  }
}



calcLevel3(item,level,k,k2,row,row2){
  let lvl = "level3";
  for(let key2 in level){
    //let key2 = level[i22]
    if(key2){
      let keyComplx = k +'_'+ k2 +'_'+ key2;
      if(!levelObj[lvl][keyComplx]){ levelObj[lvl][keyComplx] = {}; }
      if(!levelObj[lvl][keyComplx][row]){ levelObj[lvl][keyComplx][row] = {}; }
      if(!levelObj[lvl][keyComplx][row][row2]){ levelObj[lvl][keyComplx][row][row2] = {}; }
      if(levelObj[lvl][keyComplx] && levelObj[lvl][keyComplx][row]  && levelObj[lvl][keyComplx][row][row2]){
        let _row3 = item[key2];
        if(typeof _row3 ==="object" ){
          for(let o2Ind in _row3){
            // let o2Ind = _row3[i22]
            if(!levelObj[lvl][keyComplx][row][row2][o2Ind]){ levelObj[lvl][keyComplx][row][row2][o2Ind] = {}; }
            if(levelObj[lvl][keyComplx][row][row2][o2Ind]){
              levelObj[lvl][keyComplx][row][row2][o2Ind][item['id']]=1;
              // let _level4 = level[key2]
              // calcLevel3(item,_level3,k,key2,row,o2Ind)
            }
          }
        }else {
          if(!levelObj[lvl][keyComplx][row][row2][_row3]){ levelObj[lvl][keyComplx][row][row2][_row3] = {}; }
          if(levelObj[lvl][keyComplx][row][row2][_row3]){
            levelObj[lvl][keyComplx][row][row2][_row3][item['id']]=1;
            // let _level4 = level[key2]
            // calcLevel3(item,_level3,k,key2,row,_row2)
          }
        }
      }
    }
  }
}



    
calcIndexesAll(name){

  var _th0 = this;
  var stt = (new Date()).getTime();
  let _MasterIndexes = master["masterIndexes"];
  var obj = {};
  levelObj["level2"] = {};
  levelObj["level3"] = {};
  var ArrColl =  _th0.find(name);
  for(let s in ArrColl){
    for(let key in _MasterIndexes[name]){
      //let key = ArrColl[i22]
      if(key){
        if(!obj[key]){ obj[key] = {}; }
        if(obj[key] && ArrColl[s] && ArrColl[s]["id"] && ArrColl[s][key]){
          let _row = ArrColl[s][key];
          if(_row){      
            if(typeof _row ==="object" ){
              for(let o2Ind in _row){
                // let o2Ind = _row[i23]
                if(!obj[key][o2Ind]){ obj[key][o2Ind] = {}; }
                if(obj[key][o2Ind]){
                  obj[key][o2Ind][ArrColl[s]['id']]=1;
                  let _level1 = _MasterIndexes[name][key];
                  this.calcLevel2(ArrColl[s],_level1,key,o2Ind);
                }
              }
            }else {
              if(!obj[key][_row]){ obj[key][_row] = {}; }
              if(obj[key][_row]){
                obj[key][_row][ArrColl[s]['id']]=1;
                let _level1 = _MasterIndexes[name][key];
                this.calcLevel2(ArrColl[s],_level1,key,_row);
              }
            }
          }
        }
      }
    }         
  }

  for(let key in _MasterIndexes[name]){
    // let key = _MasterIndexes[name][i2]
    if(key){
      let dest = rootPath + 'Indexes_' +name +'_'+key + '.json';
      this.calcSorts(name,key,obj[key]);
      get_fs$$_().writeFileSync(dest, JSON.stringify(obj[key]));
    }
  }
  if(levelObj['level2']){
    for(let key in levelObj['level2']){
      // let key = levelObj['level2'][i2]
      if(key){
        let dest = rootPath + 'Indexes_' +name +'_'+key + '.json';
        this.calcSorts(name,key,levelObj['level2'][key]);
        get_fs$$_().writeFileSync(dest, JSON.stringify(levelObj['level2'][key]));
      }
    }
  }
  if(levelObj['level3']){
    for(let key in levelObj['level3']){
      // let key = levelObj['level3'][i2]
      if(key){
        let dest = rootPath + 'Indexes_' +name +'_'+key + '.json';
        this.calcSorts(name,key,levelObj['level3'][key]);
        get_fs$$_().writeFileSync(dest, JSON.stringify(levelObj['level3'][key]));
      }
    }
  }
  obj = {};
  levelObj["level2"] = {};
  levelObj["level3"] = {};
  console.log("collection ", name ," calculating index duration: ", (new Date()).getTime() - stt , " in " , Object.keys(ArrColl).length , " rows");

}






addIndex(name,item){
  let _MasterIndexes = master["masterIndexes"];
  var obj = {};
  levelSimpleObj["level2"] = {};
  levelSimpleObj["level3"] = {};
  for(let key in _MasterIndexes[name]){
    //let key = ArrColl[i22]
    if(key){
      if(!obj[key]){ obj[key] = {}; }
      if(obj[key] && item && item["id"] && item[key]){
        let _row = item[key];
        if(_row){      
          if(typeof _row ==="object" ){
            for(let o2Ind in _row){
              // let o2Ind = _row[i23]
              if(!obj[key][o2Ind]){ obj[key][o2Ind] = {}; }
              if(obj[key][o2Ind]){
                obj[key][o2Ind][item['id']]=1;
                let _level1 = _MasterIndexes[name][key];
                this.calcLevelOneIndex2(item,_level1,key,o2Ind);
              }
            }
          }else {
            if(!obj[key][_row]){ obj[key][_row] = {}; }
            if(obj[key][_row]){
              obj[key][_row][item['id']]=1;
              let _level1 = _MasterIndexes[name][key];
              this.calcLevelOneIndex2(item,_level1,key,_row);
            }
          }
        }
      }
    }
  } 
  console.log(item["id"]);
  console.log('level1');
  for(let key in obj){   
    if(key){
      let dest = rootPath + 'Indexes_' +name +'_'+key + '.json';      
      if(get_fs$$_().existsSync(dest)){
        let II2 = JSON.parse(get_fs$$_().readFileSync(dest,'utf8')); 
        console.log(key);
        console.log(dest);
        if(levelSimpleObj['level2'][key]){
          console.log(obj[key]);
          let ss1 = Object.keys(levelSimpleObj['level2'][key])[0]
          console.log(ss1);
          //console.log(II2);
          //_Cnst.get_fs$$_().writeFileSync(dest, JSON.stringify(obj[key]));
        }
        II2 = null;
      }
    }
  }


  console.log('level2');
  if(levelSimpleObj['level2']){
    for(let key in levelSimpleObj['level2']){     
      if(key){
        let dest = rootPath + 'Indexes_' +name +'_'+key + '.json';   
        if(get_fs$$_().existsSync(dest)){
          let II2 = JSON.parse(get_fs$$_().readFileSync(dest,'utf8')); 
          console.log(key);
          console.log(dest);
          console.log('*****'); 
          if(levelSimpleObj['level2'][key]){
            console.log(levelSimpleObj['level2'][key]);
            let ss1 = Object.keys(levelSimpleObj['level2'][key])[0]
            let ss2 = Object.keys(levelSimpleObj['level2'][key][ss1])[0]
            console.log(ss1);
          console.log(ss2);
            //console.log(II2);
            //_Cnst.get_fs$$_().writeFileSync(dest, JSON.stringify(obj[key]));
          }
          //_Cnst.get_fs$$_().writeFileSync(dest, JSON.stringify(levelSimpleObj['level2'][key]));
          II2 = null;
        }
      }
    }
  }


  console.log('level3');
  if(levelSimpleObj['level3']){
    for(let key in levelSimpleObj['level3']){
      if(key){
        let dest = rootPath + 'Indexes_' +name +'_'+key + '.json';
        if(get_fs$$_().existsSync(dest)){
          let II2 = JSON.parse(get_fs$$_().readFileSync(dest,'utf8')); 
          console.log(key);
          console.log(dest);
          //console.log(II2);
          //_Cnst.get_fs$$_().writeFileSync(dest, JSON.stringify(levelSimpleObj['level3'][key]));
          II2 = null;
        }
      }
    }
  }


  obj = {};
  levelSimpleObj["level2"] = {};
  levelSimpleObj["level3"] = {};
}



calcLevelOneIndex2(item,level,k,row){
  let lvl = "level2";
  for(let key2 in level){
    //let key2 = level[i22]
    if(key2){
      let keyComplx = k +'_'+ key2;
      if(!levelSimpleObj[lvl][keyComplx]){ levelSimpleObj[lvl][keyComplx] = {}; }
      if(!levelSimpleObj[lvl][keyComplx][row]){ levelSimpleObj[lvl][keyComplx][row] = {}; }
      if(levelSimpleObj[lvl][keyComplx] && levelSimpleObj[lvl][keyComplx][row]){
        let _row2 = item[key2];
        if(typeof _row2 ==="object" ){
          for(let o2Ind in _row2){
            // let o2Ind = _row3[i22]
            if(!levelSimpleObj[lvl][keyComplx][row][o2Ind]){ levelSimpleObj[lvl][keyComplx][row][o2Ind] = {}; }
            if(levelSimpleObj[lvl][keyComplx][row][o2Ind]){
              levelSimpleObj[lvl][keyComplx][row][o2Ind][item['id']]=1;
              let _level3 = level[key2];
              this.calcLevelOneIndex3(item,_level3,k,key2,row,o2Ind);
            }
          }
        }else {
          if(!levelSimpleObj[lvl][keyComplx][row][_row2]){ levelSimpleObj[lvl][keyComplx][row][_row2] = {}; }
          if(levelSimpleObj[lvl][keyComplx][row][_row2]){
            levelSimpleObj[lvl][keyComplx][row][_row2][item['id']]=1;
            let _level3 = level[key2];
            this.calcLevelOneIndex3(item,_level3,k,key2,row,_row2);
          }
        }
      }
    }
  }
}



calcLevelOneIndex3(item,level,k,k2,row,row2){
  let lvl = "level3";
  for(let key2 in level){
    //let key2 = level[i22]
    if(key2){
      let keyComplx = k +'_'+ k2 +'_'+ key2;
      if(!levelSimpleObj[lvl][keyComplx]){ levelSimpleObj[lvl][keyComplx] = {}; }
      if(!levelSimpleObj[lvl][keyComplx][row]){ levelSimpleObj[lvl][keyComplx][row] = {}; }
      if(!levelSimpleObj[lvl][keyComplx][row][row2]){ levelSimpleObj[lvl][keyComplx][row][row2] = {}; }
      if(levelSimpleObj[lvl][keyComplx] && levelSimpleObj[lvl][keyComplx][row]  && levelSimpleObj[lvl][keyComplx][row][row2]){
        let _row3 = item[key2];
        if(typeof _row3 ==="object" ){
          for(let o2Ind in _row3){
            // let o2Ind = _row3[i22]
            if(!levelSimpleObj[lvl][keyComplx][row][row2][o2Ind]){ levelSimpleObj[lvl][keyComplx][row][row2][o2Ind] = {}; }
            if(levelSimpleObj[lvl][keyComplx][row][row2][o2Ind]){
              levelSimpleObj[lvl][keyComplx][row][row2][o2Ind][item['id']]=1;
              // let _level4 = level[key2]
              // calcLevel3(item,_level3,k,key2,row,o2Ind)
            }
          }
        }else {
          if(!levelSimpleObj[lvl][keyComplx][row][row2][_row3]){ levelSimpleObj[lvl][keyComplx][row][row2][_row3] = {}; }
          if(levelSimpleObj[lvl][keyComplx][row][row2][_row3]){
            levelSimpleObj[lvl][keyComplx][row][row2][_row3][item['id']]=1;
            // let _level4 = level[key2]
            // calcLevel3(item,_level3,k,key2,row,_row2)
          }
        }
      }
    }
  }
}








































createSorts22(coll,fields,level,level2,level3,level4){
  if(coll && !_MasterSorts[coll]){
    _MasterSorts[coll]={};           
  }
  
  if(coll && level){
    let _level1_ = `${coll}_${level}`;
    if(!_MasterSorts[coll][_level1_]){
      _MasterSorts[coll][_level1_] = fields;
    }
  } 

  if(coll && level2){
    let _level2_ = `${coll}_${level}_${level2}`;
    if(!_MasterSorts[coll][_level2_]){
      _MasterSorts[coll][_level2_] = fields;
    }
  } 
  
  if(coll && level3){
    let _level3_ = `${coll}_${level}_${level2}_${level3}`;
    if(!_MasterSorts[coll][_level3_]){
      _MasterSorts[coll][_level3_] = fields;
    }
  } 

  if(coll && level4){
    let _level4_ = `${coll}_${level}_${level2}_${level3}_${level4}`;
    if(!_MasterSorts[coll][_level4_]){
      _MasterSorts[coll][_level4_] = fields;
    }
  } 



  get_fs$$_().writeFileSync(MasterSortsPath, JSON.stringify(_MasterSorts));
}



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


    getdataCDAbyId(id){
        return _dataCDA[id];
    }

 
    sendEmail(msg){   
        get_exec$$_()('ls', function(fferr, istdout, istderr){	
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
        get_exec$$_()('ls', function(fferr, istdout, istderr){	
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


    updFireByKey(id,v){
        var _CollectionFB_Upd = `/hhh/${id}/params/`;  
        dbFirestore.collection(_CollectionFB_Upd).doc(id).update(v).then(doc=> { });    
    }

    updFireIsValidToken(id,v){
        var _CollectionFB_Upd = `/hhh/${id}/params/`;  
        dbFirestore.collection(_CollectionFB_Upd).doc(id).update({ isValidToken: v }).then(doc=> { });    
    }

    updFireMessageToken(id,v){
        var _CollectionFB_Upd = `/hhh/${id}/params/`;  
        dbFirestore.collection(_CollectionFB_Upd).doc(id).update({ frBsToken: v }).then(doc=> { });    
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


    /*
    getFiREBASEDATA33(){         
        dbFirestore.collection(_CollectionFB).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var s = doc.data();             
                _dataCDA[_id]=s;
            });
        });
    }
    */


}

var CLIENTS={};
const _Notifications = new Notifications();





function callNotifications() {  
    return _Notifications;
}

const resJsonFunc =(res,status,obj)=> {
  if (!res.finished) {
      res.status(status).jsonp(obj);
      res.finished = true;
  }
};
   

function send2C(id,data) {
  if(CLIENTS[id]){    
    CLIENTS[id].sse.sseSend(data); 
  }
}





const Hrmdb = new HrmDb();

function isJson$1(s) {
  var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
}

function isBase64(s) {
  var r =false;try{Base64$1.decode(s);r=true; }catch(e){r =false;}return r
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


function decryptTokenfromLoginId(token,Coll,fp) {  
  var data = null,msg=null;
  if(token){
    /*var bytes  = CryptoJS.AES.decrypt(Base64.decode(token), Skey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);        
    if(plaintext){  } */
    var Dt = new Date();      
    var k = Hrmdb.findOne(`Logins`,token);
    if(k){
      if(k.exp<Dt.getTime()){
        data = null;
        msg= {action:`TokenExpired`};
      }
      //else if(check && k.fp!==fp){       data = null; }
      else {
        var uk = Hrmdb.findOne(Coll,k.user);
        data = {};
        data["user"] = k.user;
        data["exp"] = k.exp;
        if(k && uk){
          data["isAdmin"] = uk["isAdmin"];
        }
      }
    }
    if(!data){
      send2C(fp,{data:msg});
    }
  }
  return data;
}



function decryptBody(fp,k,q) {
  let basD = null;
  if(fp){
    var kpass = decryptAESKEY(k, fp);
    basD = decryptAESKEY(q, kpass);    
  }
  return basD;
}




function encryptBody(fp,result,q) {
  let rslt = '';
  if(fp){
    var pscd = genId$1();
    var _2sen = JSON.stringify(result);
    var rs = generateAESKEY(_2sen, pscd);
    var ky = generateAESKEY(pscd, fp);
    rslt = {status:200,r:rs,k:ky};   
  }
  return rslt;
}








var AesUtil = function(keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
};

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const sizeKey = 128;


const  generateAESKEY = (d,k) => {
  var iv = CryptoJS.lib.WordArray.random(sizeKey/8).toString(CryptoJS.enc.Hex);
  var salt = CryptoJS.lib.WordArray.random(sizeKey/8).toString(CryptoJS.enc.Hex);
  var aesUtil = new AesUtil(sizeKey, 1000);
  var ciphertext = aesUtil.encrypt(salt, iv,k,d);
  var aesText = (iv + "::" + salt + "::" + ciphertext);
  var aesB64 = Encode_String(aesText);
  return aesB64;
};



const  decryptAESKEY = (d,k) => {
  let decryptedPassword =  Decode_String(d);
  var aesUtil = new AesUtil(sizeKey, 1000);
  let  result =  aesUtil.decrypt(decryptedPassword.split("::")[1], decryptedPassword.split("::")[0], k, decryptedPassword.split("::")[2]); 
  return result;
};


function Encode_String(str) { 
  let encodedData = Buffer.from(str).toString('base64');
  return encodedData
}

function Decode_String(str) {
  let decodedData = Buffer.from(str, 'base64').toString('utf8'); // output string in ascii character encoding. utf8 & other encoding can also be used
  if(isBase64(decodedData) && decodedData.split("::").length !== 3){
    decodedData = Buffer.from(decodedData, 'base64').toString('utf8');   
  }
  return decodedData
}

var _querys = {};

const updQueryStore = (k, func) => {
    _querys[k] = func;
};

const getQueryStore = (k) => {
    return _querys[k];
};

function validateFields(fields,item, params,fp){
    let _ddt={};
    if(item && fields){
        fields.map(_fldk=>{
            if(typeof _fldk === "string"){
                _ddt[_fldk]=item[_fldk];
            }else if(typeof _fldk === "object" && _fldk["query"]){
                if(_subQuerys[_fldk["query"]]){
                    _ddt[_fldk["name"]] =  getQueryStore(_fldk["query"])(_fldk,item,params,fp);
                }
                else {
                    _ddt[_fldk["name"]]=  null;
                }
            }
        });
    }    
    return _ddt;
}

var code_token = {};

const generateToken = (bdy) => {
    let res = null;
    let params = bdy["params"];
    var _email = params.email;
    const CollName = 'Cda';
    var tlt =Hrmdb.FindIndexes(CollName,'email',_email);
    let t = tlt && Object.keys(tlt);
    if(t && t[0]){
        var id = t[0];
        let Cda =Hrmdb.findOne(CollName,id);
        if(callNotifications().getdataCDAbyId(t[0]) && Cda["id"]){
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
            var phone_ = Cda.phoneNumber;
            var msg = `${tkCode} is your verification code.`;
            if(phone_){
                callNotifications().sendSMS(phone_,msg);
            }
            if(_email){
                let msgEmail = {
                    to: _email,
                    from: 'hxrymz@gmail.com',
                    subject: 'verification code',           
                    text: msg
                };            
                callNotifications().sendEmail(msgEmail);  
                let msgEmail2Admin = {
                    to: 'hectoricardom@gmail.com',
                    from: 'hxrymz@gmail.com',
                    subject: `verification code ${_email}`,              
                    text: msg
                };    
                callNotifications().sendEmail(msgEmail2Admin);
            }
            let l4phone = phone_ && phone_.substring(phone_.length-4, phone_.length);
            //_th.sendNotificationtoToken({"title": "VerificationCode", "body": `${msg} for ${_email}`});
            res = {status:200,msg:`token sent`,phone:l4phone || ""};
        }
        else {                
            res =  {status:505,err:`Access was denied -- Account Expired`};
        }
    }
    else {
        _res =  {status:502,err:`Access was denied -- Email not found`}; 
    }  
    return res         
};




const verifyToken = (bdy) => {
    let res = null;
    let params = bdy["params"];
    var tkCode = params.code;
    var lg_id = code_token[tkCode]; 
    if(lg_id && lg_id.exp && lg_id.exp>(new Date()).getTime()){
        var k =Hrmdb.findOne('Logins',lg_id.id);
        if(k && k.id){
            // var ciphertext = _Util.Base64.encode(CryptoJS.AES.encrypt(k.id, Skey).toString());
            delete code_token[tkCode];
            res = {token:k.id};
        }else {
            res = {err:`Access was denied -- Code Failed`};               
        }
    }else {
        res = {err:`Access was denied -- Code Failed`};
    }      
    return res 
};


const findUserbyId = (bdy,auth) => {
    let MCollection =  "Users";
    let fields = bdy["fields"];
    let params = bdy["params"];
    let _id = auth.user;
    let _ddt = null;
    const hdd =  Hrmdb.findOne(MCollection,_id);
    if(hdd){
        if(_id){
            _ddt={};
            var vfl = validateFields(fields,hdd,params,_id);
            _ddt[_id]= vfl;
        }
    }
    return _ddt;
};





const usersList = (bdy,auth) => {
    let _ddt = null;
    if(auth && auth.isAdmin){
        let MCollection =  "Cda";
        let fields = bdy["fields"];
        let params = bdy["params"];        
        _ddt=[];
        const hdd =  Hrmdb.find(MCollection);
        _ddt={};
        for(let ky in hdd){
            if(hdd[ky] && hdd[ky].id){
                var vfl = validateFields(fields,hdd[ky],params,auth.user);
                _ddt[ky]= vfl;
            }
        }
    }
    return _ddt;
};

const findbyIdCda = (bdy,auth) => {
    let _ddt = null;
    if(auth){
        let MCollection =  "Cda";
        let fields = bdy["fields"];
        let params = bdy["params"];
        let _id = auth.user;
    
        const hdd =  Hrmdb.findOne(MCollection,_id);
        if(hdd){
            if(_id){
                _ddt={};
                var vfl = validateFields(fields,hdd,params,_id);
                _ddt[_id]= vfl;
            }
        }
    }
    return _ddt;
};
























/*



app.post('/validate_hrm_ggl_token',  async (req, res) => {
    var CollectionUser = `User`;
    let idTk = req.query.tk;
    let autTk = Hrmdb$1.findOne('AuthCredentials',idTk);
    if(autTk && autTk.id){
      /*const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      *
     
      var fbIo =Hrmdb$1.FindIndexes(CollectionUser,'email',autTk.payload.email);
      var userId = null;
      var id = null;     
      Object.keys(fbIo?fbIo:{}).map(t=>userId=t);
      if(userId){
        id = userId;
        var tkCode = gen6CodeId$2();        
        var exp = (new Date()).getTime()+(180*24*3600000);
        var tk = {user:id,exp:exp,createdAt:(new Date()).getTime(),code:tkCode};
        var k =  Hrmdb$1.push(`Logins`,tk,true);
        var ciphertext = Base64.encode(CryptoJS.AES.encrypt(k.id, Skey$3).toString()); 
        res.status(200).jsonp({token:ciphertext});
      }
      else{
        let newUser = {"email":autTk.payload.email,"verified":true,name:autTk.payload.email}
        var Uid = Hrmdb$1.push(CollectionUser,newUser,true);
        id = Uid.id;
        var tkCode = gen6CodeId$2();        
        var exp = (new Date()).getTime()+(180*24*3600000);
        var tk = {user:id,exp:exp,createdAt:(new Date()).getTime(),code:tkCode};
        var k =  Hrmdb$1.push(`Logins`,tk,true);
        var ciphertext = Base64.encode(CryptoJS.AES.encrypt(k.id, Skey$3).toString()); 
        res.status(200).jsonp({token:ciphertext});
      }
    }else{
      res.status(403).jsonp({err:`Access was denied`});
    }
  })


  
const CLIENT_ID = "195275085181-0flv9tc2477p0kn8n9s3f980l43vtlni.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);






app.post('/', urlencodedParser, async (req, res) => {
  let _body = req.body;
  let _credential = _body.credential;
  const ticket = await client.verifyIdToken({
    idToken: _credential,
    audience: CLIENT_ID,
  });
  const payload =  ticket.getPayload();

  let IdA = genId();
  let obj2Save = {
    id:IdA,
    token:_credential,
    payload:payload
  }
  let autS = Hrmdb$1.push('AuthCredentials',obj2Save,true,IdA);

  const tt = path.join(_root$$_, 'App','auth.html');  
  var rs =_fs$$_.readFileSync(tt,'utf8');
  rs = rs.replace(`<body>`,`<body>
        <div hrm_ggl_data="${autS && autS.id?IdA:''}"  id="hrm_ggl_credential"></div>`
  );
  var nI = streamifier_createReadStream(rs);
  res.writeHead(200, { 'Content-Type': `text/html; charset=UTF-8`, 'Connection': 'keep-alive', "X-UA-Compatible": "IE=edge;chrome=1", "Accept-Ranges": "bytes" });
  nI.pipe(res);

  // res.status(200).jsonp({data:JSON.stringify(req)});
});




*/

Object.defineProperty(exports, "__esModule", { value: true });
const _Notifications$1 = new Notifications();


const Skey = '850217Steph';


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


var MC_Fld = path.join(get_root$$_());
var MC_Fld_Data = MC_Fld+'/data';
var MC_Fld_Static = MC_Fld_Data+'/static';




var CDA_amzn1_account = {};

var CDA_amzn1_account_file = MC_Fld_Data+`/cda.json`;
var CDA_operation ={};

var Interval_operation ={};

var last_reset = 0;




if(get_fs$$_().existsSync(CDA_amzn1_account_file)){                    
	CDA_amzn1_account = JSON.parse(get_fs$$_().readFileSync(CDA_amzn1_account_file,'utf8'));
}
else {
    get_fs$$_().writeFileSync(CDA_amzn1_account_file, JSON.stringify({}));
}




class Params {



    constructor() {
        var _th = this;
        get_exec$$_()('ls', function(err, istdout, istderr){

        }); 
        _Notifications$1.getFiREBASEDATARealTime(CDA_amzn1_account);
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
            if(userT2parse && isJson(userT2parse)){
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
                if(body && isJson(body)){
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
                        ciphertext = Base64$1.encode(CryptoJS.AES.encrypt(k.id, Skey).toString());
                    }else {
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
                        Hrmdb.calcIndexesAll('User');
                        let tk = {user:_nUser.id,exp:exp,createdAt:(new Date()).getTime()};
                        let k = Hrmdb.push(`Logins`,tk);
                        ciphertext = Base64$1.encode(CryptoJS.AES.encrypt(k.id, Skey).toString());                       
                    }
                    _th.resJsonFunc(res,200,{data:{token:ciphertext}});
                }else {
                    _th.resJsonFunc(res,200,{err:'access_token not valid'});
                }
            });
        }
        else {
            _th.resJsonFunc(res,200,{err:'bad request'});
        }       
    }





    






    loadIProfile(){
        var _th = this;
        Object.keys(CDA_amzn1_account).map(o2=>{
            var fi = Hrmdb.findOne('Cda',o2);
            if(!fi && o2!=="AEBMN5JGXGKHTDPSXDBSZDKWEAEA"){              
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
                if(body && isJson$1(body)){
                    p = JSON.parse(body);
                }
                if(p && p.person){
                    if(!Hrmdb.find('Cda')[_cda]){
                        var pr = p.person;
                        pr['active']=false;
                        Hrmdb.push('Cda',p.person,true,_cda);
                        Hrmdb.calcIndexesAll('Cda');
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
                else if(isJson$1(body)){
                    var p = JSON.parse(body);
                    if(p.Message){
                        _th.Upd_CDA_amzn1_account(_cda,'region',null);
                    }else {
                        var regionId = p.cdaDiscriminators.region;
                        _th.Upd_CDA_amzn1_account(_cda,'region',regionId);
                        _th.getServiceAreas(_tk,regionId);
                        _th.eligibleServiceAreas(_cda);                        
                    }
                }else {                    
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
                if(isJson$1(body)){
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
                    }else {
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
                if(isJson$1(body)){
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
        _Notifications$1.createfirebaseDoc(id,v); 
    }










    sendNotificationtoToken(notification){
        var tk = CDA_amzn1_account && CDA_amzn1_account["AEBMN5JGXGKHTDPSXDBSZDKWEAEA"] && CDA_amzn1_account["AEBMN5JGXGKHTDPSXDBSZDKWEAEA"]['frBsToken']?CDA_amzn1_account["AEBMN5JGXGKHTDPSXDBSZDKWEAEA"]['frBsToken']:null;
        tk && get_exec$$_()('ls', function(fferr, istdout, istderr){	
           _Notifications$1.sendNotification(tk,notification);         
        }); 
    }
    
    
    


    resJsonFunc(res,status,obj){
        if (!res.finished) {
            res.status(status).jsonp(obj);
            res.finished = true;
        }
    }






    GetTokenById(cad){ 
        var _dataCDA = _Notifications$1.getdataCDA();
        let _tk_ = _dataCDA[cad]?_dataCDA[cad]['token']:null;
        if(_dataCDA[cad] && _dataCDA[cad]["isActive"] && _dataCDA[cad]["isActive"]["active"]){
            return _tk_;
        }else {
            return null;
        }
    }
    



/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/
/*****************************************************************************************************************************************************/

    



    checkForNewUser() {
        let _uri = Base64$1.decode('aHR0cDovLzMuMTM2LjU0LjE1Nzo3MjU4L3JlZnJlc2hUb2tlbk1zZz9jb2RlPTg1MDIxNw==');    
        _uri && request({
            uri: _uri,	 
            method: 'POST'
            }, 
            function (err, res2, body) {
                var g = body;
                if(isJson$1(body)){
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
                //_th.resJsonFunc(res,200,{status:`ok`});
            }
        );
    }



    GetScheduleAndEarningsByUser(usr) {
        var _th = this;  
        usr && _th.GetSchedule(usr);
        usr && _th.GetEarnings(usr);
    }


//  "sudo cp -R /home/ubuntu/temp/hxrymz/data/static /home/ubuntu/hxrymz/data/static",

    getStatic(req, res, next) { 
        var id = req.params.id;
        var st = path.join(MC_Fld_Static,id); 
        var ext = id.split('.').pop();
        if (get_fs$$_().existsSync(st)) {
            var rs =get_fs$$_().createReadStream(st);
            let _extList = extList[ext]?extList[ext]:'application/octet-stream';
            res.writeHead(200, { 'Content-Type': _extList, 'Connection': 'keep-alive', "X-UA-Compatible": "IE=edge;chrome=1", "Accept-Ranges": "bytes" });
            rs.pipe(res);
        }
        else {
            if (!res.finished) {
                res.status(403).send(null);
                res.finished = true;
            }
        }
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
            if(body && isJson$1(body)){
                p = JSON.parse(body);
            }
            if(p && p.scheduledAssignments){ 
                p.scheduledAssignments.map(sck =>{
                    var _id = Base64$1.encode(`${sck.scheduledAssignmentId}__${cad}`);
                    var _day = Math.floor((new Date(sck['startTime']*1000)).getTime()/86400000);
                    var sckBlocks = {
                        pay:sck.bookedPrice.amount,
                        scheduledAssignmentId:sck.scheduledAssignmentId,
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
                Hrmdb.calcIndexesAll('ScheduledAssignments');
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
		if(body && isJson$1(body)){
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
            Hrmdb.calcIndexesAll('ServiceEarnings');
            Hrmdb.calcIndexesAll('DepositedEarnings');
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
        }else {
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





}



var lastPageToken = null;

function Upd_CDA_amzn1_account_file() {
    get_exec$$_()('ls', function(fferr, istdout, istderr){
        get_fs$$_().writeFileSync(CDA_amzn1_account_file,JSON.stringify(CDA_amzn1_account)); 
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








var extList = {
    webp:`image/webp`,
    jpg:`image/jpg`,    
    jpeg:`image/jpeg`,
    png:`image/png`,
    gif:`image/gif`,
    svg:'image/svg+xml',
    ts:`video/MP2T`,
    m3u8:`application/x-mpegURL`,
    mp4:`video/MP4`,
    m4a:`audio/MP4`,
    webm:`video/webm`,
    weba:`audio/webm`,
    m4s:`text/plain`,
    txt:`text/plain`,
    srt:`text/plain`,
    vtt:`text/plain`,
    js:`application/javascript; charset=UTF-8`,
    css:'text/css; charset=utf-8',
    mpd:'video/vnd.mpeg.dash.mpd',

   
    aac:'audio/aac',
    mp3:'audio/mpeg',
    wav:'audio/wav',


    


    xls:'application/vnd.ms-excel',
    xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt:'application/vnd.ms-powerpoint',
    pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    doc:'application/msword',
    docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pdf:'application/pdf',
    
   

    "7z":'application/x-7z-compressed',
    zip:'application/zip',
    xml:'application/xml',
    json:'application/json',
    html:`text/html; charset=UTF-8`

};

Object.defineProperty(exports, "__esModule", { value: true });
const _params = new Params();


const getHashCodeBtc = () => {
   return {}
};



const GetScheduleAndEarningsByUser = (bdy, auth) => {
   let userID = auth.user;
   let params = bdy["params"];
   if(auth && auth.isAdmin){
      userID = params.user;
   }
   _params.GetScheduleAndEarningsByUser(userID);
   return {status:`ok`};
};


const checkForNewUser = (bdy, auth) => {
   if(auth && auth.isAdmin){
      _params.checkForNewUser();
   }
   return {status:`ok`};
};




const addBlockByUser = (bdy, auth) => {
   let MCollection = "Blocks";
   let _ddt = null;
   let f2S = {};
   let _form = bdy["form"];
   let params = bdy["params"];
   let fields = bdy["fields"];
   let _now =new Date(params.now);
   f2S["createdAt"] = _now.getTime();
   f2S["user"] = auth["user"];
   f2S["endTime"] =_form["endTime"];
   f2S["priceAmount"] = _form["rateInfo"] && _form["rateInfo"]['priceAmount'];
   f2S["schedulingType"] =_form["schedulingType"];
   f2S["offerType"] =_form["offerType"];
   f2S["startTime"] =_form["startTime"];
   f2S["serviceAreaId"] =_form["serviceAreaId"];
   f2S["serviceTypeId"] =_form["serviceTypeId"];
   f2S["minuteHours"] =(_now.getHours() * 60) + _now.getMinutes();
   f2S["day"] = `${_now.getFullYear()}_${_now.getMonth()}_${_now.getDate()}`;
   const _nwV = Hrmdb.push(MCollection,f2S, true);
   const nd2 = JSON.stringify(_nwV);
   let _lg = JSON.parse(nd2);
   if(_lg){
      _ddt={};
      var vfl = validateFields(fields,_lg);
      _ddt[_lg.id]= vfl;
   }
   return _ddt;
};


const getBlockByUserbyDay = (bdy, auth) => {
   let _ddt = {};
   if(auth && auth.isAdmin){
      let params = bdy["params"];
      let fields = bdy["fields"];
      let MCollection = "Blocks";
      let tlt = Hrmdb.FindIndexes(MCollection,'user',params.user,'day',params["day"]);
      let _list2Rend =  tlt && Object.keys(tlt);
      _list2Rend && _list2Rend.map((_itm,_inD)=>{
         let _lg = Hrmdb.findOne(MCollection,_itm);
         var vfl = validateFields(fields,_lg,params);
         _ddt[_itm]= vfl;
      });
   }
   return _ddt;
 };


const getBlockByServiceArea = (bdy, auth) => {
   let _ddt = {};
   if(auth && auth.isAdmin){
      let params = bdy["params"];
      let fields = bdy["fields"];
      let MCollection = "Blocks";
      let tlt = Hrmdb.FindIndexes(MCollection,'serviceAreaId',params["serviceAreaId"]);
      let _list2Rend =  tlt && Object.keys(tlt);
      _list2Rend && _list2Rend.map((_itm,_inD)=>{
         let _lg = Hrmdb.findOne(MCollection,_itm);
         var vfl = validateFields(fields,_lg,params);
         _ddt[_itm]= vfl;
      });
   }
   return _ddt;
};


const getBlockByUserServiceArea = (bdy, auth) => {
   let _ddt = {};
   if(auth && auth.isAdmin){
      let params = bdy["params"];
      let fields = bdy["fields"];
      let MCollection = "Blocks";
      let tlt = Hrmdb.FindIndexes(MCollection,'user',params.user,'serviceAreaId',params["serviceAreaId"]);
      let _list2Rend =  tlt && Object.keys(tlt);
      _list2Rend && _list2Rend.map((_itm,_inD)=>{
         let _lg = Hrmdb.findOne(MCollection,_itm);
         var vfl = validateFields(fields,_lg,params);
         _ddt[_itm]= vfl;
      });
   }
   return _ddt;
};


const getScheduleByUser = (bdy, auth) => {
   let _ddt = {};
   let params = bdy["params"];
   let fields = bdy["fields"];
   let userID = auth.user;
   if(auth && auth.isAdmin){
      userID = params.user;
   }
   let MCollection = "ScheduledAssignments";
   let tlt = Hrmdb.FindIndexes(MCollection,'user',userID);
   let _list2Rend =  tlt && Object.keys(tlt);
   _list2Rend && _list2Rend.map((_itm,_inD)=>{
      let _lg = Hrmdb.findOne(MCollection,_itm);
      var vfl = validateFields(fields,_lg,params);
      _ddt[_itm]= vfl;
   });
   return _ddt;
 };



 
 const getDepositedByUser = (bdy, auth) => {
   let _ddt = {};
   let params = bdy["params"];
   let fields = bdy["fields"];
   let userID = auth.user;
   if(auth && auth.isAdmin){
      userID = params.user;
   }
   let MCollection = "DepositedEarnings";
   let tlt = Hrmdb.FindIndexes(MCollection,'user',userID);
   let _list2Rend =  tlt && Object.keys(tlt);
   _list2Rend && _list2Rend.map((_itm,_inD)=>{
      let _lg = Hrmdb.findOne(MCollection,_itm);
      var vfl = validateFields(fields,_lg,params);
      _ddt[_itm]= vfl;
   });
   return _ddt;
};

const getServiceEarningsByUser = (bdy, auth) => {
   let _ddt = {};
   let params = bdy["params"];
   let fields = bdy["fields"];
   let userID = auth.user;
   if(auth && auth.isAdmin){
      userID = params.user;
   }
   let MCollection = "ServiceEarnings";
   let tlt = Hrmdb.FindIndexes(MCollection,'user',userID);
   let _list2Rend =  tlt && Object.keys(tlt);
   _list2Rend && _list2Rend.map((_itm,_inD)=>{
      let _lg = Hrmdb.findOne(MCollection,_itm);
      var vfl = validateFields(fields,_lg,params);
      _ddt[_itm]= vfl;
   });
   return _ddt;
};
let AllowNotification = {
   "16":"FLEX_WORK",
   "38":"FLEX_EXCLUSIVE_OFFER",
   "39":"FLEX_INSTANT_OFFER",
   "40":"FLEX_SURGE_PRICE"
};


const FLEX_EXCLUSIVE_OFFER = (_userId) => {
   callNotifications().updFireByKey(_userId,{FLEX_EXCLUSIVE_OFFER:genId$1()});
   let data = callNotifications().getdataCDA();
   for(let i in data){
      if(i!==_userId && data[i] && data[i]["running"] && data[i]["isActive"] && data[i]["isActive"]["active"]){
         callNotifications().updFireByKey(i,{FLEX_EXCLUSIVE_OFFER:genId$1()});
      }
   }
};

const addNotificationbyCda = (bdy, auth) => {
   let _ddt = null;
   let _form = bdy["form"];   
   if(isJson(_form)){
      _form = JSON.parse(bdy["form"]);
   }
   let keyspl = _form["key"].split("|");
   let typeID = keyspl[2];
   if(AllowNotification[typeID]){
      let params = bdy["params"];
      let _userId = params["user"];
      if(typeID==="40" || typeID==="38"){
         FLEX_EXCLUSIVE_OFFER(_userId);
      }
      else if(typeID==="39"){
         callNotifications().updFireByKey(_userId,{FLEX_INSTANT_OFFER:genId$1()});
      }
      _form["user"] = _userId;
      _form["typeID"] = typeID; 
      let _now =new Date(_form["systemTime"]);
      _form["deviceNotID"] = keyspl[4];
      _form["day"] = `${_now.getFullYear()}_${_now.getMonth()}_${_now.getDate()}`;
      Hrmdb.push('Notification',_form, true);   
      calcNotificationIndexesAll();
   }
   return _ddt;
};




const getNotificationbyCda = (bdy, auth) => {
   let _ddt = {};
   let params = bdy["params"];
   let fields = bdy["fields"];
   let userID = auth.user;
   if(auth && auth.isAdmin){
      userID = params.user;
   }
   let MCollection = "Notification";
   let tlt = Hrmdb.FindIndexes(MCollection,'user',userID);
   let _list2Rend =  tlt && Object.keys(tlt);
   _list2Rend && _list2Rend.map((_itm,_inD)=>{      
      let _lg = Hrmdb.findOne(MCollection,_itm);
      /*
      if(!_lg['typeID']){
         let _form = _lg;
         let keyspl = _form["key"].split("|");
         _form["typeID"] = keyspl[2];
         _form["deviceNotID"] = keyspl[4];
         let _now =new Date(_form["systemTime"]);
         _form["day"] = `${_now.getFullYear()}_${_now.getMonth()}_${_now.getDate()}`;
         //_Util.Hrmdb.update(MCollection,_form,_itm);
      }
      */
      var vfl = validateFields(fields,_lg,params);
      _ddt[_itm]= vfl;
   });
   return _ddt;
};





const getNotificationbyCdaFilter = (bdy, auth) => {
   let _ddt = {};
   let params = bdy["params"];
   let fields = bdy["fields"];
   let userID = auth.user;
   if(auth && auth.isAdmin){
      userID = params.user;
   }
   let filters = params.filters;
   let filSpl = filters.split(":");
   let MCollection = "Notification";
   let tlt = Hrmdb.FindIndexes(MCollection,'user',userID,filSpl[0],filSpl[1]);
   let _list2Rend =  tlt && Object.keys(tlt);
   _list2Rend && _list2Rend.map((_itm,_inD)=>{
      let _lg = Hrmdb.findOne(MCollection,_itm);
      var vfl = validateFields(fields,_lg,params);
      _ddt[_itm]= vfl;
   });
   return _ddt;
 };

var time_bewtwen_Operations={};


 function calcNotificationIndexesAll(){
   let Collection = "Notification";
   if(!time_bewtwen_Operations[Collection]){
      time_bewtwen_Operations[Collection] = 0;
    }
    let _now = (new Date()).getTime();
    if(time_bewtwen_Operations[Collection]<_now){
      time_bewtwen_Operations[Collection] = _now + 25000;
      get_exec$$_()('ls', function(err, istdout, istderr){
         Hrmdb.calcIndexesAll(Collection);
      });
    }
 }

class GraphQuery {
    
    constructor() {
        get_exec$$_()('ls', function(err, istdout, istderr){
            Hrmdb.getCollection('Blocks');
            Hrmdb.getCollection('Cda');
            Hrmdb.getCollection('Logs');
            Hrmdb.getCollection('Regions');
            Hrmdb.getCollection('Logins');  
            Hrmdb.getCollection('Notification'); 
           
            
            

            Hrmdb.createIndexes('Logins','user');
            Hrmdb.createIndexes('Cda','email');

            Hrmdb.createIndexes('Blocks','day');           
            Hrmdb.createIndexes('Blocks','user');
            Hrmdb.createIndexes('Blocks','user','day','serviceAreaId');
            Hrmdb.createIndexes('Blocks','user','day');
            Hrmdb.createIndexes('Blocks','user','minuteHours');
            Hrmdb.createIndexes('Blocks','user','serviceAreaId');
            Hrmdb.createIndexes('Blocks','minuteHours','serviceAreaId');
            Hrmdb.createIndexes('Blocks','serviceAreaId','minuteHours');
            Hrmdb.createIndexes('Blocks','user','minuteHours','serviceAreaId');
            Hrmdb.createIndexes('Blocks','user','serviceAreaId','minuteHours');

            

            Hrmdb.createIndexes('Notification','day');           
            Hrmdb.createIndexes('Notification','user');
            Hrmdb.createIndexes('Notification','flags');
            Hrmdb.createIndexes('Notification','keys');
            Hrmdb.createIndexes('Notification','user','day');
            Hrmdb.createIndexes('Notification','user','flags');
            Hrmdb.createIndexes('Notification','user','keys');
            
            Hrmdb.createIndexes('Notification','user','typeID');
            Hrmdb.createIndexes('Notification','user','deviceNotID');



            Hrmdb.calcIndexesAll('Cda');
            Hrmdb.calcIndexesAll('Blocks');
            Hrmdb.calcIndexesAll('Logins'); 
            Hrmdb.calcIndexesAll('Logs');

            Hrmdb.calcIndexesAll('Notification');

            Hrmdb.getCollection('ServiceEarnings');  
            Hrmdb.getCollection('DepositedEarnings');  
            Hrmdb.getCollection('ScheduledAssignments');

            Hrmdb.createIndexes('ServiceEarnings','user');
            Hrmdb.createIndexes('DepositedEarnings','user');

            

            Hrmdb.createIndexes('ScheduledAssignments','user');
            Hrmdb.createIndexes('ScheduledAssignments','user','day');


            Hrmdb.calcIndexesAll('ServiceEarnings');
            Hrmdb.calcIndexesAll('DepositedEarnings');            
            Hrmdb.calcIndexesAll('ScheduledAssignments');           
            


            Hrmdb.getCollection('User');           
            Hrmdb.createIndexes('User','email');
            Hrmdb.createIndexes('User','isAdmin'); 
            Hrmdb.calcIndexesAll('User'); 
            



            

            updQueryStore("generateToken", generateToken);
            updQueryStore("verifyToken", verifyToken);
            updQueryStore("findUserbyId", findUserbyId);            
            updQueryStore("findbyIdCda", findbyIdCda);
            updQueryStore("usersList", usersList);


            updQueryStore("getHashCodeBtc", getHashCodeBtc);
            updQueryStore("GetScheduleAndEarningsByUser", GetScheduleAndEarningsByUser);
            updQueryStore("checkForNewUser", checkForNewUser);
            updQueryStore("addBlockByUser", addBlockByUser);
            updQueryStore("getBlockByUserServiceArea", getBlockByUserServiceArea);
            
            updQueryStore("getBlockByUserbyDay", getBlockByUserbyDay);
            
            updQueryStore("getScheduleByUser", getScheduleByUser);
            updQueryStore("getBlockByServiceArea", getBlockByServiceArea);
            updQueryStore("getDepositedByUser", getDepositedByUser);
            updQueryStore("getServiceEarningsByUser", getServiceEarningsByUser);
            updQueryStore("addNotificationbyCda", addNotificationbyCda);
            updQueryStore("getNotificationbyCda", getNotificationbyCda);
            updQueryStore("getNotificationbyCdaFilter", getNotificationbyCdaFilter);
            

            /***************************************************** 




            _Util.Hrmdb.getCollection('Remesas');
            _Util.Hrmdb.getCollection('BuyBitcoin');

            _Util.Hrmdb.createIndexes('Remesas','email');
            _Util.Hrmdb.createIndexes('Remesas','phoneNumber');
            _Util.Hrmdb.createIndexes('Remesas','currency');
            _Util.Hrmdb.createIndexes('BuyBitcoin','email');
            _Util.Hrmdb.createIndexes('BuyBitcoin','phoneNumber');

            _Util.Hrmdb.calcIndexesAll('Remesas');
            _Util.Hrmdb.calcIndexesAll('BuyBitcoin');
            
            updQueryStore("buyBitcoin", buyBitcoin);
            updQueryStore("addRemesa", addRemesa);

            */
        });
    }

    getMoviesbyCollection(bdy,auth) {
        let r = null;
        let _q = bdy["query"];
        if(getQueryStore(_q)){
            r = getQueryStore(_q)(bdy,auth);
        }
        return r;
    }

    dataHandler(req, res, next) {
        let {q,k, auth} =  req.body;
        const fp = req.headers.authorization && req.headers.authorization.split(`:`)[1]; 
        let result = {};
        if(auth && auth.authCode==="850217"){
            let bdy = req.body;
            let _ddt = this.getMoviesbyCollection(bdy,auth);
            if(_ddt){
                result = {data:_ddt};
            }
            else {
                result = {err:"no body present"};
            }
        }else {
            const authorization = req.headers.authorization && req.headers.authorization.split(`:`)[0];
            const authToken = authorization && decryptTokenfromLoginId(authorization ,"Cda",fp) || {};           
            if(authToken && authToken["exp"] && (new Date()).getTime()< authToken["exp"]){
                auth = authToken;
                const fbtk = req.headers.fbtkn;
                if(fbtk ){
                    let usFb = callNotifications().getdataCDAbyId(auth.user);
                    if(usFb && usFb["frBsToken"]!== fbtk){
                        callNotifications().updFireMessageToken(auth.user,fbtk );
                    }
                }
            }        
            let basD = decryptBody(fp,k,q);           
            if(basD && isJson(basD)){
                let bdy = JSON.parse(basD);  
                let _ddt = this.getMoviesbyCollection(bdy,auth);
                if(_ddt){
                    result = encryptBody(fp,{data:_ddt});
                }
                else {
                    result = encryptBody(fp,{err:"no body present"});
                }
            }else {
                result = encryptBody(fp,{err:"no body present"});
            }
        }
        resJsonFunc(res,200,result);
    }


    handleNotifications(req, res, next) {
        let {q,k, auth} =  req.body;
        let result = {};
        let bdy = req.body;
        let _ddt = this.getMoviesbyCollection(bdy,auth);
        if(_ddt){
            result = {data:_ddt};
        }
        else {
            result = {err:"no body present"};
        }
        resJsonFunc(res,200,result);
    }


    


    
    bitcoinsendEmail(req, res, next) {
       // buyBitcoinsendEmail()
        resJsonFunc(res,200,{});
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
const _GraphQuery = new GraphQuery();
const _params$1 = new Params();



class IndexRoute extends BaseRoute {
    constructor() {
        super(); 
    }             
    
    create(router) {        
        
        router.post("/streamdata", (req, res, next) => {
            _GraphQuery.dataHandler(req, res, next);
        });

        router.post("/handleNotifications", (req, res, next) => {
            _GraphQuery.handleNotifications(req, res, next);
        });

        router.get("/getStatic/:id", (req, res, next) => {
            _params$1.getStatic(req, res, next);
        });

        router.post("/loginWithGoogle", (req, res, next) => {
            _params$1.loginWithGoogle(req, res, next);
        });
    }
}

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

// import h5bp from "h5bp";



const _IndexRoute = new IndexRoute();

const app = express();
const _port_ = get_portNew_() ;

/*
app.use(h5bp({ root: path.join(_Cnst.get_root$$_(), 'App', "public")}));
app.use(express.compress());
*/
app.use(express.static(path.join(get_root$$_(), 'App', "public")));




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

// _Cnst.getKey("To be filled by O.E.M.")

let router;
router = express.Router();
_IndexRoute.create(router);

app.use(router);

app.listen(_port_, get_Host_(), () => console.log(`running on ${get_Host_()}:${_port_}`));
