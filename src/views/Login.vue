<template>
  <v-form
    id="form"
    ref="form"
    v-model="valid"
  >
    <div
      v-if="!isActive"
      class="submit-error"
    >
      <span>El usuario no está activo</span>
    </div>

    <div
      v-if="!isCorrectInputs"

      class="submit-error"
    >
      <span>Los datos no coinciden con un usuario registrado</span>
    </div>

    <v-text-field
      v-model="email"
      label="Email"
      :rules="emailRules"
      required
    />

    <v-text-field
      v-model="password"
      label="Contraseña"
      type="password"
      :rules="passwordRules"
      required
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
  import { postLogin, getMe } from '../util/api'
  import { saveLocalStorage } from '../util/localstorage'
  import { validateEmail } from '../validators/LoginValidator'
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        valid: true,
        isActive: true,
        isCorrectInputs: true,
        emailRules: [
          v => !!v || 'Email requerido',
          v => validateEmail(v) || 'Email no valido',
        ],
        passwordRules: [
          v => !!v || 'Contraseña requerida',
        ],
      }
    },

    methods: {
      async handleSubmit () {
        const form = { ...this.$data }

        const validate = this.$refs.form.validate()

        if (validate) {
          const { data, request } = await postLogin(form)
          console.log(request)
          if (request && request.ok) {
            const token = data.access_token
            saveLocalStorage({ key: 'token', value: data.access_token })
            const request = await getMe(token)
            const user = request.data
            console.log(user)
            saveLocalStorage({ key: 'is_admin', value: user.is_admin })
            saveLocalStorage({ key: 'is_active', value: user.is_active })

            if (!user.is_active) {
              this.isActive = false
            } else {
              this.$router.push({ path: '/' })
            }
          } else {
            this.isCorrectInputs = false
          }
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

.submit-error {
  color: red;
  background-color: transparent;
}

</style>
