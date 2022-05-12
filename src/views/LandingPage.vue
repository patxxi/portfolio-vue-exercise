<template>
  <div>
    <v-parallax
      dark
      src="https://previews.123rf.com/images/alexaldo/alexaldo2102/alexaldo210200013/163693257-html-programming-language-for-webpage-digital-coding-background.jpg "
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <div class="navbar">
            <v-tab>Inicio</v-tab>
            <v-tab>Proyectos</v-tab>
            <v-tab>Planes</v-tab>
            <v-tab>Contacto</v-tab>
          </div>
        </v-col>
      </v-row>
    </v-parallax>

    <section
      id="proyects"
      class="section"
    >
      <h1>
        Proyectos
      </h1>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'LandingPageView',
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>

<style scoped>

.navbar {
    display: flex;
    width: 100%;
    height: 25px;
    justify-content: center;
}

.v-card {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 400px;
}

.v-parallax {
    margin-top: -30px;
    padding-top: 50px;
    margin-bottom: 30px;
}
.v-card header {
    display: flex;
    width: 100%;
    height: 100% !important;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.v-card header .v-toolbar__image {
    height: 100%;
}

.v-card header .v-image {
    height: 100% !important;
}

.v-toolbar__content {
  display: flex;
  width: 100%;
  align-items: center;
}
.v-toolbar__image {
  height: 100%;
}
.header-title {
    font-size: 2.5rem;
    margin-top: 30px;
}
.v-tab {
    font-size: 1.3rem;
}

.section {
    padding: 0px 15px;
}

.section h1 {
    margin: 0 auto;
}

</style>
