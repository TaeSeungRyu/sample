// 날짜 프로토타입 설정 입니다 -------
Date.prototype.yyyymmdd = function(type) {
	if(this=="Invalid Date") return ""
	let mm = this.getMonth() + 1
	let dd = this.getDate()
	if(type!=null) return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join(type)
	return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('-')
}
Date.prototype.hhmmss = function() {
	let hh = this.getHours()
	let mm = this.getMinutes()
	let ss = this.getSeconds()
	return [(hh>9 ? '' : '0') + hh, (mm>9 ? '' : '0') + mm, (ss>9 ? '' : '0') + ss ].join(':')
}
Date.prototype.yyyymmddhhmmss = function() {
	return this.yyyymmdd() + " " + this.hhmmss()
}
// 날짜 프로토타입 설정 입니다 -------

let rootPath = process.env.PORTABLE_EXECUTABLE_DIR || process.env.INIT_CWD
const { contextBridge  } = require("electron")

const fs = require("fs")

rootPath = rootPath.replaceAll('\\','/')
const FILE_NAME = rootPath + '/init.ini'
const HISTORY_FILE_NAME = rootPath + '/history.log'




//최초 파일여부를 조사한 뒤에 파일이 없으면 만들어 줍니다
if(!fs.existsSync(FILE_NAME)){
    fs.writeFileSync(FILE_NAME, '15')
}
if(!fs.existsSync(HISTORY_FILE_NAME)){
    fs.writeFileSync(HISTORY_FILE_NAME, '')
}

contextBridge.exposeInMainWorld(
    "getIniData", {  //이름은 api입니닷
        request : (channel, data) => {
            let initData
            if(fs.existsSync(FILE_NAME)) initData = fs.readFileSync(FILE_NAME, 'utf8')
            data.calback({result:initData})
        }
    }
)

contextBridge.exposeInMainWorld(
    "insertInitData", {  
        request : (channel, data) => {
            fs.writeFile(FILE_NAME, `${data.len}`, 'utf-8', err => {
                if(err) throw err
                console.log('파일 저장 완료')
                data.calback({result:true})
            })
        }
    }
)

//히스토리 데이터를 읽어옵니다.
contextBridge.exposeInMainWorld(
    "readHistory", {  
        request : (channel, data) => {
            let initData
            if(fs.existsSync(HISTORY_FILE_NAME)){
                initData = fs.readFileSync(HISTORY_FILE_NAME, 'utf8')
            }
            data.calback({result:initData})
        }
    }
)

//히스토리 데이터를 읽어옵니다.
contextBridge.exposeInMainWorld(
    "writeHistory", {  
        request : (channel, data) => {
            if(data.goalList){
                data.goalList.forEach(element => {
                    fs.appendFileSync(HISTORY_FILE_NAME, element +','+new Date().yyyymmddhhmmss()+'\n', function (err) {
                        if(err) {return console.log(err)}
                        console.log("File Appended")
                    })                    
                })
                data.calback({result:true})
            }
        }
    }
)

//히스토리 데이터를 읽어옵니다.
contextBridge.exposeInMainWorld(
    "clearHistory", {  
        request : (channel, data) => {
            fs.writeFile(HISTORY_FILE_NAME, '', 'utf-8', err => {
                if(err) throw err
                data.calback({result:true})
            })
        }
    }
)
