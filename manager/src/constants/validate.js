export const RULES = {
    email: [
        { message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, trigger: 'blur' }
    ],
    birth: [
        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
    ],
    username: [
        { required: true, trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    location: [
        { message: '请输入地区', trigger: 'change' }
    ],
    phoneNum: [
        { message: '请选择日期', trigger: 'blur' }
    ],
    introduction: [
        { message: '请输入介绍', trigger: 'blur' }
    ]
}
