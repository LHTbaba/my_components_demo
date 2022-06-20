import axios from './request'
import mlxc from './mlxc' //美丽乡村 
//登录
const login = params => { return axios.post('/code/login', params) };
//获取验证码
const getQrCode = params => { return axios.post('/auth/code', params) };
//获取所有行政区划
const getCode = params => { return axios.post('/biz/org/tree', params) };
//懒加载获取行政区划
const getCodeOneByOne = params => { return axios.post('/biz/org/list', params) };
// 获取行政区划等级
const queryAreaLevel = params => { return axios.post('/mpVillage/queryAreaLevel', params) };
//获取下级行政区划
const getSelectCode = params => { return axios.post('/biz/org/getChildCode', params) };
//获取当前文件列表
const getImageList = params => { return axios.post('/common/fileimages', params) };

export default{
    login,
    getQrCode,
    getCodeOneByOne,
    getCode,
    queryAreaLevel,
    getSelectCode,
    getImageList,
    ...mlxc
}