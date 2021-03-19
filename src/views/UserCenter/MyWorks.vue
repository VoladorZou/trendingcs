<template>
    <div>
        <h4>我的创作</h4>
        <ul class="article-ul">
            <li v-for="article in articleList" :key="article.articleid" class="article-li">
                <div @click="showDetail(article.articleid)">
                    <el-card class="article-card">
                <p class="article-title">{{article.articletitle}}</p>
                <p class="time-part">{{article.createtime | dateFormat}}</p>
                    </el-card>
                </div>
                </li>
        </ul>
        <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      >
    </el-pagination>
        </div>
</template>

<script>
import {getArticleByUserId} from '../../api'
import MarkdownIt from 'markdown-it'

export default {
    data() {
        
        return{
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
        showArticlePage: false,
        active: '',
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
        /*
        <!-- <h4 class="articles" 
                @mouseover="mouseOver"
            @mouseleave="mouseLeave"
            :style="active">{{article.articletitle}}</h4> -->
        */
       // 展示当前位于第几页
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getArticleByUserId();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getArticleByUserId()
        },
        mouseOver: function(){
            this.active = 'background-color: #8dc8d3';
        },
        mouseLeave: function () {
            this.active = '';
        },
        showDetail(articleid){
            // this.showArticlePage = true; 
            // 路由传参
            // this.$router.push('/articleDetail/${articleid}');
            this.$router.push({
                path: '/articleDetail',
                query: {
                    id: articleid
                    }
                    })
        },
        getArticleByUserId(){
            var userid = 1;
            getArticleByUserId(userid,this.queryInfo.pagenum,this.queryInfo.pagesize).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                this.articleList = res.data.data.list;
                this.total = res.data.data.total;
            })

        }
    }
    
}
</script>

<style>
.time-part{
    width: 160px;
    float: right;
}
.article-ul{
    margin-right: 35px;
}
.article-li{
    list-style: none;
}
.article-card{
    margin-bottom: 10px;
}
.article-title{
    font-size: 18px;
    text-align: left;
    margin-top: 0px;
}
.article-title:hover{
    color: rgb(120, 194, 228);
}
</style>