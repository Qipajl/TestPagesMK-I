<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding"/>
  </fs-page>
</template>

<script>
import {defineComponent, onMounted} from "vue";
import createCrudOptions from "./Orders.js"
import {useFs} from "@fast-crud/fast-crud";

// 组件定义
export default defineComponent({
  name: "OrderCrud",
  setup() {
    const {crudRef, crudBinding, crudExpose} = useFs({createCrudOptions});
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