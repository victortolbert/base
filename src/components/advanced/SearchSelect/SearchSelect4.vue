<template>
  <div class="search-select" :class="{ 'is-active': isOpen }">
    <button ref="button" type="button" class="search-select-input" @click="open">
      <span v-if="value !== null">{{ value }}</span>
      <span v-else class="search-select-placeholder">Select a band...</span>
    </button>
    <div v-show="isOpen" class="search-select-dropdown">
      <input ref="search" v-model="search" class="search-select-search">
      <ul v-show="filteredOptions.length > 0" class="search-select-options">
        <li v-for="option in filteredOptions" :key="option" class="search-select-option" @click="select(option)">
          {{ option }}
        </li>
      </ul>
      <div v-show="filteredOptions.length === 0" class="search-select-empty">
        No results found for "{{ search }}"
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSelect4',
  props: ['value', 'options', 'filterFunction'],
  data () {
    return {
      isOpen: false,
      search: '',
    }
  },
  computed: {
    filteredOptions () {
      return this.filterFunction(this.search, this.options)
    },
  },
  methods: {
    open () {
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    close () {
      this.isOpen = false
      this.$refs.button.focus()
    },
    select (option) {
      this.$emit('input', option)
      this.search = ''
      this.close()
    },
  },
}
</script>
