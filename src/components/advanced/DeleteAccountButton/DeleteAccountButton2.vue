<template>
  <button type="button" class="text-red-dark hover:underline" @click="modalOpen = true">
    Delete Account
    <Portal v-if="modalOpen" to="modals">
      <ConfirmDeleteModal :show="modalOpen" :account-id="accountId" @close="modalOpen = false" />
    </Portal>
  </button>
</template>

<script>
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

export default {
  name: 'DeleteAccountButton2',
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
