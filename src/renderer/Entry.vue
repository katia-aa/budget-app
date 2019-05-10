<template>
  <article>
    <h1>{{ title }}</h1>
    <table>
      <tr>
        <th v-for="(header, index) in data.headers" :key="index">{{header}}</th>
      </tr>
      <tr v-for="(row, rowIndex) in data.rows" :key="rowIndex">
        <td
          v-for="(header, headerIndex) in data.headers"
          :key="headerIndex"
        >
          <button 
            v-if="header === 'need'"
            @click="onClick('need', rowIndex)"
          >
            need
          </button>
          <button 
            v-else-if="header === 'want'"
            @click="onClick('want', rowIndex)"
          >
            want
          </button>
          <button 
            v-else-if="header === 'saving'"
            @click="onClick('saving', rowIndex)"
          >
            saving
          </button>
          <div v-else-if="row[header]">{{row[header]}}</div>
          <div v-else>N/A</div>
        </td>
      </tr>
    </table>
  </article>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import { remote } from "electron";
import { ipcRenderer } from "electron";

const Entry = {
  name: "Entry",
  props: ["title"],
  data() {
    return {
      data: [],
    };
  },
  methods: {
    onClick: function (type, rowIndex) {
      console.log(type)
      console.log(rowIndex)
    },
    openFileSelectionDialog: function() {
      remote.dialog.showOpenDialog(
        { properties: ["openFile", "openDirectory", "multiSelections"] },
        filePaths => {
          if (filePaths === undefined) {
            alert("You didn't select a folder");
            return;
          }
          ipcRenderer.send("extract-csv-data", filePaths);
        }
      );
    }
  },
  created() {
    this.openFileSelectionDialog();

    ipcRenderer.on("extract-csv-data-reply", (event, arg) => {
      if (arg.error !== undefined && arg.error) {
        alert(arg.data);
        this.openFileSelectionDialog();
      } else {
        this.data = arg.data;
      }
    });
  }
};

export default Vue.component("Entry", Entry);
</script>
