<template>
  <v-layout>
    <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
      <v-card color="grey lighten-4">
        <v-layout v-if="!edit">
          <v-card-title primary-title>
            <div>
              <span class="headline">{{ post.title }}</span>
              <span class="body-2 grey--text"> — by User {{ post.userId }}
              </span>
            </div>
          </v-card-title>
          <v-spacer/>
          <div id="edit" v-if="post.userId === userId">
            <v-tooltip left>
              <delete-confirmation-dialog
                slot="activator"
                :item="post"
                :itemType="'Post'"
              />
              <span>Delete post</span>
            </v-tooltip>
            <v-tooltip left>
              <v-btn icon slot="activator" @click="edit = true">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>Edit post</span>
            </v-tooltip>
          </div>
        </v-layout>
        <v-card-text v-if="edit">
          <v-text-field
            id="newTitle"
            label="Title"
            :value="post.title"
            hide-details
          ></v-text-field>
        </v-card-text>
        <v-card-text v-if="!edit">
          <span style="white-space: pre-wrap">{{ post.body }}</span>
        </v-card-text>
        <div v-if="edit">
          <v-card-text class="py-0">
            <v-text-field
              id="newBody"
              label="Text"
              :value="post.body"
              multi-line
              hide-details
              auto-grow
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn flat @click="edit = false">Cancel</v-btn>
            <v-spacer/>
            <v-btn flat @click="onSaveChanges">Save</v-btn>
          </v-card-actions>
        </div>
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
          <span style="white-space: pre-wrap">{{ comment.body }}</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        edit: false
      }
    },
    computed: {
      userId () {
        // This could be easily avoided with normal user objects
        return parseInt(this.$store.getters.currentUser.split(' ')[1])
      },
      post () {
        return this.$store.getters.postById(this.$route.params.id)
      },
      comments () {
        return this.$store.getters.commentsByPostId(this.$route.params.id)
      }
    },
    methods: {
      onSaveChanges () {
        this.edit = false
        const newTitle = document.getElementById('newTitle').value
        const newBody = document.getElementById('newBody').value
        this.$store.dispatch('editPost', {
          postId: this.post.id,
          title: newTitle,
          body: newBody
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #edit
    width: 52px
    height: 72px
</style>
