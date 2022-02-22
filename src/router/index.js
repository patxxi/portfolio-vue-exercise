// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import { getLocalStorage } from '@/util/localstorage'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard', null, '/'),

      // Pages
      route('UserProfile', null, 'components/profile'),
      route('Signup', null, 'user/signup'),
      route('Login', null, 'user/login'),

      // Components
      route('Notifications', null, 'components/notifications'),
      route('Icons', null, 'components/icons'),
      route('Typography', null, 'components/typography'),

      // Tables
      route('Regular Tables', null, 'tables/regular'),

      // Maps
      route('Google Maps', null, 'maps/google'),
    ]),
  ],
})

router.beforeEach((to, from, next) => {
  const token = getLocalStorage()
  if (to.name !== 'Login' && to.name !== 'Signup') {
    if (!token) {
      return { name: 'Login' }
    }
  }

  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
