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
    imgs:[],
    theme:'style3',
  },
  mutations: {
    setImgs(state,imgs){
      state.imgs = imgs;
    },
    setTheme(state,theme){
      console.log('设置样式',theme)
      state.theme = theme;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
