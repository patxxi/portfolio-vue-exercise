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
          <th>Editar</th>
          <th>Eliminar</th>
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
          <td>
            <v-checkbox
              v-model="user.is_active"
              input-value="user.is_active"
              @click="updateActiveUser({user})"
            />
          </td>

          <td>
            <v-btn>
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              @click="deleteUser({id: user.id})"
            >
              <v-icon>mdi-account-remove</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </material-card>
</template>

<script>
  import { getAllUsers, updateUser, deleteUser } from '../util/api'
  import { getLocalStorage } from '../util/localstorage'

  const token = getLocalStorage('token')
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

    methods: {
      async updateActiveUser ({ user }) {
        console.log(user)
        const form = { ...user }
        const formData = new FormData()
        Object.keys(form).forEach(key => {
          if (key === 'is_active') {
            form[key] = form[key] ? 1 : 0
          }
          formData.append(key, form[key])
        })

        const { data, request } = await updateUser({ token, body: formData, id: user.id })
      },

      async deleteUser ({ id }) {
        const { data, request } = await deleteUser({ id, token })

        if (request.ok) {
          this.users = this.users.filter((user) => user.id !== id)
        }
      },
    },
  }
</script>
