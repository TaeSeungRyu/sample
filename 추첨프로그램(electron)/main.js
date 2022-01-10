const {app, BrowserWindow } = require('electron')
const path = require("path")

function createWindow() {
    let win = new BrowserWindow({
        //frame: false,
        width: 755,
        height: 725,
        minWidth: 730,
        minHeight: 450,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(app.getAppPath(), "preload.js")
        },
        autoHideMenuBar: true
    })
    win.loadFile('html/index.html')
}
app.on('ready', createWindow)