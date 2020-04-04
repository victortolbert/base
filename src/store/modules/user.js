const state = () => ({
  user: {},
  ParentUser: {},
  user_type: null,
  default_user_image: '',
  newUserPhoto: '',
  newUserPhotoFile: '',
})

const getters = {
  user: state => state.user,
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_PARENT_USER (state, parent) {
    state.ParentUser = parent
  },
  SET_USER_TYPE (state, type) {
    state.user_type = type
  },
  SET_DEFAULT_USER_IMAGE (state, url) {
    state.default_user_image = url
  },
  SET_NEW_USER_PHOTO (state, photo) {
    state.newUserPhoto = photo
  },
  SET_NEW_USER_PHOTO_FILE (state, blob) {
    state.newUserPhotoFile = blob
  },
  UPDATE_USER (state, properties) {
    state.user = { ...state.user, ...properties }
  },
}

const actions = {
  setUserPhoto: ({ commit }, photo) => {
    commit('SET_NEW_USER_PHOTO', photo)
  },
  setUserPhotoFile: ({ commit }, blob) => {
    commit('SET_NEW_USER_PHOTO_FILE', blob)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
