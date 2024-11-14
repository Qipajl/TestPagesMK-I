<template>
  <div class="top-container" ref="noSelectElement">
    <div class="test-info">
      <div class="avatar">
        <el-dropdown>
          <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="User" @click="$router.push('/home')">首页</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" @click="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import {SwitchButton, User} from '@element-plus/icons-vue';
import router from "@/router/router.js";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/user.js";
import {useResourceStore} from "@/store/resource.js";

// 获取资源存储中的侧边菜单数据
const resourceStore = useResourceStore()
const asideMenu = resourceStore.asideMenu
const itemMenu = resourceStore.itemMenu

// 加载用户信息
const store = useUserStore()
const userLogout = () => {
  store.logout(); // 调用注销方法
  ElMessage.success("退出登录成功");
};

const userInfo = computed(() => store.getUserInfo); // 使用计算属性获取用户信息

const noSelectElement = ref(null);

onMounted(() => {
  // 禁用右键菜单和微型菜单，只针对特定元素
  const element = noSelectElement.value;

  // 禁用右键菜单
  const disableContextMenu = (e) => {
    e.preventDefault();
  };

  // 禁用左键点击选择的微型菜单
  const disableMouseDown = (e) => {
    if (e.button === 0) { // 只针对左键点击
      e.preventDefault();
    }
  };

  // 添加事件监听器到指定元素
  element.addEventListener('contextmenu', disableContextMenu);
  element.addEventListener('mousedown', disableMouseDown);
});

onBeforeUnmount(() => {
  // 清理事件监听器，防止内存泄漏
  const element = noSelectElement.value;
  element.removeEventListener('contextmenu', disableContextMenu);
  element.removeEventListener('mousedown', disableMouseDown);
});
</script>


<style lang="less" scoped>
.top-container {
  width: 100%;
  height: 100%;
  justify-content: space-between;

  .test-info {

    .avatar {
      margin-top: -12px;
      float: right;
      user-select: none;

      :focus {
        outline: none;
      }

      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>
