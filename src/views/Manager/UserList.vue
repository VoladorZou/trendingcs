<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right" class="breadnaviUser">
  <el-breadcrumb-item :to="{ path: '/management' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

    <el-card>
  <el-row :gutter="15">
      <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query"  clearable @clear="getUserListed"
          @input="getUserListed">
    <el-button slot="append" icon="el-icon-search" @click="getUserListed"></el-button>
  </el-input>
      </el-col>
      <el-dialog title="添加用户" :visible.sync="showLoginForm" center :append-to-body='true' :lock-scroll="false" width="25%">
            <!--这里可以写各种登录表单-->
            <AddUser v-model="showLoginForm"/>
            </el-dialog>
      <el-col :span="4">
          <el-button type="primary" class="adduserbutton" @click="showLoginForm = true"> 添加用户</el-button>
      </el-col>
  </el-row>
  <el-table :data="userlist" border="" class="userlisttable" stripe=""> 
      <el-table-column type="index"></el-table-column>
      <el-table-column label="ID" prop="userid" width="130px"></el-table-column>
      <el-table-column label="姓名" prop="username" width="150px"></el-table-column>
      <el-table-column label="性别" prop="usergender" width="150px"></el-table-column>
      <el-table-column label="手机" prop="phonenum"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="头像" prop="userimage"></el-table-column>
      <el-table-column label="状态" prop="stage">
          <el-tooltip effect="dark" content="正常或封禁" placement="top" :enterable='false'>
              <el-switch
  v-model="value2"
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
              <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteuser"></el-button>
      </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
  class="pagination-userlist"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      >
    </el-pagination>
        </el-card>
</div>
</template>

<style scoped>
.pagination-userlist{
    mask-type: 20px !important;
}
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
import {getUserListByPage} from '../../api'
import AddUser from '../../components/AddUser'

export default {
    data(){
        return{
            userlist: [],
            value2: true,
            total: 0,
            showLoginForm: false,
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            }
        }
    },
    components: {
      AddUser
    },
    created(){
        this.getUserListed()
    },
    methods: {
        // 删除用户
        deleteuser(){
            this.$confirm('即将删除此用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 调用删除用户接口
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        // 展示当前位于第几页
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getUserListed();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getUserListed()
        },
        getUserListed(){
            getUserListByPage(this.queryInfo.pagenum, this.queryInfo.pagesize, this.queryInfo.query).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                // console.log(res.data.data.total);
                this.userlist = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(function (error) {
                    console.log(error);
              });
        }
    }
}
</script>
