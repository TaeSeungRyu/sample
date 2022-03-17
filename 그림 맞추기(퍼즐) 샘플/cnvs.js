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
        this.ctx.rect(0,0,width,height);
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
}

export {DrawingCanvas, EVENT_TYPE};