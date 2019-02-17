/* This file is required by the index.html file and will
  be executed in the renderer process for that window.
  All of the Node.js APIs are available in this process.*/

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
  render(h) {
    return h(App)
  },
  renderError(h, err) {
    return h('pre', {
      style: {
        color: 'red'
      }
    }, err.stack)
  }
}).$mount('#app')



// Sample data structure.

/*
{
  data: {
      december_2018: {
        total: {
            startedWith: undefined,
            saved: undefined,
            spent: undefined,
            earned: undefined,
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
            inOther: [],
          },
          saved: {
            inTfsa: [],
            inMutualFunds: [],
          }
        }
    
  }
}
*/