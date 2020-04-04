import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/auth/SignUp.vue'
import Login from '../views/auth/Login.vue'
import Trivias from '../views/prof/trivia/Trivias.vue'
import TriviaDetails from '../views/prof/trivia/TriviaDetails.vue'
import CreateTrivia from '../views/prof/trivia/CreateTrivia.vue'

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
    path: '/trivias',
    name: 'trivias',
    component: Trivias
  },
  {
    path: '/create-trivia',
    name: 'create-trivia',
    component: CreateTrivia
  },
  {
    path: '/trivia-details/:id',
    name: 'trivia-details',
    component: TriviaDetails
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
