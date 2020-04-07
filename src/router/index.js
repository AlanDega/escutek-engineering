import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/auth/SignUp.vue'
import Login from '../views/auth/Login.vue'
import TriviasViewer from '../views/prof/trivia/TriviasViewer.vue'
import SingleTriviaViewer from '../views/prof/trivia/SingleTriviaViewer.vue'
import TriviaCreator from '../views/prof/trivia/TriviaCreator.vue'
import ProfTriviaA1 from '../views/prof/trivia/groups/ProfTriviaA1.vue'
import ProfTriviaA2 from '../views/prof/trivia/groups/ProfTriviaA2.vue'
import ProfTriviaA3 from '../views/prof/trivia/groups/ProfTriviaA3.vue'
import StudentTriviaA1 from '../views/student/trivia/groups/StudentTriviaA1.vue'
import StudentTriviaA2 from '../views/student/trivia/groups/StudentTriviaA2.vue'
import StudentTriviaA3 from '../views/student/trivia/groups/StudentTriviaA3.vue'
import GroupPicker from '../views/prof/trivia/GroupPicker.vue'

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
    path: '/prof-trivia-A1',
    name: 'prof-trivia-A1',
    component: ProfTriviaA1
  },
  {
    path: '/prof-trivia-A2',
    name: 'prof-trivia-A2',
    component: ProfTriviaA2
  },
  {
    path: '/prof-trivia-A3',
    name: 'prof-trivia-A3',
    component: ProfTriviaA3
  },
  {
    path: '/student-trivia-A1',
    name: 'student-trivia-A1',
    component: StudentTriviaA1
  },
  {
    path: '/student-trivia-A2',
    name: 'student-trivia-A2',
    component: StudentTriviaA2
  },
  {
    path: '/student-trivia-A3',
    name: 'student-trivia-A3',
    component: StudentTriviaA3
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
    path: '/group-picker',
    name: 'group-picker',
    component: GroupPicker
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
