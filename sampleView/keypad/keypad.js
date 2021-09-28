

function buildPad (target, txt){
    
    const canvas = document.getElementById(target)    
    const ctx = canvas.getContext('2d')
    const texter = document.getElementById(txt)   

    let calbackFun = null  //콜백함수
    let numArray = [ '⇐' ]
    let box = []

    let font = 'normal 35px gothic'
    let clickedColor = 'rgba( 172, 231, 243 , 0.4)'

    let WIDTH = canvas.width
    let HEIGHT = canvas.height

    function _init(reff){
        WIDTH = canvas.width
        HEIGHT = canvas.height

        if(reff)  {
            if(texter.value) {
                texter.value = ''
            } else {
                texter.innerHTML = ''           
            }            
        }

        box = []
        numArray = [ '⇐' ]

        let numbers = [0,1,2,3,4,5,6,7,8,9]
        while(true){  
            let cursor = parseInt(Math.random() * 10)
            if( cursor < 10 && numbers[cursor] != -1) {
                numArray.push(numbers[cursor])
                numbers[cursor] = -1
            }
            if(numbers.filter( _num => _num == -1).length == 10) break;
        }    
        numArray.push('↵')    

        let textIndex = 0
        let row = 0

        while(row < 3){  //박스를 완성 합니다.
            let colomn = 0
            while(colomn < 4){
                let x = WIDTH * colomn / 4
                let y = HEIGHT * row/3
                box.push({ x, y, text : numArray[textIndex] })
                colomn += 1
                textIndex += 1
            }
            row += 1
        }        

        commonDraw()
    }

    function commonDraw(showTarget, color){ 
        ctx.clearRect(0,0,WIDTH, HEIGHT)
        let boxWidth = WIDTH / 4
        let boxHeight = HEIGHT / 3
        box.forEach( item => {
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(item.x , item.y)
            ctx.strokeRect(item.x  , item.y, boxWidth , boxHeight)
            ctx.closePath()
            let txt = item.text + ''
            ctx.font = font
            let moreSize = ctx.measureText(txt).width / 2
            ctx.fillText(txt, item.x + boxWidth / 2 - moreSize  , item.y + boxHeight / 2 + 35/3)
            ctx.restore()
            if(showTarget && item.text == showTarget.text){ 
                ctx.save()
                ctx.beginPath()
                ctx.moveTo(item.x , item.y)
                ctx.fillStyle = color
                ctx.fillRect(item.x  , item.y, boxWidth , boxHeight)
                ctx.restore()
                setTimeout(() => {
                    commonDraw(null, null)  
                }, 100)
            }
        })
    }
    
    function isInside(x1, y1){
        let _data = null
        box.forEach( element => { 
            if(element.x <= x1 && x1 <= element.x + (WIDTH / 4)){
                if(element.y <= y1 && y1 <= element.y + (HEIGHT / 3)){
                    _data = element
                }
            }
        })
        let txt = _data.text
        if(texter.value) {
            if(txt == '⇐'){
                if(texter.value) texter.value = texter.value.substring(0, texter.value.length-1)
            } else if(txt == '↵'){
                if(calbackFun) calbackFun(texter.value)
            } else {
                texter.value = texter.value? texter.value + txt : txt
            }
        } else {  
            if(txt == '⇐'){
                if(texter.innerHTML) texter.innerHTML = texter.innerHTML.substring(0, texter.innerHTML.length-1)
            } else if(txt == '↵'){
                if(calbackFun) calbackFun(texter.innerHTML)
            }  else {
                texter.innerHTML = texter.innerHTML ? texter.innerHTML+ txt : txt
            }            
        }
        commonDraw(_data, clickedColor)
    }

    _init(false) 

    canvas.addEventListener('mousedown', function (event) {
        let x1 = event.clientX - canvas.parentElement.offsetLeft
        let y1 = event.clientY - canvas.parentElement.offsetTop
        isInside(x1, y1)
    }, false)    


    return {
        refresh : ()=> _init(true),
        enter : (calback) => calbackFun = calback
    }
}

let build = buildPad('canvas', 'target')

build.enter( (arg)=>{
    console.log(arg)
})


function refresh(){
    build.refresh()
}