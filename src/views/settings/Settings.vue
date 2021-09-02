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
                  <el-button type="primary" @click="loadUpdateUserProfile"
                    >提交</el-button
                  >
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
      @opened="onDialogOpened"
    >
      <div class="previewImg-container">
        <div class="previewImg">
          <img :src="previewImg" alt="" width="150" ref="img" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUploadPhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile,
} from "@/api/setting.js";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import Bus from "@/utils/global-bus";

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
        photo: null,
      },
      dialogVisible: false,
      previewImg: "",
      cropper: null, //裁切器对象
    };
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
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
    //初始化裁切器
    onDialogOpened() {
      if (this.cropper) {
        this.cropper = this.cropper.replace(this.previewImg);
        return;
      }

      const image = this.$refs.img;
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
      });
    },
    //关闭会话窗口获取图片
    onUploadPhoto() {
      this.dialogVisible = false;
      //获取裁切后的图片
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("photo", file);
        console.log(fd);
        //上传图片
        updateUserPhoto(fd).then((res) => {
          this.user.photo = res.data.data.photo;
        });
      });
    },
    //更新用户信息
    loadUpdateUserProfile() {
      updateUserProfile({
        name: this.user.name,
        intro: this.user.intro,
        email: this.user.email,
      }).then((res) => {
        Bus.$emit("updateUser", this.user);
      });
    },
  },
  created() {
    this.loadUserProfile();
  },
};
</script>
<style lang="less" scoped>
.info-container {
  margin-top: 20px;
}
.previewImg-container {
  .previewImg {
    display: block;
    max-width: 100%;
  }
}
</style>