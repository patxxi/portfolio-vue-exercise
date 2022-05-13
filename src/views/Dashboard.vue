<template>
  <div class="hero">
    <v-container>
      <v-row>
        <v-col
          v-for="project in filterActiveProjects()"
          :key="project.id"
        >
          <v-card>
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

              <v-btn
                icon
                @click="handleOpenModal(project.url)"
              >
                <v-icon>mdi-video-box</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <app-modal v-if="openModal">
        <iframe
          slot="body"
          class="video"
          width="100%"
          height="315"
          :src="embebedUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </app-modal>
    </v-container>
    <div class="banner">
      <v-col
        class="v-image__container"
      >
        <v-img
          src="../assets/banner.png"
        />
      </v-col>
      <v-col

        class="v-image__container"
      >
        <v-img
          src="../assets/banner_2.jpg"
        />
      </v-col>
    </div>

    <vue-whatsapp-widget
      phone-number="+584244116118"
      text-reply="Normalmente responde en menos de una hora"
      :messages="message"
      company-name="Topicos Web"
    />
  </div>
</template>

<script>
  import { getProjects } from '../util/api'
  import AppModal from '../components/Portal.vue'
  import VueWhatsappWidget from 'vue-whatsapp-widget'
  export default {
    name: 'DashboardView',
    components: {
      AppModal,
      VueWhatsappWidget,
    },

    data: () => ({
      projects: [],
      openModal: false,
      embebedUrl: '',
      youtubeURL: '',
      message: ['Hola, quieres saber mas de mi trabajo'],
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

      handleOpenModal (url) {
        this.openModal = !this.openModal
        this.youtubeURL = url
        if (this.openModal) {
          const youtubeEmbedTemplate = 'https://www.youtube.com/embed/'
          const videoUrl = this.youtubeURL.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
          const YId = undefined !== videoUrl[2] ? videoUrl[2].split(/[^0-9a-z_/\\-]/i)[0] : videoUrl[0]
          const topOfQueue = youtubeEmbedTemplate.concat(YId)
          this.embebedUrl = topOfQueue
          this.youtubeURL = ''
        }
      },

    },
  }
</script>

<style scoped>

.hero {
  display: flex;
  width: 100%;
}
.v-card__title {
  font-size: 16px;
}

.v-card {
  height: 400px;
  width: 200px;
  margin: 20px 5px;
}

.banner {
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.banner .v-img__container {
  width: 100%;
  height: 100%;
}
.v-card .v-card__subtitle {
  color: black;
  font-weight: bolder;
}

.v-card .v-card__text {

  color: black;
  font-weight: bolder;

}
.container .hero .container {
  width: 100%;
}

.v-whatsapp {
  width: 40px;
  position: relative;
  bottom: 40px;
  right: 25px;
}

.row .col {
  flex-grow: initial;
}

</style>
