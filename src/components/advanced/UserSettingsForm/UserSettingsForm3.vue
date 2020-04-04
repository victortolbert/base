<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">
      Your Settings
    </h1>
    <label class="block mb-6">
      <span class="block text-grey-darker font-semibold mb-2">Email Address</span>
      <input v-model="email" class="form-input" placeholder="you@example.com">
    </label>
    <div class="mb-8">
      <span class="block text-grey-darker font-semibold mb-2">Newsletter</span>
      <div class="flex justify-between items-center">
        <p class="mr-4">
          Send you occasional news and updates.
        </p>
        <ToggleInput v-model="receiveNewsletter" class="flex-no-shrink" />
      </div>
    </div>
    <div class="flex justify-between">
      <DeleteAccountButton :account-id="accountId" />
      <button type="button" class="btn btn-blue">
        Update Settings
      </button>
    </div>
  </div>
</template>

<script>
import ToggleInput from '@/components/ToggleInput'
import DeleteAccountButton from '@/components/DeleteAccountButton'

export default {
  components: {
    DeleteAccountButton,
    ToggleInput,
  },
  props: ['accountId'],
  data () {
    return {
      email: 'jane@example.com',
      receiveNewsletter: false,
    }
  },
  methods: {
    toggleNewsletter () {
      this.receiveNewsletter = !this.receiveNewsletter
    },
  },
}
</script>
