<template>
  <div class="container">
    <div class="image-section">
      <img src="@/assets/imgs/bg.jpg" alt="" class="background-image" />
      <div class="overlay"></div>
    </div>
    <div class="form-section">
      <div class="form-container">
        <div class="header">
          <img src="@/assets/imgs/logo1.png" alt="Logo" class="logo" />
          <span class="title">二手交易网❤</span>
        </div>
        <div class="form-title">
          <h2 class="active-title">登录❤</h2>
          <router-link class="register-link" to="/register">注册❤</router-link>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef" class="custom-form">
          <el-form-item prop="username" class="custom-form-item">
            <el-input size="large" prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username" class="input-animation"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="custom-form-item">
            <el-input size="large" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password v-model="form.password" class="input-animation"></el-input>
          </el-form-item>
          <el-form-item prop="role" class="custom-form-item">
            <el-select v-model="form.role" class="role-select">
              <el-option label="管理员" value="ADMIN"></el-option>
              <el-option label="用户" value="USER"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="login-button" @click="login">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: { role: 'ADMIN' },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.$request.post('/login', this.form).then(res => {
            if (res.code === '200') {
              localStorage.setItem("xm-user", JSON.stringify(res.data));
              this.$router.push(res.data.role === 'ADMIN' ? '/home' : '/front/home');
              this.$message.success('登录成功');
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  display: flex;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
}

.image-section {
  width: 50%;
  position: relative;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e90ff, #32cd32); /* 高端蓝绿色渐变 */
  padding: 20px;
  position: relative;
}

.form-container {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-30px);
  opacity: 0;
  animation: fadeInUp 0.6s forwards;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  margin-right: 10px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.form-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.active-title {
  border-bottom: 2px solid #1e90ff; /* 活动标题下划线 */
  padding-bottom: 10px;
  color: #1e90ff; /* 蓝色 */
  font-size: 24px;
}

.register-link {
  color: #2a60c9;
  font-size: 18px;
  transition: color 0.3s;
}

.register-link:hover {
  color: #1e90ff; /* 鼠标悬停时颜色变化 */
}

.custom-form .el-form-item {
  margin-bottom: 20px !important; /* 覆盖 Element UI 默认样式 */
}

.input-animation {
  transition: all 0.3s ease;
}

.input-animation:focus {
  border-color: #1e90ff !important; /* 覆盖 Element UI 默认聚焦颜色 */
  box-shadow: 0 0 5px rgba(30, 144, 255, 0.5) !important; /* 覆盖 Element UI 默认阴影 */
}

.role-select {
  width: 100%;
  transition: border-color 0.3s !important; /* 覆盖 Element UI 默认样式 */
}

.login-button {
  width: 100%;
  background: linear-gradient(to right, #1e90ff, #32cd32) !important; /* 高端渐变按钮 */
  border: none !important; /* 覆盖 Element UI 默认边框 */
  color: white !important; /* 覆盖 Element UI 默认文本颜色 */
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover {
  background: linear-gradient(to right, #32cd32, #1e90ff) !important; /* 渐变按钮 hover */
  transform: scale(1.05);
}

@keyframes fadeInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
