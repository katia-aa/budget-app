exports.id = 'main'
exports.modules = {
  /***/ './src/main/create-window.js':
    /*!***********************************!*\
  !*** ./src/main/create-window.js ***!
  \***********************************/
    /*! exports provided: createWindow, closeWindow, recreateWindow */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createWindow\", function() { return createWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeWindow\", function() { return closeWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"recreateWindow\", function() { return recreateWindow; });\nconst createWindow = (BrowserWindow, mainWindow) => {\n  const dimensions = {\n    width: 1400,\n    height: 940\n  };\n  mainWindow = new BrowserWindow({ ...dimensions,\n    show: false\n  });\n\n  const showWindow = () => mainWindow.show();\n\n  const discardWindow = () => mainWindow = null;\n\n  mainWindow.once('ready-to-show', showWindow); // webpack dev server location\n\n  mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);\n  mainWindow.on('closed', discardWindow);\n};\nconst closeWindow = () => {\n  // On macOS it is common for applications and their menu bar\n  // to stay active until the user quits explicitly with Cmd + Q\n  if (process.platform !== 'darwin') {\n    app.quit();\n  }\n};\nconst recreateWindow = (createWindow, mainWindow) => {\n  // On macOS it's common to re-create a window in the app when the\n  // dock icon is clicked and there are no other windows open.\n  if (mainWindow === null) {\n    createWindow();\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9jcmVhdGUtd2luZG93LmpzP2NjY2IiXSwibmFtZXMiOlsiY3JlYXRlV2luZG93IiwiQnJvd3NlcldpbmRvdyIsIm1haW5XaW5kb3ciLCJkaW1lbnNpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJzaG93Iiwic2hvd1dpbmRvdyIsImRpc2NhcmRXaW5kb3ciLCJvbmNlIiwibG9hZFVSTCIsInByb2Nlc3MiLCJlbnYiLCJFTEVDVFJPTl9XRUJQQUNLX1dEU19QT1JUIiwib24iLCJjbG9zZVdpbmRvdyIsInBsYXRmb3JtIiwiYXBwIiwicXVpdCIsInJlY3JlYXRlV2luZG93Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLE1BQU1BLFlBQVksR0FBRyxDQUFDQyxhQUFELEVBQWdCQyxVQUFoQixLQUErQjtBQUN6RCxRQUFNQyxVQUFVLEdBQUc7QUFBRUMsU0FBSyxFQUFFLElBQVQ7QUFBZUMsVUFBTSxFQUFFO0FBQXZCLEdBQW5CO0FBQ0FILFlBQVUsR0FBRyxJQUFJRCxhQUFKLENBQWtCLEVBQUUsR0FBR0UsVUFBTDtBQUFpQkcsUUFBSSxFQUFFO0FBQXZCLEdBQWxCLENBQWI7O0FBRUEsUUFBTUMsVUFBVSxHQUFHLE1BQU1MLFVBQVUsQ0FBQ0ksSUFBWCxFQUF6Qjs7QUFDQSxRQUFNRSxhQUFhLEdBQUcsTUFBT04sVUFBVSxHQUFHLElBQTFDOztBQUVBQSxZQUFVLENBQUNPLElBQVgsQ0FBZ0IsZUFBaEIsRUFBaUNGLFVBQWpDLEVBUHlELENBU3pEOztBQUNBTCxZQUFVLENBQUNRLE9BQVgsQ0FDRyxvQkFBbUJDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyx5QkFBMEIsRUFENUQ7QUFJQVgsWUFBVSxDQUFDWSxFQUFYLENBQWMsUUFBZCxFQUF3Qk4sYUFBeEI7QUFDRCxDQWZNO0FBaUJBLE1BQU1PLFdBQVcsR0FBRyxNQUFNO0FBQy9CO0FBQ0E7QUFDQSxNQUFJSixPQUFPLENBQUNLLFFBQVIsS0FBcUIsUUFBekIsRUFBbUM7QUFDakNDLE9BQUcsQ0FBQ0MsSUFBSjtBQUNEO0FBQ0YsQ0FOTTtBQVFBLE1BQU1DLGNBQWMsR0FBRyxDQUFDbkIsWUFBRCxFQUFlRSxVQUFmLEtBQThCO0FBQzFEO0FBQ0E7QUFDQSxNQUFJQSxVQUFVLEtBQUssSUFBbkIsRUFBeUI7QUFDdkJGLGdCQUFZO0FBQ2I7QUFDRixDQU5NIiwiZmlsZSI6Ii4vc3JjL21haW4vY3JlYXRlLXdpbmRvdy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVXaW5kb3cgPSAoQnJvd3NlcldpbmRvdywgbWFpbldpbmRvdykgPT4ge1xuICBjb25zdCBkaW1lbnNpb25zID0geyB3aWR0aDogMTQwMCwgaGVpZ2h0OiA5NDAgfVxuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coeyAuLi5kaW1lbnNpb25zLCBzaG93OiBmYWxzZSB9KVxuXG4gIGNvbnN0IHNob3dXaW5kb3cgPSAoKSA9PiBtYWluV2luZG93LnNob3coKVxuICBjb25zdCBkaXNjYXJkV2luZG93ID0gKCkgPT4gKG1haW5XaW5kb3cgPSBudWxsKVxuXG4gIG1haW5XaW5kb3cub25jZSgncmVhZHktdG8tc2hvdycsIHNob3dXaW5kb3cpXG5cbiAgLy8gd2VicGFjayBkZXYgc2VydmVyIGxvY2F0aW9uXG4gIG1haW5XaW5kb3cubG9hZFVSTChcbiAgICBgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LkVMRUNUUk9OX1dFQlBBQ0tfV0RTX1BPUlR9YFxuICApXG5cbiAgbWFpbldpbmRvdy5vbignY2xvc2VkJywgZGlzY2FyZFdpbmRvdylcbn1cblxuZXhwb3J0IGNvbnN0IGNsb3NlV2luZG93ID0gKCkgPT4ge1xuICAvLyBPbiBtYWNPUyBpdCBpcyBjb21tb24gZm9yIGFwcGxpY2F0aW9ucyBhbmQgdGhlaXIgbWVudSBiYXJcbiAgLy8gdG8gc3RheSBhY3RpdmUgdW50aWwgdGhlIHVzZXIgcXVpdHMgZXhwbGljaXRseSB3aXRoIENtZCArIFFcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG4gICAgYXBwLnF1aXQoKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWNyZWF0ZVdpbmRvdyA9IChjcmVhdGVXaW5kb3csIG1haW5XaW5kb3cpID0+IHtcbiAgLy8gT24gbWFjT1MgaXQncyBjb21tb24gdG8gcmUtY3JlYXRlIGEgd2luZG93IGluIHRoZSBhcHAgd2hlbiB0aGVcbiAgLy8gZG9jayBpY29uIGlzIGNsaWNrZWQgYW5kIHRoZXJlIGFyZSBubyBvdGhlciB3aW5kb3dzIG9wZW4uXG4gIGlmIChtYWluV2luZG93ID09PSBudWxsKSB7XG4gICAgY3JlYXRlV2luZG93KClcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/create-window.js\n"
      )

      /***/
    },

  /***/ './src/main/extract-csv.js':
    /*!*********************************!*\
  !*** ./src/main/extract-csv.js ***!
  \*********************************/
    /*! exports provided: extractCsvLines */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extractCsvLines\", function() { return extractCsvLines; });\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst readline = __webpack_require__(/*! readline */ \"readline\");\n\nconst extractCsvLines = filePath => {\n  return new Promise(resolve => {\n    let wantedLines = {};\n    let counter = 0;\n    const readStream = fs.createReadStream(filePath);\n    const lineReader = readline.createInterface({\n      input: readStream\n    }); // On each line, increment counter and add the line to an array.\n\n    lineReader.on('line', function (line) {\n      if (counter === 0) {\n        wantedLines.headers = line.split(',');\n      } else {\n        let row = {};\n        wantedLines.headers.forEach((header, idx) => {\n          row[header] = line.split(',')[idx];\n        });\n\n        if (wantedLines.rows !== undefined) {\n          wantedLines.rows = [...wantedLines.rows, row];\n        } else {\n          wantedLines.rows = [row];\n        }\n      }\n\n      counter++;\n    }); // Upon receiving the close line event, send the\n    // wantedLines to the renderer and close the lineReader.\n\n    lineReader.on('close', function () {\n      // Here we add custom columns to our csv data.\n      wantedLines.headers = ['need', 'want', 'saving', ...wantedLines.headers];\n      wantedLines.rows.forEach(row => {\n        row.need = null;\n        row.want = null;\n        row.saving = null;\n      });\n      resolve(wantedLines);\n      lineReader.close();\n      readStream.destroy();\n    });\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9leHRyYWN0LWNzdi5qcz8wMjMwIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInJlYWRsaW5lIiwiZXh0cmFjdENzdkxpbmVzIiwiZmlsZVBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndhbnRlZExpbmVzIiwiY291bnRlciIsInJlYWRTdHJlYW0iLCJjcmVhdGVSZWFkU3RyZWFtIiwibGluZVJlYWRlciIsImNyZWF0ZUludGVyZmFjZSIsImlucHV0Iiwib24iLCJsaW5lIiwiaGVhZGVycyIsInNwbGl0Iiwicm93IiwiZm9yRWFjaCIsImhlYWRlciIsImlkeCIsInJvd3MiLCJ1bmRlZmluZWQiLCJuZWVkIiwid2FudCIsInNhdmluZyIsImNsb3NlIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBLE1BQU1BLEVBQUUsR0FBR0MsbUJBQU8sQ0FBQyxjQUFELENBQWxCOztBQUNBLE1BQU1DLFFBQVEsR0FBR0QsbUJBQU8sQ0FBQywwQkFBRCxDQUF4Qjs7QUFFTyxNQUFNRSxlQUFlLEdBQUdDLFFBQVEsSUFBSTtBQUN6QyxTQUFPLElBQUlDLE9BQUosQ0FBWUMsT0FBTyxJQUFJO0FBQzVCLFFBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxDQUFkO0FBQ0EsVUFBTUMsVUFBVSxHQUFHVCxFQUFFLENBQUNVLGdCQUFILENBQW9CTixRQUFwQixDQUFuQjtBQUNBLFVBQU1PLFVBQVUsR0FBR1QsUUFBUSxDQUFDVSxlQUFULENBQXlCO0FBQzFDQyxXQUFLLEVBQUVKO0FBRG1DLEtBQXpCLENBQW5CLENBSjRCLENBUTVCOztBQUNBRSxjQUFVLENBQUNHLEVBQVgsQ0FBYyxNQUFkLEVBQXNCLFVBQVNDLElBQVQsRUFBZTtBQUNuQyxVQUFJUCxPQUFPLEtBQUssQ0FBaEIsRUFBbUI7QUFDakJELG1CQUFXLENBQUNTLE9BQVosR0FBc0JELElBQUksQ0FBQ0UsS0FBTCxDQUFXLEdBQVgsQ0FBdEI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxHQUFHLEdBQUcsRUFBVjtBQUNBWCxtQkFBVyxDQUFDUyxPQUFaLENBQW9CRyxPQUFwQixDQUE0QixDQUFDQyxNQUFELEVBQVNDLEdBQVQsS0FBaUI7QUFDM0NILGFBQUcsQ0FBQ0UsTUFBRCxDQUFILEdBQWNMLElBQUksQ0FBQ0UsS0FBTCxDQUFXLEdBQVgsRUFBZ0JJLEdBQWhCLENBQWQ7QUFDRCxTQUZEOztBQUdBLFlBQUlkLFdBQVcsQ0FBQ2UsSUFBWixLQUFxQkMsU0FBekIsRUFBb0M7QUFDbENoQixxQkFBVyxDQUFDZSxJQUFaLEdBQW1CLENBQUMsR0FBR2YsV0FBVyxDQUFDZSxJQUFoQixFQUFzQkosR0FBdEIsQ0FBbkI7QUFDRCxTQUZELE1BRU87QUFDTFgscUJBQVcsQ0FBQ2UsSUFBWixHQUFtQixDQUFDSixHQUFELENBQW5CO0FBQ0Q7QUFDRjs7QUFDRFYsYUFBTztBQUNSLEtBZkQsRUFUNEIsQ0EwQjVCO0FBQ0E7O0FBQ0FHLGNBQVUsQ0FBQ0csRUFBWCxDQUFjLE9BQWQsRUFBdUIsWUFBVztBQUNoQztBQUNBUCxpQkFBVyxDQUFDUyxPQUFaLEdBQXNCLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkIsR0FBR1QsV0FBVyxDQUFDUyxPQUExQyxDQUF0QjtBQUNBVCxpQkFBVyxDQUFDZSxJQUFaLENBQWlCSCxPQUFqQixDQUF5QkQsR0FBRyxJQUFJO0FBQzlCQSxXQUFHLENBQUNNLElBQUosR0FBVyxJQUFYO0FBQ0FOLFdBQUcsQ0FBQ08sSUFBSixHQUFXLElBQVg7QUFDQVAsV0FBRyxDQUFDUSxNQUFKLEdBQWEsSUFBYjtBQUNELE9BSkQ7QUFNQXBCLGFBQU8sQ0FBQ0MsV0FBRCxDQUFQO0FBQ0FJLGdCQUFVLENBQUNnQixLQUFYO0FBQ0FsQixnQkFBVSxDQUFDbUIsT0FBWDtBQUNELEtBWkQ7QUFhRCxHQXpDTSxDQUFQO0FBMENELENBM0NNIiwiZmlsZSI6Ii4vc3JjL21haW4vZXh0cmFjdC1jc3YuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IHJlYWRsaW5lID0gcmVxdWlyZSgncmVhZGxpbmUnKVxuXG5leHBvcnQgY29uc3QgZXh0cmFjdENzdkxpbmVzID0gZmlsZVBhdGggPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IHdhbnRlZExpbmVzID0ge31cbiAgICBsZXQgY291bnRlciA9IDBcbiAgICBjb25zdCByZWFkU3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShmaWxlUGF0aClcbiAgICBjb25zdCBsaW5lUmVhZGVyID0gcmVhZGxpbmUuY3JlYXRlSW50ZXJmYWNlKHtcbiAgICAgIGlucHV0OiByZWFkU3RyZWFtLFxuICAgIH0pXG5cbiAgICAvLyBPbiBlYWNoIGxpbmUsIGluY3JlbWVudCBjb3VudGVyIGFuZCBhZGQgdGhlIGxpbmUgdG8gYW4gYXJyYXkuXG4gICAgbGluZVJlYWRlci5vbignbGluZScsIGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIGlmIChjb3VudGVyID09PSAwKSB7XG4gICAgICAgIHdhbnRlZExpbmVzLmhlYWRlcnMgPSBsaW5lLnNwbGl0KCcsJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByb3cgPSB7fVxuICAgICAgICB3YW50ZWRMaW5lcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgcm93W2hlYWRlcl0gPSBsaW5lLnNwbGl0KCcsJylbaWR4XVxuICAgICAgICB9KVxuICAgICAgICBpZiAod2FudGVkTGluZXMucm93cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2FudGVkTGluZXMucm93cyA9IFsuLi53YW50ZWRMaW5lcy5yb3dzLCByb3ddXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FudGVkTGluZXMucm93cyA9IFtyb3ddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvdW50ZXIrK1xuICAgIH0pXG5cbiAgICAvLyBVcG9uIHJlY2VpdmluZyB0aGUgY2xvc2UgbGluZSBldmVudCwgc2VuZCB0aGVcbiAgICAvLyB3YW50ZWRMaW5lcyB0byB0aGUgcmVuZGVyZXIgYW5kIGNsb3NlIHRoZSBsaW5lUmVhZGVyLlxuICAgIGxpbmVSZWFkZXIub24oJ2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBIZXJlIHdlIGFkZCBjdXN0b20gY29sdW1ucyB0byBvdXIgY3N2IGRhdGEuXG4gICAgICB3YW50ZWRMaW5lcy5oZWFkZXJzID0gWyduZWVkJywgJ3dhbnQnLCAnc2F2aW5nJywgLi4ud2FudGVkTGluZXMuaGVhZGVyc11cbiAgICAgIHdhbnRlZExpbmVzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICByb3cubmVlZCA9IG51bGxcbiAgICAgICAgcm93LndhbnQgPSBudWxsXG4gICAgICAgIHJvdy5zYXZpbmcgPSBudWxsXG4gICAgICB9KVxuXG4gICAgICByZXNvbHZlKHdhbnRlZExpbmVzKVxuICAgICAgbGluZVJlYWRlci5jbG9zZSgpXG4gICAgICByZWFkU3RyZWFtLmRlc3Ryb3koKVxuICAgIH0pXG4gIH0pXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/extract-csv.js\n"
      )

      /***/
    },
}