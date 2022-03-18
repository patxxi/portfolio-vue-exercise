<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="project in filterActiveProjects()"
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
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { getProjects } from '../util/api'
  export default {
    name: 'DashboardView',

    data: () => ({
      projects: [],
    }),
    async beforeMount () {
      const { data } = await getProjects()
      this.projects = data
      console.log(data)
    },
    methods: {
      filterActiveProjects () {
        return this.projects.filter((project) => project.is_active)
      },
    },
  }
</script>

<style scoped>
.v-card__title {
  font-size: 16px;
}

.v-card .v-card__subtitle {
  color: black;
  font-weight: bolder;
}

.v-card .v-card__text {

  color: black;
  font-weight: bolder;

}
</style>
