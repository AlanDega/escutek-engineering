import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/auth/SignUp.vue'
import Login from '../views/auth/Login.vue'
import TriviasViewer from '../views/prof/trivia/TriviasViewer.vue'
import SingleTriviaViewer from '../views/prof/trivia/SingleTriviaViewer.vue'
import TriviaCreator from '../views/prof/trivia/TriviaCreator.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/trivias-viewer',
    name: 'trivias-viewer',
    component: TriviasViewer
  },
  {
    path: '/trivia-creator',
    name: 'trivia-creator',
    component: TriviaCreator
  },
  {
    path: '/trivia-viewer/:id',
    name: 'trivia-viewer',
    component: SingleTriviaViewer
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
