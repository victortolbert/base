<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">
      Your Contacts
    </h1>
    <div>
      <div v-for="contact in contacts" :key="contact.id" class="flex items-center py-1">
        <img :src="contact.picture.medium" class="h-12 w-12 rounded-full block mr-2" alt="">
        <div>
          <div class="font-bold">
            {{ pseudoSlot({ contact: contact }) }}
          </div>
          <div class="font-bold">
            <slot :contact="contact" />
          </div>
          <div class="text-gray-600">
            {{ contact.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pseudoSlot'],
  data () {
    return {
      contacts: [],
    }
  },
  created () {
    fetch('/contacts.json')
      .then(response => response.json())
      .then(contacts => (this.contacts = contacts))
  },
}
</script>
