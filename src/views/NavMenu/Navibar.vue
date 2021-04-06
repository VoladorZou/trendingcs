<template>
  <div>
    <div class="father">
      <el-menu
      :router="true"
      default-active="/News"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
      >
        <div class="left" @click="gotoHomePage">
          <el-menu-item class="logo">
            <i class="cs">cs</i>
            <b class="trending">Trending</b>
            </el-menu-item>
        </div>
        <div class="middle">
          <el-menu-item index="/News">News</el-menu-item>
          <el-menu-item index="/History">发展历史</el-menu-item>
          <el-menu-item index="/HotTech">技术热点</el-menu-item>
          <el-menu-item index="/Sci">科研进展</el-menu-item>
          <el-menu-item index="/TechApply">技术应用</el-menu-item>
          <el-menu-item index="/Future">行业展望</el-menu-item>
        </div>
        <div>
          <el-menu-item>
            <el-input class="search-input-navi" 
        placeholder="搜索"
        prefix-icon="el-icon-search"
        type="text"
        clearable
        v-model="input">
        </el-input>
            </el-menu-item>
        </div>
        <div class="right">
         <el-menu-item v-if="!this.$store.getters.getUser" :key="1">
           <!--仔细阅读Dialog的各个属性参数，会影响到布局排版，例如遇到了一个大坑就是没有设置:append-to-body='true'，导致遮罩遮盖整个页面，:lock-scroll="false"没有设置的话，点击前后会感觉到头部导航栏的移动，体验性很不好！！还有设置dialog的宽度width="40%"前面不用加冒号：-->
           <el-dialog title="Welcome" :visible.sync="showLoginForm" center :append-to-body='true' :lock-scroll="false" width="20%">
            <!--这里可以写各种登录表单-->
            <Login v-model="showLoginForm"/>
            </el-dialog>
            <el-button type="text" @click="showLoginForm = true">登录</el-button>
            <span class="sep">|</span>
            <el-button type="text" @click="register">注册</el-button>
          </el-menu-item>
          <el-menu-item v-else-if="this.$store.getters.getUser.userid=='1'" :key="2">
            <el-submenu>
              <template slot="title">欢迎您, {{this.$store.getters.getUser.username}}</template>
              <el-menu-item @click="management">
                <i class="el-icon-setting"></i>
                管理控制台
                </el-menu-item>
              <el-menu-item @click="persionalFile">
                <i class="el-icon-user"></i>
                个人中心
                </el-menu-item>
              <el-menu-item @click="Contribute">
                <i class="el-icon-edit-outline"></i>
                用户投稿</el-menu-item>
              <el-menu-item @click="logout">
                <i class="el-icon-switch-button"></i>
                注销登录</el-menu-item>
            </el-submenu>
            </el-menu-item>
          <el-menu-item v-else :key="3">
            <el-submenu>
              <template slot="title">欢迎您, {{this.$store.getters.getUser.username}}</template>
              <el-menu-item @click="persionalFile">
                <i class="el-icon-user"></i>
                个人中心</el-menu-item>
              <el-menu-item @click="Contribute">
                <i class="el-icon-edit-outline"></i>
                用户投稿</el-menu-item>
              <el-menu-item @click="logout">
                <i class="el-icon-switch-button"></i>
                注销登录</el-menu-item>
            </el-submenu>
            </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.search-input-navi /deep/ .el-input__inner{
  width: 260px;
  height: 30px;
  border-radius: 30px;
}
  .cs{
    
    color: rgb(141, 151, 153);
  }
  .sep{
    color: rgb(245, 245, 245);
  }
  .trending{
    color: rgb(26, 175, 235);
    font-size: 18px;
  }
  .father{
    position: fixed;
    top: 0px;
    width: 100%;
    left: 0px;
}
  .el-menu-demo{
    display: flex;
    justify-content: center;
    perspective: none !important;
  }
  .left{
    display: flex;
    flex: 1;
    width: 50px;
    justify-content: center;
  }
  .middle{
    display: flex;
    flex: 6;
    width: 200px;
    justify-content: center;
  }
  .right{
    flex: 3;
    display: flex;
    justify-content: center;
  }
</style>

<script>
// import Search from '../../components/Search'
import Login from '../../components/Login'
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { logout } from '../../api'


  export default {
    name: "Navibar",
    data() {
      return {
        activeIndex: '1',
        input: '',
        activeIndex2: '1',
        isLogin: false,
        username: '',
        showLoginForm: false
      };
    },
    created() {
    //   // 获取浏览器localStorage，判断用户是否已经登录
    // if (localStorage.getItem("user")) {
    //   // 如果已经登录，设置vuex登录状态
    //   this.setUser(JSON.parse(localStorage.getItem("user")));
    // }
    // 获取浏览器localStorage，判断用户是否已经登录
    if (sessionStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(sessionStorage.getItem("user")));
    }
    },
    components: {
      Login
    },
    computed: {
    ...mapGetters(["getUser"])
    },
    methods: {
      ...mapActions(["setUser", "setLoginState"]),
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      login() {
        this.showLoginForm = true;
      },
      register(){
        this.$router.replace('/register')
      },
      persionalFile(){
        this.$router.replace('/persionalFile')
      },
      Contribute(){
        this.$router.replace('/contribute')
      },
      management(){
        this.$router.replace('/management')
      },
      gotoHomePage(){
      this.$router.replace('/')
    },
      logout(){
        logout().then(res => {
        console.log(res.data);
        this.setLoginState(false);
        // 清空本地登录信息
        sessionStorage.setItem("user", "");
        // 清空vuex登录信息
        this.setUser("");
        this.$message({
                message: '注销成功',
                type: 'success'
                });
        })
        
      }
    }
  }
</script>