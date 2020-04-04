<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">
      Your Settings
    </h1>
    <label class="block mb-6">
      <span class="block text-gray-600 font-semibold mb-2">Email Address</span>
      <input v-model="email" class="form-input" placeholder="you@example.com">
    </label>
    <div class="mb-8">
      <span class="block text-gray-600 font-semibold mb-2">Newsletter</span>
      <div class="flex justify-between items-center">
        <p class="mr-4">
          Send you occasional news and updates.
        </p>
        <ToggleInput v-model="receiveNewsletter" class="flex-no-shrink" />
      </div>
    </div>
    <div class="flex justify-between">
      <DeleteAccountButton :account-id="accountId" class="text-red-800 hover:underline">
        Delete Account
      </DeleteAccountButton>
      <button type="button" class="btn btn-blue" @click="submit">
        Update Settings
      </button>
    </div>
  </div>
</template>

<script>
import DeleteAccountButton from '@/components/DeleteAccountButton/DeleteAccountButton4'
import ToggleInput from '@/components/ToggleInput'

export default {
  name: 'UserSettingsForm6',
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
    submit () {
      console.log('Submitting preferences...', {
        email: this.email,
        receiveNewsletter: this.receiveNewsletter,
      })
    },
  },
}
</script>
