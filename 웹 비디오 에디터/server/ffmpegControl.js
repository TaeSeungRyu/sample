const ffmpeg = require('ffmpeg')
const fluent_ffmpeg = require('fluent-ffmpeg')

const options = {
    start_time : 0,
    frame_rate : 1,
    file_name : 'file%n'
}

exports.initVedioFile = function(targetFile, savedPath, calback){
    try {
        new ffmpeg( targetFile,  (err, video)=>{
            if (!err) {
                let img_option = {
                    ...options,
                    number : video.metadata.duration.seconds
                }
                video.fnExtractFrameToJPG(savedPath, img_option, (error, files)=>{
                    if(calback){
                        calback(video.metadata, files, error)
                    } else{
                        throw 'calback function is null'
                    }
                })  
            } else {
                console.log('Error: ' + err)
            }
        })
    } catch (e) {
        console.log(e.code)
        console.log(e.msg)
    }   
}

exports.buildVedioFile = function(element, targetMP4File, tmpPath , newPath, calback){
    new ffmpeg( targetMP4File,  (err, video)=>{
        if (!err) {
            let fileNames = []
            element.forEach( arg=>{
                fileNames.push(makeid(20) + '.mp4')
            })
            let index = 0
            function looper(){
                return new Promise( (succ,fail) => {
                    if(index == element.length) return succ()
                    try {
                        video
                        .setVideoStartTime(element[index][0] !=0 ? element[index][0]-1 : 0)  
                        .setVideoDuration(element[index].length != 1 ? element[index].length -1 : 1)   
                        .save(tmpPath + fileNames[index], (error, file)=>{
                            if(!error){
                                console.log('change time!', index)
                            } else {
                                console.log('change time!', error)
                            }
                            index = index + 1
                            succ(looper())  //끝날 때 까지 재귀
                        })                               
                    } catch (error) {
                        fail(error)
                    }             
                })
            }                

            looper().finally( ()=>{
                console.log('end')
                
                const concatMP4FileTmpPath = tmpPath   //임시 저장 디렉토리
                const concatMP4FilePath = newPath + makeid(20) + '.mp4'  //합쳐질 파일 위치,이름
                console.log(concatMP4FileTmpPath)
                console.log(concatMP4FilePath)
                let mergedVideo = fluent_ffmpeg()

                fileNames.forEach(element => {  //목록 추가하기
                    mergedVideo = mergedVideo.addInput(tmpPath + element)    
                })

                mergedVideo.mergeToFile(concatMP4FilePath, concatMP4FileTmpPath) //파일 1개로 만들기
                .on('error', function(err) {
                    if(calback) calback(null)
                })
                .on('end', function() {
                    if(calback) calback(concatMP4FilePath)
                })
            })


        }
    })
}


function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}