<template>
<div>
    <el-form :model="article" status-icon :rules="rules2" ref="article">
    <el-form-item>
    <div>
        <p class="uploadtext">上传封面</p>
    <el-upload
  class="avatar-uploader"
  :action="uploadURL"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="article.articlecover" :src="article.articlecover" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </div>
    </el-form-item>
<el-form-item>
<div>
    <el-radio-group v-model="article.tag">
    <el-radio :label="1">News</el-radio>
    <el-radio :label="2">发展历史</el-radio>
    <el-radio :label="3">技术热点</el-radio>
    <el-radio :label="4">科研进展</el-radio>
    <el-radio :label="5">技术应用</el-radio>
    <el-radio :label="6">行业展望</el-radio>
  </el-radio-group>
</div>
</el-form-item>
<el-form-item>
<div>
  <span>
    {{saveArticleid}}
  </span>
</div>
</el-form-item>
<el-form-item>
              <el-button type="primary" @click="submitForm('article')" class="registerbutton">保存</el-button>
              <el-button @click="resetForm('article')" class="resetbutton">重置</el-button>
            </el-form-item>
            </el-form>
</div>
</template>

<style>
.uploadtext{
    float: left;
}
</style>

<script>
 import {updateArticleTag, getArticleByArticleId} from '../api'

  export default {
    data () {
      return {
        article:{
          articleid: this.saveArticleid
        },
          uploadURL: 'http://localhost:9085/user/uploadProfilePhoto'
      };
    },
    // 父子组件通信
    props: {
      saveArticleid: {
        type: Int8Array,
        default: 0
      }
    },
    created() {
      if(this.saveArticleid !== 0){
        this.getArticleByArticleIdAPI()
      }
        // this.getArticleByArticleIdAPI()
    },
    methods: {
      updateArticleTagAPI(){
        updateArticleTag(this.article).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
        })
      },
      getArticleByArticleIdAPI(){
                getArticleByArticleId(this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.article = res.data.data
            }) 
        },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>