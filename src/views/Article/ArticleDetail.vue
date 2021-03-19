<template>
    <div>
        <el-card class="articledetail">
        <h3>{{article.articletitle}}</h3>
        <div class="articleInfo">
            <p class="time-part">{{article.createtime | dateFormat}}</p>
        <el-button @click="editarticle(article.articleid)">编辑</el-button>
        </div>
        <p v-html="markdown"></p>
        </el-card>
        </div>
</template>

<style>
.articleInfo{
    /* background-color: rgb(247, 241, 241); */
}
.articledetail{
    width: 1000px;
    position: absolute;
    right: 25%;
    top: 2%;
}
</style>

<script>
import MarkdownIt from 'markdown-it'
import {getArticleByArticleId} from '../../api'
export default {
    data() {
        return{
            article:{
                // articleid: 0,
                // articletitle: '',
                // content: ''
            }
            
        }
    },
    created() {
      this.getArticleByArticleIdEd();
    },
    computed: {
        markdown(){
            const md = new MarkdownIt();
            const result = md.render(this.article.markdown);
            return result;
        }
    },
    methods: {
        editarticle(){
            this.$router.push({
                path: '/markdown',
                query: {
                    id: this.article.articleid
                    }
                    })
        },
        getArticleByArticleIdEd(){
            this.article.articleid = this.$route.query.id
            // console.log(this.articleid);
            getArticleByArticleId(this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                // this.content = res.data.data.markdown
                // this.articletitle = res.data.data.articletitle
                this.article = res.data.data
            })
        }
    }
}
</script>