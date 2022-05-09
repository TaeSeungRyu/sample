
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
let width = canvas.width
let height = canvas.height


let move_x1 = 0
let move_x2 = width //2번째 그림이 실행될 최초 위치(만약N개면 갯수만큼 곱하여 줍니다)

let img1 = new Image()
let img2 = new Image()

img1.src = 'test1.png'
img1.onload = function() {
    img2.src = 'test2.png'
    img2.onload = function() {
        todoDrawing()    
    }    
}



function todoDrawing(){
    let inter = setInterval(() => {
        ctx.clearRect(0,0,width, height)

        ctx.save()
        ctx.drawImage(img1, move_x1, 0, width, height)
        ctx.restore()
        
        ctx.save()
        ctx.drawImage(img2, move_x2, 0, width, height)
        ctx.restore()

        move_x1 -=1
        move_x2 -=1
        
        if(move_x1 <= -width) move_x1 = width  //좌측으로 전부 이동하면 위치를 변환하여 줍니다.
        if(move_x2 <= -width) move_x2 = width
    },10)
}
