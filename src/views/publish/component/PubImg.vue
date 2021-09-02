<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img :src="coverImg" alt="" ref="cover-img" />
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      append-to-body
    >
      <el-tabs type="border-card" v-model="activeName">
        <!-- 素材库 -->
        <el-tab-pane label="素材库">
          <image-list />
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane label="上传图片">
          <input type="file" ref="file" @change="onUploadImg" />
          <img :src="null" alt="" ref="preImg" width="100" />
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg } from "@/api/img.js";
import ImageList from "@/components/image-list.vue";
export default {
  name: "PubImg",
  data() {
    return {
      dialogVisible: false,
      activeName: "",
    };
  },
  props: ["cover-img"],
  methods: {
    showCoverSelect() {
      this.dialogVisible = true;
    },
    //上传图片
    onUploadImg() {
      const file = this.$refs.file.files[0];
      const preImg = this.$refs.preImg;
      preImg.src = window.URL.createObjectURL(file);
    },
    onCoverConfirm() {
      const file = this.$refs.file.files[0];
      //选择上传图片的tab才进行操作
      if (this.activeName && !file) {
        this.$message({
          type: "info",
          message: "请上传图片",
        });
        return;
      }
      const fd = new FormData();
      fd.append("image", file);
      //上传图片
      uploadImg(fd).then((res) => {
        this.$refs["cover-img"].src = res.data.data.url;
        this.$emit("update-cover", res.data.data.url);
      });
      this.dialogVisible = false;
    },
  },
  components: {
    ImageList,
  },
};
</script>

<style lang="less" scoped>
.cover-wrap {
  width: 150px;
  height: 150px;
  border: 1px solid black;
  margin-left: 1px;
  float: left;
  img {
    width: 150px;
    height: 150px;
  }
}
</style>