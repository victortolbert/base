<script>
import contacts from '../../static/contacts.json'

export default {
  name: 'HelloWorld3',
  props: [],
  data () {
    return { contacts }
  },
  render (createElement) {
    return createElement('div', {}, [
      createElement('h1', {}, 'Your Contacts'),
      createElement(
        'ul',
        {},
        this.contacts.map(contact => {
          return createElement('li', {}, `${contact.name.first} ${contact.name.last}`)
        }),
      ),
    ])
  },
}
</script>
