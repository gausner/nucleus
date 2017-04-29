'use strict';

const electron = require('electron');
const {app, BrowserWindow} = electron;
const path = require('path');

// Reload without rerunning app
require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow(
        {
            titleBarStyle: 'hidden',
            width: 1281,
            height: 800,
            minWidth: 1281,
            minHeight: 800,
            icon: path.join(__dirname, 'assets/icons/mac/icon.icns')
        });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    require('./menu/mainmenu')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

