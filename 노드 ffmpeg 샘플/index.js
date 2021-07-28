/*
#1. 이미지 추출 옵션
{
	start_time				: null		// Start time to recording
  , duration_time			: null		// Duration of recording
  , frame_rate				: null		// Number of the frames to capture in one second
  , size					: null		// Dimension each frame
  , number					: null		// Total frame to capture
  , every_n_frames			: null		// Frame to capture every N frames
  , every_n_seconds			: null		// Frame to capture every N seconds
  , every_n_percentage		: null		// Frame to capture every N percentage range
  , keep_pixel_aspect_ratio	: true		// Mantain the original pixel video aspect ratio
  , keep_aspect_ratio		: true		// Mantain the original aspect ratio
  , padding_color			: 'black'	// Padding color
  , file_name				: null		// File name
}

#2. 워터마크 추가 옵션  -> 여백 단위 : 픽셀(pixel)
{
	position		: "SW"		// Position: NE NC NW SE SC SW C CE CW
  , margin_nord		: null		// Margin nord 
  , margin_sud		: null		// Margin sud  
  , margin_east		: null		// Margin east
  , margin_west		: null		// Margin west
}
*/


const ffmpeg = require('ffmpeg')
const targetMP4File = './sample.mp4'  //영상 파일
const to_img_file = './imgs/'   //이미지를 추출할 디렉토리
const to_audio_file = './audio/onlyAudio.mp3'   //오디오를 추출할 디렉토리
const water_mark_img = './water_mark.png'  //워터마크를 붙일 디렉토리
const to_mp4_with_water_mark = './water_mark/water_sample.mp4'  //영상파일+워터마크를 붙여서 만든 새로운 영상파일 위치
const to_changed_time_mp4 = './change_time/time_sample.mp4'  //시작 및 종료 시간을 잘라내어 새롭게 생성할 영상 파일 위치

try {

	new ffmpeg( targetMP4File,  (err, video)=>{
		if (!err) {
            //비디오 메타정보
            //console.log(video.metadata)

            //#0. 이미지 추출 옵션
            let img_option = {
                start_time : 0,
                frame_rate : 1,
                number : video.metadata.duration.seconds,
                file_name : 'file_%t_%s'
            }
            //#1. 동영상에서 이미지를 추출하기 (비동기 방식)
            video.fnExtractFrameToJPG(to_img_file, img_option, (error, files)=>{
                if(!error) console.log('finish imgs!')
            })  

            //#2. 동영상에서 사운드만 분리하기 (비동기 방식)
            video.fnExtractSoundToMP3(to_audio_file, (error, file)=>{
                if(!error) console.log('finish audio!')
            })      
            
            //#3. 워터마크 옵션
            let water_option = {
                position : 'SE',   //south east (남동쪽)
                margin_east : video.metadata.video.resolution.w * 0.1,  
                margin_sud : video.metadata.video.resolution.h * 0.1
            }
            //#4. 동영상에 워터마크 추가하기 (비동기 방식)
            video.fnAddWatermark(water_mark_img, to_mp4_with_water_mark, water_option, (error, file)=>{
                if(!error) console.log('finish watermark!')
            })          
            
            //#5. 시간 변경 하기 (비동기 방식)
            video
                .setVideoStartTime(3)  //시작시간
                .setVideoDuration(video.metadata.duration.seconds * 0.6)    //종료시간
                .save(to_changed_time_mp4, (error, file)=>{
                    if(!error) console.log('change time!')
                })
		} else {
			console.log('Error: ' + err)
		}
	})
} catch (e) {
	console.log(e.code)
	console.log(e.msg)
}


//#6. 동영상 병합하기
const fluent_ffmpeg = require('fluent-ffmpeg')

const concatMP4FileTmpPath = './tmp'   //임시 저장 디렉토리
const concatMP4FilePath = './concat/output.mp4'  //합쳐질 파일 위치,이름
const targetFiles = [  //합칠 파일 목록
    './one.mp4',
    './two.mp4',
]

let mergedVideo = fluent_ffmpeg()

targetFiles.forEach(element => {  //목록 추가하기
    mergedVideo = mergedVideo.addInput(element)    
})

mergedVideo.mergeToFile(concatMP4FilePath, concatMP4FileTmpPath) //파일 1개로 만들기
.on('error', function(err) {
    console.log('Error ::::  ' + err.message)
})
.on('end', function() {
    console.log('Finished!')
})
