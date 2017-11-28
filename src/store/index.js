import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const root = 'https://jsonplaceholder.typicode.com/'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    posts: [],
    comments: [],
    postsPerPage: 15,
    currentPage: 1,
    currentUser: {},
    loading: false
  },

  getters: {
    allPosts (state) {
      return state.posts
    },
    postById (state) {
      return postId => state.posts.find(post => post.id === parseInt(postId))
    },
    allComments (state) {
      return state.comments
    },
    commentsByPostId (state) {
      return postId => state.comments.filter(comment => {
        return comment.postId === postId
      })
    },
    postsPerPage (state) {
      return state.postsPerPage
    },
    currentPage (state) {
      return state.currentPage
    },
    currentUser (state) {
      return state.currentUser
    },
    allUsers (state) {
      return [...new Set(state.posts.map(post => {
        return JSON.stringify({
          id: post.userId,
          name: 'User ' + post.userId
        })
      }))].map(string => JSON.parse(string))
    },
    loading (state) {
      return state.loading
    }
  },

  mutations: {
    setAllPosts (state, posts) {
      posts.forEach(post => {
        post.showComments = false
      })
      state.posts = posts
    },
    addPost (state, post) {
      state.posts.push(post)
    },
    updatePost (state, post) {
      const index = state.posts.findIndex(oldPost => oldPost.id === post.id)
      state.posts[index] = post
    },
    toggleComments (state, postId) {
      const index = state.posts.findIndex(post => post.id === postId)
      state.posts[index].showComments = !state.posts[index].showComments
    },
    deletePostById (state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId)
    },
    setAllComments (state, comments) {
      state.comments = comments
    },
    deleteCommentById (state, commentId) {
      state.comments = state.comments.filter(comment => {
        return comment.id !== commentId
      })
    },
    deleteCommentsByPostId (state, postId) {
      state.comments = state.comments.filter(comment => {
        return comment.postId !== postId
      })
    },
    setCurrentPage (state, value) {
      state.currentPage = value
    },
    setCurrentUser (state, user) {
      state.currentUser = user
    },
    setLoading (state, isLoading) {
      state.loading = isLoading
    }
  },

  actions: {
    async getPostsAndComments ({ commit }) {
      commit('setLoading', true)

      const postsRequest = fetch(root + 'posts')
      .then(response => response.json())
      .then(json => commit('setAllPosts', json))
      .catch(error => console.log(error))

      const commentsRequest = fetch(root + 'comments')
      .then(response => response.json())
      .then(json => commit('setAllComments', json))
      .catch(error => console.log(error))

      await Promise.all([postsRequest, commentsRequest])
      commit('setLoading', false)
    },
    createPost ({ commit }, post) {
      fetch(root + 'posts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
      })
      .then(response => response.json())
      .then(post => {
        commit('addPost', post)
        return post.id
      })
      .then(postId => router.push('/post/' + postId))
      .catch(error => console.log(error))
    },
    editPost ({ commit }, data) {
      commit('setLoading', true)
      fetch(root + 'posts/' + data.postId, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: data.title,
          body: data.body
        })
      })
      .then(response => response.json())
      .then(post => commit('updatePost', post))
      .catch(error => console.log(error))
      .then(() => commit('setLoading', false))
    },
    deletePost ({ commit, state }, postId) {
      fetch(root + 'posts/' + postId, {method: 'DELETE'})
      // This should work, but JSONPlaceholder returns 404
      // .then(() => fetch(root + 'comments?postId=1', {method: 'DELETE'}))
      .then(() => {
        commit('deletePostById', postId)
        commit('deleteCommentsByPostId', postId)
        router.push('/page/' + state.currentPage)
      })
      .catch(error => console.log(error))
    },
    deleteComment ({ commit }, commentId) {
      fetch(root + 'comments/' + commentId, {method: 'DELETE'})
      .then(() => commit('deleteCommentById', commentId))
      .catch(error => console.log(error))
    }
  }
})
