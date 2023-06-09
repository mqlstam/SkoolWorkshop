<script setup>
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import CheckboxInput from '../component/input/CheckboxInput.vue'
import ScanInput from '../component/input/ScanInput.vue'
import VueQrcode from 'vue-qrcode'
import { ref, watchEffect } from 'vue'
import WorkshopBlock from '../component/workshop/WorkshopBlock.vue'
import { useWorkshopStore } from '../store/workshopStore.js'
import { useWorkshopItemStore } from '../store/workshopItemStore.js'
import { useCalendarStore } from '../store/calendarStore.js'

const route = useRoute()
const productStore = useProductStore()
const workshopStore = useWorkshopStore()
const workshopItemStore = useWorkshopItemStore()
const calendarStore = useCalendarStore()

const product = ref(null)
const workshopItems = ref([])
let fetchInProgress = false

watchEffect(async () => {
    // Prevent multiple fetches. Workshops would be duplicated otherwise.
    if (fetchInProgress) return
    fetchInProgress = true
    // Obtain productId from route parameters
    const productId = Number(route.params.id)

    // Fetch and update product data
    product.value = await productStore.get(productId)

    // Fetch workshop items by product
    const rawWorkshopItems = await workshopItemStore.byProduct(productId)

    // Fetch calendar items
    await calendarStore.fetch()

    // Iterate over calendar items and workshop items, then push to workshopItems
    for (const calendarItem of calendarStore.calendarItems) {
        for (const workshopItem of rawWorkshopItems) {
            if (calendarItem.workshopId === workshopItem.workshopId) {
                const selectedWorkshop = await workshopStore.get(calendarItem.workshopId)
                const itemWithWorkshopData = { ...workshopItem, ...selectedWorkshop }
                workshopItems.value.push(itemWithWorkshopData)
            }
        }
    }
    fetchInProgress = false
})

async function save () {
    // Destructure and skip id from product's data
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
    <div v-if="product">
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
  </div>
  <div class="row box bg-white border-top">
      <workshop-block
        v-for="workshopItem in workshopItems"
        :key="workshopItem.id"
        :workshop="workshopItem"/>
    </div>
</div>
</template>
