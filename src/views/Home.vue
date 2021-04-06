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
            <!-- <div class="goodsimg">
                <img :src="imageUrl" alt="周刊封面">
            </div> -->
            <el-button @click="fellow(article.articleid)" class="fellow"></el-button>
        </el-card>
        <!-- <el-button type="text" @click="getUserInfoAPI()">获取用户信息</el-button>
        <el-button type="text" @click="likeStateAPI()">获取like信息</el-button> -->
        <el-button type="text" class="about-us">关于我们</el-button>
        <p class="line">--</p>
        <el-tooltip effect="light" content="使用反馈或建议" placement="right">
      <el-button type="text" class="home-contact-us" @click="showMessageForm = true">留言</el-button>
    </el-tooltip>
    <el-dialog title="留言或反馈" :visible.sync="showMessageForm" center :append-to-body='true' :lock-scroll="false" width="30%" draggable="true">
            <!--这里可以写各种表单-->
            <el-form :model="message" status-icon ref="message">
              <!-- 联系方式 -->
              <el-form-item prop="contact">
  <el-input 
  v-if="!this.$store.getters.getLoginState"
  type="text"
  placeholder="联系方式"
  v-model="message.contact">
  </el-input>
              </el-form-item>
    <el-form-item prop="context">
      <!-- 留言输入框  -->
        <div class="enter-comment">
  <el-input 
  class="input-text"
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="message.context">
  </el-input>
        </div>
    </el-form-item>
  <el-form-item>
              <el-button type="primary" @click="sendMessageAPI('message')" class="registerbutton">发送</el-button>
              <el-button @click="resetForm('message')" class="message-reset-button">重置</el-button>
            </el-form-item>
            </el-form>
            </el-dialog>
    </el-main>
    </div>
  <el-footer class="home-footer">
    <p class="home-message-us">联系我们</p>

    <div class="copyright"><p>Copyright © since 2021 VoladorZou. All rights reserved.</p></div>
  </el-footer>
</el-container>
</template>

<style>
.message-reset-button{
  margin-left: 50px !important;
}
.line{
  position: fixed;
    right: 20%;
    top: 27.3%;
    width: 60px;
}
.about-us{
  position: fixed;
  right: 22%;
  top: 28%;
  width: 60px;
  color: cadetblue !important;
}
.copyright{
  color: rgb(181, 236, 234);
  text-align: center;
  position: relative;
  bottom: -53%;
}
.home-message-us{
  color: #fff;
}
.home-contact-us{
  position: fixed;
  right: 18.6%;
  top: 28%;
  width: 60px;
  color: cadetblue !important;
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
}
</style>

<script>
// import { mapGetters } from "vuex";
import Navibar from './NavMenu/Navibar.vue'
import { getUserInfo, likeState, sendMessage } from '../api'

export default {
  name: 'Home',
  components: {
    Navibar
  },
  data() {
        return {
          message:{
            contact: '',
            context: ''
          },
          showMessageForm: false
        };
  },
  methods: {
    sendMessageAPI(){
      sendMessage(this.message).then( res => {
        if(res.data.code !==1) return this.$message.error(res.data.msg)
        this.$message({
                message: '留言成功',
                type: 'success'
                });
                this.showMessageForm = false
      })
    },
    // 重置表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    likeStateAPI(){
      likeState(3).then(res => {
        if(res.data.code !==1) return this.$message.error(res.data.msg)
      })
    },
    getUserInfoAPI(){
      getUserInfo().then(res => {
        if(res.data.code !==1) return this.$message.error(res.data.msg)
      })
    }
  }
}
</script>
