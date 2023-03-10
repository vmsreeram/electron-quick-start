// console.log('main process started');
// console.log('log from main.js');

const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const { platform } = require("os");
const path = require("path");
const url = require("url");

let win;
function createWindow() {
    win= new BrowserWindow({
        frame: false,
        // fullscreen: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes:true
    }));
    // var pyoptions = {
    //     scriptPath : path.join(__dirname, '.'i)
    // }
    
      

    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
}

app.on('ready',createWindow);
app.on('window-all-closed', () => {
    if(platform!='darwin')
        app.quit()
});

app.on('activate', () => {
    if (win === null) {
    createWindow()
    }
});

// main.js handles command sent through ipc, and quits the app.
ipcMain.on('close', () => {
    app.quit()
});

ipcMain.on('ready-diag', (event, arg) => {
    var XMLHttpRequest = require('xhr2');
let request = new XMLHttpRequest();
request.open("GET","http://127.0.0.1:9999")
request.send()
request.onload = () => {
    if(request.status === 200){
        console.log("successful");
        event.sender.send('fn-called');
    }
    else{
        console.log("failed")
    }
};
});
  
