<template>
    <div>
        <h4>关注用户列表</h4>
        <ul class="fellow-ul">
            <li v-for="uploader in uploaderList" :key="uploader.userid" class="fellow-li">
                <div>
                    <el-card class="fellow-card">
                        <!-- 用户头像 -->
            <div class="follow-userimg">
                <img :src="user.userimage" alt="图片加载失败">
            </div>
            <!-- 用户名 -->
                        <p class="follow-title">{{uploader.username}}</p>
                        <!-- 关注与取消关注 -->
            <!-- <el-button @click="fellowingAPI(uploader.userid)" class="fellow" v-if="!fellowState">关注</el-button> -->
            <el-button @click="unfellowAPI(uploader.userid)" class="unfollow-button">取消关注</el-button>
            <!-- <el-button @click="unfellowAPI()" class="fellow" >关注状态</el-button> -->

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
import {getFellowList, getUserInfoByUserId, fellowing, fellowState, unfellow} from '../../api'

export default {
    data() {
        return{
            // 是否关注该用户
            fellowState: true,
            // 被关注用户列表
            fellowList:{},
            // 当前登录用户的信息
            user: {},
            // 被关注用户的信息的列表
            uploaderList:[],
            // 分页信息
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            }
        }
    },
    created() {
      this.getFellowListAPI();
    },
    methods: {
        unfellowAPI(uploaderid){
            unfellow(this.user.userid,uploaderid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '取消关注成功',
          message: '',
          type: 'success'
        });
})
        },
        fellowStateAPI(uploaderid){
            fellowState(this.user.userid, uploaderid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.fellowState = res.data.data
                })
        },
        fellowingAPI(uploaderid){
            fellowing(this.user.userid, uploaderid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '关注成功',
          message: '',
          type: 'success'
        });
        })
        },
        // 获取用户头像
        getImageUrl(){
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                // this.imageUrl = this.user.userimage
                // console.log(this.imageUrl);
                }
        },
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
        getFellowListAPI(){
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                }
            getFellowList(this.queryInfo.pagenum, this.queryInfo.pagesize, this.user.userid).then(res => {
                if(res.data.code !== 1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                this.fellowList = res.data.data.list;
                this.total = res.data.data.total;
                this.uploaderList = []

                for (var i=0, len=this.fellowList.length; i<len; i++){
                    // console.log(this.fellowList[i].uploaderid);
                    // 查询用户信息
                    getUserInfoByUserId(this.fellowList[i].uploaderid).then(res => {
                        if(res.data.code !== 1) return this.$message.error(res.data.msg)
                        // 将用户信息存入数组
                        this.uploaderList.push(res.data.data)
                        })
                }
            })

        }
    }
    
}
</script>

<style>
.unfollow-button{
    float: right;
    border: 0px !important;
    color: rgb(116, 175, 175);
}
.time-part{
    width: 160px;
    float: right;
}
.follow-userimg{
    display: inline;
    float: left;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    right: -2%;
    top: 10%;
}
.fellow-ul{
    margin-right: 35px;
}
.fellow-li{
    list-style: none;
}
/* .fellow-card >>> el-card__body{
    
    height: 75px;
} */
.fellow-card{
    
    margin-bottom: 10px;
}
.follow-title{
    display:inline;
    /* width: 100px; */
    font-size: 18px;
    text-align: left;
    margin-top: 0px;
}
.fellow-title:hover{
    color: rgb(120, 194, 228);
}
</style>