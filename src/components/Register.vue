<template>
    <div class="login-input">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input type="text" v-model="ruleForm2.phone" autocomplete="off" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <!-- 需要写一个忘记密码的功能在这里 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
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
        ruleForm2: {
          phone: '',
          checkPass: ''
        },
        rules2: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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

<style>
.login-input /deep/ .el-input__inner{
  width: 260px;
  height: 30px;
}
</style>