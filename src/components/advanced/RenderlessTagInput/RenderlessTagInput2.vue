<script>
export default {
  name: 'RenderlessTagInput2',
  model: {
    prop: 'tags',
    event: 'update',
  },
  props: ['tags'],
  render () {
    return this.$scopedSlots.default({
      tags: this.tags,
    })
  },
}
</script>
