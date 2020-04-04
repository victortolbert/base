<script>
import ToggleInput from '@/components/ToggleInput'

export default {
  name: 'HelloWorld2',
  props: [],
  data () {
    return {
      toggled: true,
    }
  },
  render (createElement) {
    return createElement(ToggleInput, {
      props: {
        value: this.toggled,
      },
      on: {
        input: newValue => (this.toggled = newValue),
      },
    })
  },
}
</script>
