import Vue from 'vue'

export default {
  SET_IP (state, ip) {
    state.ip = ip
  },
  SET_ITEM: (state, { item }) => {
    state.item = item
  },
  SET_ITEMS: (state, { items }) => {
    state.items = items
  },
  SET_COMMENTS: (state, { comments }) => {
    comments.forEach(comment => {
      // console.log(comment, 'comment')
      if (comment) {
        Vue.set(state.comments, comment.id, comment)
      }
    })
  },
  SET_USER: (state, { user }) => {
    state.user = user
  },
  //

  SET_USER_DATA (state, userData) {
    state.user = userData
    localStorage.setItem('loggedIn', 'true')
  },
  CLEAR_USER_DATA (state) {
    state.user = null
    localStorage.removeItem('loggedIn')
    location.reload()
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
}
