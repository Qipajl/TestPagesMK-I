import {deleteRequest, postRequest, putRequest} from "@/libs/axios.js";
import {validationRules} from "@/store/validation.js"

// CRUD 配置
export default function ({crudOptions}) {
    const transformQuery = ({page, form, sort}) => {
        const order = sort == null ? {} : {orderProp: sort.prop, orderAsc: sort.asc};
        return {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            suppliersBo: {
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
        return await postRequest('/suppliers/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.supplierId = row.supplierId;
        return await putRequest('/suppliers/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/suppliers/delete', {id: row.supplierId});
    };

    const addRequest = async ({form}) => {
        return await putRequest('/suppliers/addOrUpdate', form);
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
                supplierId: {
                    column: {show: false},
                    title: "采购商ID",
                    key: "supplier_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                supplierName: {
                    column: {
                        minWidth: 50,
                        align: "center",
                    },
                    title: "采购商名",
                    type: "text",
                    search: {show: true},
                    form: {rules: validationRules.required},
                },
                contactPerson: {
                    column: {
                        minWidth: 30
                    },
                    title: "联系人",
                    type: "text",
                    form: {
                        rules: validationRules.required
                    }
                },
                phone: {
                    column: {
                        minWidth: 45
                    },
                    title: "电话",
                    type: "text",
                    form: {
                        rules: validationRules.phoneRule(false)
                    },
                },
                email: {
                    column: {
                        minWidth: 100
                    },
                    title: "邮箱",
                    type: "text",
                    form: {
                        rules: validationRules.emailRule(false)
                    },
                },
                address: {
                    title: "地址",
                    type: "text",
                    form: {
                        rules: validationRules.addressRule()
                    },
                },
                createdAt: {
                    title: "创建时间",
                    type: "datetime",
                    search: {title: "时间", show: true, component: {type: "datetimerange"}},
                    form: {
                        show: true,
                        value: new Date().toISOString(),
                        component: {valueFormat: "YYYY-MM-DD HH:mm:ss"},
                        rules: validationRules.required
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