import { shallowMount } from '@vue/test-utils'
import ProgramHeader from './ProgramHeader.vue'

const $store = {
  state: {
    s3Bucket: 'funrun-dev',
  },
}

describe('ProgramHeader', () => {
  test('renders properly with school image', () => {
    const wrapper = shallowMount(ProgramHeader, {
      mocks: { $store },
      propsData: {
        program: {
          event_name: 'Event Name',
          microsite: {
            school_image_name: 'school_image.jpg',
          },
        },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders properly without a school image', () => {
    const wrapper = shallowMount(ProgramHeader, {
      mocks: { $store },
      propsData: {
        program: {
          event_name: 'Event Name',
          microsite: {
            school_image_name: null,
          },
        },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
