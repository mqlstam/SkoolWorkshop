<script setup>
import { useProductStore } from '../store/productStore.js'
import { useWorkshopStore } from '../store/workshopStore.js'
import { useCalendarStore } from '../store/calendarStore.js'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import WorkshopBlock from '../component/workshop/WorkshopBlock.vue'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import CheckboxInput from '../component/input/CheckboxInput.vue'
import ScanInput from '../component/input/ScanInput.vue'
import VueQrcode from 'vue-qrcode'
const route = useRoute()
const productStore = useProductStore()
const workshopStore = useWorkshopStore()
const product = ref(null)
const calendarItems = ref([])
const loading = ref(false) // Initialize the loading variable as false

watch(() => route.path, fetchData, { immediate: true }) // Fetch data immediately when the component is created

async function fetchData () {
    try {
        loading.value = true // Set loading to true when fetching data
        // Reset the state
        product.value = null
        calendarItems.value = []

        // Assign the new productId
        const productId = Number(route.params.id)

        // Fetch the product and calendarItems in parallel
        const [fetchedProduct, fetchedCalendarItems] = await Promise.all([
            productStore.get(productId),
            productStore.getCalendarItems(productId)
        ])

        // Assign the fetched values
        product.value = fetchedProduct
        calendarItems.value = fetchedCalendarItems

        // Fetch workshops only after product and calendarItems have been fetched and assigned
        const workshopsPromises = calendarItems.value.map((calendarItem) =>
            workshopStore.get(calendarItem.workshopId)
        )
        const workshops = await Promise.all(workshopsPromises)

        calendarItems.value.forEach((calendarItem, index) => {
            calendarItem.workshop = workshops[index]
        })
        loading.value = false // Set loading to false when data has been fetched
    } catch (error) {
        console.error('Failed to fetch data: ', error)

        loading.value = false // Set loading to false when an error occurs
    }
}

async function save () {
    const { id, ...data } = product.value
    await productStore.update(data, id)
}

function printQr () {
    const prtContent = document.getElementById('qrCode')
    const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
    winPrint.document.write(prtContent.innerHTML)
    winPrint.document.close()
    winPrint.focus()
    winPrint.print()
    winPrint.close()
}

</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">An error occurred: {{ error }}</div>
  <div v-else>
  <div class="row box-header">
    <div class="d-flex align-items-center m-0" style="width: min-content">
      <a class="btn p-2 bg-secondary hover-darken" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'caret-left']" class="fa-xl" style="width: 24px"/>
      </a>
    </div>

    <div class="col d-flex align-items-center">
      <h3 class="m-0">Product Info</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="product.name" @update:value="save"/>
    <number-input name="Stock" v-model:value="product.stock" @update:value="save"/>
    <number-input name="BufferStock" v-model:value="product.bufferStock" @update:value="save"/>
    <scan-input v-model:value="product.code" @update:value="save"/>
    <checkbox-input name="Reusable" v-model:value="product.reusable" @update:value="save"/>

    <div type="button" class="d-flex align-items-center p-2 border-bottom">
      <span class="mx-3">Print QR</span>
      <div class="ms-auto d-flex align-items-center">
        <div class="d-flex align-items-center user-select-none" role="button" @click="printQr()">
          <font-awesome-icon
            :icon="['fas', 'print']"
            class="p-3 mx-2 rounded-3 hover-darken"/>
        </div>
      </div>
    </div>

    <div id="qrCode" style="display: none">
      <vue-qrcode
        v-if="product.code"
        :value="product.code"
        type="image/png"
        width="250"
        />
    </div>
    <div class="row box bg-white border-top">
    <WorkshopBlock
      v-for="workshop in workshops"
      :key="workshop.id"
      :workshop="workshop"
    />
  </div>

  </div>
</div>

</template>
