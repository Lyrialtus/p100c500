import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const root = 'https://jsonplaceholder.typicode.com/'

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    postsPerPage: 15,
    currentPage: 1,
    currentUser: 'User 1',
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
        return comment.postId === parseInt(postId)
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
      return [...new Set(state.posts.map(post => 'User ' + post.userId))]
    },
    loading (state) {
      return state.loading
    }
  },

  mutations: {
    setAllPosts (state, posts) {
      posts.forEach((post) => {
        post.showComments = false
      })
      state.posts = posts
    },
    addPost (state, post) {
      state.posts.push(post)
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
    getPostsAndComments ({ commit }) {
      commit('setLoading', true)

      let PostsPromise = new Promise((resolve, reject) => {
        fetch(root + 'posts')
        .then(response => response.json())
        .then(json => commit('setAllPosts', json))
        .catch(error => console.log(error))
        .then(() => resolve(true))
      })

      let CommentsPromise = new Promise((resolve, reject) => {
        fetch(root + 'comments')
        .then(response => response.json())
        .then(json => commit('setAllComments', json))
        .catch(error => console.log(error))
        .then(() => resolve(true))
      })

      Promise.all([PostsPromise, CommentsPromise])
      .then(() => commit('setLoading', false))
    },
    createPost ({ commit }, post) {
      fetch(root + 'posts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
      })
      .then(response => response.json())
      .then(post => {
        console.log(post)
        commit('addPost', post)
        return post.id
      })
      .then(postId => router.push('/post/' + postId))
      .catch(error => console.log(error))
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
