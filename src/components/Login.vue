<template>
    <div class="login-input">
        <el-form :model="userLogin" status-icon :rules="rules2" ref="userLogin" label-width="50px" class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input type="text" v-model="userLogin.phone" autocomplete="off" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="password">
              <el-input type="password" v-model="userLogin.password" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="forgetpassword">
            <a class="resetpassword" href="/resetpassword">忘记密码？</a>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userLogin')">登录</el-button>
              <el-button @click="resetForm('userLogin')" class="resetLoginInfo">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {login} from '../api'
  import { mapActions } from "vuex";
  import { mapGetters } from "vuex";
  
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
      return {
        showLoginForm: false,
        userLogin: {
          phone: '',
          password: ''
        },
        userdata:[{

        }],
        rules2: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
    ...mapGetters(["getUser"])
  },
    methods: {
      ...mapActions(["setUser", "setLoginState"]),
      submitForm(formName) {
        // let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // var qs = require('qs');
            // var params = qs.stringify({
            //   phone: this.userLogin.phone,
            //   password: this.userLogin.password
            // });
            var user = {
              "phonenum": this.userLogin.phone,
              "userpassword": this.userLogin.password
            };
            login(user).then(res => {
              if(res.data.code !==1) return this.$message.error(res.data.msg)
                // 登录信息存到本地;
                let user = JSON.stringify(res.data.data);
                sessionStorage.setItem("user", user);
                // localStorage.setItem("user", user);
                // 登录信息存到vuex
                this.setUser(res.data.data);
                this.setLoginState(true);
              this.$emit('input',this.showLoginForm);
              this.$message({
                message: '恭喜您，登陆成功',
                type: 'success'
                });
              }).catch(function (error) {
                    console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.login-input >>> .el-input__inner{
  width: 260px;
  height: 34px;
}
.forgetpassword {
  margin-bottom: 0px !important; 
}
.password{
  margin-bottom: 2px !important; 
}
.resetLoginInfo{
  margin-left: 50px !important;
}
</style>