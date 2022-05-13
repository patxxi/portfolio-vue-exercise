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
      title: 'Perfil de usuario',
      icon: 'mdi-account',
      to: '/user/profile/',
    },
    {
      title: 'Admin',
      icon: 'mdi-clipboard-outline',
      to: '/admin/',
    },
    {
      title: 'Agregar proyecto',
      icon: 'mdi-briefcase-plus',
      to: '/project/new',
    },
    {
      title: 'Planes',
      icon: 'mdi-clipboard-text',
      to: '/plan/',
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
