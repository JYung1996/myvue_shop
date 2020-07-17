<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef1"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-lock"
            v-model="loginForm.password"
            type="password"
            @keyup.enter.native="submitForm('loginFormRef1')"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginFormRef1')">登录</el-button>
          <el-button type="info" @click="resetForm('loginFormRef1')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log('submit')

          // es6解构赋值  await语法糖，会阻塞代码执行  async解决该问题
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status != 200) {
            this.$message.error('用户名或密码错误')
          } else {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            // console.log(res.data.token)
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>

// scoped 标识：作用域 仅在当前组件中生效
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0, 100px, 10px, #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
}
</style>