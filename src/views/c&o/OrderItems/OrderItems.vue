<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding"/>
  </fs-page>
</template>

<script>
import {defineComponent, onMounted, watch} from "vue";
import {useFs} from "@fast-crud/fast-crud";
import {useRoute} from "vue-router";
import createCrudOptions from "./OrderItems.js"

// 组件定义
export default defineComponent({
  name: "OrderItemsCrud",
  setup() {
    const {crudRef, crudBinding, crudExpose} = useFs({createCrudOptions});
    const route = useRoute();
    // 监视路由变化,并刷新
    watch(route, () => {
      crudExpose.doRefresh();
    });
    onMounted(() => {
      crudExpose.doRefresh();
    });
    return {
      crudBinding,
      crudRef
    };
  }
});
</script>