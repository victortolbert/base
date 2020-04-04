import { shallowMount } from '@vue/test-utils'
import ParentComponent from './ParentComponent'
import ChildComponent from './ChildComponent'

describe('ParentComponent', () => {
  it('renders 3 Child components', () => {
    const wrapper = shallowMount(ParentComponent)
    expect(wrapper.findAll(ChildComponent).length).toBe(3)
  })

  test("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom')
    expect(wrapper.html()).toContain('Emitted!')
  })
})
