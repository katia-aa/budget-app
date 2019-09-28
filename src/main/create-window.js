export const createWindow = (BrowserWindow, mainWindow) => {
  const dimensions = { width: 1400, height: 940 }
  mainWindow = new BrowserWindow({ ...dimensions, show: false })

  const showWindow = () => mainWindow.show()
  const discardWindow = () => (mainWindow = null)

  mainWindow.once('ready-to-show', showWindow)

  // webpack dev server location
  mainWindow.loadURL(
    `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
  )

  mainWindow.on('closed', discardWindow)
}

export const closeWindow = () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

export const recreateWindow = (createWindow, mainWindow) => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
}
