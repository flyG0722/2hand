<template>
  <div style="width: 70%; margin: 10px auto;">
    <div style="margin-bottom: 10px;">
      <el-input v-model="name" size="medium" style="width: 300px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="loadGoods(1)">搜 索</el-button>
      <el-button type="warning" @click="reset">重 置</el-button>
    </div>
    
    <div style="background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%); padding: 20px; border-radius: 5px;">
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

      <div style="margin: 15px auto;">
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

import GoodsItem from '@/components/GoodsItem.vue';
export default {
  components: {
    GoodsItem,
  },
  name: "Search",
  data() {
    return {
      goodsList: [],
      pageNum: 1,
      pageSize: 8,
      total: 0,
      name: this.$route.query.name || ''
    }
  },
  created() {
    this.loadGoods(1);
  },
  methods: {
    loadGoods(pageNum) {
      if (pageNum) this.pageNum = pageNum;
      this.$request.get('/goods/selectFrontPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name
        }
      }).then(res => {
        if (res.code === '200') {
          this.goodsList = res.data?.list;
          this.total = res.data?.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleCurrentChange(pageNum) {
      this.loadGoods(pageNum);
    },
    reset() {
      this.$router.push('/front/search');
      this.name = '';
      this.loadGoods(1);
    }
  }
}
</script>

<style scoped>
.goods-item {
  cursor: pointer;
}
</style>
