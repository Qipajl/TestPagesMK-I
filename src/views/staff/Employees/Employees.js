import {dict} from "@fast-crud/fast-crud";
import {deleteRequest, postRequest, putRequest, UserApi} from "@/libs/axios.js";
import {validationRules} from "@/store/validation.js";

// CRUD 配置
export default function ({crudOptions}) {
    const transformQuery = ({page, form, sort}) => {
        const order = sort == null ? {} : {orderProp: sort.prop, orderAsc: sort.asc};
        return {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            employeesBo: {
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
        return await postRequest('/employees/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.id = row.id;
        return await postRequest('/employees/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/employees/delete', {id: row.id});
    };

    const addRequest = async ({form}) => {
        const employeeId = await UserApi.register(form); // 确保这里获取的是返回的 ID

        const attendanceData = {
            employeeid: employeeId,
            date: new Date().toISOString().split('T')[0], // 当前日期，格式为 YYYY-MM-DD
            status: 'present'  // 默认状态
        };

        return await putRequest('/attendance/add', attendanceData);
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
                id: {
                    column: {show: false},
                    title: "ID",
                    key: "id",
                    type: "number",
                    form: {show: false},
                    viewForm: {show: true}
                },
                name: {
                    column: {
                        align: "center",
                    },
                    title: "姓名",
                    type: "text",
                    form: {title: "用户名", rules: validationRules.usernameRule()},
                    editForm: {show: false}
                },
                age: {
                    title: "年龄",
                    type: "number",
                    form: {rules: validationRules.ageRule()}
                },
                sex: {
                    title: "性别",
                    type: "dict-select",
                    dict: dict({
                        data: [
                            {value: 1, label: "男"},
                            {value: 0, label: "女"}
                        ]
                    }),
                    form: {rules: validationRules.required}
                },
                password: {
                    column: {show: false},
                    type: "password",
                    form: {title: "注册密码", rules: validationRules.passwordRule()},
                    editForm: {show: false}
                },
                role: {
                    title: "权限",
                    type: "dict-select",
                    dict: dict({
                        data: [
                            {value: "USER", label: "普通员工"},
                            {value: "ADMIN", label: "管理员"}
                        ]
                    }),
                    form: {title: "注册权限", rules: validationRules.required}
                },
                createdAt: {
                    title: "加入时间",
                    type: "date",
                    search: {title: "时间", show: true, component: {type: "datetimerange"}},
                    form: {
                        show: true,
                        value: new Date().toISOString(),
                        component: {valueFormat: "YYYY-MM-DD"}
                    }
                },
            }
        }
    }
};