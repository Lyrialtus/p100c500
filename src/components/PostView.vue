<template>
  <v-layout>
    <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
      <v-card color="grey lighten-4">
        <v-layout>
          <v-card-title primary-title>
            <div>
              <span class="headline">{{ post.title }}</span>
              <span class="body-2 grey--text"> — by User {{ post.userId }}
              </span>
            </div>
          </v-card-title>
          <v-spacer></v-spacer>
          <delete-confirmation-dialog :item="post" :itemType="'Post'"/>
        </v-layout>
        <v-card-text>
          {{ post.body }}
        </v-card-text>
      </v-card>
      <div class="title text-xs-center my-3">Comments: {{ comments.length }}
      </div>
      <v-card color="grey lighten-4"
      v-for="comment in comments"
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
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      post () {
        console.log(this.$route)
        return this.$store.getters.postById(this.$route.params.id)
      },
      comments () {
        return this.$store.getters.commentsByPostId(this.$route.params.id)
      }
    }
  }
</script>
