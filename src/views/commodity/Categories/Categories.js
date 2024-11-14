import {deleteRequest, postRequest, putRequest} from "@/libs/axios.js";
import {validationRules} from "@/store/validation.js"

// CRUD 配置
export default function ({crudOptions}) {
    const transformQuery = ({page, form, sort}) => {
        const order = sort == null ? {} : {orderProp: sort.prop, orderAsc: sort.asc};
        return {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            categoriesBo: {
                ...form
            },
            ...order
        };
    };

    const transformRes = ({res}) => {
        return {
            total: res.total,
            records: res.rows,
            ...res
        };
    };

    const pageRequest = async (query) => {
        return await postRequest('/categories/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.categoryId = row.categoryId;
        return await putRequest('/categories/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/categories/delete', {id: row.categoryId});
    };

    const addRequest = async ({form}) => {
        return await putRequest('/categories/addOrUpdate', form);
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
                categoryId: {
                    column: {show: false},
                    title: "分类ID",
                    key: "category_id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                categoryName: {
                    column: {
                        align: "center",
                    },
                    title: "分类名称",
                    type: "text",
                    search: {show: true},
                    form: {
                        show: true,
                        rules: validationRules.required
                    }
                },
                createdAt: {
                    title: "创建时间",
                    type: "datetime",
                    search: {title: "创建时间", show: true, component: {type: "datetimerange"}},
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

