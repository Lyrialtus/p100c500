<template>
  <v-dialog v-model="dialog" persistent>
    <v-btn icon slot="activator"><v-icon>close</v-icon></v-btn>
    <v-card>
      <v-card-text class="title text-xs-center">Delete post?</v-card-text>
      <v-card-actions>
        <v-btn flat @click="onDelete">Delete</v-btn>
        <v-spacer/>
        <v-btn flat @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      itemType: {
        type: String,
        required: true,
        validator: value => ['Post', 'Comment'].indexOf(value) !== -1
      },
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      onDelete () {
        this.dialog = false
        this.$store.dispatch('delete' + this.itemType, this.item.id)
      }
    }
  }
</script>
