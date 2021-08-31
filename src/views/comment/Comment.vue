<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-table :data="commentData" style="width: 100%">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="评论粉丝数">
          </el-table-column>
          <el-table-column prop="comment_status" label="评论状态">
            <template slot-scope="scope">
              {{ scope.row.comment_status ? "正常" : "关闭" }}
            </template>
          </el-table-column>
          <el-table-column prop="comment_status" label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ccc"
                @change="onChangeStatus(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getArticleComment, changeCommentStatus } from "@/api/comment.js";
export default {
  name: "Comment",
  data() {
    return {
      commentData: [], //文章数据列表
      total_count: null, //总文章数
      pageSize: null, //每页文章条数
      page: 1,
    };
  },
  methods: {
    //改变每页条数
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.loadArticleComment(1);
    },
    //跳转页面
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.loadArticleComment(page);
    },
    //加载文章列表
    loadArticleComment(page) {
      getArticleComment({
        page: page,
        per_page: this.pageSize,
        response_type: "comment",
      }).then((res) => {
        console.log(res);
        this.commentData = res.data.data.results;
        this.total_count = res.data.data.total_count;
      });
    },
    //改变文章状态
    onChangeStatus(article) {
      changeCommentStatus(article).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
      });
    },
  },
  created() {
    this.loadArticleComment();
  },
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>