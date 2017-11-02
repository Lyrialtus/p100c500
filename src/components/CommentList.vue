<template>
  <div>
    <v-card
      :color="color"
      v-for="comment in comments"
      :key="comment.id"
    >
      <v-card-text>
        <div class="subheading grey--text">
          <v-tooltip top>
            <v-icon class="pb-1" slot="activator">perm_identity</v-icon>
            <span>{{ comment.email }}</span>
          </v-tooltip>
          {{ comment.name }}
        </div>
        <span style="white-space: pre-wrap">{{ comment.body }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },
    computed: {
      comments () {
        return this.$store.getters.commentsByPostId(this.postId)
      }
    }
  }
</script>
