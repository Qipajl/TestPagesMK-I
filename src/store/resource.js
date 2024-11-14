// store/resource.js (如果使用 Pinia 或 Vuex)
import {defineStore} from 'pinia';

export const useResourceStore = defineStore('resource', {
    state: () => ({
        asideMenu: [],
        itemMenu: []
    }),
    actions: {
        quantities: null,
        setItemMenuByCurrentRoute(menuItems) {
            // 更新 asideMenu，menuItems 是一个包含主菜单和子菜单的数组
            this.itemMenu = menuItems;
        },

        // 设置动态更新侧边菜单
        setAsideMenuByCurrentRoute(menuItems) {
            // 更新 asideMenu，menuItems 是一个包含主菜单和子菜单的数组
            this.asideMenu = menuItems;
        },
    },
});
