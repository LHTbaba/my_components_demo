const state = {
    cityCode: null,
    current: null
};
const mutations = {
    tjcityCode(state, params) {
        state.cityCode = params;
    },
    tjcurrent(state, params) {
        state.current = params;
    }
};
export default {
    state,
    mutations
}