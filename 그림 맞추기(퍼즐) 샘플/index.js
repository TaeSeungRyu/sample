import {DrawingCanvas, EVENT_TYPE} from './cnvs.js';


let cnvs = new DrawingCanvas('canvas');
let dataArray = [];
const cubeSize = 4;

const gridOption = {fillColor : 'rgba(111,22,111,0.15)', strokeColor:'red', lineWidth : 1};
const hoverOption = {fillColor : 'rgba(91,135,157,0.65)', strokeColor:'green', lineWidth : 1};

let boxWidth = cnvs.width/cubeSize;
let boxHeight = cnvs.height/cubeSize;

//사각형을 그려 줍니다.
for(let i=0; i < cubeSize;i++){
    for(let j=0; j < cubeSize;j++){
        let pos = {x : cnvs.width * j / cubeSize, y : cnvs.height * i / cubeSize};  //넒이와 높이로 사각형 그리는 구간 만들자!!, boxWidth와 boxHeigh값도 필요하다
        pos = {...pos, boxWidth : boxWidth, boxHeight : boxHeight};
        dataArray.push(pos);
        cnvs.drawRect(pos.x, pos.y, boxWidth, boxHeight, gridOption);
    }
}

//이벤트를 정의 합니다.
let isDown = false;
let goback = ()=>dataArray.forEach( arg=> cnvs.drawRect(arg.x, arg.y, boxWidth, boxHeight, gridOption) );
cnvs.addEventListener(EVENT_TYPE.MOVE, pos=>{  //움직임 이벤트
    if(!isDown) return;
    cnvs.clear();
    goback();
    cnvs.drawRect(pos.x-boxWidth/2, pos.y-boxHeight/2, boxWidth, boxHeight, hoverOption);
}).addEventListener(EVENT_TYPE.DOWN, pos =>{  //마우스가 다운된 경우,
    isDown = true;
}).addEventListener(EVENT_TYPE.UP, pos=>{  //드래그&드랍 효과가 끝난 경우(업)
    let inData = cnvs.calculateRectPos(pos, dataArray);
    console.log(pos, inData);
    isDown = false;
    cnvs.clear();
    goback(); 
}).addEventListener(EVENT_TYPE.LEAVE, pos=>{  //마우스가 벗어난 경우
    isDown = false;
    cnvs.clear();
    goback();  
});