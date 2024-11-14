<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding"/>
  </fs-page>
</template>

<script>
import {defineComponent, onMounted} from "vue";
import {useFs} from "@fast-crud/fast-crud";
import createCrudOptions from "./Customers.js"

// 组件定义
export default defineComponent({
  name: "CustomerCrud",
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
