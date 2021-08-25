<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header-container">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>XXXXXXXXXXXXXXX公司</span>
        </div>
        <el-dropdown>
          <div class="avater">
            <img :src="user.photo" alt="" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./component/AppAside";

import { getUserProfile } from "@/api/user.js";
export default {
  name: "Layout",
  components: {
    AppAside,
  },
  data() {
    return {
      user: {}, //用户信息
    };
  },
  created() {
    getUserProfile().then((res) => {
      this.user = res.data.data;
    });
  },
  methods: {
    onLogout() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功登出!",
          });
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-aside {
  background-color: #002033;
}
.el-header {
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid #ccc;
}
.el-main {
  background-color: white;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avater {
    display: flex;
    align-items: center;
  }
  span {
    margin: 0 10px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>