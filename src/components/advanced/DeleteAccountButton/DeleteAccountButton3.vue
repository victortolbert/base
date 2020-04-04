<template>
  <button type="button" @click="modalOpen = true">
    <slot>Delete Account</slot>
    <Portal v-if="modalOpen" to="modals">
      <ConfirmDeleteModal :show="modalOpen" :account-id="accountId" @close="modalOpen = false" />
    </Portal>
  </button>
</template>

<script>
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

export default {
  name: 'DeleteAccountButton3',
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
