<template>
  <v-layout>
    <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
      <v-card color="grey lighten-4" v-for="post in posts" :key="post.id">
        <v-card-title primary-title>
          <div class="headline">
            <span class="grey--text">{{ post.id }}. </span>
            {{ post.title }}
          </div>
        </v-card-title>
        <v-card-text>
          {{ post.body }}
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.native="post.showComments = !post.showComments">
            {{ post.showComments ? 'Hide comments' : 'Show comments' }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat :to="`/post/${post.id}`">Open post</v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <div v-if="post.showComments" class="pb-3">
            <v-card color="grey lighten-3" class="mx-3"
            v-for="comment in comments"
            v-if="comment.postId === post.id"
            :key="comment.id">
              <v-card-text>
                <div class="subheading grey--text">
                  <v-tooltip top>
                    <v-icon class="pb-1" slot="activator">perm_identity</v-icon>
                    <span>{{ comment.email }}</span>
                  </v-tooltip>
                  {{ comment.name }}
                </div>
                {{ comment.body }}
              </v-card-text>
            </v-card>
          </div>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      currentPage () {
        return this.$store.getters.currentPage
      },
      postsPerPage () {
        return this.$store.getters.postsPerPage
      },
      posts () {
        console.log(this.$route)
        // fix!
        let allPosts = this.$store.getters.allPosts
        if (this.$route.name === 'All') {
          return allPosts
        }
        let start = (this.currentPage - 1) * this.postsPerPage
        let end = this.currentPage * this.postsPerPage
        return allPosts.slice(start, end)
      },
      comments () {
        return this.$store.getters.allComments
      }
    }
  }
</script>
