import {DrawingCanvas, EVENT_TYPE} from './cnvs.js';


let cnvs = new DrawingCanvas('canvas');

console.log(EVENT_TYPE);

cnvs.drawRect(50,50,cnvs.height/2,cnvs.height/2,{fillColor : 'blue', strokeColor:'red', lineWidth : 5});

cnvs.addEventListener(EVENT_TYPE.MOVE, (pos, event)=>{
    console.log(pos);
});