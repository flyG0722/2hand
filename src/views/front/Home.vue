<template>
  <div style="min-height: 100vh">
    <div class="bg">
      <div style="width: 600px">
        <div style="text-align: center; color: #eee; font-size: 30px; margin-bottom: 20px">好看、好用、好玩，都在这里</div>
        <div class="search-container">
          <el-input
            v-model="name"
            size="medium"
            prefix-icon="el-icon-search"
            placeholder="请输入商品名称关键字搜索"
            class="search-input"
          ></el-input>
          <el-button
            @click="$router.push({ path: '/front/search', query: { name: name } })"
            size="medium"
            type="primary"
            class="search-button"
          >
            <i class="el-icon-search"></i>
          </el-button>
        </div>
      </div>
    </div>

    <div style="width: 75%; background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%); margin: 10px auto; padding: 20px; border-radius: 5px; position: relative;">


      <el-button @click="$router.push('/front/addGoods')" style="position: absolute; top: 20px; right: -150px" size="medium" type="primary" plain>发布商品</el-button>
      <el-button @click="$router.push('/front/userHelp')" style="position: absolute; top: 70px; right: -150px" size="medium" type="primary" plain>发布求购</el-button>

      <div style="margin-bottom: 20px">
        <el-select v-model="category" size="medium" style="width: 200px" @change="loadGoods(1)">
          <el-option value="全部" label="全部"></el-option>
          <el-option v-for="item in categoryList" :key="item.id" :value="item.name" :label="item.name"></el-option>
        </el-select>

        <el-select v-model="sort" size="medium" style="width: 200px; margin-left: 10px" @change="loadGoods(1)">
          <el-option value="最新" label="最新"></el-option>
          <el-option value="最热" label="最热"></el-option>
        </el-select>
      </div>

      <div>
        <el-row :gutter="15">
          <el-col :span="8" v-for="item in goodsList" :key="item.id">
            <GoodsItem 
              :id="item.id" 
              :img="item.img" 
              :name="item.name" 
              :price="item.price" 
              :readCount="item.readCount" 
              :likesCount="item.likesCount" />
          </el-col>
        </el-row>

        <div style="margin: 15px auto">
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
  </div>
</template>



<script>
import GoodsItem from '@/components/GoodsItem.vue';
export default {
  components: {
    GoodsItem,
  },
  data() {
    return {
      categoryList: [],
      goodsList: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 12,  // 每页显示的个数
      total: 0,
      category: '全部',
      sort: '最新',
      name: ''
    }
  },
  mounted() {
    this.loadCategory()
    this.loadGoods(1)
  },
  // methods：本页面所有的点击事件或者其他函数定义区
  methods: {
    loadCategory() {
      this.$request.get('/category/selectAll').then(res => {
        this.categoryList = res.data || []
      })
    },
    loadGoods(pageNum) {  // 分页查询
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/goods/selectFrontPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          category: this.category === '全部' ? null : this.category,
          sort: this.sort
        }
      }).then(res => {
        if (res.code === '200') {
          this.goodsList = res.data?.list
          this.total = res.data?.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(pageNum) {
      this.loadGoods(pageNum)
    },
  }
}
</script>

<style scoped>
.bg {
  height: 400px;
  background: linear-gradient(270deg, rgba(64, 158, 255, 0.5), rgba(255, 64, 64, 0.5), rgba(64, 255, 128, 0.5), rgba(64, 64, 255, 0.5));
  background-size: 400% 400%;
  animation: gradient-animation 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.goods-item {
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.goods-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.goods-item img {
  transition: transform 0.2s ease;
}

.goods-item:hover img {
  transform: scale(1.05);
}

.goods-name {
  transition: color 0.3s ease;
}

.el-button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.el-button:hover {
  background-color: #fff;
  color: #409EFF;
}

.el-select {
  transition: border 0.3s ease;
}

.el-select:hover {
  border: 1px solid #409EFF;
}

.search-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 增加间距 */
}

.search-input {
  border-radius: 25px; /* 圆角 */
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.2), /* 较轻的阴影 */
    0 4px 20px rgba(0, 0, 0, 0.15); /* 较重的阴影 */
  transition: box-shadow 0.3s ease; /* 过渡效果 */
}

.search-input:hover {
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.25), /* 悬停时较强阴影 */
    0 8px 30px rgba(0, 0, 0, 0.2); /* 悬停时更重的阴影 */
}

.search-button {
  border-radius: 25px; /* 圆角 */
  background-color: #409EFF; /* 主色调 */
  color: #fff; /* 文字颜色 */
  padding: 0 20px; /* 内边距 */
  transition: background-color 0.3s ease, transform 0.3s ease; /* 过渡效果 */
  width: 100px;
  height: 40px;
}

.search-button:hover {
  background-color: #66b1ff; /* 悬停时的颜色 */
  transform: translateY(-2px); /* 悬停时微调 */
}

.search-button i {
  transition: transform 0.3s ease; /* 图标过渡效果 */
  font-size: 20px;
}

.search-button:hover i {
  transform: rotate(45deg); /* 悬停时旋转效果 */
}
</style>

