<template>
  <div class="search-select" :class="{ 'is-active': isOpen }">
    <button ref="button" type="button" class="search-select-input" @click="open">
      <span v-if="value !== null">{{ value }}</span>
      <span v-else class="search-select-placeholder">Select a band...</span>
    </button>
    <div v-show="isOpen" class="search-select-dropdown">
      <input
        ref="search"
        v-model="search"
        class="search-select-search"
        @keydown.esc="close"
        @keydown.up="highlightPrev"
        @keydown.down="highlightNext"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.tab.prevent
      >
      <ul v-show="filteredOptions.length > 0" ref="options" class="search-select-options">
        <li
          v-for="(option, i) in filteredOptions"
          :key="option"
          class="search-select-option"
          :class="{ 'is-active': i === highlightedIndex }"
          @click="select(option)"
        >
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
  name: 'SearchSelect5',
  props: ['value', 'options', 'filterFunction'],
  data () {
    return {
      isOpen: false,
      search: '',
      highlightedIndex: 0,
    }
  },
  computed: {
    filteredOptions () {
      return this.filterFunction(this.search, this.options)
    },
  },
  methods: {
    open () {
      if (this.isOpen) {
        return
      }
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.search.focus()
        this.scrollToHighlighted()
      })
    },
    close () {
      this.isOpen = false
      this.$refs.button.focus()
    },
    select (option) {
      this.$emit('input', option)
      this.search = ''
      this.highlightedIndex = 0
      this.close()
    },
    selectHighlighted () {
      this.select(this.filteredOptions[this.highlightedIndex])
    },
    scrollToHighlighted () {
      this.$refs.options.children[this.highlightedIndex].scrollIntoView({
        block: 'nearest',
      })
    },
    highlight (index) {
      this.highlightedIndex = index

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.filteredOptions.length - 1
      }

      if (this.highlightedIndex > this.filteredOptions.length - 1) {
        this.highlightedIndex = 0
      }

      this.scrollToHighlighted()
    },
    highlightPrev () {
      this.highlight(this.highlightedIndex - 1)
    },
    highlightNext () {
      this.highlight(this.highlightedIndex + 1)
    },
  },
}
</script>
