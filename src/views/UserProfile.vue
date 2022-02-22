<template>
  <div>
    <v-container
      id="user-profile-view"
      fluid
      tag="section"
    >
      <v-row justify="center">
        <v-col
          cols="12"
          md="8"
        >
          <material-card
            color="primary"
            icon="mdi-account-outline"
          >
            <template #title>
              Editar Perfil
            </template>

            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="user.email"
                      color="purple"
                      label="Email"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="user.first_name"
                      color="purple"
                      label="First Name"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="user.last_name"
                      color="purple"
                      label="Last Name"
                    />
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      v-model="user.address"
                      color="purple"
                      label="Adress"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="user.city"
                      color="purple"
                      label="City"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-col
                      cols="12"
                      class="text-right"
                    >
                      <v-btn
                        color="primary"
                        min-width="150"
                        @click="handleSubmit"
                      >
                        Update Profile
                      </v-btn>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </material-card>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <app-card class="mt-4 text-center">
            <v-img
              class="rounded-circle elevation-6 mt-n12 d-inline-block"
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
              width="128"
            />

            <v-card-text class="text-center">
              <h6 class="text-h6 mb-2 text--secondary">
                CEO / FOUNDER
              </h6>

              <h4 class="text-h4 mb-3 text--primary">
                John Leider
              </h4>

              <p class="text--secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolorem deserunt veniam tempora magnam quisquam quam error iusto cupiditate ducimus, et eligendi saepe voluptatibus assumenda similique temporibus placeat animi dicta?
              </p>
            </v-card-text>
          </app-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { getMe, updateMe } from '@/util/api'
  import { getLocalStorage } from '@/util/localstorage'
  const token = getLocalStorage()

  export default {
    name: 'UserProfileView',
    data () {
      return {
        user: {},
      }
    },

    async beforeMount () {
      const { data } = await getMe(token)
      this.$data.user = data
    },

    methods: {
      async handleSubmit () {
        const form = { ...this.$data.user }
        const formData = new FormData()
        Object.keys(form).forEach(key => {
          formData.append(key, form[key])
        })

        console.log(Object.fromEntries(formData.entries()))

        const { data } = await updateMe({ token, body: formData })
        console.log(data)
      },
    },

  }
</script>
