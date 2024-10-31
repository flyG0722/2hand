<template>
  <div class="container">
    <div id="particles-js" class="background"></div> <!-- 粒子背景 -->
    <div class="form-container">
      <div class="header">
        <img src="@/assets/imgs/logo1.png" alt="Logo" class="logo" />
        <span class="title">二手交易网</span>
      </div>
      <div class="form-title">
        <h2 class="active-title">登录</h2>
        <router-link class="register-link" to="/register">注册</router-link>
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
</template>


<script>
import 'particles.js'; // 引入粒子动画库

export default {
  name: "Login",
  data() {
    return {
      form: { role: 'USER' },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    // 初始化粒子动画
    particlesJS('particles-js', {
      particles: {
        number: { 
          value: 150, // 增加粒子数量，使效果更丰富
          density: { enable: true, value_area: 800 } // 自动根据区域调整粒子密度
        },
        color: { value: ["#FFFF00", "#32CD32"] }, // 设为黄色与黄绿色的渐变组合
        shape: {
          type: ["circle", "polygon", "star"], // 使用多种形状：圆形、多边形、星星
          polygon: { sides: 5 } // 多边形的边数
        },
        opacity: {
          value: 0.8, // 粒子透明度设置为 80%
          random: true, // 使透明度随机化
          anim: { enable: true, speed: 2, opacity_min: 0.3 } // 动态变化的透明度
        },
        size: {
          value: 4, // 粒子初始大小
          random: true, // 随机粒子大小
          anim: { enable: true, speed: 5, size_min: 0.5 } // 动态缩放效果
        },
        line_linked: {
          enable: true, // 开启粒子连线效果
          distance: 180, // 粒子之间的最大连接距离
          color: "#ADFF2F", // 连线颜色设为黄绿色
          opacity: 0.5, 
          width: 1.5 // 连线粗细
        },
        move: {
          enable: true, // 开启粒子移动
          speed: 6, // 增加移动速度
          direction: "none", // 粒子无固定方向
          random: false, 
          straight: false, // 粒子运动路径为随机曲线
          out_mode: "bounce", // 粒子碰撞边缘后反弹
          attract: { enable: true, rotateX: 600, rotateY: 1200 } // 粒子间具有吸引力
        }
      },
      interactivity: {
        detect_on: "canvas", // 交互效果在画布上检测
        events: {
          onhover: { enable: true, mode: "repulse" }, // 鼠标悬停时粒子远离
          onclick: { enable: true, mode: "push" }, // 点击时生成更多粒子
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.5 }, // 鼠标悬停的排斥效果
          push: { particles_nb: 4 } // 每次点击新增 4 个粒子
        }
      },
      retina_detect: true // 支持 Retina 显示器
    });

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
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.input-animation:focus {
  border-color: #00BFFF;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.6);
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
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #000; /* 背景为黑色 */
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.form-container {
  z-index: 2;
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.2); /* 半透明白色背景 */
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  margin-right: 10px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color:#fff;
}

.active-title {
  border-bottom: 2px solid #1e90ff;
  padding-bottom: 10px;
  color: #1e90ff;
  font-size: 24px;
}

.register-link {
  color: #2a60c9;
  font-size: 18px;
  transition: color 0.3s;
}

.register-link:hover {
  color: #1e90ff;
}

.login-button {
  width: 100%;
  background: linear-gradient(to right, #1e90ff, #32cd32);
  border: none;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover {
  background: linear-gradient(to right, #32cd32, #1e90ff);
  transform: scale(1.05);
}

.container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #000; /* 背景为黑色 */
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.form-container {
  z-index: 2;
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.2); /* 半透明白色 */
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  text-align: center;
}


.register-link {
  color: #00ff7f; /* 明亮的绿色 */
}

.custom-form .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.login-button {
  width: 100%;
  background: linear-gradient(to right, #1e90ff, #32cd32);
  color: white; /* 确保文字清晰可见 */
  transition: background 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background: linear-gradient(to right, #32cd32, #1e90ff);
  transform: scale(1.05);
}

</style>
