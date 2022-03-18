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
              class="elevation-6 d-inline-block"
              :src="'data:image/png;base64,' + user.image"
              width="128"
            />

            <v-card-text class="text-center">
              <h4 class="text-h4 mb-3 text--primary">
                {{ `${user.first_name} ${user.last_name}` }}
              </h4>

              <p class="text--secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolorem deserunt veniam tempora magnam quisquam quam error iusto cupiditate ducimus, et eligendi saepe voluptatibus assumenda similique temporibus placeat animi dicta?
              </p>
            </v-card-text>
          </app-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          v-for="project in projects"
          :key="project.id"
        >
          <v-card
            width="200px"
          >
            <v-img
              :src="'data:image/png;base64,' + project.image_1"
              class="white--text align-end card-image"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="project.title" />
            </v-img>

            <v-card-subtitle>
              {{ project.type }}
            </v-card-subtitle>

            <v-card-subtitle>
              {{ project.subtype || "default" }}
            </v-card-subtitle>

            <v-card-text>
              <v-chip
                v-for="tag in project.tags"
                :key="tag.id"
              >
                {{ tag.name }}
              </v-chip>
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn icon>
                <v-icon>mdi-video-box</v-icon>
              </v-btn>

              <v-btn
                icon
                @click="handleDeleteProject(project.id)"
              >
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-application-edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { updateMe, getMe, getUserProjects, deleteProject } from '@/util/api'
  import { getLocalStorage } from '@/util/localstorage'
  const token = getLocalStorage('token')

  export default {
    name: 'UserProfileView',
    data () {
      return {
        user: {},
        admin: '',
        projects: [],
      }
    },

    async beforeMount () {
      const { data } = await getMe(token)
      this.user = data
      this.admin = this.admin.value
      this.projects = await getUserProjects(token)
      this.projects = [...this.projects.data.filter((project) => project.user_id === this.user.id)]
      console.log(this.user)
      console.log(this.admin)
      console.log(this.projects)
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

      async handleDeleteProject (id) {
        await deleteProject({ id, token })
        this.projects = [...this.projects.filter((project) => project.id !== id)]
      },
    },

  }
</script>

<style scoped>
.v-image {
  margin-top: 10px;

}
</style>
