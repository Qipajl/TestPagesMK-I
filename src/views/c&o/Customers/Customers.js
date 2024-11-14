import {deleteRequest, postRequest, putRequest} from "@/libs/axios.js";
import {validationRules} from "@/store/validation.js";

// CRUD 配置
export default function ({crudOptions}) {
    const transformQuery = ({page, form, sort}) => {
        const order = sort == null ? {} : {orderProp: sort.prop, orderAsc: sort.asc};
        return {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            customersBo: {
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
        return await postRequest('/customers/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.customerId = row.customerId;
        return await putRequest('/customers/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        console.log('delRequest', row)
        return await deleteRequest('/customers/delete', {id: row.customerId});
    };

    const addRequest = async ({form}) => {
        return await putRequest('/customers/addOrUpdate', form);
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
                customerId: {
                    column: {show: false},
                    title: "部门ID",
                    key: "customer_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                customerName: {
                    column: {
                        minWidth: 45,
                        align: "center"
                    },
                    title: "部门名称",
                    type: "text",
                    search: {show: true},
                    form: {rules: validationRules.required},
                },
                contactPerson: {
                    column: {
                        minWidth: 30
                    },
                    title: "负责人",
                    type: "text",
                    form: {rules: validationRules.required},
                },
                phone: {
                    column: {
                        minWidth: 45
                    },
                    title: "电话",
                    type: "text",
                    form: {rules: validationRules.phoneRule(false)},
                },
                email: {
                    column: {
                        minWidth: 100
                    },
                    title: "邮箱",
                    type: "text",
                    form: {rules: validationRules.emailRule(false)},
                },
                address: {
                    title: "部门地址",
                    type: "text",
                    form: {rules: validationRules.addressRule(false)},
                },
                createdAt: {
                    title: "创建时间",
                    type: "date",
                    search: {title: "时间", show: true, component: {type: "datetimerange"}},
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
                }
            }
        }
    }
};