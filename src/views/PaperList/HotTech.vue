<template>
    <div>
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
import {getArticleByTag} from '../../api'

export default {
    data() {
        
        return{
            tag: '3',
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            articleList: [{}]

        }
    },
    created() {
      this.getArticleByTaged();
    },
    methods: {
        // 展示当前位于第几页
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getArticleByTaged();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getArticleByTaged()
        },
        showDetail(articleid){
            this.$router.push({
                path: '/articleDetail',
                query: {
                    id: articleid
                    }
                    })
        },
        getArticleByTaged(){
            getArticleByTag(this.tag,this.queryInfo.pagenum,this.queryInfo.pagesize).then(res => {
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


</style>