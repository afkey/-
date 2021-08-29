<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 -->
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio label="">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channelID" placeholder="请选择频道">
              <el-option
                v-for="channel in articlesChannels"
                :key="channel.id"
                :label="channel.name"
                :value="channel.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="loading"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 表单 -->
      </div>
    </el-card>
    <!-- ------------------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已筛选出{{ total }}条数据</span>
      </div>
      <div class="text item" v-loading="loading">
        <!-- 表格 -->
        <el-table :data="articlesList" style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover.images[0]"
                class="cover-img"
                :src="scope.row.cover.images[0]"
                alt=""
              />
              <img v-else class="cover-img" src="./no-cover.jpg" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="题目" width="180">
          </el-table-column>
          <el-table-column label="状态" width="180">
            <template slot-scope="scope">
              <el-tag :type="articlesStatus[scope.row.status].type">{{
                articlesStatus[scope.row.status].text
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="$router.push(`/publish?id=${scope.row.id}`)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteArticle(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格 -->
      </div>
    </el-card>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="onCurrentChange"
      :total="total"
      :page-size="pageSize"
      :disabled="loading"
    >
    </el-pagination>
    <!-- 分页 -->
  </div>
</template>

<script>
import {
  getArticlesList,
  getArticlesChannels,
  deleteArticlesList,
} from "@/api/article.js";
export default {
  name: "Article",
  data() {
    return {
      form: {
        region: "",
      },
      dateRange: "",
      articlesList: [],
      articlesStatus: [
        {
          text: "草稿",
          type: "",
        },
        {
          text: "待审核",
          type: "info",
        },
        {
          text: "审核通过",
          type: "success",
        },
        {
          text: "审核失败",
          type: "warning",
        },
        {
          text: "已删除",
          type: "danger",
        },
      ],
      articlesChannels: [],
      pageSize: 10,
      total: 0,
      status: null,
      channelID: null,
      loading: false,
    };
  },
  created() {
    this.loadArticles();
    this.loadArticlesChannels();
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.loadArticles();
    },
    onCurrentChange(page) {
      this.loadArticles(page);
    },
    loadArticles(page = 1) {
      getArticlesList({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelID,
        begin_pubdate: this.dateRange[0],
        end_pubdate: this.dateRange[1],
      }).then((res) => {
        this.total = res.data.data.total_count;
        this.articlesList = res.data.data.results;

        this.loading = false;
      });
    },
    loadArticlesChannels() {
      getArticlesChannels().then((res) => {
        this.articlesChannels = res.data.data.channels;
      });
    },
    deleteArticle(target) {
      deleteArticlesList(target).then((res) => {
        console.log("success");
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.cover-img {
  width: 100px;
  background-size: cover;
}
</style>