<template>
  <v-dialog v-model="dialog" persistent max-width="700">
    <v-btn flat slot="activator" class="px-0 mini">
      <span>New<span class="hidden-sm-and-down"> post</span></span>
    </v-btn>
    <v-card>
      <v-card-text class="title text-xs-center">New Post
        <v-text-field
          name="title"
          v-model="title"
          label="Title"
        ></v-text-field>
        <v-text-field
          name="body"
          v-model="body"
          label="Text"
          hide-details
          multi-line
          auto-grow
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn flat @click.native="onSave">Save</v-btn>
        <v-spacer/>
        <v-btn flat @click.native="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        title: '',
        body: ''
      }
    },
    computed: {
      userId () {
        return parseInt(this.$store.getters.currentUser.id)
      }
    },
    methods: {
      onSave () {
        this.dialog = false
        let post = {
          title: this.title,
          body: this.body,
          userId: this.userId
        }
        this.$store.dispatch('createPost', post)
      }
    }
  }
</script>
