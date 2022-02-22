<template>
  <div>
    <slot />
  </div>
</template>

<script>
  import { getMe } from '@/util/api'
  import { getLocalStorage } from '@/util/localstorage'

  const token = getLocalStorage()

  export default {
    name: 'UserProvider',
    data () {
      return {
        user: {},
      }
    },
    provide () {
      return {
        user: this.user,
        admin: false,
      }
    },

    watch: {
      user () {
        this.admin = this.user.value.data.is_admin
      },
    },

    async beforeMount () {
      this.user.value = { ...await getMe(token) }
    },
  }
</script>
