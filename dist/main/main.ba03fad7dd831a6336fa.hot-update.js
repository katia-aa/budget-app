exports.id = 'main'
exports.modules = {
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