export const validationRules = {
    required: {
        required: true,
        message: "该字段不能为空",
        trigger: "blur",
    },

    phoneRule: (isRequired = true) => ({
        required: isRequired,
        pattern: /^1[3-9]\d{9}$/,
        message: "请输入有效的手机号",
        trigger: "blur",
    }),

    emailRule: (isRequired = true) => ({
        required: isRequired,
        type: "email",
        message: "请输入有效的邮箱地址",
        trigger: "blur",
    }),

    addressRule: (isRequired = true) => ({
        required: isRequired,
        min: 5,
        message: "地址至少需要 5 个字符",
        trigger: "blur",
    }),

    ageRule: (isRequired = true) => ({
        required: isRequired,
        type: "number",
        min: 18,
        max: 70,
        message: "年龄必须在18到70岁之间",
        trigger: "blur",
    }),

    passwordRule: () => ({
        required: true,
        //pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        pattern: /^(?=.*\d).{6,}$/,
        message: "密码必须包含至少8个字符，包括大写字母、小写字母、数字和特殊字符",
        trigger: "blur",
    }),

    usernameRule: () => ({
        required: true,
        //pattern: /^[a-zA-Z0-9_]{2,10}$/,
        pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$/,
        message: "用户名必须是2到10个字符，只能包含字母、数字和下划线",
        trigger: "blur",
    }),
};