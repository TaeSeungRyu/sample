import {DrawingCanvas, EVENT_TYPE} from './cnvs.js';


let cnvs = new DrawingCanvas('canvas');

let dataArray = [];
const cubeSize = 4;
for(let i=0; i < cubeSize;i++){
    for(let j=0; j < cubeSize;j++){
        let pos = {x : cnvs.width * j / cubeSize, y : cnvs.height * i / cubeSize};  //넒이와 높이로 사각형 그리는 구간 만들자!!, boxWidth와 boxHeigh값도 필요하다
        pos = {...pos, boxWidth : cnvs.width/cubeSize, boxHeight : cnvs.height/cubeSize};
        dataArray.push(pos);
        cnvs.drawRect(pos.x, pos.y, cnvs.width/cubeSize, cnvs.height/cubeSize,
            {fillColor : 'rgba(111,22,111,0.15)', strokeColor:'red', lineWidth : 1}
        );
    }
}

cnvs.addEventListener(EVENT_TYPE.MOVE, (pos, event)=>{
    let inData = cnvs.calculateRectPos(pos, dataArray);
    console.log(pos, inData);
});