import Axios from '../libs/AxiosPlugin'

// 接口地址
// const BASE_PATH = process.env.API_URL
const BASE_PATH = 'http://121.5.249.169:9085'
// const BASE_PATH = 'http://localhost:9085'

// 用户登录
export const login = params => { return Axios.post(`${BASE_PATH}/user/loginByPhone`, params)};

// 用户注册
export const register = (params, verifyCode) => { return Axios.post(`${BASE_PATH}/user/register?gotCode=`+verifyCode, params)};

// 发送手机短信验证码
export const sendVerifyCode = params => { return Axios.get(`${BASE_PATH}/user/sendVerifyCode?phoneNum=`+params)};

// 注销登录
export const logout = params => { return Axios.get(`${BASE_PATH}/user/logout`, params)};

// 获取当前登录用户信息
export const getUserInfo = params => { return Axios.get(`${BASE_PATH}/user/getUserInfo`, params)};

// 根据用户ID获取用户的数据
export const getUserInfoByUserId = userid => { return Axios.get(`${BASE_PATH}/user/getUserInfoByUserId?userid=`+userid)};

// 重置用户密码
export const resetPassword = (params, verifyCode) => { return Axios.post(`${BASE_PATH}/user/resetPassword?gotCode=`+verifyCode, params)};

// 登录状态修改用户密码
export const changePassword = (params, verifyCode) => { return Axios.post(`${BASE_PATH}/user/changePassword?gotCode=`+verifyCode, params)};

// 保存文章
export const saveArticle = params => { 
    return Axios.post(`${BASE_PATH}/article/saveArticle`, params)
};

// 保存文章的其它信息
export const updateArticleTag = params => { 
    return Axios.post(`${BASE_PATH}/article/updateArticleTag`, params)
};

// 审核文章
export const permitArticle = (articleid, permit) => { 
    return Axios.get(`${BASE_PATH}/article/permitArticle?articleid=`+articleid+"&permit="+permit)
};

// 修改文章
export const updateArticle = params => { 
    return Axios.post(`${BASE_PATH}/article/updateArticle`, params)
};

// 根据用户ID获取文章相关信息
export const getArticleByUserId = (userid,pagenum,pagesize) => { 
    return Axios.get(`${BASE_PATH}/article/getArticleByUserId?userid=`+userid+"&pagesize="+pagesize+"&pagenum="+pagenum)
};

// 根据文章ID获取文章相关信息
export const getArticleByArticleId = (params) => { 
    return Axios.get(`${BASE_PATH}/article/getArticleByArticleId?articleid=`+params)
};

// 根据文章标签tag获取文章相关信息
export const getArticleByTag = (params,pagenum,pagesize) => { 
    return Axios.get(`${BASE_PATH}/article/getArticleByTag?tag=`+params+"&pagesize="+pagesize+"&pagenum="+pagenum)
};

// 获取用户列表
export const getUserList = params => { return Axios.get(`${BASE_PATH}/user/getUserList`, params)};

// 分页获取用户列表
export const getUserListByPage = (pagenum,pagesize,query) => { 
    return Axios.get(`${BASE_PATH}/user/getUserListByPage?pagenum=`+pagenum+"&pagesize="+pagesize+"&query="+query)
};

// 分页获取文章列表
export const getArticleListByPage = (pagenum,pagesize,query) => { 
    return Axios.get(`${BASE_PATH}/article/getArticleListByPage?pagenum=`+pagenum+"&pagesize="+pagesize+"&query="+query)
};

// 关注用户
export const fellowing = (userid, uploaderid) => { 
    return Axios.get(`${BASE_PATH}/fellow/fellowing?userid=`+userid+"&uploaderid="+uploaderid)
};

// 取消关注
export const unfellow = (userid, uploaderid) => { 
    return Axios.get(`${BASE_PATH}/fellow/unfellow?userid=`+userid+"&uploaderid="+uploaderid)
};

// 查询关注状态
export const fellowState = (userid, uploaderid) => { 
    return Axios.get(`${BASE_PATH}/fellow/fellowState?userid=`+userid+"&uploaderid="+uploaderid)
};

// 分页获取关注用户列表
export const getFellowList = (pagenum,pagesize,userid) => { 
    return Axios.get(`${BASE_PATH}/fellow/getFellowList?pagenum=`+pagenum+"&pagesize="+pagesize+"&userid="+userid)
};

// 点赞
export const likeing = (userid, articleid) => { 
    return Axios.get(`${BASE_PATH}/like/likeing?userid=`+userid+"&articleid="+articleid)
};

// 取消点赞
export const unlike = (userid, articleid) => { 
    return Axios.get(`${BASE_PATH}/like/unlike?userid=`+userid+"&articleid="+articleid)
};

// 查询点赞状态
export const likeState = (userid, articleid) => { 
    return Axios.get(`${BASE_PATH}/like/likeState?userid=`+userid+"&articleid="+articleid)
};

// 收藏文章
export const collecting = (userid, articleid) => { 
    return Axios.get(`${BASE_PATH}/collect/collecting?userid=`+userid+"&articleid="+articleid)
};

// 取消收藏文章
export const uncollect = (userid, articleid) => { 
    return Axios.get(`${BASE_PATH}/collect/uncollect?userid=`+userid+"&articleid="+articleid)
};

// 查询文章收藏状态
export const collectState = (userid, articleid) => { 
    return Axios.get(`${BASE_PATH}/collect/collectState?userid=`+userid+"&articleid="+articleid)
};

// 分页获取收藏文章列表
export const getCollectionList = (pagenum,pagesize,userid) => { 
    return Axios.get(`${BASE_PATH}/collect/getCollectionList?pagenum=`+pagenum+"&pagesize="+pagesize+"&userid="+userid)
};

// 获取文章的评论信息
export const getComment = (pagenum,pagesize,articleid) => { 
    return Axios.get(`${BASE_PATH}/comment/getComment?pagenum=`+pagenum+"&pagesize="+pagesize+"&articleid="+articleid)
};

// 分页获取文章列表
export const getCommentListByPage = (pagenum, pagesize, query) => { 
    return Axios.get(`${BASE_PATH}/comment/getCommentListByPage?pagenum=`+pagenum+"&pagesize="+pagesize+"&query="+query)
};

// 编写文章的评论信息
export const saveComment = params => { 
    return Axios.post(`${BASE_PATH}/comment/saveComment`, params)
};