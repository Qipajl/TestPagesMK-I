<template>
  <div class="main vintage-login">
    <el-form
        ref="formRef"
        class="test-layout-login"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        v-bind="layout"
    >
      <el-tabs :active-key="formState.loginType" :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }">
        <h1 class="login-title">登录</h1>
        <el-alert v-if="isLoginError" type="error" show-icon style="margin-bottom: 24px" message="用户名或密码错误"/>

        <el-form-item required has-feedback name="username">
          <el-input v-model="formState.username" placeholder="用户名" size="large" autocomplete="off"
                    class="vintage-input"></el-input>
        </el-form-item>
        <el-form-item has-feedback name="password">
          <el-input
              v-model="formState.password"
              type="password"
              placeholder="密码"
              size="large"
              autocomplete="off"
              class="vintage-input"
          ></el-input>
        </el-form-item>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" size="large" :loading="loading" class="vintage-button" @click="handleFinish">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {computed, defineComponent, reactive, ref, toRaw} from "vue";
import {useUserStore} from "@/store/user.js";
import {validationRules} from "@/store/validation.js";

export default defineComponent({
  name: "Login",
  setup() {
    const loading = ref(false);
    const userStore = useUserStore();
    const formRef = ref();
    const formState = reactive({
      username: "admin",
      password: "123456"
    });

    const rules = {
      username: validationRules.usernameRule(),
      password: validationRules.passwordRule()
    };
    const layout = {
      labelCol: {span: 0},
      wrapperCol: {span: 24}
    };

    const handleFinish = async (values) => {
      console.log(values, formState);
      loading.value = true;
      try {
        await userStore.login(toRaw(formState));
      } finally {
        loading.value = false;
      }
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    const isLoginError = ref();

    return {
      loading,
      formState,
      formRef,
      rules,
      layout,
      handleFinish,
      handleFinishFailed,
      isLoginError
    };
  }
});
</script>

<style lang="less" scoped>
body {
  overflow: hidden; /* 隐藏溢出内容 */
}

.vintage-login {
  background-color: #f8f0e3; /* 淡复古背景 */
  border-radius: 5px; /* 小圆角 */
  padding: 15px; /* 内边距 */
  max-width: 100%; /* 最大宽度为100% */
  width: 100%; /* 设置宽度为100% */
  margin: 50px auto; /* 居中 */
  font-family: 'Courier New', Courier, monospace; /* 复古字体 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影 */

  .login-title {
    text-align: center;
    font-size: 24px; /* 大标题 */
    color: #6d4c41; /* 标题颜色 */
    margin-bottom: 20px; /* 下边距 */
  }

  .vintage-input {
    border: none; /* 去掉边框 */
    padding: 10px; /* 内边距 */
    font-family: 'Courier New', Courier, monospace; /* 复古字体 */
    margin-bottom: 15px; /* 下边距 */

    &:focus {
      outline: none; /* 去掉聚焦时的边框 */
    }
  }

  .vintage-button {
    background-color: #6d4c41; /* 暗棕色 */
    border: none; /* 去掉边框 */
    color: white; /* 按钮字体颜色 */
    width: 100%; /* 全宽按钮 */
    padding: 15px; /* 内边距 */
    font-weight: bold; /* 加粗 */

    &:hover {
      background-color: #7b5b4f; /* 悬停时变色 */
    }
  }
}


</style>