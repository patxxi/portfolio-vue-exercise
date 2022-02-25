<template>
  <material-card
    dark
    icon="mdi-clipboard-plus"
    icon-small
    title="Usuarios Registrados"
    color="accent"
  >
    <v-simple-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Ciudad</th>
          <th>Desactivar</th>
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.first_name + ' ' + user.last_name }}</td>
          <td>{{ user.state }}</td>
          <td>{{ user.city }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </material-card>
</template>

<script>
  import { getAllUsers } from '../util/api'
  export default {
    name: 'Admin',
    inject: ['admin'],

    data () {
      return {
        admin: this.admin,
        users: [],
      }
    },

    async beforeMount () {
      const { data } = await getAllUsers()
      this.users = data.users
    },
  }
</script>
