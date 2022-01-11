
class RtsVideoEditor {

    /*
     * 클래스 상수 목록 입니다.
     */
    static RtsTimeLineBody = 'RtsTimeLineBody'  //타임라인용 바디 클래스 입니다
    static RtsTimeLine  = 'RtsTimeLine'   //타임라인용 바디안에서 확장될 클래스 입니다
    static imgChild = 'imgChild'  //이미지 테그 css용 클래스 입니다
    static timeLineChild = 'timeLineChild' //타임라인 테그 css용 클래스 입니다
    static thisClicked = 'thisClicked'   //선택된 클래스를 의미합니다.
    static withClicked = 'withClicked'  //선택된 클래스의 바깥 부분 클래스 이름 입니다
    static fadeCss = 'fadeCss'   //페이드인아웃 클래스 입니다.
    static prvClass = 'prvClass'  //미리보기 클래스 입니다.
    static fadeTime = 550   //페이드인, 아웃 시간 입니다.
    static timeLineCount = 20  //화면에서 보여지는 타임라인 갯수 입니다
    static DownloadCount = 24  //화면에서 보여지는 타임라인 다운로드용 수 입니다

    static RtscopiedExplain ='RtscopiedExplain'  //복사에 사용되는 스타일용 클래스1
    static copiedElement ='copiedElement'  //복사에 사용되는 스타일용 클래스2
    static Rtscopied ='Rtscopied'  //복사에 사용되는 스타일용 클래스3


    constructor(MainName, downloadLinkArea){

        this.MainName = MainName  //기능을 부여할 테그를 의미 합니다.
        this.downloadLinkArea = downloadLinkArea  //다운로드 링크가 생성될 위치 입니다

        this.timeLineBody = this.makeRanString(21)  //타임라인용 바디 아이디 값 입니다
        this.timeLineName = this.makeRanString(21)  //타임라인용 바디 안에서 확장될 테그 아이디 입니다
        this.previewName = this.makeRanString(17)  //미리보기용 테그 아이디 입니다

        this.imgChild = this.makeRanString(20)  //이미지 테그용 클래스를 만듭니다
        this.imgTagId = `${this.makeRanString(10)}_`  //이미지 태그용 아이디를 랜덤으로 만듭니다
        this.timeLineChild = this.makeRanString(20)  //타임라인 태그용 클래스를 만듭니다

        this.validKeyCode = 16   //구간 선택을 위한 shift키 코드 값 입니다
        this.isKeyDown = false   //shift키가 눌려졌으면 true, 아니면 false 입니다
        this.singleClicked = -1  //단일 선택을 의미합니다. 이미 선택된 값이 있으면 해당 인덱스 번호가 대입 됩니다

        this.isPlay = null  //사진이 플레이되는지를 묻습니다

        this.btnEventArr = {   //버튼 이벤트를 부여할 배열값의 모음 입니다
            deleteId : [],
            applyId : [],
            undoId : [],
            playId : [],
            cutAndNew : []
        }
        this.undoArr = []  //되돌리기시 사용될 배열 입니다
        this.startImageNumber = 0  //play 기능시 스크롤 시작 인덱스 번호 입니다
        this.fileName = ''  //서버에서 결과로 받은 파일 이름 입니다
        this.savedPath = ''  //서버에서 결과로 받은 파일이 저장된 위치 입니다
        
        this.#_initKeyBoardEvent()
        this.#_generateObject()
    }

    //파일을 전송하여 분석 합니다
    getInformation(param, calback){
        if(calback && calback.befor && typeof calback.befor == 'function') calback.befor()
        $(document).ready(()=>{
            $.ajax({
                url : '/upload',
                type:'post',
                contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                data:param,
                contentType : false, 
                processData: false,
                success : (res)=>{
                    console.log(res)

                    //변수들을 초기화 합니다
                    this.fileName = res.fileName
                    this.savedPath = res.savedPath
                    $(`#${this.timeLineBody}`).scrollLeft(0)

                    if(this.#_NVL(res, res.duration, res.duration.seconds)){  //동영상이 올바르게 분석 되었다면,
                        $(`#${this.previewName}`).attr('src',null)
                        $(`.${this.imgChild}`).remove()
                        $(`.${this.timeLineChild}`).remove()
                        this.#_initTimeLine(res)
                        this.#_initScroll()
                        this.#_downloadImg()
                    }
                    if(calback) calback.done()
                }, 
                error : (error)=>{
                    console.log(error)
                    if(calback && calback.done  && typeof calback.done == 'function') calback.done()
                }
            })            
        })
    }

