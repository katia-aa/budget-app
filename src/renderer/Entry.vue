<template>
  <article>
    <h1>{{ title }}</h1>
    <!-- <table>
      <tr>
        <th />
        <th v-for="(item, index) in data.headers" :key="index">{{item}}</th>
      </tr>
      <tr v-for="(items, index) in data.rows" :key="index">
        <td>
          <label for="needs">need</label>
          <input type="radio" name="needs"/>

          <label for="wishes">wish</label>
          <input type="radio" name="wishes"/>
          
          <label for="savings">saving</label>
          <input type="radio" name="savings"/>
        </td>
        <td v-for="(item, index) in items" :key="index">{{ item.length ? item: 'N/A' }}</td>
      </tr>
    </table> -->
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
    openFileSelectionDialog: function () {
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
    this.openFileSelectionDialog()

    ipcRenderer.on("extract-csv-data-reply", (event, arg) => {
      if (arg.error !== undefined && arg.error) {
        alert(arg.data)
        this.openFileSelectionDialog()
      } else {
        const { data } = arg
        if (data.length > 0) {
          this.data = data;
        }
      }
    });
  }
};

export default Vue.component("Entry", Entry);
</script>
