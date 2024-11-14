import {createApp} from 'vue';
import './style.css'
import App from './App.vue';
import router from '@/router/router.js'
import axios from 'axios';
import {FastCrud} from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
import ui from "@fast-crud/ui-element";
import "dayjs/locale/zh-cn";
import ElementPlus from 'element-plus';
import "element-plus/dist/index.css";
import {createPinia} from 'pinia'
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(ElementPlus, {size: "default", locale: zhCn})

//createApp(App).mount('#app')
app.config.globalProperties.$axios = axios;

app.use(router)

// 先安装ui
app.use(ui);
//然后安装FastCrud
app.use(FastCrud, {
    commonOptions() {
        return {
            container: {
                is: "fs-layout-card"
            },
            actionbar: {
                buttons: {
                    add: {
                        text: null,
                        title: "添加",
                        icon: 'Plus',
                        type: "warning",
                        round: true
                    }
                }
            },
            toolbar: {
                columnsFilter: {
                    mode: "simple"
                },
                buttons: {
                    search: {show: true},
                    refresh: {show: false},
                    compact: {show: false},
                    export: {show: true},
                    columns: {show: true}
                }
            },
            search: {
                show: false
            },
            rowHandle: {
                width: 175,
                align: 'center',
                buttons: {
                    view: {
                        text: null,
                        title: "查看",
                        icon: "View",
                        type: "info",
                        round: true
                    },
                    edit: {
                        text: null,
                        title: "编辑",
                        icon: "Edit",
                        round: true
                    },
                    remove: {
                        text: null,
                        title: "删除",
                        icon: "Delete",
                        round: true
                    }
                }
            }
        }
    },
});
// app.use(FastCrud, {
//     //i18n, //i18n配置，可选，默认使用中文，具体用法请看demo里的 src/i18n/index.js 文件
//     // 此处配置公共的dictRequest（字典请求）
//     async dictRequest({ dict }) {
//         return await request({ url: dict.url }); //根据dict的url，异步返回一个字典数组
//     },
//     //公共crud配置
//     commonOptions() {
//         return {
//             request: {
//                 //接口请求配置
//                 //你项目后台接口大概率与fast-crud所需要的返回结构不一致，所以需要配置此项
//                 //请参考文档http://fast-crud.docmirror.cn/api/crud-options/request.html
//                 transformQuery: ({ page, form, sort }) => {
//                     //转换为你pageRequest所需要的请求参数结构
//                     return { page, form, sort };
//                 },
//                 transformRes: ({pageNum,pageSize}) => {
//                     //将pageRequest的返回数据，转换为fast-crud所需要的格式
//                     //return {records,currentPage,pageSize,total};
//                     return { currentPage:pageNum ,pageSize:pageSize }
//                 }
//             },
//             //你可以在此处配置你的其他crudOptions公共配置
//         };
//     },
// });

app.mount('#app')