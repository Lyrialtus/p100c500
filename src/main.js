
import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VBtn,
  VCard,
  VDialog,
  VFooter,
  VGrid,
  VIcon,
  VList,
  VPagination,
  VProgressCircular,
  VSelect,
  VTextField,
  VToolbar,
  VTooltip,
  transitions
} from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import store from './store'

import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import CommentList from './components/CommentList'

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VDialog,
    VFooter,
    VGrid,
    VIcon,
    VList,
    VPagination,
    VProgressCircular,
    VSelect,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  }
})

Vue.config.productionTip = false

Vue.component('delete-confirmation-dialog', DeleteConfirmationDialog)
Vue.component('comment-list', CommentList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('getPostsAndComments')
    this.$store.commit('setCurrentUser', {
      id: 1,
      name: 'User 1'
    })
  }
})
