
function scracth(_id, option = {}){
    const canvas = document.getElementById(_id)
    let ctx = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height
    let size = option.size || 20

    let row = height / size / 1.65
    let column = width / size / 1.65
    let maxSize = row * column

    let inSideArray = []
    let dataArray = []


    // //갯수 구한게 맞는지 확인식
    // for(let i=0;i < column;i++){
    //     for(let j=0;j < row;j++){
    //         _drawding(size + column * column * i , size + row * row * j)
    //     }
    // }

	//검은색으로 덮어둡니다.
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle='black'
    ctx.rect(0,0,width,height)
    ctx.fill()
    ctx.closePath()
    ctx.restore()      

    let stopDrawing = false
    let inter = null
    function _isInside(x1, y1){

        if(inSideArray.length >= maxSize){  //총 크기에 원이 다다른 경우
            stopDrawing = true  //그만그려

            let i = 1
            inter = setInterval(() => {  //페이드 인 아웃 효과 입니다
                ctx.save()
                ctx.beginPath()
                ctx.clearRect(0,0,width,height)
                ctx.rect(0,0,width,height)
                ctx.fillStyle = `rgba(0,0,0,${i})`
                ctx.fill()
                ctx.closePath()
                ctx.restore()                 
                
                if(i <= 0) {
                    clearInterval(inter)
                    inter = null
                }

                dataArray.forEach(item => {
                    ctx.save()
                    ctx.beginPath()
                    ctx.globalCompositeOperation= 'destination-out'
                    ctx.arc(item.x, item.y, size, (Math.PI/180)*0, (Math.PI/180)* 360 , false)
                    ctx.fill()
                    ctx.closePath()
                    ctx.restore()                      
                })
                i -= 0.1
            }, 50)
        }


        if(stopDrawing) return

        let check = inSideArray.filter(arg =>{  //조사합니다 대상원이 포함되는지
            let x = arg.x - x1
            let y = arg.y - y1
            let my_len = Math.sqrt(Math.abs(x * x) + Math.abs(y * y))
            return my_len < size
        })

        let json = {x : x1, y : y1, target: false}
        if(!check || check.length ==0){
            json.target = true
            inSideArray.push(json)  //대상원을 추가 합니다
        }
        dataArray.push(json)  //다시 그리기용(페이드인 아웃용) 배열에 넣습니다
    }

    //그리는 함수 입니다
    function _drawding(_x, _y){
        ctx.save()
        ctx.beginPath()
        ctx.globalCompositeOperation= 'destination-out'
        ctx.arc(_x, _y, size, (Math.PI/180)*0, (Math.PI/180)* 360 , false)
        ctx.fill()
        ctx.closePath()
        ctx.restore()  
    }    

    canvas.addEventListener('mousemove', (event) =>{
        if(!ctx || stopDrawing) return
        let x1 = event.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft
        let y1 = event.clientY - canvas.parentElement.offsetTop || canvas.offsetTop
        _isInside(x1, y1)
        _drawding(x1, y1)
    })
    
    return {
        reDraw : (arg)=>{
            if(!inter){
                //초기화를 합니다 && 그리기 입니다.
                ctx.save()
                ctx.beginPath()
                ctx.clearRect(0,0,width,height)
                ctx.rect(0,0,width,height)
                ctx.fillStyle = `rgba(0,0,0,1)`
                ctx.fill()
                ctx.closePath()
                ctx.restore()               
                stopDrawing = false
                inter = null
                inSideArray = inSideArray.filter( (arg)=> false)
                dataArray = dataArray.filter( (arg)=> false)
            }

            if(arg && arg instanceof Function){
                arg(stopDrawing)
                console.log(inter)
            }
        }
    }
}


let sct = scracth('canvas')


let btn = document.getElementById('btn')
btn.addEventListener('click', (event) =>{
    sct.reDraw( result=>{
        console.log(result)
    })
})
