<script setup>

</script>

<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="login-container flex-center">
      <div class="user-layout-content">
        <div class="top flex flex-col items-center justify-center">
          <div class="header flex flex-row items-center">
            <!--<img src="" class="logo" alt="logo" />-->
            <span class="title">管理系统</span>
          </div>
          <div class="desc">管理系统</div>
        </div>

        <router-view/> <!-- 动态渲染子组件 -->

        <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">Copyright &copy; 2024 Greper</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
html, body {
  //height: 100%; // 设置html和body的高度为100%
  margin: 0; // 去掉默认外边距
  padding: 0;
  overflow: hidden; // 隐藏滚动条
}

//* {
//  box-sizing: border-box; // 设置盒模型
//}

#userLayout.user-layout-wrapper {
  height: 100%; // 设置为视口高度
  //overflow: hidden; // 隐藏滚动条

  //&.mobile {
  //  .container {
  //    .main {
  //      max-width: 368px;
  //      width: 98%;
  //    }
  //  }
  //}

  .login-container {
    width: 100%;
    min-height: 98vh; // 设置为视口高度
    background: #f0f2f5 url(@/assets/background.svg) no-repeat center;
    background-size: 100%; // 背景图覆盖整个容器
    position: relative;
    overflow: hidden; // 隐藏滚动条

    .user-layout-content {
      padding: 32px 0 24px; // 适当内边距
      //overflow: hidden; /* 确保隐藏滚动条 */

      .top {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .header {
          //position: relative;
          height: 44px;
          line-height: 44px;

          //.badge {
          //  position: absolute;
          //  display: inline-block;
          //  line-height: 1;
          //  vertical-align: middle;
          //  margin-left: -12px;
          //  margin-top: -10px;
          //  opacity: 0.8;
          //}

          .logo {
            height: 44px;
            margin-right: 16px;
          }

          .title {
            font-size: 36px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Avenir, "Helvetica Neue", Arial, sans-serif;
            font-weight: 700;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0px 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }

            &:hover {
              color: #1890ff;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>