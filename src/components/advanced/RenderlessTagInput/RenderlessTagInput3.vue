<script>
export default {
  name: 'RenderlessTagInput3',
  model: {
    prop: 'tags',
    event: 'update',
  },
  props: ['tags'],
  methods: {
    removeTag (tag) {
      this.$emit('update', this.tags.filter(t => t !== tag))
    },
  },
  render () {
    return this.$scopedSlots.default({
      tags: this.tags,
      removeTag: this.removeTag,
    })
  },
}
</script>
