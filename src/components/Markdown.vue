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
            <el-dialog title="保存文章" :visible.sync="showLoginForm" center :append-to-body='true' :lock-scroll="false" width="30%">
            <!--这里可以写各种表单-->
            <saveArticleDialog v-model="showLoginForm"/>
            </el-dialog>
        </div>
        <div class="markdown-editor">
        <mavon-editor 
        ref="md"
        @save="saveArticleDialog()"
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
 import {saveArticle,getArticleByArticleId,updateArticle} from '../api'
 import saveArticleDialog from './saveArticleDialog'

export default {
    data() {
        return {
            article:{},
            user:{},
            content:{
              tag: 'news',
              userid: 2,
              articletitle: '',
              articleCover: '',
              markdown: ''
            },
            defaultData: "preview",
            showLoginForm: false
        };
    },
    created() {
        this.getArticleByArticleIdEd()
    },
    components: {
      saveArticleDialog
    },
    methods: {
        saveArticleDialog(){
            if(typeof this.article.articletitle === 'undefined'){
            this.$message({
                message: '标题不能为空',
                type: 'error'
                });
            }else{
                this.showLoginForm = true;
                this.saveArticled()
            } 
        },
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
            
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                this.article.userid = this.user.userid
                // console.log(this.article.articleid);
                }
                if(typeof this.article.articleid === 'undefined'){
            saveArticle(this.article).then(res => {
                console.log(res.data);
                // this.$message({
                // message: '保存成功，待审核',
                // type: 'success'
                // });
                // this.$router.replace('/MyWorks')
            }).catch(function (error) {
                    console.log(error);
              });
                }else{
                    updateArticle(this.article).then(res =>{
                console.log(res.data);
                // this.$message({
                // message: '修改成功，待审核',
                // type: 'success'
                // });
                // this.$router.replace('/MyWorks')
                    })
                }
            
        }
    }
};
</script>