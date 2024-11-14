import {createRouter, createWebHistory} from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {useResourceStore} from "@/store/resource";
import {useUserStore} from "@/store/user";

const routes = [
    {
        title: "框架1",
        path: '/',
        component: () => import('@/components/OutSite.vue'),
        children: [
            {path: '', redirect: {name: 'login'}}, // 默认重定向到登录
            // 登录页面路由
            {
                title: "登录",
                path: 'login',
                name: 'login',
                component: () => import('@/views/system/login/Login.vue'),
                meta: {auth: false}, // 不需要授权
            }
        ]
    },
    {
        title: "框架2",
        path: '/main',
        redirect: '/index',
        name: 'welcome',
        component: () => import('@/components/index.vue'),
        meta: {auth: true},
        children: [
            {
                title: "首页",
                path: '/index',
                component: () => import('@/views/system/homepage/homePage.vue'),
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    auth: true
                }
            },
            {
                title: " 员工信息管理",
                path: '/workerInfo',
                component: () => import('@/views/staff/Employees/Employees.vue'),
                meta: {
                    subMenu: '人员管理',
                    subIcon: '',
                    title: " 人员信息管理",
                    icon: 'ChatLineRound',
                    role: 'ADMIN',
                    auth: true
                }
            },
            {
                title: "员工考勤管理",
                path: '/workerAttendance',
                component: () => import('@/views/staff/Attendance/Attendance.vue'),
                meta: {
                    subMenu: '人员管理',
                    subIcon: '',
                    title: "人员考勤管理",
                    icon: 'ChatLineRound',
                    role: 'ADMIN',
                    auth: true
                }
            },
            {
                title: "商品表 (Products)",
                path: '/products',
                component: () => import('@/views/commodity/Products/Products.vue'),
                meta: {
                    subMenu: '资产信息与采购管理',
                    subIcon: '',
                    title: "资产信息",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "分类表 (Categories)",
                path: '/categories',
                component: () => import('@/views/commodity/Categories/Categories.vue'),
                meta: {
                    subMenu: '资产信息与采购管理',
                    subIcon: '',
                    title: "资产分类",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "客户表 (Customers)",
                path: '/customers',
                component: () => import('@/views/c&o/Customers/Customers.vue'),
                meta: {
                    subMenu: '部门与资产记录管理',
                    subIcon: '',
                    title: "部门管理",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "订单表 (Orders)",
                path: '/orders',
                component: () => import('@/views/c&o/Orders/Orders.vue'),
                meta: {
                    subMenu: '部门与资产记录管理',
                    subIcon: '',
                    title: "资产记录",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "订单明细表 (Order_Items)",
                path: '/orderItems',
                component: () => import('@/views/c&o/OrderItems/OrderItems.vue'),
                meta: {
                    subMenu: '部门与资产记录管理',
                    subIcon: '',
                    title: "资产明细",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "退货表 (Returns)",
                path: '/returns',
                component: () => import('@/views/c&o/Returns/Returns.vue'),
                meta: {
                    subMenu: '部门与资产记录管理',
                    subIcon: '',
                    title: "折损管理",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "供应商表 (Suppliers)",
                path: '/suppliers',
                component: () => import('@/views/commodity/Suppliers/Suppliers.vue'),
                meta: {
                    subMenu: '采购管理',
                    subIcon: '',
                    title: "采购商管理",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "库存记录表 (Inventory_Transactions)",
                path: '/inventoryTransactions',
                component: () => import('@/views/inventory/InventoryTransactions/InventoryTransactions.vue'),
                meta: {
                    subMenu: '采购管理',
                    subIcon: '',
                    title: "采购记录",
                    icon: 'ChatLineRound',
                    auth: true
                }
            },
            {
                title: "AI",
                path: '/ai',
                component: () => import('@/views/system/ai/ai.vue'),
                meta: {
                    subIcon: '',
                    title: "AI",
                    icon: 'Search',
                    auth: true
                }
            }
        ]
    },
    // 添加 404 页面路由
    {
        path: '/:catchAll(.*)', // 捕获所有未定义的路径
        name: 'NotFound',
        component: () => import('@/views/system/error/404.vue'),
        auth: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/**
 * 路由拦截
 */
router.beforeEach(async (to, from, next) => {
    NProgress.start(); // 开始进度条

    // 检查目标路由是否需要认证
    if (to.matched.some((r) => r.meta?.auth || r.meta?.permission)) {
        // 从 cookie 中检查用户是否已登录
        const userStore = useUserStore();
        const userRole = userStore.getUserInfo.role; // 获取用户信息

        // 如果用户已登录
        if (userRole) {
            // 检查用户角色是否允许访问该路由
            if (to.meta.role && to.meta.role !== userRole) {
                // 如果角色不匹配，重定向到403页面或其他页面
                return next({name: "403"});
            }
            next(); // 用户已登录且角色匹配，继续路由
        } else {
            // 如果用户未登录，重定向到登录页面，并携带原目标路由作为重定向参数
            next({name: "login", query: {redirect: to.fullPath}});
            NProgress.done(); // 结束进度条
        }
    } else {
        // 对于不需要认证的路由，直接放行
        next();
    }
});

// 路由跳转后执行的逻辑
router.afterEach((to) => {
    NProgress.done(); // 结束进度条

    const userStore = useUserStore();
    const userRole = userStore.getUserInfo.role; // 获取用户信息
    const resourceStore = useResourceStore();

    // 设置页面标题，若无定义则使用默认标题
    document.title = to.meta.title || '默认标题';

    const matched = to.matched; // 获取匹配的路由记录

    // 动态更新侧边菜单（根据角色权限过滤）
    if (matched.length > 0) {
        // 创建一个空对象，用来存储按主菜单分组后的菜单项
        const menuGroups = {};

        let menus = [];

        // 遍历所有路由并根据角色权限过滤
        router.getRoutes().forEach(route => {
            const meta = route.meta;

            // 如果路由没有设置 subMenu 或角色限制，则跳过
            if (['/login', '/register', '/', '/main', '/:catchAll(.*)'].includes(route.path) || (meta?.role && meta.role !== userRole)) {
                return;
            }

            if (!meta?.subMenu) {
                const menu = {
                    mainPath: route.path,
                    mainTitle: meta.title,
                    mainIcon: meta.icon
                };
                menus.push(menu)
                return resourceStore.setItemMenuByCurrentRoute(Object.values(menus));
            }

            // 获取该路由所属的主菜单名称（subMenu 字段）
            const groupName = meta.subMenu;

            // 如果该主菜单还没有在 menuGroups 中创建，初始化一个主菜单
            if (!menuGroups[groupName]) {
                menuGroups[groupName] = {
                    title: groupName, // 主菜单的标题
                    icon: meta.subIcon,
                    items: [], // 子菜单项
                };
            }

            // 将当前路由作为子菜单项加入对应的主菜单
            menuGroups[groupName].items.push({
                path: route.path,
                title: meta.title,
                icon: meta.icon,
            });
        });

        // 将过滤后的菜单信息（根据角色）更新到资源存储中
        resourceStore.setAsideMenuByCurrentRoute(Object.values(menuGroups));
    }
});

// 处理路由错误
router.onError((error) => {
    console.error("Route Error:", error); // 在控制台输出错误信息
    NProgress.done(); // 结束进度条
});

export default router; // 导出路由实例
