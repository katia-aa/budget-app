/* This file is required by the index.html file and will
  be executed in the renderer process for that window.
  All of the Node.js APIs are available in this process.*/

import Vue from 'vue'
import App from './App.vue'

const instance = {
  el: '#app',
  render: (h) => {
    return h(App)
  }
}

new Vue(instance)
