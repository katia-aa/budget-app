// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { extractCsvLines } from './extract-csv'
import { createWindow, closeWindow, recreateWindow } from './create-window'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow(BrowserWindow, mainWindow))

// Quit when all windows are closed.
app.on('window-all-closed', closeWindow)
app.on('activate', () => recreateWindow(createWindow, mainWindow))


async function sendCsvExtracted(event, filePath) {
  const headers = await extractCsvLines(filePath);
  event.sender.send('extract-csv-data-reply', { data: headers })
}

ipcMain.on('extract-csv-data', (event, filePaths) => {
  filePaths.forEach(function (filePath) {
    const isCSV = path.extname(filePath).toLowerCase() === '.csv'
    if (isCSV) {
      try {
        sendCsvExtracted(event, filePath)
      } catch (error) {
        console.log('An error has occurred  when attempting to send the extracted csv data.') // test that this works
      }
    } else {
      event.sender.send('extract-csv-data-reply', {
        error: true,
        data: 'Not a .csv file'
      })
    }
  })
})
