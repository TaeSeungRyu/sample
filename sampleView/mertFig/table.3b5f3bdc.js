parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"DfTN":[function(require,module,exports) {
function t(t,r){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=o(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,i=!0,d=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return i=t.done,t},e:function(t){d=!0,f=t},f:function(){try{i||null==e.return||e.return()}finally{if(d)throw f}}}}function r(t){return a(t)||n(t)||o(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,r){if(t){if("string"==typeof t)return f(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?f(t,r):void 0}}function n(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function a(t){if(Array.isArray(t))return f(t)}function f(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,o=new Array(r);e<r;e++)o[e]=t[e];return o}for(var i=document.getElementById("canvas"),d=i.getContext("2d"),c={selected:"rgba(120, 220, 130, 0.4)",none:"rgba( 0, 0, 0, 0.005)"},u=i.width,l=i.height,s={row:20,column:20},m=[],p=new Map,y=0,b=0;b<s.row;b++)for(var h=0;h<s.column;h++){var v={idx:y,startTop:l*b/s.row,endTop:l*((b+1)/s.row),startLeft:u*h/s.column,endLeft:u*((h+1)/s.column),background:c.none,clicked:!1,order:[]};v.order=[{order_idx:0,draw:!0,from:[v.startLeft,v.startTop],to:[v.endLeft,v.startTop]},{order_idx:1,draw:!0,from:[v.endLeft,v.startTop],to:[v.endLeft,v.endTop]},{order_idx:2,draw:!0,from:[v.endLeft,v.endTop],to:[v.startLeft,v.endTop]},{order_idx:3,draw:!0,from:[v.startLeft,v.endTop],to:[v.startLeft,v.startTop]}],m.push(v),w(v),y+=1}function w(t){d.save(),d.beginPath(),t.background&&(d.moveTo(t.startLeft,t.startTop),d.fillStyle=t.background,d.fillRect(t.startLeft,t.startTop,t.endLeft-t.startLeft,t.endTop-t.startTop)),t.order.forEach(function(t){t.draw&&(d.moveTo(t.from[0],t.from[1]),d.lineTo(t.to[0],t.to[1]))}),d.stroke(),d.closePath(),d.restore()}function T(t,r){d.clearRect(0,0,u,l),m=m.map(function(e){return t>=e.startLeft&&t<=e.endLeft&&r>=e.startTop&&r<=e.endTop&&(e.clicked?(e.clicked=!1,e.background=c.none,p.delete(e.idx)):(e.background=c.selected,e.clicked=!0,p.set(e.idx,e)),e.order[0].draw=!0,e.order[1].draw=!0,e.order[2].draw=!0,e.order[3].draw=!0),w(e),e})}function g(t,r){return t[0]==r[0]&&t[1]==r[1]}function L(){new Map(r(p.entries()).sort()).forEach(function(r,e){var o=r.order,n=[];o.forEach(function(t,r){p.forEach(function(o,a){e!=a&&o.order.forEach(function(e){var o=g(t.from,e.from)&&g(t.to,e.to),a=g(t.from,e.to)&&g(t.to,e.from);(o||a)&&n.push(r)})})}),n.length>0&&(m=m.map(function(r){if(r.idx==e){var o,a=t(n);try{for(a.s();!(o=a.n()).done;){var f=o.value;r.order[f].draw=!1}}catch(i){a.e(i)}finally{a.f()}}return r}))})}i.addEventListener("click",function(t){T(t.clientX-i.offsetLeft,t.clientY-i.offsetTop)});var E=document.getElementById("MERGE");E.addEventListener("click",function(t){L(),d.clearRect(0,0,u,l),console.log(m),m.forEach(function(t){w(t)})});
},{}]},{},["DfTN"], null)
//# sourceMappingURL=/table.3b5f3bdc.js.map