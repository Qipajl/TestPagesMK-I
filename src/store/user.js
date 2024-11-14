import {defineStore} from "pinia";
import {store} from "./index.js";
import router from "@/router/router.js";
import {UserApi} from "@/libs/axios.js";

// 用户状态接口
const USER_INFO_KEY = "USER_INFO";
const TOKEN_KEY = "TOKEN";

// 定义用户状态存储
export const useUserStore = defineStore({
    id: "app.user",
    state: () => ({
        // 用户信息
        userInfo: null
    }),
    getters: {
        getUserInfo() {
            // 获取用户信息，优先从状态中获取，如果没有则从本地存储获取
            return this.userInfo ? this.userInfo : this.getFromLocalStorage(USER_INFO_KEY) || {};
        }
    },
    actions: {
        // 设置用户信息并保存到本地存储
        setUserInfo(info) {
            this.userInfo = info;
            this.setToLocalStorage(USER_INFO_KEY, info);
        },
        // 重置状态
        resetState() {
            this.userInfo = null;
            this.removeFromLocalStorage(USER_INFO_KEY);
        },
        /**
         * @description: 登录
         */
        async login(params) {
            try {
                // 调用 API 登录，后端会在 cookie 中设置 token
                await UserApi.login(params);

                // 获取用户信息
                const userInfo = await this.getUserInfoAction();
                await router.replace("/main"); // 重定向到主页
                return userInfo; // 返回用户信息
            } catch (error) {
                console.error("登录失败:", error);
                console.log('登录失败时cookie', document.cookie);
                return null; // 登录失败返回 null
            }
        },
        async getUserInfoAction() {
            // 获取用户信息并保存
            const response = await UserApi.mine();
            const userInfo = response.data; // 提取用户信息
            this.setUserInfo(userInfo); // 保存用户信息
            console.log('getUserInfoAction', userInfo, response)
            return userInfo;
        },
        /**
         * @description: 注销
         */
        async logout(goLogin = true) {
            this.resetState();
            if (goLogin) {
                await router.push("/login");
            }
            // 刷新页面
            location.reload();
        },
        // 本地存储相关方法
        setToLocalStorage(key, value, expire) {
            localStorage.setItem(key, JSON.stringify(value));
            // 可选：处理过期逻辑
        },
        getFromLocalStorage(key) {
            const item = localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);
                return parsedItem; // 返回保存的值
            }
            return null; // 如果没有找到则返回 null
        },
        removeFromLocalStorage(key) {
            localStorage.removeItem(key);
        },
    },
});

export function useUserStoreWidthOut() {
    return useUserStore(store);
}
