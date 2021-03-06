// 匹配规则
export const RULES = {
  username: [{ required: true, message: "请输入用户名",trigger: "blur" }],
  password: [{ required: true, message: "请输入密码",trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  phoneNum: [{ required: true,message: "请输入手机号", trigger: "blur" }],
  email: [
    { required: true,message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  birth: [
    { required: true, type: "date", message: "请选择日期", trigger: "change" },
  ],
  introduction: [{ message: "请输入介绍", trigger: "blur" }],
  location: [{ message: "请输入地区", trigger: "change" }],
};
