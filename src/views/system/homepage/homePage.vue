<script setup>
import {useUserStore} from "@/store/user.js";
// 获取用户状态
const userStore = useUserStore();
const username = userStore.getUserInfo.username;
console.log('HP',userStore.getUserInfo)
</script>

<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__title">
      <div class="title-line">
        仓库管理系统
      </div>
    </div>
    <div class="exampleBox">
      <div class="title-line">
        你好，{{username}}
      </div>
    </div>
    <div class="footer_box">
      <div class="">
        <div>Copyright ©2024 None</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.d2-page-cover {
  border: rgba(0,0,0,0.7) 10px;
  display: flex;
  margin-top: 100px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .d2-page-cover__title{
    .title-line{
      font-size: 150px;
    }
  }

  .exampleBox {
    display: flex;
    height: 300px;
    align-items: center;
    margin: auto;
    justify-content: center;
    .title-line{
      font-size: 100px;
    }
  }

  .footer_box {
    position: fixed; /* 固定定位 */
    bottom: 0;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>