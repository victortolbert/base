import { shallowMount } from '@vue/test-utils'
import welcome from '../welcome.vue'

describe('welcome', () => {
  test('mounts properly', () => {
    const wrapper = shallowMount(welcome)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders properly', () => {
    const wrapper = shallowMount(welcome)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
