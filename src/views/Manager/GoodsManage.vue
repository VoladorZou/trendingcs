<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right" class="breadnaviUser">
  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

    <el-card>
  <el-row :gutter="15">
      <el-col :span="8">
          <el-input placeholder="请输入内容" >
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
      </el-col>
      <el-col :span="4">
          <el-button type="primary" class="adduserbutton"> 添加用户</el-button>
      </el-col>
  </el-row>
  <el-table :data="userlist" border="" class="userlisttable" stripe=""> 
      <el-table-column type="index"></el-table-column>
      <el-table-column label="ID" prop="userid"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="性别" prop="usergender"></el-table-column>
      <el-table-column label="手机" prop="phonenum"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="头像" prop="userimage"></el-table-column>
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
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
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
import {getUserList} from '../../api'

export default {
    data(){
        return{
            userlist: [],
            total: 0
        }
    },
    created(){
        this.getUserListed()
    },
    methods: {
        // 展示当前位于第几页
        handleCurrentChange(newPage){
            console.log(newPage);
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            console.log(newSize);
        },
        getUserListed(){
            getUserList().then(res => {
                // console.log(res.data);
                this.userlist = res.data.data;
                this.total = res.data.total;
            }).catch(function (error) {
                    console.log(error);
              });
        }
    }
}
</script>
