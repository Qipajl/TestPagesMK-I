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
            productsBo: {
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
        return await postRequest('/products/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.productId = row.productId;
        return await postRequest('/products/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/products/delete', {id: row.productId});
    };

    const addRequest = async ({form}) => {
        return await putRequest('/products/add', form);
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
                productId: {
                    column: {show: false},
                    title: "信息ID",
                    key: "product_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                productName: {
                    column: {
                        align: "center",
                    },
                    title: "资产名称",
                    type: "text",
                    search: {show: true},
                    form: {rules: validationRules.required}
                },
                categoryId: {
                    title: "种类",
                    type: "dict-select",
                    dict: dict({
                        value: "categoryId",
                        label: "categoryName",
                        url: '/categories/list',
                        getData: async (dict) => {
                            try {
                                const response = await getRequest(dict.url);
                                return response.data;
                            } catch (error) {
                                console.error("获取字典数据失败:", error);
                                return []; // 出现错误时返回空数组
                            }
                        }
                    }),
                    form: {show: true, rules: validationRules.required}
                },
                supplierId: {
                    title: "采购商",
                    type: "dict-select",
                    dict: dict({
                        value: "supplierId",
                        label: "supplierName",
                        url: '/suppliers/list',
                        getData: async (dict) => {
                            try {
                                const response = await getRequest(dict.url);
                                return response.data;
                            } catch (error) {
                                console.error("获取字典数据失败:", error);
                                return []; // 出现错误时返回空数组
                            }
                        }
                    }),
                    form: {show: true, rules: validationRules.required}
                },
                unitPrice: {
                    title: "单价",
                    type: "number",
                    form: {show: true, rules: validationRules.required}
                },
                stockQuantity: {
                    title: "库存数量",
                    type: "number",
                    form: {show: true, rules: validationRules.required},
                    editForm: {show: false},
                    addForm: {show: false}
                },
                minimumStock: {
                    column: {show: false},
                    title: "最低库存",
                    type: "number",
                    form: {show: false, rules: validationRules.required}
                },
                createdAt: {
                    title: "创建日期",
                    type: "date",
                    search: {title: "时间", show: true, component: {type: "datetimerange"}},
                    form: {
                        show: true,
                        rules: validationRules.required,
                        component: {valueFormat: "YYYY-MM-DD"},
                        value: new Date().toISOString()
                    },
                    editForm: {show: false}
                },
                updatedAt: {
                    title: "更新时间",
                    type: "date",
                    form: {show: false, component: {valueFormat: "YYYY-MM-DD"}}
                }
            }
        }
    }
};