    #_initKeyBoardEvent(){
        //쉬프트키가 눌린 경우 구간 선택 기능을 추가 합니다.
        $(document).on('keydown', (e)=>{
            if(this.validKeyCode == e.keyCode) this.isKeyDown = true
        })
        $(document).on('keyup', (e)=> (this.isKeyDown = false))
    }

    //화면에 그릴 대상을 만들어 줍니다.
    #_generateObject(){
        $(document).ready(()=>{
            $(`#${this.MainName}`).append(
                $('<img>').attr({id:this.previewName}).addClass(RtsVideoEditor.prvClass),
                $('<br>')
            )            
            $(`#${this.MainName}`).append(
                $('<div>').attr('id',this.timeLineBody).addClass(RtsVideoEditor.RtsTimeLineBody)
            )
            $(`#${this.timeLineBody}`).append(
                $('<div>').attr('id',this.timeLineName).addClass(RtsVideoEditor.RtsTimeLine)
            )      
        })        
    }

    //스크롤 중지 관련 이벤트를 만들어 줍니다.
    #_initScroll(){
        let isScroll = false
        let scrollLeft = 0

        $(`#${this.timeLineBody}`).scroll(function (event) {  //스크롤 이벤트가 발생하면,
            isScroll = true  //스크롤 이벤트가 발생되었음을 알려주고
            scrollLeft = $(this).scrollLeft()  //왼쪽으로 이동한 값을 대입 합니다
        })

        $(window).mouseup(()=>{  //스크롤이 끝났음은 마우스가 올라갔을 때 입니다
            let len = Number($(`.${this.imgChild}`).css('width').replace('px',''))  //타임라인 그려진 크기를 가져와서
            if(isScroll){
                this.startImageNumber = parseInt(scrollLeft / len)  //이동된 스크롤 값으로 나누면 해당 인덱스 번호와 얼추 맞습니다
                this.#_downloadImg()  //그러면 사진이 없으므로 사진을 가져 옵니다
            }
            isScroll = false  //스크롤 이벤트가 끝났음을 대입 합니다
        })
    }

    //타임라인을 그립니다.
    #_initTimeLine(res){

        let seconds = res.duration.seconds  //총 시간
        for (let i=0;i <= seconds;i++){
            $(`#${this.timeLineName}`).append(
                //indexing 값은 사진 고유의 번호 입니다
                //구간을 삭제하면 인덱스는 그대로이지만 내부의 표시 시간 텍스트는 변하게 됩니다
                $('<div>').addClass('RtsitemArea').append(
                    $('<div>').addClass(`${this.imgChild} ${RtsVideoEditor.imgChild}`).attr({'indexing': i, id : `${this.imgChild}_${i}`}),
                    $('<div>').addClass(`${this.timeLineChild} ${RtsVideoEditor.timeLineChild}`).text(this.#_toHHMMSS(i)).attr({'id':`${this.imgTagId}${i}`, 'indexing':i}).click( ()=>{

                        $(`.${this.timeLineChild}`).removeClass(RtsVideoEditor.thisClicked)
                        $(`.${this.timeLineChild}`).parent().removeClass(RtsVideoEditor.withClicked)
    
                        if(this.isKeyDown){  //구간 선택인 경우를 의미 합니다.(shift키가 눌린 상태)

                            if(this.singleClicked != i){
                                //아래 조건문은 가장 작은 시간과 가장 큰 시간을 비교해서 적용하는 경우를 의미 합니다
                                //사용자가 1초를 선택하고 5초를 선택할 수도 있고, 5초를선택하고 1초를 선택 할 수 있기 때문 입니다
                                let startNum = this.singleClicked < i ? this.singleClicked : i
                                let endNum = this.singleClicked > i ? this.singleClicked : i
                                if (startNum == -1) startNum = 0   //시작값과 종료값을 계산하여 줍니다.
                                $(`.${this.timeLineChild}`).each(function(){
                                    let myNumber = $(this).attr('indexing')
                                    if(myNumber >= startNum && myNumber <=endNum){  //구간선택에 들어온 항목에 선택되었음을 추가합니다
                                        if($(this).css('display') != 'none'){
                                            $(this).addClass(RtsVideoEditor.thisClicked).parent().addClass(RtsVideoEditor.withClicked)
                                        }
                                    }
                                })
                                this.singleClicked = startNum
                            } else {  //쉬프트키를 누르고 나 자신을 선택한 경우 입니다.
                                this.singleClicked = -1
                                $(`#${this.previewName}`).attr('src', null)
                            }

                        } else {  //단일 선택을 의미 합니다.
                            if(this.singleClicked == -1 || this.singleClicked != i ){  //선택된 경우 입니다
                                $(`#${this.imgTagId}${i}`).addClass(RtsVideoEditor.thisClicked).parent().addClass(RtsVideoEditor.withClicked)
                                let imgSrc = $(`#${this.imgChild}_${i}`).css('background-image')
                                let reSrc = imgSrc.substring(5, imgSrc.length - 2)
                                $(`#${this.previewName}`).attr('src', reSrc)
                                this.singleClicked = i
                            } else {  //자기 자신을 다시 선택한 경우, 즉 선택 해제를 의미 합니다
                                this.singleClicked = -1
                                $(`#${this.previewName}`).attr('src', null)
                            }
                        }
                    })
                )
                
            )
        }
        //타임라인 위 의 크기를 맞추어 줍니다
        let size = $(`.${this.timeLineChild}`).css('width')
        $(`.${this.imgChild}`).css({width : size, height : size})
    }

    //데이터를 검증 합니다.
    #_NVL = (...arg)=> {
        if(arg === undefined || arg === null) return false
        arg.forEach(element => {
            if(element === undefined || element === null) return false
        })
        return true
    }

    //숫자를 00:00:00 형식으로 변환 합니다.
    #_toHHMMSS = arg=>{
        let sec_num = parseInt(arg, 10)
        let hours   = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        let seconds = sec_num - (hours * 3600) - (minutes * 60)
        if (hours   < 10) hours   = "0"+hours
        if (minutes < 10) minutes = "0"+minutes
        if (seconds < 10) seconds = "0"+seconds
        return hours + ':' + minutes + ':' + seconds
    }

    //버튼에 타임라인 삭제 기능을 붙입니다.
    deleteLine(target, calback){
        setTimeout(() => {
            if(this.btnEventArr.deleteId.filter( dt =>  dt!= undefined && dt == target).length == 0){
                $(`#${target}`).click(()=>{
                    this.#_removeLine(calback)
                }) 
                this.btnEventArr.deleteId.push(target)
            }
        }, 300)
    }

    //위 함수에서 사용되는 세부 기능 입니다.
    #_removeLine(calback){
        let miniUndoArr = []
        let imgCld = this.imgChild
        let prvName = this.previewName
        $(`.${this.timeLineChild}`).each(function(){
            let cls = $(this).attr('class')
            if(cls.includes(RtsVideoEditor.thisClicked)){
                $(this).addClass(RtsVideoEditor.fadeCss).fadeOut(RtsVideoEditor.fadeTime, function(){
                    $(`#${prvName}`).attr('src', null)
                    $(this).removeClass(RtsVideoEditor.fadeCss).parent().removeClass(RtsVideoEditor.withClicked)
                    $(`#${imgCld}_${$(this).attr('indexing')}`).hide()
                })
                miniUndoArr.push({id : $(this).attr('id'), indexing : $(this).attr('indexing')})
            }
        })     
        this.singleClicked = -1
        this.undoArr.push(miniUndoArr)
        this.#_reTextOrder()
        if(calback) calback()   
    }

    #_reTextOrder(){
        setTimeout(() => {
            let toHms = this.#_toHHMMSS   
            let viewNumber = 0
            $(`.${this.timeLineChild}`).each(function(i){
                if($(this).css('display') != 'none'){
                    $(this).text(toHms(viewNumber))
                    viewNumber = viewNumber+1
                }
            })   
            this.#_downloadImg()
        }, 1000)
    }

    //나누어진 영역을 적용 합니다.
    applyLine(target, calback){
        setTimeout(() => {
            if(this.btnEventArr.applyId.filter( dt =>  dt!= undefined && dt == target).length == 0){
                $(`#${target}`).click(()=>{
                    this.#_applyLine(calback)
                }) 
                this.btnEventArr.applyId.push(target)
            }
        }, 300)        
    }

    #_applyLine(calback){
        let groupingArr = []
        let miniArr = []
        $(`.${this.timeLineChild}`).each(function(){
            if($(this).css('display') != 'none'){
                let item = Number($(this).attr('indexing'))
                if(miniArr.length == 0){
                    miniArr.push(item)
                } else if(miniArr[miniArr.length-1]+1 == item){
                    miniArr.push(item)
                } else {
                    groupingArr.push(miniArr)
                    miniArr = []
                    miniArr.push(item)
                }            
            }
        })      
        groupingArr.push(miniArr)
        if(calback) this.#_buildVideo(groupingArr, calback)
    }    

    //이전 작업으로 되돌립니다.
    applyUndo(target, calback){
        setTimeout(() => {
            if(this.btnEventArr.undoId.filter( dt =>  dt!= undefined && dt == target).length == 0){
                $(`#${target}`).click(()=>{
                    this.#_applyUndo(calback)
                }) 
                this.btnEventArr.undoId.push(target)
            }
        }, 300)        
    }

    #_applyUndo(calback){
        if(this.undoArr.length > 0){
            let imgCld = this.imgChild
            this.undoArr[this.undoArr.length-1].forEach( arg => {
                $(`#${arg.id}`).removeClass(RtsVideoEditor.thisClicked).addClass(RtsVideoEditor.fadeCss).fadeIn(RtsVideoEditor.fadeTime, function(){
                    $(this).removeClass(RtsVideoEditor.fadeCss).parent().removeClass(RtsVideoEditor.withClicked)
                    $(`#${imgCld}_${arg.indexing}`).show()
                })
            })
            this.#_applyLine(null)
            this.undoArr.pop()
            this.singleClicked = -1
        }
        this.#_reTextOrder()
        if(calback) calback(this.undoArr)   
    }
    
    //최초 화면 생성, 스크롤 이동 및 삭제 이벤트 발생 시 이미지를 다운받습니다.
    #_downloadImg(){
        let count = 0
        let textNum = this.startImageNumber  //현재 화면에서 보여지는 인덱스 번호 입니다
        let toHms = this.#_toHHMMSS   
        let path = this.savedPath
        let imgCld = this.imgChild
        $(`.${this.timeLineChild}`).each(function(){
            if($(this).css('display') != 'none'  && count< RtsVideoEditor.DownloadCount){  //삭제된 상태가 아니면서, 화면에서 보여지는 갯수보다 작으면
                let _idx = $(this).attr('indexing')
                if( toHms(textNum) == $(this).text()  ){  //텍스트 표기값이 서로 일치 하다면,
                    if($(`#${imgCld}_${_idx}`).css('background-image') == 'none' ){  //이미지가 없으면 가져 옵니다
                        if(_idx != '0' || _idx != 0) $(`#${imgCld}_${_idx}`).css({'background-image':`url(${path}/file_${_idx}.jpg)`})
                    }
                    textNum = textNum + 1
                    count = count + 1
                } 
            }
        })
    }

    applyPlay(target, calback){
        setTimeout(() => {
            if(this.btnEventArr.playId.filter( dt =>  dt!= undefined && dt == target).length == 0){
                $(`#${target}`).click(()=>{
                    this.#_applyPlay(calback)
                }) 
                this.btnEventArr.playId.push(target)
            }
        }, 300)        
    }

    //사진을 구간에 따라 재생 합니다.
    #_applyPlay(calback){

        if(this.isPlay) {
            clearInterval(this.isPlay)
            this.isPlay = null
            if(calback && calback.done) calback.done('done')
            return
        }

        if(calback && calback.befor) calback.befor()

        if(this.singleClicked == -1)  $(`#${this.timeLineBody}`).scrollLeft( 0 )  //선택된 사진이 없으면 처음부터로 이동합니다

        //일반 효과들을 제거 합니다
        $(`.${this.timeLineChild}`).removeClass(RtsVideoEditor.thisClicked)  
        $(`.${this.timeLineChild}`).parent().removeClass(RtsVideoEditor.withClicked)
        
        let len = Number($(`.${this.imgChild}`).css('width').replace('px','')) * 1.05  //스크롤이 자동으로 넘어갈 길이 입니다
        let targetIdx = this.singleClicked == -1 ? 1 : this.singleClicked  //해당 숫자는 사진 고유의 인덱스 값을 의미 합니다
        this.startImageNumber = this.startImageNumber == -1 ? 1 : this.startImageNumber  //스크롤 크기가 증가된게 없으면 초기화 힙니다

        let scrollNum =  1 //스크롤 위치 입니다. 
        if(this.singleClicked != -1){  //만약 선택된 적이 있다면
            let txt = $(`#${this.imgTagId}${this.singleClicked}`).text()  //해당 텍스트값을 가져와서
            let parsingNum = txt.split(':')
            let seconds = (+parsingNum[0]) * 60 * 60 + (+parsingNum[1]) * 60 + (+parsingNum[2])  //초 단위로 변환한 다음
            scrollNum = seconds % RtsVideoEditor.timeLineCount  //타임라인 구간 값으로 나누어 줍니다
        }

        if(scrollNum == 0) scrollNum = RtsVideoEditor.timeLineCount  //마지막 나누는 값은 무조건 0이 나오므로 최대값을 넣어 줍니다
        scrollNum = scrollNum + 1  //늦게 넘어가는 현상을 방지하기위해 숫자 1을 더해 줍니다
        console.log('scrollNum ::: ',scrollNum)
        this.isPlay = setInterval(() => {
            
            this.#_downloadImg()  //스크롤 움직임에 따라 이미지를 받습니다

            while($(`#${this.imgChild}_${targetIdx}`).css('display') == 'none'){  //삭제(가려진) 대상은 넘어 갑니다
                targetIdx = targetIdx + 1
            }

            $(`#${this.imgTagId}${targetIdx}`).addClass(RtsVideoEditor.thisClicked)  //해당 사진이 보여주었음 효과를 넣습니다
            let imgSrc = $(`#${this.imgChild}_${targetIdx}`).css('background-image') //이미지 src를 가져와서
            if(imgSrc){  //미리보기에 넣어 줍니다
                let reSrc = imgSrc.substring(5, imgSrc.length - 2)
                $(`#${this.previewName}`).prop('src',reSrc)
                
            }
            this.startImageNumber = this.startImageNumber + 10 //다운로드 받을 이미지를 위해 숫자를 미리 10이상 증가 시킵니다

            if(scrollNum > RtsVideoEditor.timeLineCount){   //1개 페이지에서 보여질 카운트를 넘어가면 스크롤 값을 증가 시킵니다
                let left = $(`#${this.timeLineBody}`).scrollLeft()
                $(`#${this.timeLineBody}`).scrollLeft(left + len)
            }
            targetIdx = targetIdx + 1
            scrollNum = scrollNum + 1
            if(!imgSrc){  //더 이상 볼게 없다면 종료 합니다
                this.singleClicked = -1
                if(calback && calback.done) calback.done('done')
                clearInterval(this.isPlay)
                this.isPlay = null
            }
        }, 100)
    }

    //선택구간을 복사해 다른 영역에 생성 합니다
    applyCutAndNew(target, calback){
        setTimeout(() => {
            if(this.btnEventArr.cutAndNew.filter( dt =>  dt!= undefined && dt == target).length == 0){
                $(`#${target}`).click(()=>{
                    this.#_applyCutAndNew(calback)
                }) 
                this.btnEventArr.cutAndNew.push(target)
            }
        }, 300)    
    }


    #_applyCutAndNew(calback){
        let size = $(`.${this.timeLineChild}`).css('width')
        let savedArr = []   //저장에 사용될 배열 입니다
        let cuttedArr = []  //화면 그리기에 사용 될 배열 입니다
        $(`.${this.timeLineChild}`).each(function(){  
            if($(this).attr('class').includes(RtsVideoEditor.thisClicked)){  //선택된 영역이라면
                cuttedArr.push(
                    {
                        index : $(this).attr('indexing'),
                        text : $(this).text()
                    }
                )
                savedArr.push(Number($(this).attr('indexing')))
            }
        })
        if(cuttedArr.length > 0){  //영역을 생성하여 줍니다
            const removingId = `copied_${this.makeRanString(12)}`
            const finalElnt = $('<div>').addClass(`${RtsVideoEditor.RtsTimeLineBody} addOnStyle`).attr('id', removingId)
            const bodyElnt = $('<div>').addClass(RtsVideoEditor.Rtscopied)
            cuttedArr.forEach( _item => {
                let contentElnt = $('<div>').addClass(RtsVideoEditor.copiedElement).append(
                    $('<div>').addClass(RtsVideoEditor.imgChild).css({'background-image':`url(${this.savedPath}/file_${_item.index}.jpg)`,width : size, height : size}),
                    $('<div>').addClass(RtsVideoEditor.timeLineChild ).text(_item.text)
                )
                bodyElnt.append(contentElnt)  
            })
            bodyElnt.prepend(
                $('<div>').addClass(RtsVideoEditor.RtscopiedExplain).append(
                    $('<span>').text('Control : '),
                    $('<input type="button">').val('영역삭제').addClass('btn btn-warning btn-sm').click(function(){
                        if(confirm('영역을 삭제 합니까?')) $(`#${removingId}`).remove()
                    }),
                    $('<input type="button">').val('영상생성').addClass('btn btn-primary btn-sm').click(()=>{
                        if(confirm('영상을 생성 합니까?'))  this.#_buildVideo([savedArr], calback)
                    })
                )
            )
            finalElnt.append(bodyElnt)
            $(`#${this.MainName}`).append(finalElnt)
        }
    }

    //영상을 재생하도록 요청 합니다
    #_buildVideo(arr, calback){
        if(calback) calback.befor()
        let param = {
            list : JSON.stringify(arr),
            fileName : this.fileName ,
            savedPath : this.savedPath
        }

        $.ajax({
            type: "POST",
            url: '/reFile',
            data: param,
            success: (res)=>{
                let a = $('<a>').attr({'href':res,'download':res}).text(res).css({'display':'block'})
                $(`#${this.downloadLinkArea}`).append(a)
                if(calback)  calback.done(true)
            },
            error : function(arg){
                if(calback)  calback.done(arg)
            }
        }) 
    }


    makeRanString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}


let editor = new RtsVideoEditor('targetElement', "downloadLinkArea")


editor.deleteLine('deleteBtn', ()=>{
    console.log('calback function')
})

editor.applyLine('apply', {
    befor : ()=>{
        $('.curtain').show()
    },
    done : ()=>{
        $('.curtain').hide()
    }
})

editor.applyUndo('undo', (removedIds)=>{
    console.log(removedIds)
})

editor.applyPlay('play', {
    befor : ()=>{
        $('#play').text('중지')
    },
    done : ()=>{
        $('#play').text('재생')
    }
})

editor.applyCutAndNew('cutting',  {
    befor : ()=>{
        $('.curtain').show()
    },
    done : ()=>{
        $('.curtain').hide()
    }
})

$(document).ready(function(){
    $('#file').change(function(){
        let param = new FormData()
        param.append('file', $('#file')[0].files[0])
        editor.getInformation(param,  {
            befor : ()=>{
                $('.curtain').show()
            },
            done : ()=>{
                $('.curtain').hide()
            }
        })
    })    
})

