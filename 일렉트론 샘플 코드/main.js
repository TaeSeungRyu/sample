
const { app, BrowserWindow } = require('electron');

function createWindow () {  // 브라우저 창을 생성
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true  //require같은 기능 사용 가능하도록
    }
  });
  //브라우저창이 읽어 올 파일 위치
  win.loadFile('./html/index.html');
  //win.setMenu(null); //top 메뉴 세팅
}

app.on('ready', createWindow);


//-------------- html과의 연동 부분 --------------

const sripts = require('./script.js');
const { ipcMain } = require('electron')
const rootPath = require('electron-root-path').rootPath;

sripts.init(rootPath);

//조회 요청시
ipcMain.on('select', (event, arg) => {
  sripts.select().then( arg=>{
    event.reply('reply', arg);  //결과 완료 후 보내는 방법
  }).catch((error)=>{
    event.reply('reply', error);  //에러
  });
});


//데이터 변경 요청시
ipcMain.on('alter', (event, param) => {
  if(param.type == 1){ //등록
    sripts.insert(param);
  }  else if(param.type == 2){ //수정
    sripts.update(param).then( arg=>{

    }).catch((error)=>{
  
    });
  } else {  //삭제
    sripts.delete(param).then( arg=>{

    }).catch((error)=>{

    });
  }
});