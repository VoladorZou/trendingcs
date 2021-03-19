<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right" class="breadnaviUser">
  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

    <el-card>
  <el-row :gutter="15">
      <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query"  clearable @clear="getUserListed">
    <el-button slot="append" icon="el-icon-search" @click="getUserListed"></el-button>
  </el-input>
      </el-col>
      <el-col :span="4">
          <el-button type="primary" class="adduserbutton"> 添加用户</el-button>
      </el-col>
  </el-row>
  <el-table :data="articlelist" border="" class="userlisttable" stripe=""> 
      <el-table-column type="index"></el-table-column>
      <el-table-column label="ID" prop="articleid"></el-table-column>
      <el-table-column label="姓名" prop="userid"></el-table-column>
      <el-table-column label="性别" prop="articletitle"></el-table-column>
      <el-table-column label="手机" prop="articlecover"></el-table-column>
      <el-table-column label="邮箱" prop="markdown"></el-table-column>
      <el-table-column label="审核状态">
          <el-tooltip effect="dark" content="通过或未通过" placement="top" :enterable='false'>
              <el-switch
  v-model="ispermited"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
              </el-tooltip>
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
.adduserbutton >>> el-button__inner{
    /* size: 50px !important; */
    padding: 10px, 15px;
}
.userlisttable{
    margin-top: 15px;
    margin-bottom: 15px;
}
.breadnaviUser{
    margin-bottom: 15px;
}
</style>

<script>
import {getArticleListByPage} from '../../api'

export default {
    data(){
        return{
            articlelist: [],
            total: 0,
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            }
        }
    },
    created(){
        this.getUserListed()
    },
    methods: {
        // 展示当前位于第几页
        handleCurrentChange(newPage){
            console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getUserListed();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getUserListed()
        },
        getUserListed(){
            getArticleListByPage(this.queryInfo.pagenum, this.queryInfo.pagesize, this.queryInfo.query).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                // console.log(res.data.data.total);
                this.articlelist = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(function (error) {
                    console.log(error);
              });
        }
    }
}
</script>
