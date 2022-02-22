<template>
  <v-fade-transition mode="out-in">
    <user-provider>
      <router-view />
    </user-provider>
  </v-fade-transition>
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'
  import UserProvider from './views/UserProvider.vue'

  export default {
    name: 'App',
    components: { UserProvider },
    metaInfo: {
      title: 'App',
      titleTemplate: '%s | Material Dashboard Free',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  }
</script>
