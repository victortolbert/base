<template>
  <tr class="relative group hover:bg-grey-lighter hover:shadow cursor-pointer flex flex-col md:flex-row border-b">
    <td class="md:py-2 pr-3">
      <input v-model="message.isSelected" type="checkbox" @click.stop="">
    </td>
    <td class="md:py-2 pr-6" @click.stop="goTo(message.id)">
      {{ message.sender }}
    </td>
    <td v-if="message.tags.length" class="md:py-2 pr-1 text-black whitespace-no-wrap" @click.stop="goTo(message.id)">
      <span v-for="tag in message.tags" :key="tag" class="mr-1 p-1 bg-grey-light rounded text-xs capitalize" :class="tag">
        {{ tag }}
      </span>
    </td>
    <td class="md:py-2 pr-4 text-black font-medium md:flex-grow xl:flex-no-grow" @click.stop="goTo(message.id)">
      {{ message.subject }}
    </td>
    <td class="md:py-2 hidden xl:block pr-2 flex-grow" @click.stop="goTo(message.id)">
      {{ shortBody }}
    </td>
    <td class="md:py-2 pr-2 text-right group-hover:invisible" @click.stop="goTo(message.id)">
      {{ new Date(message.date).toLocaleDateString() }}
    </td>
    <td class="invisible group-hover:visible absolute pin-r align-middle pr-2 py-2">
      <!-- <span class="align-middle text-sm"> -->
      <a href="#" class="trash" title="Delete" @click.stop="">
        <svgicon icon="archive" />
      </a>
      <a href="#" class="trash" title="Delete" @click.stop="removeMessage(message)">
        <svgicon icon="delete" />
      </a>
      <a href="#" class="mark" title="Mark as unread" @click.stop="">
        <svgicon icon="email-open" />
      </a>
      <a href="#" class="snooze" title="Snooze" @click.stop="">
        <svgicon icon="clock" />
      </a>
      <!-- </span> -->
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'
import { strip } from '~/shared'

export default {
  props: {
    message: {
      type: Object,
    },
  },
  computed: {
    shortBody () {
      return `${strip(this.message.body).substr(0, 50)}...`
    },
  },
  methods: {
    goTo (id) {
      this.$router.push({ path: `/${id}` })
    },
    ...mapActions(['removeMessage']),
  },
}
</script>
