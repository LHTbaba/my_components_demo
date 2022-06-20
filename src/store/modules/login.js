import Vue from 'vue'
import local from '../../utils/local'
const state = {
    token:local.getToken() ,
    refreshToken:local.getRefreshToken(),
    isLogin:local.getLogin() || false,
    keeplivePath:[],
    userName:local.getUserName(),
    loginName: local.getLoginName(),
    areaName: local.getAreaName(),
    pwd: local.getPwd(),
    // areacode:local.getOrgId() || "",
    cardNo:local.getCardNo(),
    deptId:local.getDeptId(),
    refreshCope:true,
    mail:local.getMail(),
    orgId:local.getOrgId(),
    organizationId:local.getOrganizationId(),
    phone:local.getPhone(),
    userId:local.getUserId(),
    areaCode:local.getAreaCode(),
    roleRules:local.getRole(),
    parentId:local.getparentId(),
    childrenId:local.getchildrenId(),
    // children2Id:local.getchildren2Id(),
    children1Id:local.getchildren1Id(),
}; 
const mutations = {
    //设置路由刷新与否
    refreshCope(state,params){
        state.refreshCope=params
    },
    //设置缓存路由
    keepLive(state,params){ 
        //state.keeplivePath.push(params)
        for(var i=0;i<state.keeplivePath.length;i++){
            if(state.keeplivePath[i]!=params){
                state.keeplivePath.push(params)
            }
        } 
    },
    //设置缓存路由
    removeKeepLive(state,params){  
        for(var i=0;i<state.keeplivePath.length;i++){
            if(state.keeplivePath[i]==params){
                state.splice(i,1)
            }
        } 
    },
	//登录成功
	loginSuccess(state,params){
        // console.log(params)
        local.setToken(params);
        state.token=local.getToken();
        local.setLogin(true);
        state.isLogin=local.getLogin();
   },
   //登录失败
   loginError(state){
       local.removeToken(); 
       local.removeRefreshToken(); 
       local.setLogin(false);
       state.isLogin=local.getLogin();
   }, 
    //设置refreshToken
	setRefreshToken(state,params){
        // console.log(params)
        local.setRefreshToken(params);
        state.refreshToken=local.getRefreshToken(); 
    }, 
   //设置用户名
	setUserName(state,params){
        // console.log(params)
        local.setUserName(params);
        state.userName=local.getUserName(); 
    }, 
    //设置登录名
     setLoginName(state,params){
         // console.log(params)
         local.setLoginName(params);
         state.loginName=local.getLoginName(); 
     }, 
    //设置地区名
     setAreaName(state,params){
         local.setAreaName(params);
         state.areaName=local.getAreaName(); 
     }, 
    //  设置账户密码
     setPwd(state,params) {
        local.setPwd(params);
        state.pwd=local.getPwd();
        
     },
     //设置区域
	// setOrgId(state,params){
    //     // console.log(params)
    //     local.setOrgId(params);
    //     state.orgId=local.getOrgId(); 
    // }, 
     //设置cardNO
	setCardNO(state,params){
        local.setCardNO(params);
        state.cardNO=params; 
    }, 
    //设置deptId
	setDeptId(state,params){
        local.setDeptId(params);
        state.deptId=local.getDeptId(); 
    }, 
    //设置Mail
	setMail(state,params){
        local.setMail(params);
        state.mail=local.getMail(); 
    }, 
    //设置OrganizationId
     setOrganizationId(state,params){
        local.setOrganizationId(params);
        state.organizationId=local.getOrganizationId(); 
    }, 
     //设置Phone
     setPhone(state,params){
        local.setPhone(params);
        state.phone=local.getPhone(); 
    }, 
     //设置Phone
     setUserId(state,params){
        local.setUserId(params);
        state.userId=local.getUserId(); 
    }, 
     //设置Phone
     setOrgId(state,params){
        local.setOrgId(params);
        state.orgId=local.getOrgId(); 
    }, 
     //设置areaCode
     setAreaCode(state,params){
        local.setAreaCode(params);
        state.areaCode=local.getAreaCode(); 
    }, 
    //设置areaCode
    getRoles(state,params){ 
        local.setRole(params);
        state.roleRules=params; 
    }, 
    //设置areaCode
    getparentId(state,params){ 
        //console.log(params+'我是parentId')
        local.setparentId(params);
        state.parentId=params; 
    }, 
    //设置子页面childrenId
    getchildrenId(state,params) {
        local.setchildrenId(params);
        state.childrenId=params; 
    },
    //设置子页面childrenId
    getchildren2Id(state,params) {
        local.setchildren2Id(params);
        state.children2Id=params; 
    },
    //设置子页面childrenId
    getchildren1Id(state,params) {
        local.setchildren1Id(params);
        state.children1Id=params; 
    }
};

const actions = {
	 //登录成功
    loginSuccess({commit},params){
        commit('loginSuccess',params);
    },
    //登录失败
    loginError({commit}){
        commit('loginError');
    }, 
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
