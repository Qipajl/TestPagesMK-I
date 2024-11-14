import axios from "axios";

const currentURL='https://frp-fun.top:59736/'

export const axios_api = axios.create(
    {
        baseURL: currentURL,
        timeout: 5000
    }
)

const AxiosInstance = axios.create({
    baseURL: currentURL, // 基础 URL，可根据需要进行配置
    timeout: 5000, // 请求超时时间
});

// 配置 axios 全局设置，以便每次请求自动携带 cookie
axios.defaults.withCredentials = true;

export const getRequest = (url, params = {}, config = {withCredentials: true}) => {
    return AxiosInstance.get(url, {
        params, // 通过 params 传递 URL 查询参数
        ...config
    });
};

export const postRequest = (url, data, config = {withCredentials: true}) => {
    return AxiosInstance.post(url, data, config).then(response => response.data);
};

export const putRequest = (url, data, config = {withCredentials: true}) => {
    return AxiosInstance.put(url, data, {
        ...config,
    });
};

export const deleteRequest = (url, data, config = {withCredentials: true}) => {
    return AxiosInstance.delete(url, {
        data,
        ...config,
    });
};

export const UserApi = {
    /**
     * 登录方法
     * @param {Object} params 包含用户名和密码的对象
     * @returns {Promise} 返回用户信息和令牌
     */
    async login(params) {
        /*return postRequest('/user/login', params, { withCredentials: true }).then(data => {
            return data;
        });*/
        const data = await postRequest('/user/login', params);
        return data;
    },

    /**
     * 获取用户信息
     * @returns {Promise} 返回用户信息
     */
    async mine() {
        try {
            console.log('Sending request to /user/mine');
            console.log('mine处cookie', document.cookie);

            const response = await getRequest('/user/mine', {});  // 使用 await 简化代码
            console.log('Response data:', response);
            return response;  // 返回响应数据

        } catch (error) {
            console.log('Error fetching user data:', error);
            throw error;  // 可以抛出错误，供外部处理
        }
    },

    /**
     * 注册方法
     * @param {Object} params 包含用户名和密码的对象
     * @returns {Promise} 返回注册结果
     */
    async register(params) {
        console.log('axios.register:',params)
        return postRequest('/user/register', params); // 注册接口
    }
};