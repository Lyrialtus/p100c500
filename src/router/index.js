import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import PostView from '@/components/PostView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: PostList
    },
    {
      path: '/all',
      name: 'All',
      component: PostList
    },
    {
      path: '/page/:id',
      name: 'Page',
      component: PostList
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: PostView
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
