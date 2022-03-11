// Pathify
import { make } from 'vuex-pathify'

// util

// Data
const items = [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'User Profile',
      icon: 'mdi-account',
      to: '/user/profile/',
    },
    {
      title: 'Admin',
      icon: 'mdi-clipboard-outline',
      to: '/admin/',
    },
    {
      title: 'Add Project',
      icon: 'mdi-briefcase-plus',
      to: '/project/new',
    },
  ]

const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
