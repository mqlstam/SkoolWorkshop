<script setup>
import { useUserStore } from '../store/userStore.js'
import UserBlock from '../component/user/UserBlock.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, computed } from 'vue'

const edit = ref(false)
const userStore = useUserStore()
userStore.fetch()

const search = ref('')
const filteredUsers = computed(() => userStore.search(search.value))

async function remove (user) {
    await userStore.delete(user.id)
}
</script>

<template>
  <div class="row box-header">
    <div class="col-2 d-flex align-items-center">
      <h3 class="m-2">Users</h3>
    </div>

    <div class="col-10 d-flex align-items-center justify-content-end">
      <!-- action buttons -->
      <router-link class="btn p-3 hover-darken" to="/users/new">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-xl"/>
      </router-link>

      <button class="btn p-3 hover-darken" :class="{'bg-primary': edit}" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-xl"/>
      </button>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <input type="text" v-model="search" placeholder="Search users..." class="form-control search p-4">

    <!-- user list -->
    <user-block
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        :edit="edit"
        @delete="remove"/>
  </div>
</template>
