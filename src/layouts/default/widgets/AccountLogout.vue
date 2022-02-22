<template>
  <v-btn
    class="ml-2"
    min-width="0"
    text
    @click="handleLogout"
  >
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script>
  import { removeLocalStorage } from '../../../util/localstorage'
  export default {
    name: 'AccountLogout',
    methods: {
      handleLogout () {
        removeLocalStorage()
        this.$router.push('/user/login')
      },
    },
  }
</script>
