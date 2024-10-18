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
          <router-link class="login-link" to="/login">登录❤</router-link>
          <h2 class="active-title">注册❤</h2>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef" class="custom-form">
          <el-form-item prop="username" class="custom-form-item">
            <el-input size="large" prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username" class="input-animation"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="custom-form-item">
            <el-input size="large" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password v-model="form.password" class="input-animation"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" class="custom-form-item">
            <el-input size="large" prefix-icon="el-icon-lock" placeholder="请确认密码" show-password v-model="form.confirmPassword" class="input-animation"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="register-button" @click="register">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const validatePassword = (rule, confirmPass, callback) => {
      if (confirmPass === '') {
        callback(new Error('请确认密码'));
      } else if (confirmPass !== this.form.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    return {
      form: { role: 'USER' },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [{ validator: validatePassword, trigger: 'blur' }]
      }
    };
  },
  methods: {
    register() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.$request.post('/register', this.form).then(res => {
            if (res.code === '200') {
              this.$router.push('/login');
              this.$message.success('注册成功');
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

.login-link {
  color: #2a60c9; /* 蓝色 */
  font-size: 18px;
  transition: color 0.3s;
}

.login-link:hover {
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

.register-button {
  width: 100%;
  background: linear-gradient(to right, #1e90ff, #32cd32) !important; /* 高端渐变按钮 */
  border: none !important; /* 覆盖 Element UI 默认边框 */
  color: white !important; /* 覆盖 Element UI 默认文本颜色 */
  transition: background-color 0.3s, transform 0.2s;
}

.register-button:hover {
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
