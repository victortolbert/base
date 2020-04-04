import _ from 'lodash'

const state = () => ({
  programs: [],
})

const getters = {
  programs: state => state.programs,

  program: state => id => {
    return state.programs.find(program => program.id === id)
  },

  programByParticipant: () => participant => {
    return participant.participant_info.classroom.group.program
  },

  participantsInProgram: getters => programId => {
    return getters.participants.filter(participant => {
      return participant.participant_info.classroom.group.program === programId
    })
  },
}

const mutations = {
  SET_PROGRAMS: (state, programs) => {
    state.programs = programs
  },
}

const actions = {
  initPrograms: ({ commit, getters }) => {
    const programs = []

    getters.participants.forEach(participant => {
      const programId = participant.participant_info.classroom.group.program.id
      let program = programs.find(program => program.id === programId)
      if (program === undefined || !participant.participant_info.family_pledging_enabled) {
        program = participant.participant_info.classroom.group.program
        programs.push(program)
      }
    })
    _.sortBy(programs, 'name')

    commit('SET_PROGRAMS', programs)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
