<template>
    <div>
        <!-- 返回上一级 -->
        <div @click="MyWorks()" class="return-to-myworks">
            <i class="el-icon-arrow-left"></i>
            <el-button class="return-button">返回</el-button>
        </div>
        <div class="title-input">
            <span class="red-star">*</span>
        <el-input
        class="article-title"
         placeholder="请输入标题"
         v-model="article.articletitle"
         type="text" 
         clearable>
        </el-input>
        </div>
        <div class="upload-cover">
            <el-dialog title="保存文章" :visible.sync="showSaveForm" center :append-to-body='true' :lock-scroll="false" width="30%">
            <!--这里可以写各种表单-->
            <!-- 保存文章表单组件 -->
            <!-- <saveArticleDialog :saveArticleid="article.articleid"/> -->
            <el-form :model="article" status-icon ref="article">
    <el-form-item>
    <div>
        <p class="uploadtext">上传封面</p>
    <el-upload
  class="avatar-uploader"
  :action="uploadURL"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
              <el-button type="primary" @click="saveArticlAPI('article')" class="registerbutton">保存</el-button>
              <el-button @click="resetForm('article')" class="saveArticle-reset-button">重置</el-button>
            </el-form-item>
            </el-form>
            </el-dialog>
        </div>
        <div class="markdown-editor">
        <mavon-editor 
        ref = md
        @imgAdd="$imgAdd" @imgDel="$imgDel"
        @save="saveArticleDialog()"
        v-model="article.markdown"/>
        </div>
    </div>
</template>

<style>
.return-button{
    border: 0;
}
.return-to-myworks{
    position: absolute;
    top: 0.5%;
    left: 0.2%;
}
.saveArticle-reset-button{
    margin-left: 50px !important;
}
.red-star{
  bottom: -13px;
  color: red;
  font-size: 20px;
}
.markdown-editor{
    position: absolute;
    top: 5.5%;
    width: 100%;
}
.upload-cover{
    position: absolute;
    top: 2.8%;
    left: 40%;
}
.upload-cover{
    width: 50px;
}
.title-input{
    position: absolute;
    top: 0.5%;
    left: 5%;
}
.article-title{
    width: 700px !important;
}
</style>

<script>
 import {saveArticle, getArticleByArticleId, updateArticle} from '../api'
 import Axios from '../libs/AxiosPlugin'
//  import saveArticleDialog from './saveArticleDialog'

export default {
    data() {
        return {
            imageUrl: '',
            article:{
                tag: 1
            },
            user:{},
            defaultData: "preview",
            showSaveForm: false,
            uploadURL: 'http://localhost:9085/article/upLoadArticleCover'
        };
    },
    created() {
        this.getArticleByArticleIdAPI()
    },
    // components: {
    //   saveArticleDialog
    // },
    methods: {
        MyWorks(){
        this.$router.replace('/MyWorks')
      },
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('file', $file);
           Axios({
               url: 'http://localhost:9085/article/upLoadArticleCover',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
               // $vm.$img2Url 详情见官网页末尾
               console.log(url.data);
               this.$refs.md.$img2Url(pos, url.data.data);
           })
        },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.article.articlecover = res.data
        // console.log(res.data);
        this.$message({
                message: '上传成功',
                type: 'success'
                });
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
      },
        saveArticleDialog(){
            if(typeof this.article.articletitle === 'undefined'){
            this.$message({
                message: '标题不能为空',
                type: 'error'
                });
            }else{
                this.showSaveForm = true;
            } 
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        getArticleByArticleIdAPI(){
            if(typeof this.$route.query.id !== 'undefined'){
                this.article.articleid = this.$route.query.id
                getArticleByArticleId(this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.article = res.data.data
                this.imageUrl = this.article.articleCover
            })
            }    
        },
        saveArticlAPI(){
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                this.article.userid = this.user.userid
                // console.log(this.article.articleid);
                }
                if(typeof this.article.articleid === 'undefined'){
            saveArticle(this.article).then(res => {
                console.log(res.data);
                this.$message({
                message: '保存成功，待审核',
                type: 'success'
                });
                this.$router.replace('/MyWorks')
            }).catch(function (error) {
                    console.log(error);
              });
                }else{
                updateArticle(this.article).then(res =>{
                console.log(res.data);
                this.$message({
                message: '修改成功，待审核',
                type: 'success'
                });
                this.$router.replace('/MyWorks')
                    })
                }
            
        }
    }
};
</script>