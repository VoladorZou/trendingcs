<template>
    <el-container class="home-container">
  <el-header class="home-header">
    <Navibar/>
    </el-header>
    <div class="mian">
  <el-main class="home-main">
    <router-view></router-view>
    <el-card class="goodsInfo">
      <p>周刊</p>
            <div class="goodsimg">
                <img :src="imageUrl" alt="">
            </div>
            <el-button @click="fellow(article.articleid)" class="fellow"></el-button>
        </el-card>
    </el-main>
    </div>
  <el-footer class="home-footer">
    <el-tooltip class="item" effect="light" content="Top Left 提示文字" placement="top-start">
      <p class="home-contact-us" >联系我们</p>
    </el-tooltip>
    <p class="home-message-us" >留言</p>
  </el-footer>
</el-container>
</template>

<style>
.home-message-us{
  color: #fff;
}
.home-contact-us{
  color: #fff;
}
.home-footer{
  background-color: rgb(71, 70, 70);
  height: 200px !important;
  
}
.goodsInfo{
    position: fixed;
    right: 12%;
    top: 12%;
    width: 300px; 
}
.userimg{
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: relative;
    right: -30%;
}
/* .mian{
  background-image: url("../assets/news.jpg");
} */
.home-container{
  height: 100% !important;
  /* background-image: url("../assets/news.jpg"); */
}
.home-main{
  width: 1000px;
  margin-left: 320px;

  /* position:absolute;
    left:450px;
    top: 300px; */
}
</style>

<script>
import Navibar from './NavMenu/Navibar.vue'

export default {
  name: 'Home',
  components: {
    Navibar
  }
}
</script>
