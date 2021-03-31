<template>
    <el-container class="manager-container">
  <el-header class="manager-header">
    <div>
      <img src="../../assets/managerImg.png" alt="websiteLogo" @click="gotoHomePage">
      <span class="header-text">管理控制台</span>
    </div>
    <el-button type="info" @click="gotoHomePage" class="exit-button">退出</el-button>
  </el-header>
  <el-container>
    <el-aside width="210px"  class="manager-aside">
      <el-menu
      :router="true"
      default-active="/UserList"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- <el-submenu index="/userManage">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/UserList">用户列表</el-menu-item>
          <el-menu-item index="1-2">用户权限</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="/UserList">
        <i class="el-icon-location"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/ArticleManage">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/CommentsManage">
        <i class="el-icon-document"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/GoodsManage">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main class="manager-main">
      <router-view></router-view>
      </el-main>
  </el-container>
</el-container>
</template>

<style>
.exit-button{
  height: 40px;
  margin-top: 10px !important;
}
.manager-container{
  height: 100%;
}
.manager-header{
  background-color: #373d41;
  padding-left: 0px !important;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #fff;
  font-size: 17px;
  
}
.manager-aside{
  background-color: #333744;
}
.manager-main{
  background-color: #EAEDF1;
}
.header-text{
  /* margin-left: 20px; */
  position: absolute;
  top: 2%;
}
</style>

<script>
// 导入全局样式表
// import '../../assets/css/global.css'

export default {
  methods:{
    gotoHomePage(){
      this.$router.replace('/')
    }
  }
  
}
</script>
