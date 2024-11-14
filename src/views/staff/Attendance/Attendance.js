import {dict} from "@fast-crud/fast-crud";
import {deleteRequest, getRequest, postRequest, putRequest} from "@/libs/axios.js";

// CRUD 配置
export default function ({crudOptions}) {
    const transformQuery = ({page, form, sort}) => {
        const order = sort == null ? {} : {orderProp: sort.prop, orderAsc: sort.asc};
        return {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            attendanceBo: {
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
        return await postRequest('/attendance/listPages', query);
    };

    const editRequest = async ({form, row}) => {
        form.id = row.id;
        console.log('editRequest:', form)
        return await postRequest('/attendance/addOrUpdate', form);
    };

    const delRequest = async ({row}) => {
        return await deleteRequest('/attendance/delete', {id: row.id});
    };

    const addRequest = async ({form}) => {
        const {employeeid, ...restForm} = form; // 解构并排除需要转化的字段
        const transformedData = {
            employeeId: employeeid,
            ...restForm
        }
        return await putRequest('/attendance/add', transformedData);
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
            actionbar: {
                buttons: {
                    add: {
                        show: false
                    }
                }
            },
            pagination: {
                pageSize: 10,
                pageNum: 1
            },
            rowHandle: {
                width: 125,
                buttons: {remove: {show: false}},
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
                employeeid: {
                    column: {
                        align: "center",
                    },
                    title: "员工",
                    type: "dict-select",
                    search: {show: true},
                    editForm: {show: false},
                    dict: dict({
                        value: "id",
                        label: "name",
                        url: '/employees/list',
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
                },
                status: {
                    column: {
                        width: 80,
                        align: "center"
                    },
                    title: "状态",
                    type: "dict-select",
                    dict: dict({
                        data: [
                            {value: "present", label: "出勤"},
                            {value: "absent", label: "缺勤"},
                            {value: "leave", label: "请假"}
                        ]
                    })
                },
                date: {
                    title: "日期",
                    type: "date",
                    editForm: {show: false},
                },
                checkintime: {
                    title: "开始时间",
                    type: "time"
                },
                checkouttime: {
                    title: "结束时间",
                    type: "time"
                },
            }
        }
    }
};