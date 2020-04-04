<script>
export default {
  name: 'HelloWorld',
  props: ['tag'],
  data () {
    return {}
  },
  render (createElement) {
    return createElement(
      this.tag,
      {
        attrs: {
          class: 'btn btn-blue',
        },
        on: {
          click: () => alert('Clicked!'),
        },
      },
      'Hello world!',
    )
  },
}
</script>
