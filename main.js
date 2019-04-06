const
    electron = require('electron'),
    path = require('path'),
    url = require('url'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow;

let mainwindow;
const
    mainOptions = {
        width: 800,
        height: 600,
        backgroundColor: '#91A7D0'
    };

function createWindow() {

    mainwindow = new BrowserWindow(mainOptions);

    mainwindow.loadURL(url.format({
        pathname: path.join(__dirname, '/src/index.html'),
        protocol: 'file',
        slashes: true
    }));

    // mainwindow.webContents.openDevTools();

    mainwindow.on('closed', function(){
        mainwindow = null;
    });

}

app.on('ready', createWindow);

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
