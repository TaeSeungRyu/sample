
let video = document.getElementById('video') as HTMLVideoElement;
let canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D ;

if (navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true })
        .then( (stream) => { 

            const moveArray : Array<any> = [];
            canvas.addEventListener('mousemove', function (event) {
                var x = event.clientX - canvas.offsetLeft;
                var y = event.clientY - canvas.offsetTop;
                moveArray.push({x, y});
            }); 


            video.srcObject  = stream
            video.play()
            video.addEventListener('play', ()=>{

                setInterval(()=>{
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 4;
                    
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(canvas.width/4, canvas.height/4,canvas.width/2, canvas.height/2);
                    
                    
                    ctx.stroke();
                    ctx.closePath();
                    ctx.restore();

                    moveArray.forEach( (data : any )=> {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(data.x, data.y, 10, (Math.PI / 180) * 0,  (Math.PI / 180) * 360, false);
                        ctx.fillStyle = 'blue';
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();                        
                    });

                },1)

            }, false);
    	})
  		.catch( (error)=>{
          console.log(error);
        });
};
    
