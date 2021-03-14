<template>
<div class="Register">
        <el-form :model="userRegister" status-icon :rules="rules2" ref="userRegister" label-width="50px" class="register-ruleForm">
          <div class="shell">
            <span class="span_head"><span class="span_must">*</span></span>
            <el-form-item prop="userName">
              <el-input type="text" v-model="userRegister.userName" autocomplete="off" placeholder="用户名"></el-input>
              </el-form-item>
              </div>
              <div class="shell">
            <span class="span_head"><span class="span_must">*</span></span>
            <el-form-item prop="phone">
              <el-input type="text" v-model="userRegister.phone" autocomplete="off" placeholder="手机号"></el-input>
              </el-form-item>
              </div>
              <div class="shell">
            <span class="span_head"><span class="span_must">*</span></span>
            <el-form-item prop="verifyCode">
              <el-input type="text" v-model="userRegister.verifyCode" autocomplete="off" placeholder="验证码">
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
            <span class="span_head"><span class="span_must">*</span></span>
            <el-form-item prop="password">
              <el-input type="password" v-model="userRegister.password" show-password placeholder="密码"></el-input>
              </el-form-item>
              </div>
              <div class="shell">
            <span class="span_head"><span class="span_must">*</span></span>
            <el-form-item prop="checkPass" class="checkpasscss">
              <el-input type="password" v-model="userRegister.checkPass" show-password placeholder="确认密码"></el-input>
              </el-form-item>
              </div>
            <el-form-item prop="userGender" class="gender">
              <el-radio-group v-model="userRegister.userGender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            <el-form-item prop="email" class="emailcss">
              <el-input type="text" v-model="userRegister.email" autocomplete="off" placeholder="邮箱"></el-input>
              </el-form-item>
            <el-form-item class="goLogin">
              <a href="/">已有账号？去登录</a>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userRegister')" class="registerbutton">注册</el-button>
              <el-button @click="resetForm('userRegister')" class="resetbutton">重置</el-button>
            </el-form-item>
        </el-form>
</div>
</template>

<script>
  import {register,sendVerifyCode} from '../api'
  import { mapActions } from "vuex";
  
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
        } else if (value !== this.userRegister.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userRegister: {
          phone: '',
          password: '',
          checkPass:'',
          verifyCode: '',
          userName: '',
          userGender: '男',
          email: ''
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
          ],
          email: [{
            type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
          }],
          userGender: [
            { required: true, trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions(["setUser", "setLoginState"]),
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var user = {
              "phonenum": this.userRegister.phone,
              "userpassword": this.userRegister.password,
              "username": this.userRegister.userName,
              "usergender": this.userRegister.userGender,
              "email": this.userRegister.email
            };
            register(user, this.userRegister.verifyCode).then(res => {
              console.log(res.data);
              that.userRegister = res.data;
              // 登录信息存到本地
                let user = JSON.stringify(res.data.data);
                // console.log(user);
                localStorage.setItem("user", user);
                // 登录信息存到vuex
                this.setUser(res.data.data);
                this.setLoginState(true);
              this.$emit('input',this.showLoginForm);
              this.$message({
                message: '恭喜您，注册成功！',
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
.registerbutton{
  float: left;
}
.Register{
  position: fixed;
  top: 0px;  
  left: 0px;  
  width: 100%;
  height: 100%;
  background-image: url("../assets/registerBG.jpg");
  background-position: center;
  color: #ffffff;
}
.register-ruleForm{
  position: absolute;
  left: 37.5%;
  top: 13%;
  /* 上右下左 */
  padding: 30px 70px 0px 30px;
  border-radius: 5%;
  background-color: rgba(200,200,200,.5);
}
/* .register-ruleForm /deep/ .el-input__inner{
  width: 260px;
  height: 30px;
} */
.gender{
  margin-bottom: 10px !important; 
}
.goLogin{
  margin-bottom: 10px !important; 
}
.emailcss{
  margin-bottom: 10px !important; 
}
.span_must{
  position: relative;
  left: -130px;
  /* top: -5px; */
  bottom: -10px;
  color: red;
  font-size: 20px;
}
.shell{
    overflow: hidden;
  }
</style>