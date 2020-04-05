import Vue from 'vue'
import { camelCase, upperFirst } from 'lodash'
import titleMixin from '@/mixins/titleMixin'
import App from '@/App.vue'
import i18n from '@/plugins/i18n'

import router from '@/router'
import store from '@/vuex/store'

import { timeAgo, host } from '@/filters'

import DefaultLayout from '@/layouts/DefaultLayout'
import FullScreenLayout from '@/layouts/FullScreenLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import FlexboxAppLayout from '@/layouts/FlexboxAppLayout'

import AppLogo from '@/components/AppLogo'
import ProgressBar from '@/components/ProgressBar'

import '@/registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/plugins/gravatar'
import '@/plugins/vue-particles'
import '@/plugins/portal-vue'
import '@/plugins/tooltips'
// import '@/plugins/validation'

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true
// process.env.NODE_ENV === 'production'
// TODO Make baseURL dependent on env
window.axios.defaults.baseURL = 'https://tolbert.design'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.mixin(titleMixin)

Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')),
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
Vue.component('DefaultLayout', DefaultLayout)
Vue.component('FlexboxAppLayout', FlexboxAppLayout)
Vue.component('FullScreenLayout', FullScreenLayout)
Vue.component('SidebarLayout', SidebarLayout)
Vue.component('AppLogo', AppLogo)

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

const app = new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       return routes[this.currentRoute] || Dashboard
//     }
//   },
//   render (h) { return h(this.ViewComponent) },
// }).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}

// import ClickToCopy from '@/ClickToCopy'
//
// require('@/navigation')
// require('slick-carousel/slick/slick')
//
// ClickToCopy.enable()
//
// const GoogleAnalytics = require('@/GoogleAnalytics')
// const googleAnalytics = new GoogleAnalytics()
// googleAnalytics.enable()
//
// const Facebook = require('@/Facebook')
// const facebook = new Facebook()
// facebook.enable()
//
// const CarouselCustomizations = require('@/CarouselCustomizations')
// const carouselCustomizations = new CarouselCustomizations()
// carouselCustomizations.enable()
// require('@/slick-custom')
// refactor this out
// document.cookie = 'hide_cookie_policy=hide;expires= Fri, 31 Dec 9999 23:59:59 GMT';
