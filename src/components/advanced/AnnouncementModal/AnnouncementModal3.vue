<template>
  <ModalDialog :show="show" @close="dismiss">
    <h1 class="text-center text-2xl font-bold mb-4">
      Exciting new features are here!
    </h1>
    <p class="text-center text-grey-darker mb-6">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. At ut eligendi quod tempore totam explicabo sit consectetur architecto?
      Tempora, repellat est rem ut esse ab officia saepe ratione tempore. Obcaecati.
    </p>
    <div class="text-center">
      <button type="button" class="btn btn-blue" @click="dismiss">
        Dismiss
      </button>
    </div>
  </ModalDialog>
</template>

<script>
import ModalDialog from '@/components/ModalDialog'

export default {
  name: 'AnnouncementModal3',
  components: {
    ModalDialog,
  },
  props: ['show'],
  methods: {
    dismiss () {
      this.$emit('close')
    },
  },
}
</script>
