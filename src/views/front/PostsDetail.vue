<template>
  <div class="container">
    <div class="card post-card">
      <div class="post-title">{{ posts.title }}</div>
      <div class="post-meta">
        <span><i class="el-icon-user"></i> {{ posts.userName }}</span>
        <span class="meta-separator"><i class="el-icon-time"></i> {{ posts.time }}</span>
        <span class="meta-separator"><i class="el-icon-reading"></i> {{ posts.readCount }}</span>
      </div>
      <div class="post-content" v-html="posts.content"></div>
    </div>

    <div class="card comment-card">
      <Comment :fid="id" module="posts" />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  name: "PostsDetail",
  components: { Comment },
  data() {
    return {
      id: this.$route.query.id,
      posts: {}
    }
  },
  created() {
    this.$request.put('/posts/updateCount/' + this.id).then(res => {
      this.load()
    })
  },
  methods: {
    load() {
      this.$request.get('/posts/selectById/' + this.id).then(res => {
        this.posts = res.data || {}
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 50%;
  margin: 10px auto;
}

.post-card {
  margin-bottom: 10px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.post-title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.post-meta {
  color: #666;
  margin-bottom: 40px;
  text-align: center;
}

.meta-separator {
  margin-left: 20px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
}

.comment-card {
  padding: 20px 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
