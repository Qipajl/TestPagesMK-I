<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding"/>
  </fs-page>
</template>

<script>
import {defineComponent, onMounted, watch} from "vue";
import {useFs} from "@fast-crud/fast-crud";
import createCrudOptions from "./Attendance.js"
import {useRoute} from "vue-router";
// 组件定义
export default defineComponent({
  name: "AttendanceCrud",
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
