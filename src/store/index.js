import Vue from 'vue'
import Vuex from 'vuex'
import item from './module/item'
import kategori from './module/kategori'
import supplier from './module/supplier'
import customer from './module/customer'
import admin from './module/admin'
import cart from './module/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    email: null,
    userId:null,
    userRole:'',
    url: 'https://server-live-production.up.railway.app'
  },
  mutations: {
    setLogin(state,payload){
      state.isLogin = payload
    },
    setUser(state,payload){
      state.user = payload
    },
    setEmail(state,payload){
      state.email = payload
    },    
    setUserId(state,payload){
      state.userId = payload
    },
    setRole(state,payload){
      state.userRole = payload
    }
  },
  actions: {
  },
  modules: {
    item,
    kategori,
    supplier,
    customer,
    admin,
    cart
  }
})
