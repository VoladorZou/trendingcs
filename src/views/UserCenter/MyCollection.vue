<template>
    <div>
        <h4>收藏文章列表</h4>
        <ul class="fellow-ul">
            <li v-for="article in articleList" :key="article.articleid" class="fellow-li">
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
import {getCollectionList, getArticleByArticleId} from '../../api'

export default {
    data() {
        return{
            user: {},
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
        showArticlePage: false,
        active: '',
        articleList: {}
        }
    },
    created() {
      this.getFellowListAPI();
      
    },
    methods: {
       // 展示当前位于第几页
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getFellowListAPI();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getFellowListAPI()
        },
        showDetail(articleid){
            this.$router.push({
                path: '/articleDetail',
                query: {
                    id: articleid
                    }
                    })
        },
        getFellowListAPI(){
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                }
            getCollectionList(this.queryInfo.pagenum, this.queryInfo.pagesize, this.user.userid).then(res => {
                if(res.data.code !== 1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                this.fellowList = res.data.data.list;
                this.total = res.data.data.total;
                this.articleList = []
                for (var i=0, len=this.fellowList.length; i<len; i++){
                    // console.log(this.fellowList[i].uploaderid);
                    // 查询用户信息
                    getArticleByArticleId(this.fellowList[i].articleid).then(res => {
                        if(res.data.code !== 1) return this.$message.error(res.data.msg)
                        // 将文章信息存入数组
                        this.articleList.push(res.data.data)
                        })
                }
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
.fellow-ul{
    margin-right: 35px;
}
.fellow-li{
    list-style: none;
}
.fellow-card{
    margin-bottom: 10px;
}
.fellow-title{
    font-size: 18px;
    text-align: left;
    margin-top: 0px;
}
.fellow-title:hover{
    color: rgb(120, 194, 228);
}
</style>