import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import notification from './modules/notification'
import mutateUser from '@/utilities/mutateUser'

const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

// https://github.com/Boosterthon/titan-dashboard/pull/631
export default new Vuex.Store({
  modules: {
    notification,
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: null,
    config: {
      ua: '',
      env: process.env.NODE_ENV,
    },
    item: null,
    items: [],
    comments: [],
    avatarPath: '',
    contacts: [],
    minPasswordLength: 0,
    s3Bucket: '',
    error: null,
    pr: 631,
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    },
    avatarPath: state => `https://${state.s3Bucket}.s3.amazonaws.com/${state.avatarPath}`,
    contacts: state => state.contacts,
    prUrl: state => `https://github.com/Boosterthon/titan-dashboard/pull/${state.pr}`,
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('loggedIn', 'true')
    },
    CLEAR_USER_DATA (state) {
      state.user = null
      localStorage.removeItem('loggedIn')
      window.location.reload(true)
    },
    SET_LANG (state, lang) {
      state.lang = lang
    },
    SET_S3_BUCKET (state, bucket) {
      state.s3Bucket = bucket
    },
    SET_MIN_PASSWORD_LENGTH (state, length) {
      state.minPasswordLength = length
    },
    SET_AVATAR_PATH (state, avatarPath) {
      state.avatarPath = avatarPath
    },
    SET_ERROR (state, error) {
      state.error = error
    },
    ADD_CONTACTS (state, contacts) {
      state.contacts = state.contacts.concat(contacts)
    },
    SET_CONTACTS (state, payload) {
      state.contacts = payload
    },
  },
  actions: {
    register ({ commit }, credentials) {
      return axios.post('/api/register', credentials).then(({ data }) => {
        const userData = mutateUser(data)
        commit('SET_USER_DATA', userData)
      })
    },
    login: ({ commit }, credentials) => {
      // console.log(commit)
      return axios.get('/sanctum/csrf-cookie').then(() => {
        axios.post('/api/login', {
          email: 'victor.tolbert@outlook.com',
          password: 'password',
        }).then(({ data }) => {
          const userData = mutateUser(data)
          commit('SET_USER_DATA', userData)
          localStorage.setItem('loggedIn', 'true')
          this.$router.push({ name: 'dashboard' })
        }).catch((error) => {
          commit('SET_ERROR', error)
          // console.log('error: ', error.response)
          // const key = Object.keys(error.response.data.errors)[0]
          // this.errorMessage = error.response.data.errors[key][0]
        })
      })
    },
    async logout ({ commit }) {
      // await this.$store.dispatch('auth/logout')
      await axios.post('/api/logout')
      commit('CLEAR_USER_DATA')
      this.$router.push({ name: 'login' })
    },
    // logout ({ commit }) {
    //   axios.post('/api/logout').then(() => {
    //     commit('CLEAR_USER_DATA')
    //     this.$router.push({ name: 'welcome' })
    //     document.location.href = '/'
    //   })
    // },
    initStore: ({ dispatch }, user) => {
      dispatch('initParticipantsAndPledges', user.participants)
      dispatch('initPrograms')
      dispatch('initClassrooms')
    },
    fetchUser ({ commit }) {
      axios.get('/api/user').then(({ data }) => {
        const userData = mutateUser(data)
        commit('SET_USER_DATA', userData)
      })
    },
  },
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
