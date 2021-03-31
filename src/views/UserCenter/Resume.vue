<template>
<div>
  <div class="info">
    <div class="itembodychange">
      <p>修改</p>
    </div>
    <div class="itembody">
      <div class="itemphoto">头像</div>
  <el-upload
  class="avatar-uploader"
  :action="uploadURL"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
    </div>
  
  <div class="itembody">
  <div class="item">昵称</div>
  <div>{{this.user.username}}</div>
  </div>
  <div class="itembody">
  <div class="item">性别</div>
  <div>{{this.user.usergender}}</div>
  </div>
  <div class="itembody">
  <div class="item">手机</div>
  <div>{{this.user.phonenum}}</div>
  </div>
  <div class="itembody">
  <div class="item">邮箱</div>
  <div>{{this.user.email}}</div>
  </div>
  </div>
  </div>
</template>

<style>
.itembodychange{
  float: right;
  padding-bottom: 20px;
  padding-top: 30px;
}
.itemphoto{
  float: left;
          /* 上右下左 */
  padding: 30px 130px 0px 50px;
}
.itembody{
  /* 上右下左 */
  padding: 20px 20px 20px 20px;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
  .item{
    float: left;
    /* 上右下左 */
  padding: 0px 130px 0px 50px;
  }
  .itemInfo{
    position: relative;
    left: 0;
  }
</style>

<script>
import {getUserInfo} from '../../api'

  export default {
    data() {
      return {
        user:[{

        }],
        imageUrl: '',
        uploadURL: 'http://localhost:9085/user/uploadProfilePhoto'
      };
      
    },
    created() {
      this.getInfo();
    },
    methods: {
      
      getInfo(){
        // API: getUserInfo :show-header="false"
        getUserInfo().then(res => {
          if(res.data.code !==1) return this.$message.error(res.data.msg)
              // console.log(res.data);
              this.user = res.data.data;
              this.imageUrl = this.user.userimage;
              // console.log(this.user.username);
      });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>