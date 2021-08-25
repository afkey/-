<template>
  <div class="login-container">
    <div class="header">
      <h1>后台管理系统</h1>
    </div>
    <el-form
      ref="login-form"
      class="longin-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="checked"
          >我已阅读并同意用户协议及隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="login"
          :loading="onLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        agree: false,
      },
      onLoading: false,
      checked: false,
      //表单验证
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { pattern: /^\d{6}$/, message: "请输入6位验证码" },
        ],
        agree: [
          {
            required: true,
            message: "请阅读并勾选隐私协议",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //发送登录请求
    login() {
      //手动验证表单
      this.$refs["login-form"].validate((valid) => {
        if (!valid) return;
        this.onLogin();
      });
    },
    onLogin() {
      this.onLoading = true;
      request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        data: this.user,
      })
        .then((res) => {
          //登录成功
          //消息提示
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
          //本地保存token
          let user = res.data.data;
          window.localStorage.setItem("user", JSON.stringify(user));
          this.onLoading = false;
          //路由跳转
          this.$router.push('/');
        })
        .catch((err) => {
          //登录失败
          this.$message.error("手机号或验证码有误");
          this.onLoading = false;
          console.log(err);
        });
    },
  },
  mounted() {},
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
  flex-direction: column;
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