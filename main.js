const
    electron = require('electron'),
    path = require('path'),
    url = require('url'),
    menu = require('./src/window/menu'),
    app = electron.app,
    Menu = electron.Menu,
    BrowserWindow = electron.BrowserWindow;

let mainwindow;
const
    mainOptions = {
        width: 800,
        height: 600,
        backgroundColor: '#91A7D0',
        show: false,
        minWidth: 800,
        maxWidth: 1920,
        minHeight: 600,
        maxHeight: 1200,
        resizable: true,
        movable: true,
        closable: true,
        alwaysOnTop: false,
        frame: true,
        titleBarStyle: 'default'
    };

function createWindow() {

    mainwindow = new BrowserWindow(mainOptions);

    mainwindow.loadURL(url.format({
        pathname: path.join(__dirname, '/src/window/index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainwindow.once('ready-to-show', ()=>{
        mainwindow.show();
    });

    // mainwindow.webContents.openDevTools();

    mainwindow.on('closed', function(){
        mainwindow = null;
    });

}

app.on('ready', function(){
    topMenu = Menu.buildFromTemplate(menu.template);
    Menu.setApplicationMenu(topMenu);
    createWindow();
});

app.on('window-all-closed', function(){
    if (process.plateform !== 'darwin') {
        app.quit();
    }
});

app.on('active', function(){
    if (mainwindow !== null) {
        createWindow();
    }
});
