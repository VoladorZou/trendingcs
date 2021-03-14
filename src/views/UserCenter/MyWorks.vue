<template>
    <div>
        <h4>我的创作</h4>
        <ul>
            <li v-for="article in articleList" :key="article.articleid">
                <!-- <p v-html="markdown(article.markdown)"></p> -->
                <div >
                <p @click="showDetail" class="articles">{{article.articletitle}}</p>
                </div>
                </li>
        </ul>
        </div>
</template>

<script>
import {getArticleByUserId} from '../../api'
import MarkdownIt from 'markdown-it'

export default {
    data() {
        
        return{
            // content: '',
        // contents: [{}],
        showArticlePage: false,
        articleList: [{}]
        }
    },
    created() {
      this.getArticleByUserId();
    },
    computed: {
        // var content = '';
        markdown(content){
            const md = new MarkdownIt();
            const result = md.render(content);
            return result;
        }
    },
    methods: {
        showDetail(){
            // this.showArticlePage = true; 
            // 路由带值
            // console.log(article);
            this.$router.replace('/articleDetail')
        },
        getArticleByUserId(){
            var userid = 1;
            getArticleByUserId(userid).then(res => {
                // console.log(res.data.data);
                this.articleList = res.data.data;
                // console.log(this.articleList);
                // this.contents = this.articleList.markdown;
                // console.log(this.article.markdown);
                // for (var i=0;i<this.articleList.length;i++)
                // { 
                //     this.content
                //     }
            })

        }
    }
    
}
</script>

<style>
.articles{
    /* 上右下左 */
    padding: 30px, 0px, 30px, 0px;
}
</style>