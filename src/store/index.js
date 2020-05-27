import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins:[vuexLocal.plugin],
  state: {
    imgs:[]
  },
  mutations: {
    setImgs(state,imgs){
      state.imgs = imgs;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
