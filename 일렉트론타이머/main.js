const {app, BrowserWindow} = require('electron');

function createWindow() { // 브라우저 창을 생성
    let win = new BrowserWindow({
        fullscreen: false,
        width: 385,
        height: 280,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    //메뉴 가리기
    win.setMenu(null)
    // 브라우저창이 읽어 올 파일 위치
    win.loadFile('./index.html')
}

app.on('ready', createWindow);
