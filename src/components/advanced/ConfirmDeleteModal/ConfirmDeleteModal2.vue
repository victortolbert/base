<template>
  <ModalDialog :show="show" @close="cancel">
    <h1 class="text-center text-2xl font-bold mb-4">
      Are you sure?
    </h1>
    <p class="text-center text-grey-darker mb-6">
      Deleting your account cannot be undone.
    </p>
    <div class="text-center">
      <button type="button" class="btn btn-grey mr-4" @click="cancel">
        Cancel
      </button>
      <button type="button" class="btn btn-red" @click="confirmDelete">
        Delete it
      </button>
    </div>
  </ModalDialog>
</template>

<script>
import ModalDialog from '@/components/ModalDialog'

export default {
  name: 'ConfirmDeleteModal2',
  components: {
    ModalDialog,
  },
  props: ['show', 'accountId'],
  methods: {
    cancel () {
      this.$emit('close')
    },
    confirmDelete () {
      console.log(`Deleting account ${this.accountId}...`)
      this.$emit('close')
    },
  },
}
</script>
