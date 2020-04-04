<template>
  <button type="button" @click.prevent="modalOpen = true">
    <slot>Delete Account</slot>
    <ConfirmDeleteModal :show="modalOpen" :account-id="accountId" @close="modalOpen = false" />
  </button>
</template>

<script>
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal/ConfirmDeleteModal2'

export default {
  name: 'DeleteAccountButton4',
  components: {
    ConfirmDeleteModal,
  },
  props: ['accountId'],
  data () {
    return {
      modalOpen: false,
    }
  },
}
</script>
