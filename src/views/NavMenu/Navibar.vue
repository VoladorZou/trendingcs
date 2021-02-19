<template>
  <div>
    <div class="father">
      <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
      >
        <div class="left">
          <el-menu-item>
            <i class="cs">cs</i>
            <b class="trending">Trending</b>
            </el-menu-item>
        </div>
        <div class="middle">
          <el-menu-item index="1">News</el-menu-item>
          <el-menu-item index="2">发展历史</el-menu-item>
          <el-menu-item index="3">技术热点</el-menu-item>
          <el-menu-item index="4">科研进展</el-menu-item>
          <el-menu-item index="5">技术应用</el-menu-item>
          <el-menu-item index="6">行业展望</el-menu-item>
        </div>
        <div class="search">
          <el-menu-item><Search class="searchInput"/></el-menu-item>
        </div>
        <div class="right">
         <el-menu-item>
           <!--仔细阅读Dialog的各个属性参数，会影响到布局排版，例如遇到了一个大坑就是没有设置:append-to-body='true'，导致遮罩遮盖整个页面，:lock-scroll="false"没有设置的话，点击前后会感觉到头部导航栏的移动，体验性很不好！！还有设置dialog的宽度width="40%"前面不用加冒号：-->
           <el-dialog title="Welcome" :visible.sync="showLoginForm" center :append-to-body='true' :lock-scroll="false" width="20%">
            <!--这里可以写各种登录表单-->
            <Login v-model="showLoginForm"/>
            </el-dialog>
            <el-button type="text" @click="showLoginForm = true">登录</el-button>
            <span class="sep">|</span>
            <el-button type="text" @click="register = true">注册</el-button>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<style>
  .cs{
    color: rgb(27, 155, 194);
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
  /*!*display: flex;你去了解一下盒子模型*!*/
  /*display: flex;*/
  /*!*justify-content: center; 是让他水平剧中，使用它的前提是使用了 display: flex;*!*/
  /*justify-content: center;*/

/*  居中的方法有很多
    再举一例：有已经固定长度的就用下面代码也能剧中
    想要水平剧中
    position: absolute;
    width:100px;
    magin-left;-50px;
    left:50%;
    想要垂直居中的
    position: absolute;
    height:100px;
    magin-top;-50px;
    top:50%;
*/
}
  .el-menu-demo{
    display: flex;
    justify-content: center;
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
import Search from '../../components/Search'
import Login from '../../components/Login'

  export default {
    name: "Navibar",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        showLoginForm: false
      };
    },
    components: {
      Search,
      Login
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      login() {
        this.showLoginForm = true;
      }
    }
  }
</script>