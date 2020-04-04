import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  modules: {},
  state: {
    ip: null,
    item: null,
    items: [],
    comments: [],
    avatarPath: '',
    contacts: [],
    minPasswordLength: 0,
    s3Bucket: '',
    user: null,
    error: null,
  },
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
      },
    }),
  ],
})
