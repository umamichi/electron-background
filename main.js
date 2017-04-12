const electron = require('electron');
const app = electron.app;
const {BrowserWindow, Tray, globalShortcut} = electron;

// const Tray = electron.tray;

let mainWindow = null;
app.on('ready', () => {
  // メニューアイコン設定
  const appIcon = new Tray( __dirname + '/icon.png');
  
  // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
  mainWindow = new BrowserWindow({width: 400, height: 300, show: true, icon: __dirname + '/icon.png'});
  
  // ドックも非表示
  app.dock.hide();
  // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  appIcon.on('click', (e, bounds) => {
    console.log('appIcon', appIcon);
    app.show();
    app.focus();
  });


  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
    app.show();
    app.focus();
  })

  // ChromiumのDevツールを開く
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});