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
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="account.repassword"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input type="text" v-model="account.mobile"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="success" @click="userRegister">注册</el-button>
            <el-button type="primary" @click="userLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/index.js";
export default {
  name: "register",
  data() {
    return {
      account: {},
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 注册
    userRegister() {
      this.$refs.account.validate((valid) => {
        if (this.account.password !== this.account.repassword) {
          this.$message.error("两次密码不一致");
          return;
        }
        if (valid) {
          const params = {
            userName: this.account.userName,
            password: this.account.password,
            mobile: this.account.mobile,
          };
          register(params).then((res) => {
            if (res.data && res.data.code == 200) {
              if (res.data.data.errorCode === 200) {
                this.$message.success("注册成功！");
              } else {
                this.$message.error(res.data.data.message);
              }
            } else {
              this.$message.error(res.data.data.message);
            }
          });
        }
      });
    },
    userLogin() {
        this.$router.push("/login");
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
  width: 40vw;
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