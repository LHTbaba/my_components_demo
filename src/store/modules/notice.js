const state = {
    task_url: null
}

const mutations = {
    setTaskUrl (state,params){
        state.task_url = params
    }
}

export default {
    state,
	mutations
}