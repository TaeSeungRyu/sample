const EVENT_TYPE = {
    "DOWN":"mousedown",
    "UP":"mouseup",
    "LEAVE":"mouseleave",
    "MOVE":"mousemove"
};

class DrawingCanvas{

    //생성자를 통해 캔버스 아이디를 받으며 context객체를 만듭니다.
    constructor(_id){
        this.canvas = document.getElementById(_id);
        this.ctx = this.canvas.getContext('2d');
    }

    get width(){
        return this.canvas.width;
    }

    get height(){
        return this.canvas.height;
    }    

    //화면을 지웁니다.
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        return this;
    }

    //초기 이미지를 설정 합니다. Promise객체를 반환하게 합니다.
    initImage(imgAddress){
        return new Promise( (succ, fail) =>{
            try {
                let img = new Image();   //이미지 생성
                img.src = imgAddress;
                img.onload = ()=>{
                    this.ctx.save();
                    this.ctx.drawImage(img, 0 , 0, this.width, this.height);
                    this.ctx.restore();            
                    succ();                      
                };                
            } catch (error) {
                fail(error);   
            }
        });
    }

    //이미지 범위를 계산 합니다.
    calculateImage(array=[]){
        return array.map( data => {
            let imageData  = this.ctx.getImageData(data.x, data.y, data.boxWidth, data.boxHeight);
            data.imgSrc = imageData;
            return data;
        });
    }

    //사각형을 그려줍니다.
    drawRect(x=null, y=null, width=null, height=null, option={}, imgSrc=null){
        if(isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) return;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(x,y,width,height);
        if(imgSrc){
            this.ctx.putImageData(imgSrc, x, y); //이미지 데이터가 존재 한 다면 넣어 줍니다.
        }           
        if(option.fillColor) this.ctx.fillStyle = option.fillColor;
        if(option.fillColor) this.ctx.fill();
        if(option.lineWidth) this.ctx.lineWidth = option.lineWidth;
        if(option.strokeColor) this.ctx.strokeStyle = option.strokeColor;
        if(option.strokeColor) this.ctx.stroke();  
   
        this.ctx.closePath();
        this.ctx.restore() ;
        return this;
    }

    //이벤트를 붙입니다.
    addEventListener(type, calback){
        let isOk = false;
        for(let _key in EVENT_TYPE){
            if(EVENT_TYPE[_key] == type){
                isOk = true;
            }
        }
        if(!isOk) return this;
        if(!calback || !(calback instanceof Function)) return new Error("check your calback function");
        this.canvas.addEventListener(type, (event) =>{
            let x = event.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft;
            let y = event.clientY - canvas.parentElement.offsetTop || canvas.offsetTop;              
            calback({x,y}, event);
        }); 
        return this; 
    }

    //이벤트 범위에 마우스가 왔는지 계산 합니다.
    calculateRectPos(pos, dataArray){
        let {x : x1, y : y1} = pos;
        if(isNaN(x1) || isNaN(y1) ) return;

        let result = false;
        let obj = {};
        dataArray.forEach((item, idx) => {
            let start_x = item.x;
            let end_x = item.x + item.boxWidth;
            let start_y = item.y;
            let end_y = item.y + item.boxHeight ;
            if(x1 >= start_x && x1 <= end_x){ //마우스의 위치가 사각형 시작넓이부터 종료넓이 범위이면서, 
                if(y1 >= start_y && y1 <= end_y){  //마우스의 위치가 사각형 시작높이부터 종료높이 범위라면,
                    obj = {...item, index : idx};  //비교를 위해 배열의 순서인 값을 index 키로 하여 넣어 줍니다.
                    result = true;
                }
            }
        });
        return {result, object : obj};
    }
 
    //배열의 순서를 무작위로 바꾸어 줍니다.
    shuffle(array, calback) {
        for (let index = array.length - 1; index > 0; index--) {
          // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
          const randomPosition = Math.floor(Math.random() * (index + 1));
      
          // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
          const temporary = array[index];
          array[index] = array[randomPosition];
          array[randomPosition] = temporary;
          if(calback && calback instanceof Function) {
            calback();
          }
        }
      }    
}

export {DrawingCanvas, EVENT_TYPE};
