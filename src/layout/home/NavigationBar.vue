<template>
  <div class="nav-container">
    <div class="logo">
    </div>

    <el-menu
        :default-active="$route.path"
        class="menu"
        :router="true"
    >
      <el-menu-item
          v-for="item in itemMenu"
          :key="item.mainPath"
          :index="item.mainPath"
      >
        <el-icon>
          <component :is="item.mainIcon || 'HomeFilled'"/>
        </el-icon>
        <span>{{ item.mainTitle }}</span>
      </el-menu-item>

      <!-- 处理子菜单 -->
      <el-sub-menu
          v-for="(group, index) in asideMenu"
          :key="index"
          :index="group.title"
      >
        <template #title>
          <el-icon>
            <component :is="group.subIcon || 'HomeFilled'"/>
          </el-icon>
          {{ group.title }}
        </template>
        <el-menu-item
            v-for="(subItem, subIndex) in group.items"
            :key="subIndex"
            :index="subItem.path"
        >
          <el-icon>
            <component :is="subItem.icon || 'HomeFilled'"/>
          </el-icon>
          <span>{{ subItem.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import {useResourceStore} from '@/store/resource.js';

// 获取资源存储中的侧边菜单数据
const resourceStore = useResourceStore();
const asideMenu = resourceStore.asideMenu;
const itemMenu = resourceStore.itemMenu;
</script>

<style lang="less" scoped>
.nav-container {
  height: 100%;

  .logo {
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    width: 125px;
    //height: 100%;            /* 如果需要让 logo 占据父容器的高度 */
  }

  .menu {
    width: 100%;
    border: none;
  }
}

</style>
