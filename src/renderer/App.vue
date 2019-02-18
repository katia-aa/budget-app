<template>
  <div id="form-container">
    <form v-on:submit="submitBudgetTitle">
      <label for="budgetTitle">Enter title (month and year)</label>
      <input name="budgetTitle" v-model="budgetTitle">
      <button name="create" type="submit">Create</button>
    </form>
    <button v-on:click="clearBudget">Clear</button>
    <form>
      <label for="renamedTitle">Rename budget title</label>
      <input name="renamedTitle" v-model="renamedTitle">
    </form>
    <div v-for="item in Object.keys(this.database)" :key="item">
      {{ item }}
      <button :id="item" v-on:click="renameBudgetTitle">rename</button>
      <button :id="item" v-on:click="deleteEntry">delete</button>
    </div>
    <pre>{{database}}</pre>
  </div>
</template>

<script>
import _ from "lodash";
import Store from "electron-store";
import Vue from "vue";
const store = new Store();

const scaffold = {
  total: {
    startedWith: 0,
    saved: 0,
    spent: 0,
    earned: 0
  },
  spent: {
    inRent: [],
    inGuitar: [],
    inTransportation: [],
    inWeed: [],
    inGroceries: [],
    inEntertainment: [],
    inRestaurantsAndBars: [],
    inClothing: [],
    inItunes: [],
    inGifts: [],
    inPharmacy: [],
    inAlcohol: [],
    inAmazon: [],
    inOther: []
  },
  saved: {
    inTfsa: [],
    inMutualFunds: []
  }
};

const Form = {
  name: "Form",
  methods: {
    submitBudgetTitle: function(e) {
      e.preventDefault();

      this.database = {
        ...this.database,
        [this.budgetTitle]: {
          ...scaffold
        }
      };

      store.set(`budget`, this.database);
      this.budgetTitle = "";
    },
    clearBudget: function() {
      this.database = {};
      store.delete(`budget`);
    },
    renameBudgetTitle: function(e) {
      const changedDatabase = Object.keys(this.database).reduce((acc, val) => {
        if (val === e.target.id) {
          acc[this.renamedTitle] = this.database[e.target.id];
        } else {
          acc[val] = this.database[val];
        }
        return acc;
      }, {});

      this.database = changedDatabase;
      store.set(`budget`, this.database);
      this.renamedTitle = "";
    },
    deleteEntry: function(e) {
      const updatedDatabase = { ...this.database };
      delete updatedDatabase[e.target.id];
      this.database = updatedDatabase;
      store.set(`budget`, this.database);
    }
  },
  data() {
    return {
      budgetTitle: "",
      renamedTitle: "",
      database: store.get("budget") || {}
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
