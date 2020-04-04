const state = {
  contacts: [],
}

const getters = {}

const mutations = {
  SET_CONTACTS (state, contacts) {
    state.contacts = contacts
  },
}

const actions = {
  addPotentialSponsor ({ getters }, contact) {
    const participant = getters.participantForPreviousSponsors
    participant.participant_info.potential_sponsors.push(contact)
  },
  removeContact: ({ state, dispatch, getters }, { contact }) => {
    const requestParameters = {
      email: contact.email,
      participantUserId: getters.participantForPreviousSponsors.participant_info.user_id,
    }
    axios.post('/v3/api/delete-contact', requestParameters)
      .then(() => {
        const participant = getters.participantForPreviousSponsors
        if (contact.isPreviousSponsor) {
          // to delete a previous sponsor we create a deleted potential sponsor for the previous sponsor
          dispatch(
            'addPotentialSponsor',
            {
              first_name: contact.first_name,
              last_name: contact.last_name,
              email: contact.email,
              deleted: 1,
              participant_user_id: participant.participant_info.user_id,
              sponsor_user_id: contact.user.id,
              enrollment: 0,
              day_before_run: 0,
              day_after_run: 0,
              sender_user_id: state.auth.user.id,
              opt_out: 0,
              email_opt_out: [],
            },
          )
        } else {
          participant.participant_info.potential_sponsors.map(potentialSponsor => {
            if (contact.email === potentialSponsor.email) {
              potentialSponsor.deleted = 1
            }
          })
        }
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
