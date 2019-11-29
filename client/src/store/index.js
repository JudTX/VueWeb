import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//判断是否通过
const types = {
  SET_EMPOWER : "SET_EMPOWER",
  SET_USER : "SET_USER" 
}

const state = {
  Empower: false,
  user: {}
}

const getters = {
  Empower: state => state.Empower,
  user: state => state.user
}

const mutations = {
  [types.SET_EMPOWER](state,Empower){
    if(Empower) state.Empower = Empower;
    else state.Empower = false;
  },
  [types.SET_USER](state,user){
    if(user) state.user = user;
    else state.user = {};
  }
}

const actions = {
  setEmpower: ({commit},Empower) => {
    commit(types.SET_EMPOWER, Empower);
  },
  setUser: ({commit},user) => {
    commit(types.SET_USER, user);
  },
  claerCurrentState: ({commit}) =>{
    commit(types.SET_EMPOWER,false);
    commit(types.SET_USER,null);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
