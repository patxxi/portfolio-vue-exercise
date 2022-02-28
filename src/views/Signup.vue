<template>
  <v-form
    id="form"
    v-model="valid"
  >
    <v-text-field
      v-model="first_name"
      label="Nombre"
    />
    <v-text-field
      v-model="last_name"
      label="Apellido"
    />
    <v-text-field
      v-model="email"
      label="Email"
    />
    <v-text-field
      v-model="address"
      label="Direccion"
    />
    <v-text-field
      v-model="state"
      label="Estado"
    />
    <v-text-field
      v-model="city"
      label="Ciudad"
    />

    <v-text-field
      v-model="identification_card"
      label="Cedula"
    />
    <v-text-field
      v-model="password"
      label="Contraseña"
    />
    <v-text-field
      v-model="repeat_password"
      label="Repetir Contraseña"
    />

    <v-date-picker
      v-model="born"
      label="Fecha de Nacimiento"
    />

    <v-file-input
      v-model="image"
      label="Imagen"
      filled
      prepend-icon="mdi-camera"
    />

    <v-row>
      <v-btn
        elevation="2"
        large
        color="#08a30d"
        @click="handleSubmit"
      >
        Registrarse
      </v-btn>

      <v-btn
        elevation="2"
        large
        color="#0320fc"
        @click="handleLogin"
      >
        Iniciar Sesion
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
  import { postSignup } from '../util/api'
  export default {
    name: 'Signup',
    props: {},
    data () {
      return {
        valid: true,
        state: '',
        city: '',
        first_name: '',
        email: '',
        last_name: '',
        address: '',
        born: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        password: '',
        repeat_password: '',
        identification_card: '',
        is_admin: 1,
        image: '',
      }
    },
    methods: {
      async handleSubmit () {
        const form = { ...this.$data, born: this.$data.born.replaceAll('-', '/') }
        const date = form.born.split('/')
        form.born = `${date[1]}/${date[2]}/${date[0]}`
        const formData = new FormData()
        delete form.valid
        delete form.repeat_password
        Object.keys(form).forEach(key => {
          formData.append(key, form[key])
        })

        const { data, request } = await postSignup(formData)
        console.log(data)
        if (request.ok) {
          this.$router.push({ path: '/user/login' })
        }
      },

      handleLogin () {
        this.$router.push({ path: '/user/login' })
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
