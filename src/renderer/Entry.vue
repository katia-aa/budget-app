<template>
  <article>
    <section>
      <h3>Which column has the amount?</h3>
      <ul>
        <li v-for="(header, index) in data.headers" :key="index">
          <button>{{ header }}</button>
        </li>
      </ul>
    </section>
    <button
      @click="onCalculate()"
    >Calculate</button>
    <table>
      <tr>
        <th v-for="(header, index) in data.headers" :key="index">{{header}}</th>
      </tr>
      <tr v-for="(row, rowIndex) in data.rows" :key="rowIndex">
        <td v-for="(header, headerIndex) in data.headers" :key="headerIndex">
          <button
            v-if="header === 'need'"
            @click="onClick('need', rowIndex)"
            v-bind:class="{ 'active-button': data.rows[rowIndex]['need']}"
          >need</button>
          <button
            v-else-if="header === 'want'"
            @click="onClick('want', rowIndex)"
            v-bind:class="{ 'active-button': data.rows[rowIndex]['want']}"
          >want</button>
          <button
            v-else-if="header === 'saving'"
            @click="onClick('saving', rowIndex)"
            v-bind:class="{ 'active-button': data.rows[rowIndex]['saving']}"
          >saving</button>
          <div v-else-if="row[header]">{{row[header]}}</div>
          <div v-else>N/A</div>
        </td>
      </tr>
    </table>
  </article>
</template>

<style>
.active-button {
  background-color: red;
  color: white;
}
</style>

<script>
import Vue from "vue";
import _ from "lodash";
import { remote } from "electron";
import { ipcRenderer } from "electron";

export default Vue.component("entry", {
  name: "entry",
  data: function() {
    return {
      data: []
    };
  },
  methods: {
    onCalculate: function () {
      let need = 0
      let want = 0
      let saving = 0
      this.data.rows.forEach((row)=> {
        switch(true) {
          case row.need:
            need += parseFloat(row["Amount"])
            break
          case row.want:
            want += parseFloat(row["Amount"])
            break
          case row.saving:
            saving += parseFloat(row["Amount"])
            break
          default:
            null
        }
      })
     console.log(need)
    },
    onClick: function(action, rowIndex) {
      this.data.rows[rowIndex]["need"] = false;
      this.data.rows[rowIndex]["want"] = false;
      this.data.rows[rowIndex]["saving"] = false;
      this.data.rows[rowIndex][action] = true;
    }
  },
  created() {
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

    ipcRenderer.on("extract-csv-data-reply", (event, arg) => {
      if (arg.error !== undefined && arg.error) {
        alert(arg.data);
        this.openFileSelectionDialog();
      } else {
        this.data = arg.data;
      }
    });
  }
});
</script>
