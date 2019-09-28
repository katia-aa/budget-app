<template>
  <article>
    <table>
      <tr>
        <th v-for="(header, index) in data.headers" :key="index">{{ header }}</th>
      </tr>
      <tr v-for="(row, rowIndex) in data.rows" :key="rowIndex">
        <td v-for="(header, headerIndex) in data.headers" :key="headerIndex">
          <button v-if="header === 'need'" @click="onClick('need', rowIndex)">need</button>
          <button v-else-if="header === 'want'" @click="onClick('want', rowIndex)">want</button>
          <button v-else-if="header === 'saving'" @click="onClick('saving', rowIndex)">saving</button>
          <div v-else-if="row[header]">{{ row[header] }}</div>
          <div v-else>N/A</div>
        </td>
      </tr>
    </table>
  </article>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import { remote } from 'electron'
import { ipcRenderer } from 'electron'

export default Vue.component('entry', {
  name: 'entry',
  data: function() {
    return {
      data: [],
    }
  },
  methods: {
    onClick: function(type, rowIndex) {
      console.log(type)
      console.log(rowIndex)
      // To-do: modify data to mark the selected row as a type.
      // I was going to use the map function but I'm going to
      // do some slicing instead.
    },
  },
  created() {
    remote.dialog.showOpenDialog(
      { properties: ['openFile', 'openDirectory', 'multiSelections'] },
      filePaths => {
        if (filePaths === undefined) {
          alert("You didn't select a folder")
          return
        }
        ipcRenderer.send('extract-csv-data', filePaths)
      }
    )

    ipcRenderer.on('extract-csv-data-reply', (event, arg) => {
      if (arg.error !== undefined && arg.error) {
        alert(arg.data)
        this.openFileSelectionDialog()
      } else {
        this.data = arg.data
      }
    })
  },
})
</script>
