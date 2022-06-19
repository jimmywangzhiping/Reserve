<template>
  <div class="container" :style="setSize()">
    <div class="content">
      <el-card shadow="hover">
        <el-form
          ref="account"
          :rules="rules"
          :model="account"
          style="margin-top: 25px"
        >
          <el-form-item label="账号" prop="userName">
            <el-input v-model="account.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="account.password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="userLogin">登录</el-button>
            <el-button type="success" @click="userRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
import { setToken } from '../utils/token'
export default {
  name: "login",
  data() {
    return {
      account: {},
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 注册
    userRegister() {
      this.$router.push("/register");
    },
    // 登录
    userLogin() {
      this.$refs.account.validate((valid) => {
        if (valid) {
          const params = {
            userName: this.account.userName,
            password: this.account.password,
          };
          login(params).then((res) => {
            if (res.data && res.data.code === 200) {
              setToken('token', res.data.data.token);
               if (res.data.data.errorCode === 200) {
                switch(res.data.data.role){
                  case 'guest':
                    this.$router.push('/visitor')
                    break;
                  case 'admin':
                    this.$router.push('/employee')
                    break;
                }
              } else {
                this.$message.error(res.data.data.message);
              }
            } else {
              this.$message.error(res.data);
            }
          });
        }
      });
    },
    setSize() {
      return {
        height: window.innerHeight + "px",
        width: window.innerWidth + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.content {
  width: 25vw;
  height: 25vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.el-input {
  width: 80%;
}
</style>