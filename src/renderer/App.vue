<template>
  <div>
    <div id="form-container" v-if="!this.isEntryView">
      <button v-on:click="toggleView">New</button>
    </div>
    <Entry v-else v-bind:title="selectedEntryTitle" @toggleView="toggleView"/>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import Entry from "./Entry";

const Form = {
  name: "Form",
  methods: {
    toggleView: function(e) {
      this.isEntryView = !this.isEntryView;
    }
  },
  data() {
    return {
      title: "",
      newTitle: "",
      collection: {},
      isEntryView: false,
      selectedEntryTitle: undefined
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
