<script setup>

import { houseService } from '@/services/HouseService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const editableHouseData = ref({
    bedrooms: 0,
    bathrooms: 0,
    levels: 0,
    imgUrl: '',
    year: 0,
    price: 0,
    description: ''
})

async function createHouse() {
  try {
    // NOTE make sure you use .value! The .value is what's stored inside of the ref object
    const houseData = editableHouseData.value
    await houseService.createHouse(houseData)
    // NOTE clears form
    editableHouseData.value = {
        bedrooms: 0,
        bathrooms: 0,
        levels: 0,
        imgUrl: '',
        year: 0,
        price: 0,
        description: ''
    }
  } catch (error) {
    Pop.error(error, 'Could not create house')
    logger.error('COULD NOT CREATE HOUSE', error)
  }
}

</script>


<template>
  <form @submit.prevent="createHouse()">
    <div class="mb-3">
      <label for="houseDescription">Description</label>
      <textarea v-model="editableHouseData.description" id="houseDescription" class="w-100" name="description" type="text" required maxlength="500"
        placeholder="House Description..."></textarea>
    </div>
    <div class="mb-3">
      <label for="houseBathrooms">Bathrooms</label>
      <input v-model="editableHouseData.price" id="houseBathrooms" name="bathrooms" type="number" required min="1" max="10"
      placeholder="0">
    </div>
    <div class="text-end">
      <button class="btn btn-outline-danger me-2" type="reset">
        Reset Form
      </button>
      <button class="btn btn-outline-dark" type="submit">
        Submit
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
label {
  display: block;
}

input {
  width: 100%;
}
</style>