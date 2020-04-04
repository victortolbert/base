---
title: Vuex Notes
type: guide
order: 201
---
## Easy Emailer

```js
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['lang']),
    program () {
        return this.$store.getters.programByParticipant(this.participant);
    },
    participant () {
        return this.$store.getters.participantById(parseInt(this.$route.params.participantUserId));
    },
    isFamilyPledgingEnabled () {
        return this.$store.getters.isFamilyPledgingEnabled(this.participant);
    },
    smallestIdParticipant () {
        return this.$store.getters.smallestIdParticipant(this.participant);
    }
  }
}
```

## Edit Participant

```html
<edit-participant-form
  :participant="participant"
  :classrooms="participantProgramClassrooms"
  :settings="settings"
/>
```

```js
computed: {
  settings () {
    return {
        unit: this.participantProgram.unit,
        unitRangeLow: this.participantProgram.unit_range_low,
        unitRangeHigh: this.participantProgram.unit_range_high
    }
  },
  participant () {
    return this.$store.getters.participantById(parseInt(this.$route.params.id))
  },
  participantProgram () {
    return this.participant.participant_info.classroom.group.program
  }
  participantProgramClassrooms () {
    return this.participantProgram.classrooms
  },

```

## Teacher Dashboard

```js
activePrograms: state => {
  return state.User.programs.filter(program => {
    return program.archived === 0 && program.deleted === 0
  })
},
teacherPrograms: (state, getters) => {
    let programs = []
    return getters.activePrograms.forEach(program => {
        program.participants.forEach(participant => {
            if (participant.id === state.user.teacher_participant_id) {
                programs.push(program)
            }
        })
    })
    return programs
}
```

## Parent Dashboard

```js
import { mapGetters } from 'vue'
export default {
  computed: {
    ...mapGetters(['programs'])
  }
}
```

## Loader

```js
export default {
  created () {
    this.$store.dispatch('initStore', this.user)
    this.$store.commit('SET_S3_BUCKET', this.s3_bucket)
    this.$store.commit('SET_AVATAR_PATH', this.avatar_path)
    this.$store.commit('SET_LANG', this.lang)
  }
}
```
