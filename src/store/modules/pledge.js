const state = () => ({
  pledges: [],
  ppuPledgeTypeId: 1,
  pledgeStatusIdsWithPayment: [3, 8],
  pledgeStatusClasses: {
    1: 'text-green',
    2: '',
    3: 'text-green',
    4: 'text-orange',
    5: 'text-green',
    6: 'text-green',
    7: 'text-green',
    8: 'text-green',
  },
})

const getters = {
  pledges: state => state.pledges,

  ppuPledgeTypeId: state => state.ppuPledgeTypeId,

  pledgeStatusIdsWithPayment: state => state.pledgeStatusIdsWithPayment,

  pledgeStatusClasses: state => state.pledgeStatusClasses,

  hasPaidAllPledges: getters => pledges => {
    return pledges.map(pledge => pledge.pledge_status_id)
      .flat(1)
      .every((pledgeStatusId) => getters.pledgeStatusIdsWithPayment.includes(pledgeStatusId))
  },

  pledgeTotal: () => (pledges, unit_range_low, unit_range_high) => {
    const totals = pledges.reduce(
      (totals, pledge) => {
        if (pledge.pledge_type_id === 1) {
          totals.low += pledge.amount * unit_range_low
          totals.high += pledge.amount * unit_range_high
        } else {
          totals.low += pledge.amount
          totals.high += pledge.amount
        }
        return totals
      },
      { low: 0, high: 0 },
    )
    let totalsString = totals.low
    if (totals.low !== totals.high) {
      totalsString += ' to $' + totals.high
    }
    return totalsString
  },

  isMissingPayment: () => pledges => {
    const unPaidPledge = pledges.find((pledge) => {
      return pledge.hasPendingPayment === false && pledge.payment_id === null
    })
    return unPaidPledge !== undefined
  },

  showAllStatuses: () => pledges => {
    const statuses = pledges.map(pledge => {
      return pledge.pledge_status_id
    })
    const statusSet = new Set(statuses)
    return statusSet.size > 1
  },

  pledgeProgram: (state, getters) => pledge => {
    return getters.participantById(pledge.participant_user_id).participant_info.classroom.group.program
  },

  flatPledges: () => pledges => {
    const flatPledges = []

    pledges.forEach(pledgeArray => {
      pledgeArray.forEach(pledge => {
        flatPledges.push(pledge)
      })
    })

    return flatPledges
  },

  pledgesByParticipantId: ({ getters }) => participantId => {
    const participant = getters.participantById(participantId)
    const otherParticipants = getters.otherParticipants(participantId)

    return getters.addFamilyPledgesToPledges(participant, otherParticipants)
  },
}

const mutations = {
  SET_PLEDGES: (state, pledges) => {
    state.pledges = pledges
  },
}

const actions = {
  deletePledge ({ getters, commit }, pledgeId) {
    const participants = getters.participants

    participants.forEach(participant => {
      participant.participant_info.pledges.forEach((pledgeArray, pledgeArrayIndex) => {
        pledgeArray.forEach((pledge, index) => {
          if (pledge.id === pledgeId) {
            pledgeArray.splice(index, 1)
          }
        })
        if (pledgeArray.length === 0) {
          participant.participant_info.pledges.splice(pledgeArrayIndex, 1)
        }
      })
    })

    commit('SET_PARTICIPANTS', participants)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
