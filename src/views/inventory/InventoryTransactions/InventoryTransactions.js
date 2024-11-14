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
            inventoryTransactionsBo: {
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
        return await postRequest('/inventoryTransactions/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.transactionId = row.transactionId;
        return await postRequest('/inventoryTransactions/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/inventoryTransactions/delete', {id: row.transactionId});
    };

    const addRequest = async ({form}) => {
        await putRequest('/inventoryTransactions/add', form);

        let stockQuantity;
        if (form.transactionType === '入库') {
            stockQuantity = form.quantity; // 入库为正
        } else if (form.transactionType === '出库') {
            stockQuantity = -form.quantity; // 出库为负
        } else {
            throw new Error(`无效的交易类型: ${form.transactionType}`); // 抛出错误
        }

        const productsData = {
            productId: form.productId,
            stockQuantity
        };
        return await postRequest('/products/update', productsData);
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
            columns: {
                transactionId: {
                    column: {show: false},
                    title: "记录ID",
                    key: "transaction_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                productId: {
                    column: {
                        align: "center",
                    },
                    title: "资产名称",
                    type: "dict-select",
                    search: {show: true},
                    form: {
                        rules: validationRules.required,
                        component: {
                            on: {
                                onChange: async ({value, row, form}) => {
                                    if (!form) return; // 检查 form 是否存在
                                    console.log("选择的 productId:", form.productId); // 打印出选择的 productId
                                    try {
                                        const response = await getRequest(`/products/list`);
                                        console.log("获取到的产品列表:", response.data); // 打印出获取到的产品列表
                                        const product = response.data.find(item => item.productId === form.productId);

                                        console.log('component', product)

                                        if (product) {
                                            form.quantity = product.stockQuantity; // 将获取到的数量赋值给 quantity
                                        }
                                    } catch (error) {
                                        console.error("获取商品数量失败:", error);
                                    }
                                }
                            },
                        },
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
                transactionType: {
                    title: "交易类型",
                    type: "dict-select",
                    dict: dict({
                        data: [
                            {value: "买入", label: "买入"},
                            {value: "变卖", label: "变卖"}
                        ]
                    }),
                    form: {
                        value: "买入",
                        show: true,
                        rules: validationRules.required
                    },
                    search: {show: true}
                },
                quantity: {
                    title: "数量",
                    type: "number",
                    form: {rules: validationRules.required},
                },
                transactionDate: {
                    title: "交易日期",
                    type: "date",
                    search: {title: "时间", show: true, component: {type: "datetimerange"}},
                    form: {
                        show: true,
                        value: new Date().toISOString(),
                        component: {valueFormat: "YYYY-MM-DD"},
                        rules: validationRules.required
                    }
                },
                notes: {
                    title: "备注",
                    type: "textarea"
                }
            }
        }
    }
};