<template>
  <div class="container">
    <div class="circle-container">
      <div 
        class="card circle" 
        @click="loadCircle('全部')" 
        :class="{'circle-active' : circle === '全部' }">
        <img class="circle-img" src="@/assets/imgs/全部.png" alt="全部">
        <span class="circle-text">全部</span>
      </div>
      <div 
        class="card circle" 
        :class="{'circle-active' : circle === item.name }" 
        v-for="item in circles" 
        :key="item.id" 
        @click="loadCircle(item.name)">
        <img class="circle-img" :src="item.img" alt="circle">
        <span class="circle-text">{{ item.name }}</span>
      </div>
    </div>

    <div class="post-container">
      <div 
        @click="$router.push('/front/postsDetail?id=' + item.id)" 
        v-for="item in tableData" 
        :key="item.id"
        class="post-card">
        <div class="post-info">
          <div class="post-title">{{ item.title }}</div>
          <div class="post-description">{{ item.descr }}</div>
          <div class="post-meta">
            <span><i class="el-icon-user"></i> {{ item.userName }}</span>
            <span class="meta-separator"><i class="el-icon-time"></i> {{ item.time }}</span>
            <span class="meta-separator"><i class="el-icon-reading"></i> {{ item.readCount }}</span>
          </div>
        </div>
        <div class="post-image">
          <img :src="item.img" alt="" class="image">
        </div>
      </div>

      <div class="pagination-container" v-if="total > 0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      circles: [],
      posts: [],
      circle: '全部',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 4
    }
  },
  created() {
    this.loadCircles()
    this.load(1)
  },
  methods: {
    loadCircle(circle) {
      this.circle = circle
      this.load(1)
    },
    load(pageNum) {
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/posts/selectFrontPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          circle: this.circle === '全部' ? null : this.circle,
        }
      }).then(res => {
        if (res.code === '200') {
          this.tableData = res.data?.list
          this.total = res.data?.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    loadCircles() {
      this.$request.get('/circles/selectAll').then(res => {
        this.circles = res.data || []
      })
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
  }
}
</script>

<style scoped>
.container {
  margin: 10px auto;
  width: 50%;
}

.circle-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.circle {
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.circle:hover {
  background-color: #ffedd8;
  transform: translateY(-2px);
}

.circle-active {
  background-color: #ffedd8;
  border: 1px solid #ffb74d;
}

.circle-img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.circle-text {
  font-weight: bold;
}

.post-container {
  display: flex;
  flex-direction: column;
}

.post-card {
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  background: linear-gradient(243deg, #939e8a, #f3f5f4);
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.post-info {
  flex: 1;
  margin-right: 10px;
}

.post-title {
  font-size: 20px;
  margin-bottom: 5px;
  color: #333;
}

.post-description {
  color: #666;
  margin-bottom: 5px;
}

.post-meta {
  color: #999;
}

.meta-separator {
  margin-left: 20px;
}

.post-image {
  flex-shrink: 0;
}

.image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.pagination-container {
  margin: 15px 0;
}
</style>
