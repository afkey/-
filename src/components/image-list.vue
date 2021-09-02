<template>
  <div class="img-list-container">
    <div class="btn-group">
      <el-radio-group v-model="collect" @change="loadImage()" size="mini">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="mini" @click="dialogTableVisible = true"
        >上传图片</el-button
      >
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="6"
        :md="4"
        :lg="3"
        v-for="image in images"
        :key="image.id"
        ><div class="grid-content bg-purple set-relative">
          <el-image
            style="width: 100px; height: 100px"
            :src="image.url"
            fit="cover"
          ></el-image>
          <!-- 收藏和删除 -->
          <div class="butten-group">
            <el-button
              type="warning"
              :icon="
                image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'
              "
              circle
              size="mini"
              @click="onCollectImage(image)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="onDeleteImage(image)"
            ></el-button>
          </div>
          <!-- 收藏和删除 -->
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      class="pageination"
      :total="total_count"
      :page-size="pageSize"
      :current-page.sync="page"
      @current-change="onCurrentChange"
    >
    </el-pagination>
    <!-- 会话窗口 -->
    <el-dialog
      title="上传图片"
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        multiple
        name="image"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage, collectImage, deleteCollectImage } from "@/api/img.js";
const user = JSON.parse(window.localStorage.getItem("user"));
export default {
  name: "ImgList",
  data() {
    return {
      images: [],
      collect: false,
      dialogTableVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
      total_count: null, //总条目数
      page: 1,
      pageSize: 10, //每页数量
    };
  },
  methods: {
    //获取图片
    loadImage(page = 1) {
      getImage({
        page,
        per_page: this.pageSize,
        collect: this.collect,
      }).then((res) => {
        console.log(res);
        this.images = res.data.data.results;
        this.total_count = res.data.data.total_count;
      });
    },
    //分页更新页面
    onCurrentChange(page) {
      this.loadImage(page);
    },
    //上传成功
    uploadSuccess() {
      // 关闭遮罩层
      this.dialogTableVisible = false;

      this.loadImage(this.page);
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    //收藏图片
    onCollectImage(image) {
      console.log(image.is_collected);

      collectImage(!image.is_collected, image.id).then((res) => {
        image.is_collected = res.data.data.collect;
        console.log(res);
      });
    },
    onDeleteImage(image) {
      deleteCollectImage(image.id).then((res) => {
        this.loadImage();
      });
    },
  },
  computed: {},
  created() {
    //初始化素材
    this.loadImage();
  },
};
</script>

<style scoped>
.btn-group {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.pageination {
  margin-top: 20px;
}
.butten-group {
  background-color: rgba(206, 201, 201, 0.8);
  position: absolute;
  height: 30px;
  width: 85px;
  top: 67px;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 15px;
  padding-top: 3px;
}

.set-relative {
  position: relative;
}
</style>