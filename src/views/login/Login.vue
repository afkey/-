<template>
  <div class="login-container">
    <div class="header">
      <h1>后台管理系统</h1>
    </div>
    <el-form ref="form" class="longin-form" :model="form">
      <el-form-item>
        <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.psw" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议及隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        psw: "",
      },
      checked: false,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  /* 让元素充满父元素 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background-color: darksalmon;
  .longin-form {
    background-color: white;
    min-width: 300px;
    padding: 50px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>