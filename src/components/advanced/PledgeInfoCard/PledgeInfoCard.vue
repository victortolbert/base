<template>
  <div :class="['pledge-info-card flip-card', { flipped: flipped }]">
    <div class="flip-card-inner">
      <div class="flip-card-front bg-white border border-b-2 shadow-md border-grey-light rounded-lg p-2 px-4">
        <div class="flex items-center mb-2">
          <div class="w-1/2">
            <div class="leading-none">
              <span class="font-semibold text-lg"> {{ sponsor.first_name }} {{ sponsor.last_name }}</span><br>
              <span class="text-xxs has-text-grey">
                date
              </span>
            </div>
          </div>
          <div class="w-1/2 has-text-right">
            <div class="flex justify-end">
              <a v-if="comment" class="ml-2 flex flex-col items-center has-text-grey" @click.prevent="flip">
                comment-alt-lines
                <div class="text-xxs whitespace-no-wrap capitalize">
                  lang.view_comment
                </div>
              </a>
              <a class="ml-2 flex flex-col items-center has-text-grey" @click.prevent="">
                envelope
                <div class="text-xxs capitalize">
                  lang.remind
                </div>
              </a>
              <a class="ml-6 flex flex-col items-center has-text-grey" @click.prevent="">
                edit
                <div class="text-xxs capitalize">
                  lang.edit
                </div>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div v-for="pledge in pledges" :key="pledge.id" class="text-sm">
            <div class="flex justify-between border-b-2">
              <div>
                {{ pledge.participant.first_name }}
              </div>
              <div>$ {{ pledge.amount }} <span v-if="pledge.pledge_type_id === 1">program.unit.modifier program.unit.name</span></div>
            </div>
            <div v-if="true" class="flex justify-between items-baseline">
              <span class="capitalize font-bold">
                lang.statuses[pledge.pledge_status_id]
              </span>
              <div v-if="false" class="text-base capitalize">
                lang.total <span class="font-bold">pledgeTotal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flip-card-back align-middle bg-white border border-b-2 shadow-md border-grey-light rounded-lg p-2 px-4">
        <div class="flex items-center mb-2">
          <div class="w-1/2">
            <div class="leading-none">
              <span class="font-semibold"> pledgeSponsor.first_name pledgeSponsor.last_name </span>
            </div>
          </div>
          <div class="w-1/2 has-text-right">
            <div class="flex justify-end">
              <a class="ml-6 flex flex-col items-center has-text-grey" @click.prevent="flip">
                &times;
              </a>
            </div>
          </div>
        </div>
        <p class="p-4 flex items-center justify-center">
          <span class="text-center"> “{{ comment }}” </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pledges: {
      type: Array,
      default: null,
    },
    program: {
      type: Object,
      default: null,
    },
    comment: {
      type: String,
      default: 'Default Comment',
    },
    sponsor: {
      type: Object,
      default: () => ({
        first_name: 'Victor',
        last_name: 'Tolbert',
      }),
    },
  },
  data () {
    return {
      flipped: false,
      statusClasses: {
        1: 'text-green',
        2: 'text-red',
        3: 'text-green',
        4: 'text-green',
        5: 'text-green',
        6: 'text-green',
        7: 'text-green',
        8: 'text-green',
      },
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    showAllStatuses () {
      const statuses = this.pledges.map(pledge => {
        return pledge.status
      })
      const statusSet = new Set(statuses)
      return statusSet.size > 1
    },
    pledgeSponsor () {
      return this.pledges[0].pledge_sponsor
    },
    date () {
      const date = new Date(this.pledges[0].ts_entered)
      return this.lang.months[date.getMonth()] + ' ' + date.getDate()
    },
    pledgeTotal () {
      const totals = this.pledges.reduce(
        (totals, pledge) => {
          if (pledge.pledge_type_id === 1) {
            totals.low += pledge.amount * this.program.unit_range_low
            totals.high += pledge.amount * this.program.unit_range_high
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
  },
  methods: {
    flip () {
      this.flipped = !this.flipped
    },
  },
}
</script>

<style lang="scss" scoped>
.flip-card {
  background-color: transparent;
  height: 130px;
  perspective: 1000px;

  .table th,
  .table td {
    padding: 0.25rem 0;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>
