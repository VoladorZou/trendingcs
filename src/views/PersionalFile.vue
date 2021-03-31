<template>

<div class="persionalFile">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadnavi">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
  </el-breadcrumb>
    <el-card class="box-card-navibar">
        <el-row class="tac" :gutter="20">
  <el-col :span="6">
    <h4>个人中心</h4>
    <el-menu
    :router="true"
      default-active="/Resume"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/Resume" @click="saveNaviSate()">
        <span slot="title">基本资料</span>
      </el-menu-item>
      <el-menu-item index="/FollowUsers">
        <span slot="title">我的关注</span>
      </el-menu-item>
      <el-menu-item index="/MyCollection">
        <span slot="title">我的收藏</span>
      </el-menu-item>
      <el-menu-item index="/MyWorks">
        <span slot="title">我的投稿</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="18" class="bodyInfo">
      <router-view></router-view>
  </el-col>
  </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      saveNaviSate(){
        console.log("hhh");
      }
    }
  }
</script>

<style>
  .box-card-navibar {
    position:absolute;
    left:22%;
    top:10%;
    width: 980px;
  }
  .bodyInfo{
    background-color: #f8ecec;

  }
  .breadnavi{
    position: relative;
    left:22%;
  }
</style>
