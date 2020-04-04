import Vue from 'vue'

import BaseLink from '@/components/BaseLink/BaseLink'
import BaseInput from '@/components/BaseInput/BaseInput'

// import BaseTextarea from '@/components/BaseTextarea'
// import BaseIcon from '@/components/element/BaseIcon'
// import AvatarImage from '@/components/element/AvatarImage'
// import RingChart from '@/components/element/RingChart'
// import ProgressMeter from '@/components/element/ProgressMeter'
// import SendEnvelope from '@/components/element/SendEnvelope'
// import VideoIframe from '@/components/element/VideoIframe'

// Where 'editor' is the name of the component <editor></editor>
// Returns a promise that only gets called when the compoent is rendered and then cached.
// Vue.component('editor', () => import('./componetns/Editor.vue'))

Vue.component('BaseInput', BaseInput)
Vue.component('BaseLink', BaseLink)

// Vue.component('BaseTextarea', BaseTextarea)
// Vue.component('BaseIcon', BaseIcon)
// Vue.component('AvatarImage', AvatarImage)
// Vue.component('RingChart', RingChart)
// Vue.component('ProgressMeter', ProgressMeter)
// Vue.component('SendEnvelope', SendEnvelope)
// Vue.component('VideoIframe', VideoIframe)

// https://github.com/cretueusebiu/laravel-vue-spa/blob/master/resources/js/components/index.js

// import Vue from 'vue'
// import Card from './Card'
// import Child from './Child'
// import Button from './Button'
// import Checkbox from './Checkbox'
// import { HasError, AlertError, AlertSuccess } from 'vform'

// // Components that are registered globaly.
// [
//   Card,
//   Child,
//   Button,
//   Checkbox,
//   HasError,
//   AlertError,
//   AlertSuccess
// ].forEach(Component => {
//   Vue.component(Component.name, Component)
// })
