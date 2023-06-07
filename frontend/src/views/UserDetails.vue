<script setup>
import { useUserStore } from '../store/userStore.js'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import PasswordInput from "../component/input/PasswordInput.vue";
import OptionsInput from "../component/input/OptionsInput.vue";

const route = useRoute()
const userStore = useUserStore()
const roles = [
  {id: 'admin', name: 'admin'},
  {id: 'user', name: 'user'},
  {id: 'intern', name: 'intern'}
]

const userId = Number(route.params.id)
const user = await userStore.get(userId)

async function save () {
    const { id, ...data } = user
    await userStore.update(data, id)
}
</script>

<template>
  <div class="row box-header">
    <div class="d-flex align-items-center m-0" style="width: min-content">
      <a class="btn p-2 bg-secondary hover-darken" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'caret-left']" class="fa-xl" style="width: 24px"/>
      </a>
    </div>

    <div class="col d-flex align-items-center">
      <h3 class="m-0">User Info</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="user.name" @update:value="save" />
    <password-input name="Password" v-model:value="user.password" @update:value="save" />
    <options-input name="Role" v-model:value="user.role" :options="roles" @update:value="save" />
  </div>
</template>
