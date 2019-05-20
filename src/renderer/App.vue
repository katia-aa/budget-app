<template>
  <div class="block">
    <div id="form-container" v-if="!this.isEntryView">
      <button @click="toggleView">New</button>
    </div>
    <entry v-else></entry>
  </div>
</template>

<script>
import _ from "lodash";
import Vue from "vue";
import Entry from "./Entry";

export default {
  name: "app",
  data: function() {
    return {
      isEntryView: false
    };
  },
  methods: {
    toggleView: function() {
      this.isEntryView = !this.isEntryView;
    }
  }
};
</script>

<style>
#form-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.block {
  height: 100vh;
  background-color: #046d8b;
}
</style>
