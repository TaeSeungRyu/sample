import {DrawingCanvas, EVENT_TYPE} from './cnvs.js';


let cnvs = new DrawingCanvas('canvas');  //캔버스 클래스를 가져 옵니다.
let dataArray = [];
const cubeSize = 4; //사각형 갯수입니다(가로4, 새로4 = 총 16)

const gridOption = {fillColor : 'rgba(111,22,31,0.02)', strokeColor:'red', lineWidth : 2}; //기본 사각형 색상 옵션입니다.
const hoverOption = {fillColor : 'rgba(91,135,157,0.65)', strokeColor:'green', lineWidth : 1};  //드래그 이벤트 발생시 효과부여 옵션 입니다.
const rightAnswerOption = {fillColor : 'rgba(51,134,111,0.5)', strokeColor:'blue', lineWidth : 2};  //정답시 칠할 색깔 옵션 입니다.

let boxWidth = cnvs.width/cubeSize;
let boxHeight = cnvs.height/cubeSize;



cnvs.initImage('test.png').then( ()=>{  //이미지를 가져옵니다.

    //영역을 계산하는 함수 입니다. i와 j변수로 열과 행을 만들어 줍니다.
    function makeBox(calback){
        let cursor = 0;
        for(let i=0; i < cubeSize;i++){
            for(let j=0; j < cubeSize;j++){
                let pos = {x : cnvs.width * j / cubeSize, y : cnvs.height * i / cubeSize};  
                pos = {...pos, boxWidth : boxWidth, boxHeight : boxHeight, origin : null, realIndex : dataArray.length};
                if(calback && calback instanceof Function) {
                    calback(pos, cursor);
                }
                cursor+=1;
            }
        }        
    }

    //처음 사각형 구역을 만들어 줍니다.
    makeBox( (pos)=>{
        dataArray.push(pos);
        cnvs.drawRect(pos.x, pos.y, boxWidth, boxHeight, gridOption);
    });

    cnvs.calculateImage(dataArray);  //이미지를 배열 데이터에 포함시킵니다.

    //이벤트를 정의 합니다.
    let isDown = false;
    let compareObject = {};
    let goback = ()=>dataArray.forEach( arg=> { //그릴때 사용할 공통 기능입니다.
        let fillOption = gridOption;
        if(arg.newOption) fillOption = arg.newOption;
        cnvs.drawRect(arg.x, arg.y, boxWidth, boxHeight, fillOption, arg.imgSrc); 
    });
    
    cnvs.addEventListener(EVENT_TYPE.MOVE, pos=>{  //움직임 이벤트
        if(!isDown) return;
        cnvs.clear();
        goback();
        cnvs.drawRect(pos.x-boxWidth/2, pos.y-boxHeight/2, boxWidth, boxHeight, hoverOption);
    }).addEventListener(EVENT_TYPE.DOWN, pos =>{  //마우스가 다운된 경우,
        let inData = cnvs.calculateRectPos(pos, dataArray);
        compareObject.downObject = inData;       
        isDown = true;
    }).addEventListener(EVENT_TYPE.UP, pos=>{  //드래그&드랍 효과가 끝난 경우(업)
        let upObject = cnvs.calculateRectPos(pos, dataArray).object;
        
        isDown = false;

        let {object : down} =compareObject.downObject;

        if(down.index != upObject.index){  //자기 자신에게 드래그앤드랍이 된 경우가 아니라면,
            //#1.드래그하여 드랍된 이미지의 좌표를 바꿉니다.
            let {x : x1, y : y1} = dataArray[down.index];
            let {x : x2, y : y2} = dataArray[upObject.index];

            dataArray[down.index].x = x2;
            dataArray[down.index].y = y2;
            dataArray[upObject.index].x = x1;
            dataArray[upObject.index].y = y1;

            //#2.배열 위치 바꾸기
            let tmp = dataArray[down.index];
            dataArray[down.index] = dataArray[upObject.index];
            dataArray[upObject.index] = tmp;


            //#3.바꾼 인덱스와 실제 인덱스를 비교해서 정답인지를 확인하여 색상을 추가하여 정답표시를 해 줍니다.
            //먼저 null로 초기화를 하고,
            dataArray[upObject.index].newOption = null;
            dataArray[down.index].newOption = null;

            //업과 다운된 인덱스를 비교하여 실제 인덱스로 정상적으로 온 경우라면 올바른 표시를 추가 합니다.
            if(Number(upObject.index) == Number(down.realIndex) ) dataArray[upObject.index].newOption = rightAnswerOption;
            if(Number(down.index) == Number(upObject.realIndex) ) dataArray[down.index].newOption = rightAnswerOption;        
        }

        cnvs.clear();
        goback(); 
    }).addEventListener(EVENT_TYPE.LEAVE, pos=>{  //마우스가 벗어난 경우
        isDown = false;
        cnvs.clear();
        goback();  
    });

    //구역 섞기 기능을 추가 합니다.
    const suffleButton = document.getElementById("suffle");
    suffleButton.addEventListener('click',()=>{
        cnvs.shuffle(dataArray,()=>{
            //좌표값을 인덱스 순서로 바꾸어 줍니다.
            makeBox( (pos, cursor)=>{
                if(dataArray[cursor].origin == null){
                    let {x : _x,y : _y} = dataArray[cursor];
                    dataArray[cursor].origin = {x : _x, y: _y};
                }
                dataArray[cursor].x = pos.x;
                dataArray[cursor].y = pos.y;
                dataArray[cursor].newOption = null;
            });
 
            cnvs.clear();
            goback();           
        });  
    });

    //결과보는 버튼
    const showResult = document.getElementById("showResult");
    showResult.addEventListener('click',()=>{
        let len = dataArray.filter( arg=>arg.newOption).length;
        console.log(`문제수 : ${dataArray.length}, 맞힌 갯수 : ${len}`);
    });
}).catch((err)=>console.log(err));
