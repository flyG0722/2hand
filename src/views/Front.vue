<template>
  <div class="container">
    <!-- 头部 -->
    <header class="header">
      <a href="/front/home" class="logo">
        <img src="@/assets/imgs/logo.png" alt="Logo" />
        <div class="title">二手交易网</div>
      </a>
      <nav class="navigation">
        <div 
          class="menu" 
          v-for="item in menus" 
          :key="item.path" 
          @click="$router.push(item.path)" 
          :class="{'menu-active': item.path === $route.path}"
        >
          {{ item.text }}
        </div>
      </nav>
      <div class="header-right">
        <span 
          @click="$router.push('/front/chat')" 
          class="chat-icon"
        >
          <i class="el-icon-chat-dot-round"></i> 聊天消息
        </span>
        <div v-if="!user.username">
          <el-button class="auth-button" @click="$router.push('/login')">登录</el-button>
          <el-button class="auth-button" @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown>
            <div class="user-dropdown">
              <img :src="user.avatar" alt="" class="avatar" />
              <span class="username">{{ user.name }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="$router.push('/front/orders')">我的订单</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/goods')">我的商品</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/userPosts')">我的发帖</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/userHelp')">我的求购</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/userFeedback')">我的反馈</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/address')">我的地址</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/person')">个人信息</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/collect')">我的收藏</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <!-- 主体 -->
    <main class="main-body">
      <router-view ref="child" @update:user="updateUser" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: "FrontLayout",
  components: {
    Footer
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("xm-user") || '{}'),
      menus: [
        { text: '热卖专区', path: '/front/home' },
        { text: '社区广场', path: '/front/posts' },
        { text: '求购专区', path: '/front/help' },
        { text: '系统公告', path: '/front/notice' },
        { text: '留言反馈', path: '/front/feedback' },
      ]
    };
  },
  methods: {
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('xm-user') || '{}'); // 重新获取用户信息
    },
    logout() {
      localStorage.removeItem("xm-user");
      this.$router.push("/login");
    },
  }
}
</script>

<style scoped>
@import "@/assets/css/front.css";

.container {
  background: linear-gradient(135deg, #2c3e50, #bdc3c7);
  animation: backgroundAnimation 15s ease infinite;
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

@keyframes backgroundAnimation {
  0% { background-color: #2c3e50; }
  50% { background-color: #34495e; }
  100% { background-color: #2c3e50; }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.header:hover {
  transform: translateY(-2px);
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.navigation {
  display: flex;
}

.menu {
  color: #eee;
  font-size: 18px;
  padding: 0 20px;
  cursor: pointer;
  transition: color 0.3s, transform 0.2s;
}

.menu:hover {
  color: #ffa500;
  transform: scale(1.1);
}

.menu-active {
  color: #ffa500;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
}

.chat-icon {
  font-size: 16px;
  margin-right: 20px;
  cursor: pointer;
  color: #fff;
  transition: color 0.3s;
}

.chat-icon:hover {
  color: #ffa500;
}

.auth-button {
  margin-left: 10px;
  background-color: #ffa500;
  border: none;
  color: #fff;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #ff8c00;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar {
  border-radius: 50%;
  height: 35px;
  width: 35px;
  margin-right: 10px;
}

.username {
  color: #eee;
}

.main-body {
  flex-grow: 1;
  padding: 20px;
  background-color: rgba(44, 62, 80, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
}
</style>
