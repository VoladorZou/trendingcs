<template>
    <div class="resetPass">
        <div class="resetbreadnavi">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>找回账号密码</el-breadcrumb-item>
  </el-breadcrumb>
        </div>
        <el-form :model="userResetPass" status-icon :rules="rules2" ref="userResetPass" label-width="90px" class="resetPass-ruleForm">
              <div class="shell">
            <span class="span_text">手机号</span>
            <el-form-item prop="phone">
              <el-input type="text" v-model="userResetPass.phone" autocomplete="off" class="inputitem"></el-input>
              </el-form-item>
              </div>
              <div class="shell">
            <span class="span_text">验证码</span>
            <el-form-item prop="verifyCode">
              <el-input type="text" v-model="userResetPass.verifyCode" autocomplete="off" class="inputitem">
                <el-button
                    slot="append"
                    type="success"
                    @click="getVerification()">
                    获取验证码{{atime}}
                    </el-button>
              </el-input>
              </el-form-item>
              </div>
              <div class="shell">
                <span class="span_text">密码</span>
            <el-form-item prop="password">
              <el-input type="password" v-model="userResetPass.password" show-password class="inputitem"></el-input>
              </el-form-item>
              </div>
              <div class="shell">
                <span class="span_text">确认密码</span>
            <el-form-item prop="checkPass" class="checkpasscss">
              <el-input type="password" v-model="userResetPass.checkPass" show-password class="inputitem"></el-input>
              </el-form-item>
              </div>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userResetPass')" class="submitbutton">提交</el-button>
              <el-button @click="resetForm('userResetPass')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {sendVerifyCode, resetPassword} from '../api'

export default {
    data() {
      var phoneCheck = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|66\d{2})\d{6}$/;
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!phoneCheck.test(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userResetPass.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userResetPass: {
          phone: '',
          password: '',
          checkPass:'',
          verifyCode: ''
        },
        atime:'',
        rules2: {
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var user = {
              "phonenum": this.userResetPass.phone,
              "userpassword": this.userResetPass.password
            };
            resetPassword(user, this.userResetPass.verifyCode).then(res => {
              console.log(res.data);
              this.$message({
                message: '重置密码成功！',
                type: 'success'
                });
                this.$router.replace('/')
              }).catch(function (error) {
                    console.log(error);
              });
              
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //  点击获取验证码事件
      getVerification(){
           if (this.atime === ''){
             this.atime = 60
             this.btn_color = '#67C23A'
             this.sendVerifyCode()
             let timeout = setInterval(()=>{
               if (this.atime > 0){
                 this.atime--
                 timeout
               }else if (this.atime === 0){
                 this.atime = ''
                 this.btn_color = '#409EFF'
                 clearInterval(timeout)
               }
             },1000)
           }
      },
      sendVerifyCode(){
        sendVerifyCode(this.userRegister.phone).then(res => {
          console.log(res.data);
        }).catch(function(error){
          console.log(error);
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    
}
</script>

<style>
/* .inputitem{
  margin-left: 20px;
} */
.submitbutton{
  float: left;
}
.resetPass{
  position: fixed;
  top: 0px;  
  left: 0px;  
  width: 100%;
  height: 100%;
  background-image: url("../assets/resetPassBG.jpg");
  background-position: center;
  color: #ffffff;
}
.resetPass-ruleForm{
  position: absolute;
  left: 31%;
  top: 15%;
  background-color: #ffffff;
  border-radius: 1%;
  padding: 100px 200px 30px 120px;
}
.span_text{
    float: left;
    
    margin-top: 7px;
    font-size: 16px;
    color: #1a1818;
}
.resetbreadnavi{
    position: relative;
    left:31%;
    top: 12%;
    background-color: #ffffff;
    width: 725px;
    border-radius: 2%;
    padding: 10px 0px 10px 0px;
  }
</style>