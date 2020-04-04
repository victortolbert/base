export default {
  displayItems (state) {
    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * 20
    const end = page * 20
    return state.items.slice(start, end)
  },
  maxPage (state) {
    return Math.ceil(state.items.length / 20)
  },
  //
  loggedIn (state) {
    return !!state.user
  },
  avatarPath: state => `https://${state.s3Bucket}.s3.amazonaws.com/${state.avatarPath}`,
  contacts: state => state.contacts,
}
