<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right" class="breadnaviUser">
  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>评论列表</el-breadcrumb-item>
  </el-breadcrumb>

    <el-card>
  <el-row :gutter="15">
      <el-col :span="8">
          <el-input placeholder="请输入内容" 
          v-model="queryInfo.query" 
          clearable 
          @clear="getArticleListAPI()"
          @input="getArticleListAPI()">
    <el-button slot="append" icon="el-icon-search" @click="getArticleListAPI()"></el-button>
  </el-input>
      </el-col>
      <el-col :span="4">
          <el-button type="primary" @click="addArticle"> 添加文章</el-button>
      </el-col>
  </el-row>
  <el-table :data="commentslist" border="" class="userlisttable" stripe=""> 
      <el-table-column type="index"></el-table-column>
      <el-table-column label="ID" prop="commentid"></el-table-column>
      <el-table-column label="评论用户" prop="userid"></el-table-column>
      <el-table-column label="被评论文章" prop="articleid"></el-table-column>
      <el-table-column label="评论内容" prop="commentcontent"></el-table-column>
      <el-table-column label="评论日期" prop="commenttime" :formatter="formatDate"></el-table-column>
      <el-table-column label="审核状态">
          <template slot-scope="scope">
          <el-tooltip effect="dark" content="允许或封禁" placement="top" :enterable='false'>
            <el-switch
              v-model="scope.row.ispermited"
              @change="permitArticleAPI(scope.row.articleid, scope.row.ispermited)"
              >
            </el-switch>
              </el-tooltip>
         </template>
      </el-table-column>
      <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
          <el-tooltip effect="dark" content="分配权限" placement="top" :enterable='false'>
              <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
              </el-tooltip>
              <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
      </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </el-card>
</div>
</template>

<style scoped>
.userlisttable{
    margin-top: 15px;
    margin-bottom: 15px;
}
.breadnaviUser{
    margin-bottom: 15px;
}
</style>

<script>
import {getCommentListByPage, permitArticle} from '../../api'

export default {
    data(){
        return{
            commentslist: [],
            total: 0,
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            }
        }
    },
    created(){
        this.getArticleListAPI()
    },
    methods: {
        formatDate(row, column) {
          // 获取单元格数据
          let data = row[column.property]
          if(data == null) {
              return null
          }
          let dt = new Date(data)
          return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() 
        },
        addArticle(){
            this.$router.replace('/markdown')
        },
        // 展示当前位于第几页
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getArticleListAPI();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getArticleListAPI()
        },
        // 审核文章
        permitArticleAPI(id, permit){
            permitArticle(id, permit).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
            })
        },
        // 获取文章列表
        getArticleListAPI(){
            getCommentListByPage(this.queryInfo.pagenum, this.queryInfo.pagesize, this.queryInfo.query).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                // console.log(res.data.data.total);
                this.commentslist = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(function (error) {
                    console.log(error);
              });
        }
    }
}
</script>
