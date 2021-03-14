import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../components/Register.vue"
import Login from "../components/Login.vue"
import PersionalFile from "../views/PersionalFile.vue"
import Resume from "../views/UserCenter/Resume.vue"
import AccoutInfo from "../views/UserCenter/AccoutInfo"
import MyCollection from "../views/UserCenter/MyCollection"
import MyWorks from "../views/UserCenter/MyWorks"
import Contribute from "../views/Contribute"
import ResetPassword from "../components/ResetPassword"
import Management from "../views/Manager/Management"
import UserList from "../views/Manager/UserList"
import ArticleDetail from "../views/Article/ArticleDetail"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/articleDetail',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/contribute',
    component: Contribute
  },
  {
    path: '/management',
    component: Management,
    children: [{
      path: '/UserList',
      component: UserList
    }
  ]
  },
  {
    path: '/resetpassword',
    component: ResetPassword
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/persionalFile',
    name: 'PersionalFile',
    redirect: '/Resume',
    component: PersionalFile,
    children: [{
      path: '/Resume',
      component: Resume
    },
    {
      path: '/AccoutInfo',
      component: AccoutInfo
    },
    {
      path: '/MyCollection',
      component: MyCollection
    },
    {
      path: '/MyWorks',
      component: MyWorks
    }
  ]
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
