<template>
  <v-app light>
    <v-toolbar color="grey lighten-3" dense fixed app>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          p100c500
        </router-link>
      </v-toolbar-title>
      <a id="hub" href="https://github.com/Lyrialtus/p100c500" target="_blank">
        <span class="mx-3 hidden-xs-only">GitHub
          <span class="hidden-sm-and-down"> Repository</span>
        </span>
      </a>
      <v-btn flat to="/all" class="mini">
        <span>All<span class="hidden-sm-and-down"> posts</span></span>
      </v-btn>
      <post-form/>
      <v-spacer/>
      <v-card flat class="mx-0">
        <v-select
          :items="allUsers"
          v-model="currentUser"
          solo
          auto
        ></v-select>
      </v-card>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid class="px-0" v-if="!loading">
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
    <the-footer-pagination/>
  </v-app>
</template>

<script>
  import TheFooterPagination from './components/TheFooterPagination'
  import PostForm from './components/PostForm'

  export default {
    components: {
      TheFooterPagination,
      PostForm
    },
    computed: {
      currentUser: {
        get () {
          return this.$store.getters.currentUser
        },
        set (user) {
          this.$store.commit('setCurrentUser', user)
        }
      },
      allUsers () {
        return this.$store.getters.allUsers
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  #hub
    text-decoration: none
    color: grey

  .mini
    min-width: auto

  footer
    height: 50px

  .pagination__item--active
    color: black !important
    background: $grey.lighten-2 !important
</style>
