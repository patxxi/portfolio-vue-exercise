<template>
  <v-form
    id="form"
    v-model="valid"
  >
    <v-text-field
      v-model="email"
      label="Email"
    />

    <v-text-field
      v-model="password"
      label="Contraseña"
    />

    <v-row>
      <v-btn
        elevation="2"
        large
        color="#08a30d"
        @click="handleSubmit"
      >
        Iniciar Sesion
      </v-btn>

      <v-btn
        elevation="2"
        large
        color="#0320fc"
        @click="handleSignup"
      >
        Registrarse
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
  import { postLogin } from '../util/api'
  import { saveLocalStorage } from '../util/localstorage'
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        valid: true,
      }
    },

    methods: {
      async handleSubmit () {
        const form = { ...this.$data }
        const { data, request } = await postLogin(form)

        if (request.ok) {
          saveLocalStorage({ key: 'token', value: data.access_token })
          this.$router.push({ path: '/' })
        }
      },

      handleSignup () {
        this.$router.push({ path: '/user/signup' })
      },
    },

  }
</script>

<style scoped>
.v-form {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;

}
.v-btn {
    margin: 10px;
    color: white;
}

</style>
