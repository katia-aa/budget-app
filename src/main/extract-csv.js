const fs = require('fs')
const readline = require('readline')

export const extractCsvLines = filePath => {
  return new Promise(resolve => {
    let wantedLines = {}
    let counter = 0
    const readStream = fs.createReadStream(filePath)
    const lineReader = readline.createInterface({
      input: readStream,
    })

    // On each line, increment counter and add the line to an array.
    lineReader.on('line', function(line) {
      if (counter === 0) {
        wantedLines.headers = line.split(',')
      } else {
        let row = {}
        wantedLines.headers.forEach((header, idx) => {
          row[header] = line.split(',')[idx]
        })
        if (wantedLines.rows !== undefined) {
          wantedLines.rows = [...wantedLines.rows, row]
        } else {
          wantedLines.rows = [row]
        }
      }
      counter++
    })

    // Upon receiving the close line event, send the
    // wantedLines to the renderer and close the lineReader.
    lineReader.on('close', function() {
      // Here we add custom columns to our csv data.
      wantedLines.headers = ['need', 'want', 'saving', ...wantedLines.headers]
      wantedLines.rows.forEach(row => {
        row.need = null
        row.want = null
        row.saving = null
      })

      resolve(wantedLines)
      lineReader.close()
      readStream.destroy()
    })
  })
}
