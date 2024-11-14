import {dict} from "@fast-crud/fast-crud";
import {deleteRequest, getRequest, postRequest, putRequest} from "@/libs/axios.js";
import {validationRules} from "@/store/validation.js";

// CRUD 配置
export default function ({crudOptions}) {
    const transformQuery = ({page, form, sort}) => {
        const order = sort == null ? {} : {orderProp: sort.prop, orderAsc: sort.asc};
        return {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            orderItemsBo: {
                ...form
            },
            ...order
        };
    };

    const transformRes = ({res}) => {
        return {
            total: res.total,
            records: res.rows
        };
    };

    const pageRequest = async (query) => {
        return await postRequest('/orderItems/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.orderItemId = row.orderItemId;
        await putRequest('/orderItems/addOrUpdate', form);
        const productsData = {
            productId: form.productId,
            stockQuantity: -form.quantity - row.quantity
        };
        return await postRequest('/products/update', productsData);
    };

    const delRequest = async ({row}) => {
        await deleteRequest('/orderItems/delete', {id: row.orderItemId});

        // 添加到 ReturnsCrud
        const returnData = {
            productId: row.productId, // 确保有正确的字段名称
            orderId: row.orderId,     // 确保有正确的字段名称
            quantity: row.quantity      // 确保有正确的字段名称
        };

        // 调用另一个文件中的添加请求
        return await putRequest('/returns/addOrUpdate', returnData);
    };

    const addRequest = async ({form}) => {
        return await putRequest('/orderItems/addOrUpdate', form);
    };

    return {
        crudOptions: {
            request: {
                transformQuery,
                transformRes,
                pageRequest,
                addRequest,
                editRequest,
                delRequest
            },
            pagination: {
                pageSize: 10,
                pageNum: 1
            },
            actionbar: {
                buttons: {
                    add: {
                        show: false
                    }
                }
            },
            form: {
                watch({form}) {
                    // 监控 quantity 和 unitPrice 的变化
                    form.totalPrice = form.quantity * form.unitPrice; // 实时计算总价
                },
            },
            rowHandle: {
                width: 125,
                buttons: {remove: {show: false}},
            },
            columns: {
                orderItemId: {
                    column: {show: false},
                    title: "明细ID",
                    key: "order_item_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                orderId: {
                    column: {
                        minWidth: 45,
                        align: "center",
                    },
                    title: "部门名称",
                    type: "dict-select",
                    search: {show: true},
                    form: {},
                    editForm: {component: {disabled: true}},
                    dict: dict({
                        value: "orderId",  // 设置字典的值字段
                        label: "customerName",  // 设置字典的标签字段
                        getData: async (dict) => {
                            try {
                                // 使用 Promise.all 并行请求两个 URL 的数据
                                const [response1, response2] = await Promise.all([
                                    getRequest('/orders/list'),  // 获取订单列表数据
                                    getRequest('/customers/list')  // 获取客户列表数据
                                ]);

                                // 确保响应数据存在并且是数组，如果不存在则使用空数组
                                const data1 = Array.isArray(response1.data) ? response1.data : [];  // 订单数据
                                const data2 = Array.isArray(response2.data) ? response2.data : [];  // 客户数据

                                // 将客户数据转换为一个映射，提升查找性能
                                const data2Map = new Map(data2.map(item2 => [item2.customerId, item2.customerName]));

                                // 使用 map 遍历订单数据并查找对应的客户数据
                                const combinedData = data1.map(item1 => {
                                    // 从 data2Map 中快速查找对应的客户名字
                                    const customerName = data2Map.get(item1.customerId) || "未知客户";  // 默认值为 "未知客户"

                                    // 返回合并后的数据结构
                                    return {
                                        orderId: item1.orderId,  // 订单ID
                                        customerName: customerName  // 客户名称
                                    };
                                });

                                // 返回合并后的数据
                                return combinedData;

                            } catch (error) {
                                // 捕获异常，输出错误信息并返回空数组
                                console.error("获取字典数据失败:", error);
                                return [];  // 出现错误时返回空数组
                            }
                        }
                    })
                },
                productId: {
                    column: {
                        minWidth: 45,
                        align: "center"
                    },
                    title: "资产名称",
                    type: "dict-select",
                    search: {show: true},
                    form: {rules: validationRules.required},
                    dict: dict({
                        value: "productId",
                        label: "productName",
                        url: '/products/list',
                        getData: async (dict) => {
                            try {
                                const response = await getRequest(dict.url);
                                return response.data;
                            } catch (error) {
                                console.error("获取字典数据失败:", error);
                                return []; // 出现错误时返回空数组
                            }
                        }
                    })
                },
                quantity: {
                    title: "数量",
                    type: "number",
                    form: {
                        rules: validationRules.required,
                    },
                },
                unitPrice: {
                    title: "单价",
                    type: "number",
                    form: {
                        rules: validationRules.required,
                    },
                },
                totalPrice: {
                    title: "总价",
                    type: "number",
                    form: {
                        readonly: true, // 设置为只读
                    },
                }
            }
        }
    }
};



