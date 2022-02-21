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

    <v-btn
      elevation="2"
      large
      color="primary"
      @click="handleSubmit"
    >
      Submit
    </v-btn>
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

        const { data } = await postSignup(formData)
        console.log(data)
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
    margin: 10px 0px;
}
</style>
