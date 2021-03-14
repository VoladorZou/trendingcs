<template>
    <div>
        <h4>我的创作</h4>
        <ul>
            <li><p v-html="markdown"></p></li>
        </ul>
        <!-- <p v-html="markdown"></p> -->
        </div>
</template>

<script>
import {getArticleByUserId} from '../../api'
import MarkdownIt from 'markdown-it'

export default {
    data() {
        
        return{
        contents: [{}],
        articleList: [{}]
        }
    },
    created() {
      this.getArticleByUserId();
    },
    computed: {
        markdown(){
            const md = new MarkdownIt();
            const result = md.render(this.content);
            return result;
        }
    },
    methods: {
        getArticleByUserId(){
            var userid = 1;
            getArticleByUserId(userid).then(res => {
                // console.log(res.data.data);
                this.articleList = res.data.data;
                console.log(this.articleList);
                this.contents = this.articleList.markdown;
                console.log(this.article.markdown);
            })

        }
    }
    
}
</script>