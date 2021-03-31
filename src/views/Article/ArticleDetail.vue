<template>
    <div>
        <el-card class="articledetail">
        <h3>{{article.articletitle}}</h3>
        <div class="edit-button-part">
        <el-button type="text" icon="el-icon-edit" circle @click="editarticle(article.articleid)" 
        v-if="article.userid==user.userid"
        class="edit-button">编辑</el-button>
        </div>
        <!-- <span>|</span> -->
        
        <p class="article-time-part">{{article.createtime | dateFormat}}</p>
        <!-- 正文 -->
        <p v-html="markdown" class="main-content"></p>
        <!-- 点赞 -->
        <el-tooltip effect="dark" content="点赞或取消点赞" placement="top" :enterable='false'>
        <el-button icon="el-icon-check" circle v-if="!logining" disabled></el-button>
        <el-button icon="el-icon-check" circle v-else-if="!likeState" @click="likeingAPI()"></el-button>
        <el-button type="success" icon="el-icon-check" circle v-else @click="unlikeAPI()"></el-button>
        </el-tooltip>
        <!-- 收藏 -->
        <el-tooltip effect="dark" content="收藏或取消收藏" placement="top" :enterable='false'>
        <el-button icon="el-icon-star-off" circle v-if="!logining" disabled></el-button>
        <el-button icon="el-icon-star-off" circle v-else-if="!collectState" @click="collectingAPI()"></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle v-else @click="uncollectAPI()"></el-button>
        </el-tooltip>
        <!-- 评论输入框  -->
        <div class="enter-comment">
  <el-input 
  class="input-text"
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入评论内容"
  v-model="commentText">
  </el-input>
        </div>
  <div class="publish-part">
      <el-button @click="saveCommentAPI()" class="publish-button" v-if="logining">发表</el-button>
  <el-button @click="saveCommentAPI()" disabled class="publish-button-nologin" v-else>发表</el-button>
  </div>
        <!-- 文章评论 -->
        <ul class="comments-ul">
            <li v-for="comment in comments" :key="comment.commentid" class="article-li">      
                <p class="comments-content">{{comment.commentcontent}}</p>
                <p class="comments-time-part">{{comment.commenttime | dateFormat}}</p>
                <el-divider></el-divider>
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
        </el-card>
        <el-card class="authorInfo">
            <!-- 用户头像 -->
            <div class="userimg">
                <img :src="uploaderInfo.userimage" alt="用户头像">
            </div>
            <!-- 用户名 -->
            <p>{{uploaderInfo.username}}</p>
            <div v-if="article.userid!==user.userid&&logining">
            <el-button @click="fellowingAPI()" class="fellow" v-if="!fellowState">关注</el-button>
            <el-button @click="unfellowAPI()" class="fellow" v-else>取消关注</el-button>
            </div>
        </el-card>
        </div>
</template>

<style>
.edit-button-part{
    text-align: right;
}
.main-content{
    margin-bottom: 46px !important;
}
.article-time-part{
    text-align: right;
}
.comments-time-part{
    float: right;
    font-size: 16px;
}
.input-text{
    margin-top: 20px !important;
    margin-bottom: 10px !important;
}
.enter-comment {
    display: inline;
    width: 260px !important;
}
.publish-button-nologin{
    color: #fff !important;
    border: 0px !important;
    background-color: #fb7299 !important;
}
.publish-button{
    color: #fff !important;
    border: 0px !important;
    background-color: #fb7299 !important;
}
.comments-content{
    text-align: left;
}
.publish-part{
    display: inline;
    position: relative;
    left: -445px;
    /* padding: 12px 0px 12px 0px; */
    border-radius: 6%;
    /* background-color: #fb7299 !important; */
}
.sepArticle{
    color: rgb(27, 26, 26);
  }
.fellow{
    margin-top: 10px !important;
    border: 0px !important;
}
.userimg{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    right: -30%;
}
.authorInfo{
    position: fixed;
    right: 10%;
    top: 2%;
    width: 250px; 
}
.articledetail{
    width: 1000px;
    position: absolute;
    right: 27%;
    top: 2%;
}
</style>

<script>

