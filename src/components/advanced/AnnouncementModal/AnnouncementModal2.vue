<template>
  <div v-show="show" class="modal-backdrop">
    <div class="modal">
      <h1 class="text-center text-2xl font-bold mb-4">
        Exciting new features are here!
      </h1>
      <p class="text-center text-grey-darker mb-6">
        Like with event handling, sometimes you need to bypass Vue's reactivity system and do old-school DOM manipulation to keep a
        component's logic encapsulated. This lesson will teach you how and when to do it.
      </p>
      <div class="text-center">
        <button type="button" class="btn btn-blue" @click="dismiss">
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnouncementModal2',
  props: {
    show: { required: true },
    preventBackgroundScrolling: { default: true },
  },
  watch: {
    show: {
      immediate: true,
      handler: function (show) {
        if (show) {
          this.preventBackgroundScrolling && document.body.style.setProperty('overflow', 'hidden')
        } else {
          this.preventBackgroundScrolling && document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  created () {
    const escapeHandler = e => {
      if (e.key === 'Escape' && this.show) {
        this.dismiss()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  methods: {
    dismiss () {
      this.$emit('close')
    },
  },
}
</script>
