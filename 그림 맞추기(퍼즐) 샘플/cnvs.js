const EVENT_TYPE = {
    "DOWN":"mousedown",
    "UP":"mouseup",
    "LEAVE":"mouseleave",
    "MOVE":"mousemove"
};

class DrawingCanvas{

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

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawRect(x=null, y=null, width=null, height=null, option={}){
        if(isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) return;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(x,y,width,height);
        if(option && option.fillColor) this.ctx.fillStyle = option.fillColor;
        if(option && option.fillColor) this.ctx.fill();
        if(option && option.lineWidth) this.ctx.lineWidth = option.lineWidth;
        if(option && option.strokeColor) this.ctx.strokeStyle = option.strokeColor;
        if(option && option.strokeColor) this.ctx.stroke();        
        this.ctx.closePath();
        this.ctx.restore() ;
    }

    addEventListener(type, calback){
        let isOk = false;
        for(let _key in EVENT_TYPE){
            if(EVENT_TYPE[_key] == type){
                isOk = true;
            }
        }
        if(!isOk) return;
        if(!calback || !(calback instanceof Function))return;
        this.canvas.addEventListener(type, (event) =>{
            let x = event.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft;
            let y = event.clientY - canvas.parentElement.offsetTop || canvas.offsetTop;              
            calback({x,y}, event);
        });  
    }

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
            if(x1 >= start_x && x1 <= end_x){ 
                if(y1 >= start_y && y1 <= end_y){
                    obj = {...item, index : idx};
                    result = true;
                }
            }
        });
        return {result, object : obj};
    }
}

export {DrawingCanvas, EVENT_TYPE};