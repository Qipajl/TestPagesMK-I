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
            returnsBo: {...form},
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
        return await postRequest('/returns/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.returnId = row.returnId;
        return await postRequest('/returns/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/returns/delete', {id: row.returnId});
    };

    const addRequest = async ({form}) => {
        return await putRequest('/returns/add', form);
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
                returnId: {
                    column: {show: false},
                    title: "资产ID",
                    key: "return_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                orderId: {
                    column: {show: false},
                    title: "部门ID",
                    type: "number",
                    search: {show: true},
                    form: {rules: validationRules.required},
                },
                productId: {
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
                    title: "折损数量",
                    type: "number",
                    form: {rules: validationRules.required}
                },
                returnDate: {
                    title: "折损日期",
                    type: "date",
                    form: {show: true, component: {valueFormat: "YYYY-MM-DD"}}
                },
                reason: {
                    title: "折损原因",
                    type: "text",
                    form: {show: true}
                }
            }
        }
    };
};

