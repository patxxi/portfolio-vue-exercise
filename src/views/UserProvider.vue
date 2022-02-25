<template>
  <div>
    <slot />
  </div>
</template>

<script>
  import { getMe } from '@/util/api'
  import { getLocalStorage } from '@/util/localstorage'

  const token = getLocalStorage('token')

  export default {
    name: 'UserProvider',
    data () {
      return {
        user: {},
        admin: {},
      }
    },
    provide () {
      return {
        user: this.user,
        admin: this.admin,
      }
    },

    async beforeMount () {
      if (token) {
        this.user.value = { ...await getMe(token) }
        this.admin.value = this.user.value.data.is_admin
      }
    },
  }
</script>
