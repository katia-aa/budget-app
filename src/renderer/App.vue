<template>
  <div>
    <div id="form-container" v-if="!this.isEntryView">
      <form v-on:submit="submitNewCollection">
        <label for="title">Enter title (month and year)</label>
        <input name="title" v-model="title">
        <button name="create" type="submit">Create</button>
      </form>

      <button v-on:click="clearCollection">Clear</button>

      <form>
        <label for="newTitle">Rename budget title</label>
        <input name="newTitle" v-model="newTitle">
      </form>
      <div>
        <div v-for="item in Object.keys(collection)" :key="item">
          {{ item }}
          <button :id="item" v-on:click="renameBudgetTitle">rename</button>
          <button :id="item" v-on:click="deleteEntry">delete</button>
          <button :id="item" v-on:click="selectEntry">select</button>
        </div>
      </div>
      <pre>{{collection}}</pre>
    </div>
    <Entry 
      v-else
      v-bind:title="selectedEntryTitle"
      @toggleView="toggleView"
    />
  </div>
</template>

<script>
import _ from "lodash";
import Store from "electron-store";
import Vue from "vue";
import Entry from './Entry'

const store = new Store();

const scaffold = {
  total: {
    startedWith: {
      value: 0,
      locked: false
    },
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
    saveBudget: function () {
      localStorage.setItem('budget', JSON.stringify(this.collection))
    },
    
    submitNewCollection: function(e) {
      e.preventDefault();

      this.collection = {
        ...this.collection,
        [this.title]: {
          ...scaffold
        }
      }
      
      this.title = "";
      this.saveBudget()
    },

    clearCollection: function() {
      this.collection = {} 
      this.saveBudget()
    },

    renameBudgetTitle: function(e) {
      this.collection = Object.keys(this.collection).reduce(
        (acc, val) => {
          if (val === e.target.id) {
            acc[this.newTitle] = this.collection[e.target.id];
          } else {
            acc[val] = this.collection[val];
          }
          return acc;
        },
        {}
      );

      this.newTitle = "";
      this.saveBudget()
    },

    deleteEntry: function(e) {
      this.collection = _.omit(this.collection, e.target.id)
      this.saveBudget()
    },

    selectEntry: function(e) {
      this.selectedEntryTitle = e.target.id;
      this.toggleView()
    },

    toggleView: function(e) {
      this.isEntryView = !this.isEntryView;
    }
  },
  mounted() {
    const budget = localStorage.getItem('budget')
    const budgetExists = budget !== null

    if (budgetExists) {
      this.collection = JSON.parse(budget)
    } else {
      this.collection = {}
      this.saveBudget()
    }
  },
  data() {
    return {
      title: "",
      newTitle: "",
      collection: store.get("budget") || {},
      isEntryView: false,
      selectedEntryTitle: undefined,
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
