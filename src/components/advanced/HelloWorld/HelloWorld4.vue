<script>
export default {
  name: 'HelloWorld4',
  render (createElement) {
    return this.$scopedSlots.default({
      subject: 'world',
    })
  },
}
</script>
