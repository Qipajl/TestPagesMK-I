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
            ordersBo: {
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
        return await postRequest('/orders/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.orderId = row.orderId;
        return await postRequest('/orders/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        try {
            const response = await getRequest('/orderItems/list');
            const orderItemsData = response.data.map(item => ({
                orderId: item.orderId,
                quantity: item.quantity,
                productId: item.productId
            }));
            const matchingItem = orderItemsData.find(item => item.orderId === row.orderId);
            console.log("匹配的订单项:", matchingItem, orderItemsData, response);

            await deleteRequest('/orders/delete', {id: row.orderId});
            // 添加到 ReturnsCrud
            const returnData = {
                productId: matchingItem.productId, // 确保有正确的字段名称
                orderId: row.orderId,     // 确保有正确的字段名称
                quantity: matchingItem.quantity      // 确保有正确的字段名称
            };
            return await putRequest('/returns/add', returnData);
        } catch (error) {
            console.error("删除失败:", error);
            return null;  // 错误时返回 null
        }
    };

    const addRequest = async ({form}) => {
        const orderId = await putRequest('/orders/add', form);

        const orderItemsData = {
            orderId: orderId.data,
            productId: form.productId,
            quantity: form.quantity,
            unitPrice: form.unitPrice,
            totalPrice: form.totalPrice
        }

        const productsData = {
            productId: form.productId,
            stockQuantity: -form.quantity
        };
        await postRequest('/products/update', productsData);

        return await putRequest('/orderItems/add', orderItemsData);
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
            form: {
                watch({form}) {
                    // 监控 quantity 和 unitPrice 的变化,实时计算总价
                    form.totalPrice = form.quantity * form.unitPrice;
                },
            },
            columns: {
                orderId: {
                    column: {show: false},
                    title: "资产ID",
                    key: "order_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                customerId: {
                    column: {
                        minWidth: 30,
                        align: "center"
                    },
                    title: "部门名称",
                    type: "dict-select",
                    search: {show: true},
                    form: {rules: validationRules.required},
                    dict: dict({
                        value: "customerId",
                        label: "customerName",
                        url: '/customers/list',
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
                status: {
                    title: "资产状态",
                    type: "dict-select",
                    form: {rules: validationRules.required},
                    dict: dict({
                        data: [
                            {value: "使用中", label: "使用中"},
                            {value: "损坏", label: "损坏"},
                            {value: "备用", label: "备用"}
                        ]
                    })
                },
                orderDate: {
                    title: "审批日期",
                    type: "date",
                    form: {
                        show: true,
                        rules: validationRules.required,
                        component: {valueFormat: "YYYY-MM-DD"},
                        value: new Date().toISOString()
                    }
                },
                createdAt: {
                    title: "创建时间",
                    type: "date",
                    search: {title: "创建时间", show: true, component: {type: "datetimerange"}},
                    form: {
                        show: true,
                        component: {valueFormat: "YYYY-MM-DD"},
                        rules: validationRules.required,
                        value: new Date().toISOString()
                    }
                },
                updatedAt: {
                    title: "更新时间",
                    type: "date",
                    form: {show: false}
                },
                productId: {
                    column: {show: false},
                    type: "dict-select",
                    form: {
                        show: false,
                        rules: validationRules.required,
                        component: {
                            on: {
                                onChange: async ({value, row, form}) => {
                                    if (!form) return; // 检查 form 是否存在
                                    try {
                                        const response = await getRequest(`/products/list`);
                                        const product = response.data.find(item => item.productId === form.productId);

                                        if (product) {
                                            form.unitPrice = product.unitPrice; // 将获取到的数量赋值给 quantity
                                        }
                                    } catch (error) {
                                        console.error("获取商品数量失败:", error);
                                    }
                                }
                            },
                        },
                    },
                    addForm: {
                        title: '商品名称',
                        show: true
                    },
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
                    column: {show: false},
                    type: "number",
                    form: {show: false, rules: validationRules.required},
                    addForm: {title: '数量', show: true},
                },
                unitPrice: {
                    column: {show: false},
                    type: "number",
                    form: {
                        show: false,
                        rules: validationRules.required
                    },
                    addForm: {title: '售价', show: true},
                },
                totalPrice: {
                    column: {show: false},
                    type: "number",
                    form: {show: false, readonly: true, component: {disabled: true}},
                    addForm: {title: '总价', show: true}
                }
            }
        }
    }
};