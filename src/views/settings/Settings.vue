<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row :gutter="20" class="info-container">
          <el-col :span="12"
            ><div>
              <el-form ref="form" :model="user" label-width="80px">
                <el-form-item label="编号">{{ user.id }}</el-form-item>
                <el-form-item label="手机">{{ user.mobile }}</el-form-item>
                <el-form-item label="媒体名称">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍">
                  <el-input v-model="user.intro"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                  <el-input type="textarea" v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">立即创建</el-button>
                </el-form-item>
              </el-form>
            </div></el-col
          >
          <el-col :span="4" :offset="2"
            ><div>
              <el-image
                style="width: 150px; height: 150px"
                :src="user.photo"
                fit="cover"
              ></el-image>
            </div>
            <p @click="$refs.file.click()">更改头像</p>
            <input type="file" ref="file" hidden @change="loadFile" />
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog
      title="更改图片"
      :visible.sync="dialogVisible"
      width="40%"
      append-to-body
    >
      <img :src="previewImg" alt="" width="150">
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/setting.js";
export default {
  name: "Settings",
  data() {
    return {
      user: {
        id: "",
        name: "",
        mobile: "",
        intro: "",
        email: "",
      },
      dialogVisible: false,
      previewImg: "",
    };
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
        console.log(res);
        this.user = res.data.data;
      });
    },
    loadFile() {
      const file = this.$refs.file;
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImg = blobData;

      file.value = "";
      this.dialogVisible = true;
    },
  },
  created() {
    this.loadUserProfile();
  },
};
</script>
<style scoped>
.info-container {
  margin-top: 20px;
}
</style>