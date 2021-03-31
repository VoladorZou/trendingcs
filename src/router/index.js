import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../components/Register.vue"
import Login from "../components/Login.vue"
import PersionalFile from "../views/PersionalFile.vue"
import Resume from "../views/UserCenter/Resume.vue"
import FollowUsers from "../views/UserCenter/FollowUsers"
import MyCollection from "../views/UserCenter/MyCollection"
import MyWorks from "../views/UserCenter/MyWorks"
import Contribute from "../views/Contribute"
import ResetPassword from "../components/ResetPassword"
import Management from "../views/Manager/Management"
import UserList from "../views/Manager/UserList"
import ArticleManage from "../views/Manager/ArticleManage"
import CommentsManage from "../views/Manager/CommentsManage"
import GoodsManage from "../views/Manager/GoodsManage"
import ArticleDetail from "../views/Article/ArticleDetail"
import Markdown from "../components/Markdown.vue"
import News from "../views/PaperList/News"
import Sci from "../views/PaperList/Sci"
import HotTech from "../views/PaperList/HotTech"
import History from "../views/PaperList/History"
import Future from "../views/PaperList/Future"
import TechApply from "../views/PaperList/TechApply"
import Navibar from "../views/NavMenu/Navibar"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/News',
    children: [
      {
        path: '/News',
        name: 'News',
        component: News
      },
      {
        path: '/TechApply',
        name: 'TechApply',
        component: TechApply
      },
      {
        path: '/Future',
        name: 'Future',
        component: Future
      },
      {
        path: '/HotTech',
        name: 'HotTech',
        component: HotTech
      },
    {
      path: '/History',
      name: 'History',
      component: History
    },
    {
      path: '/Sci',
      name: 'Sci',
      component: Sci
    }
  ]
  },
  {
    path: '/navibar',
    name: 'Navibar',
    component: Navibar
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: Markdown
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
    name: 'Management',
    component: Management,
    redirect: '/UserList',
    children: [{
      path: '/UserList',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/ArticleManage',
      name: 'ArticleManage',
      component: ArticleManage
    },
    {
      path: '/CommentsManage',
      name: 'CommentsManage',
      component: CommentsManage
    },
    {
      path: '/GoodsManage',
      name: 'GoodsManage',
      component: GoodsManage
    }
  ]
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
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
      path: '/FollowUsers',
      component: FollowUsers
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
