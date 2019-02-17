<template>
  <div id="form-container">
    <form v-on:submit="submitBudgetTitle">
      <label for="budgetTitle">Enter title (month and year)</label>
      <input name="budgetTitle" v-model="budgetTitle">
      <button name="create" v-if="Object.keys(database).length === 0" type="submit">Create</button>
      <button name="clear" v-else type="submit">Clear</button>
    </form>

    <form v-on:submit="renameBudgetTitle">
      <label for="renamedTitle">Rename budget title</label>
      <input name="renamedTitle" v-model="renamedTitle">
      <button name="clear" type="submit">rename</button>
    </form>

    <pre>{{database}}</pre>
  </div>
</template>

<script>
import _ from "lodash";
import Store from "electron-store";
import Vue from "vue";
const store = new Store();

const Form = {
  name: "Form",
  methods: {
    submitBudgetTitle: function(e) {
      e.preventDefault();

      if (_.isEmpty(this.database)) {
        store.set(`budget.${this.budgetTitle}`, {});
      } else {
        store.delete(`budget.${Object.keys(this.database)[0]}`);
      }

      // Update local app state and clear field.
      this.database = store.get(`budget`);
      this.budgetTitle = "";
    },
    renameBudgetTitle: function(e) {
      e.preventDefault();

      const budgetContent = `budget.${Object.keys(this.database)[0]}`;
      const budgetTitle = Object.keys(this.database)[0];

      store.set("temp", store.get(budgetContent));
      store.delete(`budget.${budgetTitle}`);
      store.set(`budget.${this.renamedTitle}`, store.get("temp"));

      // Update local app state, delete temporary data and clear field.
      this.database = store.get(`budget`);
      store.delete("temp");
      this.renamedTitle = "";
    }
  },
  data() {
    return {
      budgetTitle: "",
      renamedTitle: "",
      database: store.get("budget")
    };
  }
};

export default Form;
</script>

<style>
#form-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
