<template>
    <div class="goods-item" @click="navigateToDetail">
      <img :src="img" alt="" class="goods-image" />
      <div class="goods-details">
        <div class="goods-name">{{ name }}</div>
        <div class="goods-info">
          <span class="goods-price">￥{{ price }}</span>
          <span class="goods-read">{{ readCount }}人浏览</span>
          <span class="goods-likes">{{ likesCount }}人点赞</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: Number,
      img: String,
      name: String,
      price: Number,
      readCount: Number,
      likesCount: Number,
    },
    methods: {
      navigateToDetail() {
        this.$router.push('/front/goodsDetail?id=' + this.id);
      },
    },
  }
  </script>
  
  <style scoped>
  .goods-item {
    cursor: pointer;
    max-width: 250px;
    margin: 10px;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.4s ease;
    position: relative;
    background-color: #f0f0f0; /* 浅灰色背景 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .goods-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(232, 236, 225, 0.8);
    background-image: radial-gradient(circle, rgba(169, 120, 120, 0.1) 20%, transparent 20%, transparent 80%, rgba(223, 223, 223, 0.1) 80%);
    background-size: 50px 50px;
    animation: particles 5s linear infinite; /* 动态颗粒动画 */
    border-radius: 12px; /* 保持与主容器的圆角一致 */
    z-index: 0; /* 在背景层 */
  }
  
  @keyframes particles {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px; /* 粒子动画移动 */
    }
  }
  
  .goods-item:hover {
    border: 2px solid #00bcd4; /* 选中时添加边框 */
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 188, 212, 0.5);
  }
  
  .goods-image {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease, filter 0.3s ease;
    position: relative;
    z-index: 1; /* 使图片位于顶部 */
  }
  
  .goods-item:hover .goods-image {
    transform: scale(1.1);
    filter: brightness(0.9);
  }
  
  .goods-details {
    padding: 12px;
    text-align: center;
    position: relative;
    z-index: 1; /* 使详情位于顶部 */
  }
  
  .goods-name {
    font-family: 'Roboto Mono', sans-serif; /* 使用高端字体 */
    font-size: 18px;
    font-weight: bold;
    color: #222; /* 深色字体 */
    margin-bottom: 5px;
    transition: color 0.3s ease;
  }
  
  .goods-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #777;
  }
  
  .goods-price {
    font-size: 20px;
    color: #e74c3c; /* 红色价格 */
    font-weight: bold;
  }
  </style>
  