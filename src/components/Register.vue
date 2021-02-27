<template>
<div >
  <img src="../assets/logo.png">
    <div class="register-input">
        <el-form :model="userRegister" status-icon :rules="rules2" ref="userRegister" label-width="50px" class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input type="text" v-model="userRegister.phone" autocomplete="off" placeholder="手机号"></el-input>
              </el-form-item>
            <el-form-item prop="verifyCode">
              <!-- <el-input type="text" v-model="userRegister.verifyCode" autocomplete="off" placeholder="验证码">
                <el-button>获取验证码</el-button>
              </el-input> -->
              <el-button v-model="userRegister.verifyCode" @click="sendVerifyCode()">获取验证码</el-button>
              </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="userRegister.password" autocomplete="off" placeholder="密码"></el-input>
              </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="userRegister.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userRegister')">注册</el-button>
              <el-button @click="resetForm('userRegister')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
  import {register,sendVerifyCode} from '../api'
  
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
          verifyCode: ''
        },
        // verifyCode: "",
        rules2: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var user = {
              "phonenum": this.userRegister.phone,
              "userpassword": this.userRegister.password
            };
            register(user).then(res => {
              console.log(res.data);
              that.userRegister = res.data;
              }).catch(function (error) {
                    console.log(error);
              });
              this.$router.replace('/')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
.register-input /deep/ .el-input__inner{
  width: 260px;
  height: 30px;
}
.register-input{
  position:absolute;
  left: 40%;
  top: 50%;
}
</style>