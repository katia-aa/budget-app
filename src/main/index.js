// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');
const readline = require('readline')
const path = require('path')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1400, height: 940 })

  // webpack dev server location
  mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

const closeWindow = () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

const recreateWindow = () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
}

const extractCsvLines = (filePath) => {
  return new Promise(resolve => {
    let wantedLines = {};
    let counter = 0;
    const readStream = fs.createReadStream(filePath)
    const lineReader = readline.createInterface({
      input: readStream
    });

    
    // On each line, increment counter and add the line to an array.
    lineReader.on('line',  function (line) {
      if (counter === 0) {
        wantedLines.headers = line.split(',');
      } else {
        let row = {}
        wantedLines.headers.forEach((header, idx) => {
          row[header] = line.split(',')[idx]
        })
        if (wantedLines.rows !== undefined) {
          wantedLines.rows = [
            ...wantedLines.rows,
            row
          ]
        } else {
          wantedLines.rows = [row]
        }
      }
      counter++;
    });

    // Upon receiving the close line event, send the 
    // wantedLines to the renderer and close the lineReader.
    lineReader.on('close', function () {
      // Here we add custom columns to our csv data.
      wantedLines.headers = [
        'need', 
        'want', 
        'saving', 
        ...wantedLines.headers
      ]
      wantedLines.rows.forEach((row) => {
        row.need = null
        row.want = null
        row.saving = null
      })

      resolve(wantedLines)
      lineReader.close()
      readStream.destroy()
    })
  });
}
async function sendCsvExtractedData(event, filePath) {
  const headers = await extractCsvLines(filePath);
  event.sender.send('extract-csv-data-reply', { data: headers })
}

ipcMain.on('extract-csv-data', (event, filePaths) => {
  filePaths.forEach(function (filePath) {
    const isCSV = path.extname(filePath).toLowerCase() === '.csv'
    if (isCSV) {
      try {
        sendCsvExtractedData(event, filePath)
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', closeWindow)
app.on('activate', recreateWindow)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
