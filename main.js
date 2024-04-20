// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('node:path')
let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  // 创建系统托盘图标
  tray = new Tray(path.join(__dirname, 'icon.png'));
  // 创建上下文菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'open', type: 'normal', click: () => {
        app.dock.show()
        app.show()
        if (mainWindow) {
          mainWindow.show()
        }
        else {
          console.log("create window again")
          createWindow()
        }
        console.log("show")
        //createWindow()
      }
    },
    {
      label: 'hide', type: 'normal', click: () => {
        app.dock.hide()
        app.hide()
        if (mainWindow) {
          mainWindow.hide()
        }
        console.log("hide")
        //createWindow()
      }
    },
    { label: 'Item 2', type: 'normal', click: () => console.log('Item 2 clicked') },
    { label: 'Quit', type: 'normal', click: () => app.quit() }
  ]);

  // 设置托盘图标的上下文菜单
  tray.setToolTip('My Electron App');
  tray.setContextMenu(contextMenu);


  console.log('app ready')


  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
  else {
    mainWindow = null
    console.log("create window again")
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
