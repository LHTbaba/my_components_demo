import Vue from 'vue'
import local from '../../utils/local'
const state = {
    token:local.getToken,
	isLogin:local.getLogin
}; 
const mutations = {
	//登录成功
	loginSuccess(state,params){
        local.setToken(params)
   },
   //登录失败
   loginError(state){
       local.romoveToken()
  },  
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
