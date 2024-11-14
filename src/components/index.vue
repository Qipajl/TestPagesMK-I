<script setup>
import TopBanner from "@/layout/home/TopBanner.vue"
import NavigationBar from "@/layout/home/NavigationBar.vue"
</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <!--侧边栏-->
      <el-aside class="aside">
        <NavigationBar></NavigationBar>
      </el-aside>

      <el-container class="main-body">
        <!--顶栏-->
        <el-header class="top-banner">
          <TopBanner></TopBanner>
        </el-header>
        <!--内容页面-->
        <el-main class="main">
          <el-scrollbar>
            <router-view v-slot="{ Component }">
              <transition mode="out-in" name="el-fade-in-linear">
                <keep-alive>
                  <component :is="Component" style="height: 100%"></component>
                </keep-alive>
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="less" scoped>
.common-layout {
  height: 100%;
  padding-top: 15px;

  .container {
    height: 100vh;

    .aside {
      width: 15%;
    }

    .main-body {

      .top-banner {
        height: 35px;
        border-bottom: 1px solid var(--el-border-color);
      }

      .main {
        padding: 0;
      }
    }
  }
}
</style>
