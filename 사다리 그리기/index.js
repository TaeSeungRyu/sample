
function ladder(_id, option = {}){
    const canvas = document.getElementById(_id)
    let ctx = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height
     
    let line = option.line || 5  //line

    let calback //콜백용 변수 입니다
    let data = [ ] //모든 데이터가 y축 기준으로 정렬된 배열 입니다
    let lineData = [ ]  //선이 그려지고 난 뒤에 보관되는 배열 입니다

    //마우스 다운여부 변수 입니다
    let isClicked = false
    //마우스가 다운되면서 그리는 경우 끝지점을 담는 변수 입니다
    let hoverPosition = {}    
    //마우스 다운인 경우에 처음 기록하는 시작지점 입니다
    let startBridge = null

    //기본 선 굵기와 색상 입니다
    let defaultLineWidth = 3
    let defaultLineColor = '#A6ABCA'

    _init()
    _drawLine()

    //초기화 함수 입니다
    function _init(){
        ctx.save()
        ctx.clearRect(0,0,width,height)
        ctx.restore()   
    }

    //맨 처음 선을 그려줍니다
    function _drawLine(){
        for(let i = 0 ; i < line ; i++){
            let startPosX = i / line * width + 1/line * width / 2
            ctx.save()
            ctx.beginPath()
            ctx.lineWidth = defaultLineWidth
            ctx.strokeStyle = defaultLineColor
            ctx.moveTo(startPosX, height * 0.1)
            ctx.lineTo(startPosX, height * 0.9)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()  
            let arr = [
                {x : startPosX, y : height * 0.1},
                {x : startPosX, y : height * 0.9}
            ]
            data.push(arr)
        }
        _sort()
    }

    //그림을 그리는 메인 함수 입니다
    function _drawDataLine(){
        
        //기둥 선을 먼저 그리고,
        for(let i = 0 ; i < line ; i++){
            let startPosX = i / line * width + 1/line * width / 2
            ctx.save()
            ctx.beginPath()
            ctx.lineWidth = defaultLineWidth
            ctx.strokeStyle = defaultLineColor
            ctx.moveTo(startPosX, height * 0.1)
            ctx.lineTo(startPosX, height * 0.9)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()  
        }

        //사용자가 그린 선분을 그려 줍니다
        lineData.forEach(item => {
            let {startBridge, endBridge} = item
            ctx.save()
            ctx.beginPath()
            ctx.lineWidth = defaultLineWidth
            ctx.strokeStyle = defaultLineColor
            ctx.moveTo(startBridge.x, startBridge.y)
            ctx.lineTo(endBridge.x, endBridge.y)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()              
        })
        _sort()
    }

    //y값을 기준으로 내림순으로 정렬 합니다
    function _sort(){
        data.map( arg=>{
            arg.sort((a, b) => a.y - b.y)
            return arg
        })
    }

    //선분을 연결하기 위한 인덱스를 만드는 함수 입니다
    function _makeid(length) {
        let result           = ''
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    //내부 판별 함수 입니다
    function _isInSide(x1,y1){
        let obj = {}
        let len = width * 3
        let targetIndex
        data.forEach( (element, i) =>{
            element.forEach(item => {
                let start_x = item.x
                let start_y = item.y
                let x = start_x - x1
                let y = start_y - y1
                let my_len = Math.sqrt(Math.abs(x * x) + Math.abs(y * y))  //가장 짧은 구간을 찾습니다
                if(my_len < len){
                    len = my_len
                    obj = item
                    targetIndex = i
                }
            })
        })
        return {object : obj, dataIndex : targetIndex}
    }

    //마우스가 움직일 때 이벤트 입니다
    canvas.addEventListener('mousemove', (event) =>{
        if(!ctx) return
        if(isClicked){ //마우스가 Down인 경우에만 동작하여 hover 효과를 그려 줍니다
            let x1 = event.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft
            let y1 = event.clientY - canvas.parentElement.offsetTop || canvas.offsetTop            
            _init()
            _drawDataLine()
            ctx.save()
            ctx.beginPath()
            ctx.lineCap = 'round'   
            ctx.lineJoin = 'round'
            ctx.lineWidth = 4.25
            ctx.strokeStyle = '#959595'
            ctx.moveTo(startBridge.originX, startBridge.originY)
            ctx.lineTo(x1, y1)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()              
        }
    })  

    //마우스 다운 이벤트
    canvas.addEventListener('mousedown', (event) =>{
        if(!ctx) return
        isClicked = true
        let x1 = event.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft
        let y1 = event.clientY - canvas.parentElement.offsetTop || canvas.offsetTop
        if(isClicked){
            let startTarget = _isInSide(x1,y1)  //시작점을 기록 합니다
            startBridge = {...startTarget, x: startTarget.object.x, y: y1, originX:x1, originY : y1}  //x축은 그려진 선 기준값을 대입 합니다
        }        
    })    

    //마우스 업 이벤트
    canvas.addEventListener('mouseup', (event) =>{
        if(!ctx) return
        hoverPosition = {}
        if(isClicked){  //마우스가 다운된 상태의 조건이 충족하면,
            let x1 = event.clientX - canvas.parentElement.offsetLeft || canvas.offsetLeft
            let y1 = event.clientY - canvas.parentElement.offsetTop || canvas.offsetTop            
            let endBridge =  _isInSide(x1,y1)  //가장 마지막의 선 지점값을 가져 옵니다
            endBridge = {...endBridge, x: endBridge.object.x, y: y1}  //x축은 그려진 선 기준값을 대입 합니다

            //같은 선분 또는 옆 영역을 뛰어넘어가는 경우 등록하지 않습니다
            if(startBridge.dataIndex == endBridge.dataIndex || Math.abs(startBridge.dataIndex - endBridge.dataIndex) > 1) {
                isClicked = false
                hoverPosition = {}
                startBridge = null
                _init()
                _drawDataLine()
                return
            }

            //첫 마우스 다운 지점에서 마지막 마우스 업 지점까지의 거리를 lineData 배열에 담아둡니다
            let bridgeIdx = _makeid(50)
            startBridge.linkIdx = bridgeIdx
            endBridge.linkIdx = bridgeIdx
            data[startBridge.dataIndex].push(startBridge)  //데이터 배열에도 넣습니다
            data[endBridge.dataIndex].push(endBridge)
            lineData.push({startBridge, endBridge})
            _init()
            _drawDataLine()
        }
        isClicked = false
    })   

    //마우스 아웃 이벤트
    canvas.addEventListener('mouseleave', (event) =>{
        if(!ctx ) return
        isClicked = false
        hoverPosition = {}
    })   

    //데이터를 찾는 함수 입니다
    function _search(me, linkIndex){  
        let linkData
        let idx
        let innIdx
        data.forEach( (arg, _idx) => {
            if(me != _idx){
                arg.forEach((element, _innIdx) => {
                    if(element.linkIdx == linkIndex){
                        linkData = element
                        idx = _idx
                        innIdx = _innIdx
                    }
                })
            }
        })
        return {linkData, idx, innIdx}
    }


    let bk = 1   //혹시모를 무한재귀 대비 브레이킹 인덱스 입니다
    let historyIndex = []  //히스토리 배열입니다. 이미 지나온 구간은 안가기 위해서 사용 합니다

    function gotoDestination(iiddxx, color){
        let mainCursor = iiddxx || 0
        let innerCursor = 0
        let stop = true
        historyIndex = []
        
        _init()
        _drawDataLine()        

        while(stop){
            if(bk >= 1433) {  //혹시모를 무한재귀 대비 브레이킹 구간 입니다
                stop = false
            }
            let start = data[mainCursor][innerCursor]
            let end
            if(start.linkIdx != null && historyIndex.filter( arg=> arg == start.linkIdx) == 0){ //링크가 있는 지점
                //data에서 찾자
                let search= _search(mainCursor, start.linkIdx)   //linkData, idx
                end = search.linkData
                mainCursor= search.idx
                innerCursor = search.innIdx
                historyIndex.push(start.linkIdx)
            } else if(data[mainCursor].length <= innerCursor){ //끝지점
                stop = false
            } else { //링크가 없는지점
                end = data[mainCursor][innerCursor+1]
                innerCursor += 1
            }

            if(!end) break  //데이터가 없는 마지막 구간이면 종료 합니다

            ctx.save()
            ctx.beginPath()
            ctx.lineCap = 'round'   
            ctx.lineJoin = 'round'
            ctx.lineWidth = 5
            ctx.strokeStyle = color || 'red'
            ctx.moveTo(start.x, start.y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()  
            bk+=1
        }
        bk = 0
        if(calback){
            calback(data, lineData)
        }        
    }      


    return {
        find : (index, color)=>{
            gotoDestination(index, color)
        },
        calback : (arg)=>{
            if(arg && arg  instanceof Function){
                calback = arg
            }
        }
    }         
}


let lad = ladder('canvas')



document.getElementById('btn1').addEventListener('click', (event) =>{
    lad.find(0, 'red')
})   
document.getElementById('btn2').addEventListener('click', (event) =>{
    lad.find(1, 'blue')
})   
document.getElementById('btn3').addEventListener('click', (event) =>{
    lad.find(2, 'green')
})  
document.getElementById('btn4').addEventListener('click', (event) =>{
    lad.find(3, 'purple')
})  
document.getElementById('btn5').addEventListener('click', (event) =>{
    lad.find(4, 'orange')
})  

lad.calback( (data, lineData)=>{
    console.log(data)
    console.log(lineData)
})