import Axios from '../libs/AxiosPlugin'

// 接口地址
// const BASE_PATH = process.env.API_URL
const BASE_PATH = 'http://localhost:9085'

// 用户登录
export const login = params => { return Axios.post(`${BASE_PATH}/user/loginByPhone`, params)};

// 用户注册
export const register = (params, verifyCode) => { return Axios.post(`${BASE_PATH}/user/register?gotCode=`+verifyCode, params)};

// 发送手机短信验证码
export const sendVerifyCode = params => { return Axios.get(`${BASE_PATH}/user/sendVerifyCode?phoneNum=`+params)};

// 注销登录
export const logout = params => { return Axios.get(`${BASE_PATH}/user/logout`, params)};

// 获取用户信息
export const getUserInfo = params => { return Axios.get(`${BASE_PATH}/user/getUserInfo`, params)};

// 重置用户密码
export const resetPassword = (params, verifyCode) => { return Axios.post(`${BASE_PATH}/user/resetPassword?gotCode=`+verifyCode, params)};

// 登录状态修改用户密码
export const changePassword = (params, verifyCode) => { return Axios.post(`${BASE_PATH}/user/changePassword?gotCode=`+verifyCode, params)};

// 保存文章
export const saveArticle = params => { 
    return Axios.post(`${BASE_PATH}/article/saveArticle`, params)
};

// 根据用户ID获取文章相关信息
export const getArticleByUserId = params => { 
    return Axios.get(`${BASE_PATH}/article/getArticleByUserId?userid=`+params)
};

// 获取用户列表
export const getUserList = params => { return Axios.get(`${BASE_PATH}/user/getUserList`, params)};
