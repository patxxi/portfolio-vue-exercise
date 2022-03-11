<template>
  <v-form
    id="form"
    v-model="valid"
  >
    <v-text-field
      v-model="title"
      label="Titulo"
    />

    <v-select
      v-model="type"
      label="Categoria"
      :items="categories"
    />

    <v-select
      v-model="subType"
      label="Sub-Categoria"
      :items="subCategories"
    />

    <v-text-field
      v-model="tag"
      label="Frameworks o Librerias"
      @keyup.enter="addCategorie"
    />

    <v-text-field
      v-model="link"
      label="Link del video"
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

    <v-file-input
      v-model="image_1"
      label="Imagen"
      filled
      prepend-icon="mdi-camera"
    />

    <v-row justify="center">
      <v-btn
        elevation="2"
        large
        color="#08a30d"
        @click="handleSubmit"
      >
        Crear Proyecto
      </v-btn>

      <v-btn
        elevation="2"
        large
        color="#0320fc"
      >
        Registrarse
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: 'ProjectForm',

    data () {
      return {
        valid: true,
        type: '',
        subType: '',
        categories: ['Web', 'Aplicacion Escritorio', 'Aplicacion movil', 'Sistema Operativo', 'Inteligencia Artificial'],
        subCategories: ['Juetos', 'Gadget', 'Blog', 'CRM', 'Ecommerce'],
        tags: [],
        tag: '',
        title: '',
        image_1: [],
        link: '',
      }
    },

    methods: {
      addCategorie () {
        this.tag = this.tag[0].toUpperCase() + this.tag.slice(1)
        this.tags = [...this.tags, this.tag]
        this.tag = ''
      },

      handleSubmit () {
        const form = this.$data
        const formData = new FormData()
        delete form.categories
        delete form.subCategories
        delete form.tag
        delete form.valid

        Object.keys(form).forEach(key => {
          formData.append(key, form[key])
        })

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
