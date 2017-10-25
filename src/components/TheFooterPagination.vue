<template>
  <v-footer fixed app v-if="this.$route.name !== 'All'">
    <v-spacer class="mx-0"></v-spacer>
    <v-pagination circle
    :length="pagesTotal"
    @input="changePage"
    v-model="page">
    </v-pagination>
    <v-spacer class="mx-0"></v-spacer>
  </v-footer>
</template>

<script>
  export default {
    computed: {
      posts () {
        return this.$store.getters.allPosts
      },
      postsPerPage () {
        return this.$store.getters.postsPerPage
      },
      pagesTotal () {
        if (this.$route.name === 'Post') {
          return this.posts.length
        } else {
          return Math.floor((this.posts.length - 1) / this.postsPerPage) + 1
        }
      },
      page: {
        get () {
          if (['Page', 'Main'].includes(this.$route.name)) {
            let autoSetPage = parseInt(this.$route.params.id) || 1
            // OwO What's this?
            this.$store.commit('setCurrentPage', autoSetPage)
            return autoSetPage
          } else {
            return this.posts.indexOf(this.posts.find(post => {
              return post.id === parseInt(this.$route.params.id)
            })) + 1
          }
        },
        set (value) {
          if (this.$route.name === 'Post') {
            this.$store.commit('setCurrentPage', value)
          }
        }
      }
    },
    methods: {
      changePage (pageId) {
        if (this.$route.name === 'Post') {
          this.$router.push('/post/' + this.posts[pageId - 1].id)
        } else {
          this.$router.push('/page/' + pageId)
        }
      }
    }
  }
</script>
