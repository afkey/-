<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./component/AppAside";
export default {
  name: "Layout",
  components: {
    AppAside,
  },
};
</script>

<style scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-aside {
  background-color: rgb(142, 218, 218);
}
.el-header {
  background-color: rgb(112, 169, 175);
}
.el-main {
  background-color: rgb(17, 167, 231);
}
</style>