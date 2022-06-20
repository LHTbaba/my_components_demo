import axios from './request'
// 多规合一新增
const addMoreAndOne=params => { return axios.jsonput('/rcxmyb/addMoreAndOne', params)};
// 多规合一列表
const queryMoreAndOneList=params => { return axios.post('/rcxmyb/queryMoreAndOneList', params)};
// 删除多规合一或村规民约
const deleteMoreAndOne=params => { return axios.post('/rcxmyb/removeYbById', params)};
//相关附件上传
const zdcUpload = params => { return axios.upload('/common/zdcUpload', params) };
// 查询多规合一或村规民约详情
const queryYbById=params => { return axios.post('/rcxmyb/queryYbById', params)};
// 编辑多规合一或村规民约详情
const updateYbInfoById=params => { return axios.jsonput('/rcxmyb/updateYbInfoById', params)};

export default{
    addMoreAndOne,
    queryMoreAndOneList,
    zdcUpload,
    deleteMoreAndOne,
    queryYbById,
    updateYbInfoById
}