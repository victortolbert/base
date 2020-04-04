import {
  fetchListData,
  fetchItems,
  fetchItem,
  fetchUser,
} from '../api/api'

export default {
  async getIP ({ commit }) {
    const ip = await this.$http.get('http://icanhazip.com').text()
    commit('SET_IP', ip)
  },
  fetchListData: ({ commit }, { type }) => {
    return fetchListData(type)
      .then(items => commit('SET_ITEMS', { items }))
  },
  fetchComments: ({ commit, dispatch }, { item }) => {
    if (!item) {
      return
    }
    return fetchItems(item.kids || [])
      .then(comments => {
        commit('SET_COMMENTS', { comments })
        return Promise.all(
          comments.map(item =>
            dispatch('fetchComments', { item }),
          ),
        )
      })
  },
  fetchItem: ({ commit }, { id }) => {
    return fetchItem(id)
      .then(item => commit('SET_ITEM', { item }))
  },
  fetchUser: ({ commit, state }, { id }) => {
    return fetchUser(id)
      .then(user => commit('SET_USER', { user }))
  },
  //
  register ({ commit }, credentials) {
    return axios.post('/api/register', credentials).then(({ data }) => {
      commit('SET_USER_DATA', data)
    })
  },
  login: ({ commit }, credentials) => {
    // console.log(commit)
    return axios.get('/sanctum/csrf-cookie').then((response) => {
      // console.log('response1: ', response)
      axios.post('/api/login', {
        email: 'victor.tolbert@outlook.com',
        password: 'password',
      }).then(({ data }) => {
        // console.log('response2: ', data)
        localStorage.setItem('loggedIn', 'true')
        commit('SET_USER_DATA', data)
        this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        commit('SET_ERROR', error)
        // console.log('error: ', error.response)
        // const key = Object.keys(error.response.data.errors)[0]
        // this.errorMessage = error.response.data.errors[key][0]
      })
    })
  },
  logout ({ commit }) {
    axios.post('/api/logout').then(() => {
      commit('CLEAR_USER_DATA')
      // this.$router.push({ name: 'welcome' })
      document.location.href = '/'
    })
  },
  initStore: ({ dispatch }, user) => {
    dispatch('initParticipantsAndPledges', user.participants)
    dispatch('initPrograms')
    dispatch('initClassrooms')
  },
  // async logout () {
  //   // await this.$store.dispatch('auth/logout')
  //   await axios.post('/api/logout')
  //   localStorage.removeItem('loggedIn')
  //   this.loggedIn = false
  //   this.$router.push({ name: 'login' })
  // },
  getUser ({ commit }) {
    axios.get('/api/user').then(({ data }) => {
      // console.log(data)
      commit('SET_USER_DATA', data)
    })
  },
}
