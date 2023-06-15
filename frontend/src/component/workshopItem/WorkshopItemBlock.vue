<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'

const emit = defineEmits(['update:workshopItem'])
const props = defineProps({
    workshopItem: {
        type: Object,
        required: true
    },
    product: {
        type: Object,
        required: true
    }
})

const workshopItem = ref({ ...props.workshopItem })
watch(() => props.workshopItem, (newValue) => {
    workshopItem.value = { ...newValue }
})

function update () {
    emit('update:workshopItem', workshopItem.value)
}
</script>

<template>
  <router-link :to="`/products/${product.id}`" class="d-flex align-items-center border-bottom">
    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'box']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.product.name }} </span>

    <div class="ms-auto" @click.prevent>
      <!-- edit mode buttons -->

      <div class="ms-auto d-flex align-items-center">
        <!-- people -->
        <font-awesome-icon :icon="['fas', 'people-group']" class="fa-1x"/>

        <div role="button" @click="workshopItem.people = Math.max(workshopItem.people - 1, 0); update()" class="user-select-none">
          <font-awesome-icon
              :icon="['fas', 'minus']"
              class="p-3 mx-1 rounded-3 hover-darken" />
        </div>

        <input type="number" class="form-control-plaintext" style="width: 20px" v-model="workshopItem.people" @input="update" />

        <div role="button" @click="workshopItem.people += 1; update()" class="user-select-none">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="p-3 mx-1 rounded-3 hover-darken" />
        </div>
      </div>

      <div class="ms-auto d-flex align-items-center">
        <!-- quantity -->
        <font-awesome-icon :icon="['fas', 'warehouse']" class="fa-1x" />

        <div role="button" @click="workshopItem.quantity = Math.max(workshopItem.quantity - 1, 0); update()" class="user-select-none">
          <font-awesome-icon
              :icon="['fas', 'minus']"
              class="p-3 mx-1 rounded-3 hover-darken" />
        </div>

        <input type="number" class="form-control-plaintext" style="width: 20px" v-model="workshopItem.quantity" @input="update" />

        <div role="button" @click="workshopItem.quantity += 1; update()" class="user-select-none">
          <font-awesome-icon
              :icon="['fas', 'plus']"
              class="p-3 mx-1 rounded-3 hover-darken" />
        </div>
      </div>
    </div>
  </router-link>
</template>
