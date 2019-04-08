const
    {app, BrowserWindow} = require('electron'),
    path = require('path');

let
    mainWin = null;

app.on('ready', ()=>{
    mainWin = new BrowserWindow();
    let filePath = path.join(__dirname, '/index.html');
    mainWin.webContents.loadFile(filePath);
    mainWin.webContents.openDevTools();
});
