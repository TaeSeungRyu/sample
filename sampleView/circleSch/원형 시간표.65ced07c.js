parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QCba":[function(require,module,exports) {
var t=this&&this.__spreadArray||function(t,e){for(var i=0,n=e.length,o=t.length;i<n;i++,o++)t[o]=e[i];return t},e=function(){function e(t,e,i){var n=this;this.hour12=[],this.map=new Map,this.childrenName=["sch_background","sch_eventer","printer_canvas"],this.resizeOnOff=!0,this.exportImage=function(t){t||(t="screenShot.png"),n.commonImgFun(null,t)},this.getImageData=function(t){n.commonImgFun(t,null)},this.option=i||{},this.option.beforWorking&&this.option.beforWorking(),this.option.lineColor||(this.option.lineColor="#dfdfdf"),this.option.lineWidth||(this.option.lineWidth=.3),this.option.circleColor||(this.option.circleColor="#dfdfdf"),this.option.circleWidth||(this.option.circleWidth=3),this.option.timeColor||(this.option.timeColor="black"),this.option.timeFontStyle||(this.option.timeFontStyle="10px sans-serif"),this.option.timeTextPadding||(this.option.timeTextPadding=0),this.option.innerFontColor||(this.option.innerFontColor="white"),this.option.innerFontStyle||(this.option.innerFontStyle="10px sans-serif"),this.option.innerTextPadding||(this.option.innerTextPadding=0),this.option.sectorWidth?this.option.sectorWidth>5&&(this.option.sectorWidth=3,console.log("부채꼴 테두리는 35이상을 줄 수 없습니다.")):this.option.sectorWidth=2,this.option.sectorColor||(this.option.sectorColor="white"),this.option.middleFontSize||(this.option.middleFontSize=14),this.option.middleFontPadding||(this.option.middleFontPadding=5),this.option.middleFontColor||(this.option.middleFontColor="#767676"),this.option.middleCicleRate||(this.option.middleCicleRate=.18),this._id=t,this.data=[{index:"A",name:"A스케줄",color:"rgba(211,14,12,0.7)",time:"02"},{index:"A",name:"A스케줄",color:"rgba(211,14,12,0.7)",time:"03"},{index:"A",name:"A스케줄",color:"rgba(211,14,12,0.7)",time:"04"},{index:"A",name:"A스케줄",color:"rgba(211,14,12,0.7)",time:"05"},{index:"A",name:"A스케줄",color:"rgba(211,14,12,0.7)",time:"08"},{index:"B",name:"B스케줄",color:"rgba(45,127,156,0.8)",time:"06"},{index:"B",name:"B스케줄",color:"rgba(45,127,156,0.8)",time:"07"},{index:"C",name:"C스케줄",color:"rgba(95,181,73,0.8)",time:"10"},{index:"C",name:"C스케줄",color:"rgba(95,181,73,0.8)",time:"11"},{index:"C",name:"C스케줄",color:"rgba(95,181,73,0.8)",time:"15"},{index:"C",name:"C스케줄",color:"rgba(95,181,73,0.8)",time:"16"},{index:"C",name:"C스케줄",color:"rgba(95,181,73,0.8)",time:"17"},{index:"C",name:"C스케줄",color:"rgba(95,181,73,0.8)",time:"18"},{index:"D",name:"D스케줄",color:"rgba(212,156,213,0.8)",time:"20"},{index:"D",name:"D스케줄",color:"rgba(212,156,213,0.8)",time:"21"},{index:"D",name:"D스케줄",color:"rgba(212,156,213,0.8)",time:"22"},{index:"D",name:"D스케줄",color:"rgba(212,156,213,0.8)",time:"23"},{index:"D",name:"D스케줄",color:"rgba(212,156,213,0.8)",time:"24"},{index:"E",name:"E스케줄",color:"rgba(177,46,201,0.8)",time:""}],this._init_()&&(this.build_fun(),this.build_fun2(),this.build_fun3(),window.onresize=function(e){if(console.log(n.resizeOnOff),n.resizeOnOff){var i=document.getElementById(t);for(var o in n.width=.8*i.clientWidth,n.height=.8*i.clientHeight,n.childrenName){var r=document.getElementById(n.childrenName[o]);r.width=n.width,r.height=n.height}n.radius=.3*n.width,n.makeHourLine(),n.drawCircleForArray()}})}return e.prototype._init_=function(){var t=this,e=document.getElementById(this._id);for(var i in this.width=.8*e.clientWidth,this.height=.8*e.clientHeight,e.style.position="relative",e.style.display="inline-block",this.childrenName){var n=document.createElement("canvas");n.id=this.childrenName[i],n.className="circle_canvas",n.width=this.width,n.height=this.height,e.appendChild(n)}var o=document.createElement("div");o.className="sch_item_box",e.appendChild(o);var r=document.getElementsByClassName("sch_item_box");if(this.map=new Map,this.data&&this.data.length>0&&(this.data.forEach(function(e){t.map.set(e.index,{name:e.name,color:e.color})}),this.map.forEach(function(t,e){var i=document.createElement("div");i.className="sch_item",i.style.color=t.color,i.innerText=t.name,i.setAttribute("clickedIndex",e),r[0].append(i)})),this.map.set("",""),this.option&&this.option.showPrinter){var a=document.createElement("button");a.innerText="디버깅 출력",a.addEventListener("click",function(e){t.printer()}),r[0].append(a)}var s=document.querySelectorAll(".sch_item");function d(t,e){var i=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(i," ").trim()}for(var h=function(e){var i=s[e];i.addEventListener("click",function(n){for(var o=0;o<s.length;o++)d(s[o],"imClicked");!function(t,e){t.className+=" "+e}(s[e],"imClicked"),t.clickedIndex=i.getAttribute("clickedIndex"),t.clickedColor=i.style.color})},l=0;l<s.length;l++)h(l);return!0},e.prototype.build_fun=function(){this.canvas=document.getElementById("sch_background"),this.ctx=this.canvas.getContext("2d"),this.radius=.3*this.width;for(var t=0;t<24;t++){var e=7+t;e>24&&(e-=24),e<10&&(e="0"+e);var i={idx:"",dataFill:!1,color:"",name:""};for(var n in this.data)this.data[n].time==e&&(i.idx=this.data[n].index,i.name=this.data[n].name,i.dataFill=!0,i.color=this.data[n].color);this.hour12.push({start:15*t,end:15*(t+1),display:e+"",index:i.idx,name:i.name,dataFilled:i.dataFill,filledColor:i.color})}this.makeHourLine()},e.prototype.build_fun2=function(){var t=this,e=!1,i=0;this.eventer=document.getElementById("sch_eventer"),this.event_ctx=this.eventer.getContext("2d"),setInterval(function(){e||t.drawCircleForArray()},1500),this.eventer.addEventListener("mousemove",function(i){var n=i.clientX-t.eventer.parentElement.offsetLeft,o=i.clientY-t.eventer.parentElement.offsetTop,r=t.isInsideArc(n,o);e&&r&&r.result&&!r.status.dataFilled&&t.clickedIndex&&(t.hour12[r.index].dataFilled=!0,t.hour12[r.index].filledColor=t.clickedColor,t.hour12[r.index].index=t.clickedIndex,t.hour12[r.index].name=r.status.name,t.drawCircleForArray())}),this.eventer.addEventListener("mousedown",function(t){e=!0,setTimeout(function(){i++},100)}),this.eventer.addEventListener("mouseup",function(n){e=!1,setTimeout(function(){if(i>1){var e=n.clientX-t.eventer.parentElement.offsetLeft,o=n.clientY-t.eventer.parentElement.offsetTop,r=t.isInsideArc(e,o).index;t.hour12[r].dataFilled=!1,t.hour12[r].index="",t.hour12[r].name="",t.drawCircleForArray()}i=0},250)})},e.prototype.build_fun3=function(){this.data&&this.data.length>0&&this.drawCircleForArray(),this.option.afterWorking&&this.option.afterWorking({timeData:this.hour12,group:new(Array.bind.apply(Array,t([void 0],this.map)))})},e.prototype.commonImgFun=function(t,e){var i=this,n=document.getElementById("printer_canvas"),o=n.getContext("2d"),r=this.canvas.toDataURL("image/png"),a=this.eventer.toDataURL("image/png");o.clearRect(0,0,this.width,this.height);var s=new Image;s.src=r,s.onload=function(){o.drawImage(s,0,0);var r=new Image;r.src=a,r.onload=function(){o.drawImage(r,0,0);var a=n.toDataURL("image/png");if(e){var s=document.createElement("a");s.download=e,s.href=a,s.click()}else t(a);i.drawCircleForArray(),o.clearRect(0,0,i.width,i.height)}}},e.prototype.sortObject=function(t){return Object.keys(t).sort().reverse().reduce(function(e,i){return e[i]=t[i],e},{})},e.prototype.makeHourLine=function(){var t=this;this.ctx.clearRect(0,0,this.width,this.height),this.drawCircle(this.ctx,0,360,!0),this.hour12.forEach(function(e){if(t.ctx.save(),t.ctx.beginPath(),t.option.lineShow){t.ctx.lineJoin="round",t.ctx.strokeStyle=t.option.lineColor,t.ctx.lineWidth=t.option.lineWidth,t.ctx.moveTo(t.width/2,t.height/2);var i=Math.cos(t.degreesToRadians(e.end))*t.radius+t.width/2,n=Math.sin(t.degreesToRadians(e.end))*t.radius+t.height/2;t.ctx.lineTo(i,n),t.ctx.stroke()}var o=Math.cos(t.degreesToRadians(e.end))*t.radius*1.2+t.width/2,r=Math.sin(t.degreesToRadians(e.end))*t.radius*1.2+t.height/2,a=t.ctx.measureText(e.display).width/2;t.ctx.fillStyle=t.option.timeColor,t.ctx.font=t.option.timeFontStyle,t.ctx.fillText(e.display,o-a-t.option.timeTextPadding,r),t.ctx.closePath(),t.ctx.restore()})},e.prototype.isInsideArc=function(t,e){var i=this,n=!1,o=this.width/2-t,r=this.height/2-e,a=Math.sqrt(Math.abs(o*o)+Math.abs(r*r));this.radius>=a&&(n=!0);var s=Math.atan2(r,o);s=180*s/Math.PI,s+=180;var d=-1,h=this.hour12.filter(function(t,e){return s>=t.start&&s<=t.end&&(d=e,i.map.get(t.index)&&(i.map.get(t.index)||console.log(d,t),t.name=i.map.get(t.index).name),!0)});return{result:n,degree:s,status:h[0],index:d}},e.prototype.drawCircle=function(t,e,i,n,o){t.save(),t.beginPath();var r=1;n||(t.moveTo(this.width/2,this.height/2),r=.98,this.option.sectorShow&&(360==i&&(i=360-this.option.sectorWidth/6),0==e&&(e=this.option.sectorWidth/10))),t.arc(this.width/2,this.height/2,this.radius*r,Math.PI/180*e,Math.PI/180*i,!1),o&&(t.fillStyle=o,this.option.sectorShow&&(t.lineWidth=this.option.sectorWidth,t.strokeStyle=this.option.sectorColor,t.stroke())),n?(t.lineWidth=this.option.circleWidth,t.strokeStyle=this.option.circleColor,t.stroke()):t.fill(),t.closePath(),t.restore()},e.prototype.drawCircleForArray=function(){var t=this;if(this.event_ctx.clearRect(0,0,this.width,this.height),this.hour12.forEach(function(e){e.dataFilled&&t.drawCircle(t.event_ctx,e.start,e.end,!1,e.filledColor)}),this.event_ctx.save(),this.event_ctx.beginPath(),this.event_ctx.arc(this.width/2,this.height/2,this.radius*i.middleCicleRate,Math.PI/180*0,Math.PI/180*360,!1),this.event_ctx.fillStyle=i.sectorColor,this.event_ctx.fill(),this.event_ctx.closePath(),this.event_ctx.restore(),this.option.middleFontOnOff){this.event_ctx.save(),this.event_ctx.beginPath();var e=this.updateclock(),n=this.event_ctx.measureText(e).width;this.event_ctx.fillStyle=this.option.middleFontColor,this.event_ctx.font="normal "+i.middleFontSize+"px sans-serif",this.event_ctx.fillText(e,this.width/2-n/2-this.option.middleFontPadding,this.height/2+3),this.event_ctx.fill(),this.event_ctx.closePath(),this.event_ctx.restore()}this.option.innerTextShow&&this.textMaker(!0)},e.prototype.textMaker=function(t){var e=this,n=Object.assign([],this.hour12),o=[],r="",a=-1,s="",d="";n.forEach(function(t,i){0==i?(r=t.index,a=t.start,s=t.filledColor,d=e.map.get(r).name):r!=t.index?(o.push({start:a,end:t.start,index:r,filledColor:s,name:d}),r=t.index,a=t.start,s=t.filledColor,d=e.map.get(r).name,i==n.length-1&&o.push({start:a,end:t.end,index:r,filledColor:s,name:d})):i==n.length-1&&o.push({start:a,end:t.start,index:r,filledColor:s,name:d})});Object.assign([],o);var h=o[0],l=o[o.length-1];return h.index===l.index&&(o[0].start=l.start,o.pop()),t&&o.forEach(function(t){if(""!=t.index){var n=Math.abs(t.end-t.start)/2;t.start>t.end&&(n=(360-t.start+t.end)/2);var o=t.start+n,r=Math.cos(e.degreesToRadians(o))*e.radius*.7+e.width/2,a=Math.sin(e.degreesToRadians(o))*e.radius*.7+e.height/2;e.event_ctx.save(),e.event_ctx.beginPath(),e.event_ctx.font=i.innerFontStyle,e.event_ctx.fillStyle=i.innerFontColor;var s=e.event_ctx.measureText(t.name).width;e.event_ctx.fillText(t.name,r-s-i.innerTextPadding,a),e.event_ctx.restore()}}),o},e.prototype.updateclock=function(){function t(t){return t<10?"0"+t:t}var e=new Date,i=e.getHours(),n=e.getMinutes();return i>12?i-=12:0===i&&(i=12),t(i)+":"+t(n)},e.prototype.degreesToRadians=function(t){return t*(Math.PI/180)},e.prototype.printer=function(){var t=Object.assign([],this.hour12);t.sort(function(t,e){return t.display>e.display}),t.forEach(function(t){var e=Number(t.display)-1;0==e?e=12:e<10&&(e="0"+e);var i=e+" ~ "+t.display+" : "+t.index;console.log(i)})},e.prototype.clearAll=function(){console.log("clean"),this.hour12.forEach(function(t){t.name="",t.dataFilled=!1,t.filledColor="",t.index=""}),this.drawCircleForArray()},e.prototype.getTimePureData=function(){return Object.assign([],this.hour12)},e.prototype.getTimeData=function(){var t=this;return Object.assign([],this.hour12).sort(function(t,e){return t.display-e.display}).map(function(e){return e.time=e.display,delete e.display,t.sortObject(e)})},e.prototype.getSummeryData=function(){var t=this,e=this.textMaker(!1);return this.sortObject(e.map(function(e){return e.name||(e.name=null,e.index=null),t.hour12.forEach(function(t){if(e.start==t.start){var i=Number(t.display)-1;i=i<10?"0"+i:i+"",e.startTime=i}e.end==t.end&&(e.endTime=t.display)}),e}))},e}(),i={beforWorking:function(){console.log("befor")},showPrinter:!0,lineColor:"#aaaaaa",lineWidth:.7,lineShow:!0,circleColor:"#aaaaaa",circleWidth:3,sectorShow:!1,sectorWidth:3,sectorColor:"white",timeColor:"#aaaaaa",timeFontStyle:"18px sans-serif",timeTextPadding:2,innerTextShow:!0,innerFontColor:"white",innerTextPadding:-15,innerFontStyle:"13px sans-serif",middleCicleRate:.18,middleFontOnOff:!0,middleFontSize:14,middleFontPadding:5,afterWorking:function(t){console.log("after",t)}},n=[],o=new e("myCanvas",n,i);module.exports.getTimePureData=function(){return o.getTimePureData()},module.exports.getTimeData=function(){return o.getTimeData()},module.exports.getSummeryData=function(){return o.getSummeryData()},module.exports.exportImage=function(t){return o.exportImage(t)},module.exports.getImageData=function(t){return o.getImageData(t)},module.exports.clearAll=function(){return o.clearAll()},module.exports.resizeOnOff=function(t){o.resizeOnOff=t};
},{}]},{},["QCba"], "rts06069")
//# sourceMappingURL=/원형%20시간표.8c33249f.js.map