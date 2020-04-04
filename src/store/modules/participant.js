import { sortBy } from 'lodash'

const state = () => ({
  participants: [],
})

const getters = {
  participants: state => state.participants,
  participantWithId: state => id => {
    return state.participants.find(participant => participant.id === id)
  },
  lastParticipant: state => state.participants.slice(-1)[0],
  participantsInProgramWithId: state => id => {
    return state.participants.filter(participant => participant.participant_info.classroom.group.program.id === id)
  },
  otherParticipants: getters => id => {
    return getters.participants.filter(participant => {
      return participant.id !== id
    })
  },
  pledgesSortedByDateEntered: () => pledges => {
    return pledges.sort(function (pledgesA, pledgesB) {
      return new Date(pledgesA[0].ts_entered) - new Date(pledgesB[0].ts_entered)
    })
  },
  isFamilyPledgingEnabled: () => participant => {
    const program = participant.participant_info.classroom.group.program
    const isEnabledForProgram = program.program_pledge_setting.family_pledging_enabled === 1
    const isEnabledForParticipant = participant.participant_info.family_pledging_enabled === 1
    return isEnabledForProgram && isEnabledForParticipant
  },
  smallestIdParticipant: getters => participant => {
    const program = participant.participant_info.classroom.group.program
    const participantsInProgram = getters.participants.filter(participant => {
      return participant.participant_info.classroom.grade.program !== program.id
    })
    participantsInProgram.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return participantsInProgram[0]
  },
  participantPledgesWithFamilyPledges: () => (participant, otherParticipants) => {
    const pledges = participant.participant_info.pledges
    pledges.forEach((pledge, index) => {
      pledge.amount = parseFloat(pledge.amount)
      if (pledge.family_pledge_id !== null) {
        const familyPledges = [pledge]
        otherParticipants.forEach(otherParticipant => {
          otherParticipant.participant_info.pledges.forEach(siblingPledge => {
            if (siblingPledge.family_pledge_id === pledge.family_pledge_id && siblingPledge.id !== pledge.id) {
              familyPledges.push(siblingPledge)
            }
          })
        })
        pledges.splice(index, 1, familyPledges)
      } else {
        // Put the pledge into an array to keep the format of pledges consistent
        pledges.splice(index, 1, [pledge])
      }
    })
    return pledges
  },
}

const mutations = {
  SET_PARTICIPANTS: (state, participants) => {
    state.participants = participants
  },
}

const actions = {
  initParticipantsAndPledges ({ getters, commit }, participants) {
    const allPledges = []

    participants.forEach(participant => {
      const otherParticipants = participants.filter(otherParticipant => {
        return otherParticipant.id !== participant.id
      })

      let pledges = getters.participantPledgesWithFamilyPledges(participant, otherParticipants)
      pledges = getters.sortPledgesByDateEntered(pledges)

      participant.participant_info.pledges = pledges
      allPledges.push(pledges)
    })
    participants = sortBy(participants, 'first_name')
    commit('SET_PARTICIPANTS', participants)
    commit('SET_PLEDGES', allPledges)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
