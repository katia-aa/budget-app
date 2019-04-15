<template>
  <section>
    <div>{{ title }}</div>
    <button @click="viewEntries">View entries list</button>

    
    <label for="entry.total.startedWith.value">Change started with total</label>
    <input :disabled="this.entry.total.startedWith.locked" name="entry.total.startedWith.value" v-model="entry.total.startedWith.value">
    <button name="0.0" @click="saveBudget">Change</button>
    <button name="0.0" @click="unlock">Edit</button>
    

    <pre>{{ entry }}</pre>
  </section>
</template>

<script>
import Vue from "vue";
import _ from 'lodash'

const Entry = {
  name: "Entry",
  props: ["title"],
  data() {
    return {
      entry: {
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
        },
        earned: {
          inTfsa: [],
          inMutualFunds: []
        }
      }
    };
  },
  methods: {
    setLock: function(targetName, lock) {
      const keyAccessor = targetName.split('.').map((el) => parseInt(el, 10))
      const accessLvlfirst = Object.keys(this.entry)[keyAccessor[0]]
      const accessLvlSecond = Object.keys(this.entry[accessLvlfirst])[keyAccessor[1]]
      this.entry[accessLvlfirst][accessLvlSecond].locked = lock
    },
    saveBudget: function(e) {
      e.preventDefault();
      const budget = localStorage.getItem("budget");
      const parsedBudget = JSON.parse(budget);
      this.setLock(e.target.name, true)
      const collection = {
        ...parsedBudget,
        [this.title]: this.entry
      };
      
      localStorage.setItem("budget", JSON.stringify(collection));
    },
    unlock: function (e) {
      console.log('e.target')
      console.log(e.target)
      this.setLock(e.target.name, false)
    },
    viewEntries: function() {
      this.$emit("toggleView");
    }
  },
  mounted() {
    const budget = localStorage.getItem("budget");
    const parsedBudget = JSON.parse(budget);
    this.entry = parsedBudget[this.title];
  }
};

export default Vue.component("Entry", Entry);
</script>
