

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D ;



const arc = new Path2D();
arc.arc(250, 250, 90, 0, Math.PI * 365, false);
ctx.save();
ctx.lineWidth = 20;
ctx.strokeStyle = 'red';
ctx.fill(arc);
ctx.stroke(arc);
ctx.restore();

const rect = new Path2D();
rect.rect(75,75,50,50);
ctx.save();
ctx.fillStyle = 'green';
ctx.fill(rect);
ctx.restore();

canvas.addEventListener('mousemove', function(event) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.lineWidth = 20;
    if (ctx.isPointInStroke(arc, event.offsetX, event.offsetY)) {
        ctx.strokeStyle = 'blue';
    }
    else {
        ctx.strokeStyle = 'red';
    }
    ctx.fill(arc);
    ctx.stroke(arc);
    ctx.restore();



    ctx.save();
    if (ctx.isPointInPath(rect, event.offsetX, event.offsetY)) {
        ctx.fillStyle = 'purple';
    }
    else {
        ctx.fillStyle = 'green';
    }
    ctx.fill(rect);
    ctx.restore();

}, false);
    
