<template>
  <button type="button" class="text-red-900 hover:underline" @click="confirmDeleteModalOpen = true">
    Delete Account
    <!-- Content is not rendered here... -->
    <Portal to="modals">
      <ConfirmDeleteModal :show="confirmDeleteModalOpen" :account-id="accountId" @close="confirmDeleteModalOpen = false" />
    </Portal>
  </button>
</template>

<script>
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

export default {
  name: 'DeleteAccountButton',
  components: {
    ConfirmDeleteModal,
  },
  props: ['accountId'],
  data () {
    return {
      confirmDeleteModalOpen: false,
    }
  },
}
</script>
