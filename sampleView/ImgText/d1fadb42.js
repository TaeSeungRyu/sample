parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.data=void 0;var e=document.getElementById("txtBox");e.addEventListener("keyup",function(e){c(e.target.value)});var t=document.getElementById("exportImg");t.addEventListener("click",function(e){i()});var a=document.getElementById("myCanvas"),n=a.getContext("2d"),o=a.width,r=a.height,d=null,l=document.getElementById("file");function c(e){d?e&&e.length>0&&(n.clearRect(0,0,o,r),n.save(),n.drawImage(d,.1*o,.1*r,.8*o,.8*r),n.font="normal bold 20px gothic",n.fillStyle="#ff3723",e.match(/[^\r\n]+/g).forEach(function(e,t){n.fillText(e,.15*o,.45*r+21*t)}),n.restore()):alert("사진을 선택하여 주세요.")}function i(){var e=a.toDataURL("image/png");console.log(e);var t=e.replace("image/png","image/octet-stream");window.location.href=t}l.addEventListener("change",function(e){var t=new FileReader;t.onload=function(e){(d=new Image).src=e.target.result,d.onload=function(){n.save(),n.drawImage(d,.1*o,.1*r,.8*o,.8*r),n.restore()}},t.readAsDataURL(e.target.files[0])});var g={arg:1234,text:"abcd"};exports.data=g;
},{}]},{},["Focm"], null)
//# sourceMappingURL=/이미지가져와서%20글씨넣기.d1fadb42.js.map