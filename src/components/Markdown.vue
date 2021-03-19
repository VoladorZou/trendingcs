<template>
    <div>
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
        <el-upload
  class="upload-cover"
  action="uploadURL"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-exceed="handleExceed"
  :file-list="article.articleCover">
  <el-button size="small" type="primary">上传封面</el-button>
</el-upload>
        </div>
        <div class="markdown-editor">
        <mavon-editor 
        ref="md"
        @save="saveArticled()"
        v-model="article.markdown"/>
        </div>
    </div>
</template>

<style>
.red-star{
  bottom: -13px;
  color: red;
  font-size: 20px;
}
.markdown-editor{
    position: absolute;
    top: 8%;
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
    top: 2.5%;
    left: 0.2%;
}
.article-title{
    width: 700px !important;
}
</style>

<script>
 import {saveArticle,getArticleByArticleId} from '../api'

export default {
    data() {
        return {
            article:{
                
            },
            user:{

            },
            content:{
              tag: 'news',
              userid: 2,
              articletitle: '',
              articleCover: '',
              markdown: ''
            },
            uploadURL: 'http://localhost:9085/user/uploadProfilePhoto',
            defaultData: "preview",
            // uploadURL: 'http://localhost:9085/'
        };
    },
    created() {
        this.getArticleByArticleIdEd()
    },
    methods: {
        getArticleByArticleIdEd(){
            if(typeof this.$route.query.id !== 'undefined'){
                this.article.articleid = this.$route.query.id
                getArticleByArticleId(this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.article = res.data.data
            })
            }    
        },
        saveArticled(){
            // console.log(localStorage.getItem("userid"));
            // this.content.userid = localStorage.getItem("userid");
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                this.article.userid = this.user.userid
                console.log(this.article.articleid);
                }
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
              
        }
    }
};
</script>