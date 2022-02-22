<template>
  <div>
    <slot />
  </div>
</template>

<script>
  import { getMe } from '@/util/api'
  import { getLocalStorage } from '@/util/localstorage'

  const token = getLocalStorage()
  const user = getMe(token).data

  export default {
    name: 'UserProvider',
    provide () {
      return {
        user,
      }
    },
  }
</script>
