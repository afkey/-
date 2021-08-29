<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text item">
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="channel in pubChannels"
              :key="channel.id"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import {
  getPubChannels,
  addArticle,
  getArticle,
  editArticle,
} from "@/api/article.js";
export default {
  name: "Publish",
  data() {
    return {
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        channel_id: null,
      },
      pubChannels: [],
    };
  },
  methods: {
    loadPubChannel() {
      getPubChannels().then((res) => {
        this.pubChannels = res.data.data.channels;
      });
    },
    loadAddArticle(draft) {
      addArticle(this.article, draft)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onPublish(draft) {
      if (this.$route.query.id) {
        this.loadEditArticle();
      } else {
        this.loadAddArticle(draft);
      }
    },
    loadArticles() {
      getArticle(this.$route.query.id).then((res) => {
        console.log(res);
        this.article = res.data.data;
      });
    },
    loadEditArticle() {
      editArticle(this.article,this.$route.query.id).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    if (this.$route.query.id) this.loadArticles();
    this.loadPubChannel();
  },
};
</script>