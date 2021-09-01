
const express = require('express')
const fs = require('fs');
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000

const ffmpeg = require('./ffmpegControl')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('../public'))
app.use(fileUpload())

app.set('view engine', 'ejs')
app.set('views', '../views')


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
  console.log('server start')
})


const dir = `E:/web_vedio_editor/try_my_video_editor/public/files/`
const tmpDir = `${dir}tmp/`
const concatDir = `${dir}concat/`

//파일을 받아서 이미지를 분리 합니다.
app.post('/upload', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = makeid(20) + req.files.file.name
    uploadFile.mv(`${dir}${fileName}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            let savedPath = makeid(20)
            
            if (!fs.existsSync(`${dir}${savedPath}`)) fs.mkdirSync(`${dir}${savedPath}`)
            if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)
            if (!fs.existsSync(concatDir)) fs.mkdirSync(concatDir)

            ffmpeg.initVedioFile(`${dir}${fileName}`, `${dir}${savedPath}`, (metadata, files, error) => {
                metadata.savedPath = `files/${savedPath}`
                metadata.fileName = fileName
                res.json(metadata)
            })
        }
    })
})



app.post('/reFile', (req, res, next) => {
    let param = {}
    if (req.body.list) {
        param.list = JSON.parse(req.body.list)
        param.fileName = `${dir}${req.body.fileName}`
        param.savedPath = req.body.savedPath
        console.log(param)
    }
    ffmpeg.buildVedioFile(param.list, param.fileName, tmpDir , concatDir,  resultFilePath=>{
        let result = resultFilePath.replace(concatDir, 'files/concat/')
        res.send(result) //파일 정보를 전달 합니다
    })
})


function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}