import MarkdownIt from 'markdown-it'
import {getArticleByArticleId, saveComment,
getComment, getUserInfoByUserId, fellowing, fellowState, unfellow, likeing, likeState, unlike,
collecting, uncollect, collectState} from '../../api'
export default {
    data() {
        return{
            // 记录登录状态
            logining: false,
            uploaderInfo: {},
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            commentText: '',
            article:{},
            user:{},
            fellowState: false,
            likeState: false,
            comments: [{}],
            collectState: false
            
        }
    },
    created() {
      this.getArticleByArticleIdAPI();
      this.getCommentAPI()
      this.getloginUserInfo()
    },
    computed: {
        markdown(){
            const md = new MarkdownIt();
            const result = md.render(this.article.markdown);
            return result;
        }
    },
    methods: {
        // 展示当前位于第几页
        handleCurrentChange(newPage){
            // console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getCommentAPI();
        },
        // 每页展示多少条数据
        handleSizeChange(newSize){
            // console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getCommentAPI()
        },
        // 发表评论
        saveCommentAPI(){
            var commentValue = {
              "commentcontent": this.commentText,
              "userid": this.user.userid,
              "articleid": this.article.articleid
            };
            saveComment(commentValue).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.$message({
                message: '发表评论成功',
                type: 'success'
                });
                })
                this.commentText = null
        },
        // 获取此文章的所有评论信息
        getCommentAPI(){
            getComment(this.queryInfo.pagenum, this.queryInfo.pagesize, this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.comments = res.data.data.list
                this.total = res.data.data.total;
                })
        },
        uncollectAPI(){
            uncollect(this.user.userid,this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '取消收藏成功',
          message: '',
          type: 'success'
        });
        })
        },
        collectStateAPI(){
            collectState(this.user.userid,this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.collectState = res.data.data
                })
        },
        collectingAPI(){
            collecting(this.user.userid,this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '收藏成功',
          message: '',
          type: 'success'
        });
})
        },
        unfellowAPI(){
            unfellow(this.user.userid,this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '取消关注成功',
          message: '',
          type: 'success'
        });
})
        },
        fellowStateAPI(){
            if(this.logining){
                fellowState(this.user.userid, this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.fellowState = res.data.data
                })
            }
        },
        likeingAPI(){
            likeing(this.user.userid,this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '点赞成功',
          message: '',
          type: 'success'
        });
        })
        },
        unlikeAPI(){
            unlike(this.user.userid,this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '取消点赞成功',
          message: '',
          type: 'success'
        });
})
        },
        likeStateAPI(){
            if(this.logining){
                likeState(this.user.userid, this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.likeState = res.data.data
                console.log(this.likeState);
                })
            }
        },
        fellowingAPI(){
            fellowing(this.user.userid,this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                this.$notify({
          title: '关注成功',
          message: '',
          type: 'success'
        });
        })
        },
        // 获取文章发表者的用户信息
        getCommentatorInfoByUserIdAPI(id){
            getUserInfoByUserId(id).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.commentator = res.data.data
                })
        },
        // 获取文章发表者的用户信息
        getUploaderInfoByUserIdAPI(){
            getUserInfoByUserId(this.article.userid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)  
                this.uploaderInfo = res.data.data
                this.fellowStateAPI()
                this.likeStateAPI()
                })
        },
        // 获取当前登录用户的信息
        getloginUserInfo(){
            if (sessionStorage.getItem("user")) {
                this.user = JSON.parse(sessionStorage.getItem("user"))
                this.collectStateAPI()
                this.logining = true
                // console.log(this.imageUrl);
                }else{
                    this.logining = false
                }
        },
        editarticle(){
            this.$router.push({
                path: '/markdown',
                query: {
                    id: this.article.articleid
                    }
                    })
        },
        // 获取文章信息
        getArticleByArticleIdAPI(){
            this.article.articleid = this.$route.query.id
            // console.log(this.articleid);
            getArticleByArticleId(this.article.articleid).then(res => {
                if(res.data.code !==1) return this.$message.error(res.data.msg)
                // console.log(res.data.data);
                // this.content = res.data.data.markdown
                // this.articletitle = res.data.data.articletitle
                this.article = res.data.data
                this.getUploaderInfoByUserIdAPI()
                if(this.article.userid !== this.user.userid){
                    this.article.thumbsup++
                }
            })
        }
    }
}
</script>