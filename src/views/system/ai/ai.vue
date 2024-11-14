<template>
  <div class="ai-chat">
    <h1>AI 问答</h1>
    <input
        v-model="question"
        type="text"
        placeholder="请输入问题"
        @keyup.enter="askAi"
    />
    <button @click="askAi">提问</button>

    <div v-if="loading">正在向 AI 询问...</div>

    <div v-if="answer">
      <h3>AI 的回答：</h3>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {axios_api} from "@/libs/axios.js";

// 使用 `ref` 创建响应式变量
const question = ref("");   // 用于绑定输入框的内容
const answer = ref(null);   // 用于保存 AI 的回答
const loading = ref(false); // 用于表示是否正在加载

// 提问并获取 AI 回答的方法
const askAi = async () => {
  if (!question.value) {
    alert("请输入问题");
    return;
  }

  // 检查缓存中是否有相同的问题及其回答
  const cachedAnswer = localStorage.getItem(question.value);
  if (cachedAnswer) {
    answer.value = cachedAnswer;
    return;
  }

  // 启动加载状态
  loading.value = true;

  try {
    // 调用后端 API 获取 AI 的回答
    const response = await axios_api.get("/ask-ai", {
      params: {
        question: question.value,
      },
      withCredentials: true
    });

    // 获取 AI 的回答
    answer.value = response.data.result;
    // 将回答缓存到 localStorage 中
    localStorage.setItem(question.value, answer.value);
  } catch (error) {
    console.error("请求出错", error);
    answer.value = "出错了，请稍后再试！";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.ai-chat {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}

div {
  margin-top: 20px;
}
</style>