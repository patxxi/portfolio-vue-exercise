<template>
  <v-form
    id="form"
    v-model="valid"
  >
    <v-text-field
      v-model="project.title"
      label="Titulo"
    />

    <v-select
      v-model="project.type"
      label="Categoria"
      :items="categories"
    />

    <v-select
      v-model="project.subtype"
      label="Sub-Categoria"
      :items="subCategories"
    />

    <v-text-field
      v-model="tag"
      label="Frameworks o Librerias"
      @keyup.enter="addCategorie"
    />

    <div
      :key="tag"
      class="tags-list"
    >
      <v-chip
        v-for="(item, index) in tags"
        :key="index"
      >
        {{ item }}
      </v-chip>
    </div>

    <v-text-field
      v-model="project.url"
      label="Link del video"
    />

    <v-row justify="center">
      <v-btn
        elevation="2"
        large
        color="#08a30d"
        @click="handleSubmit"
      >
        Actualizar Proyecto
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
  import { updateProject, getProject } from '../util/api'
  import { getLocalStorage } from '../util/localstorage'
  export default {
    name: 'UpdateProject',

    data () {
      return {
        project: {},
        tags: [],
        tag: '',
        valid: true,
        categories: ['Web', 'Aplicacion Escritorio', 'Aplicacion movil', 'Sistema Operativo', 'Inteligencia Artificial'],
        subCategories: ['Juetos', 'Gadget', 'Blog', 'CRM', 'Ecommerce'],
      }
    },
    async beforeMount () {
      const { id } = this.$route.params
      console.log(id)
      const token = getLocalStorage('token')
      const { data } = await getProject({ token, id })
      this.project = data
      this.tags = [...this.project.tags.map((tag) => tag.name)]
      console.log(this.project)
    },
    methods: {
      addCategorie () {
        this.tag = this.tag[0].toUpperCase() + this.tag.slice(1)
        this.tags = [...this.tags, this.tag]
        this.tag = ''
      },

      async handleSubmit () {
        const { id } = this.$route.params
        const token = getLocalStorage('token')
        const form = this.project
        const formData = new FormData()
        delete form.categories
        delete form.subCategories
        delete form.tag
        delete form.valid
        delete form.image_1

        Object.keys(form).forEach(key => {
          formData.append(key, form[key])
        })

        const { data } = await updateProject({ id, token, body: formData })
        this.project = data

        console.log(Object.fromEntries(formData.entries()))
      },
    },

  }
</script>

<style scoped>

.tags-list {
    margin: 10px 0px;
}

.v-btn {
    color: white;
    margin: 10px;
}

.v-input {
    margin: 10px 0px;
}

</style>
