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
  <form class="container" @submit.prevent="createHouse()">
    <div class="row mb-3">
      <!-- Decription -->
      <label for="houseDescription">Description</label>
      <textarea v-model="editableHouseData.description" id="houseDescription" class="w-100" name="description" type="text" required maxlength="500"
        placeholder="House Description..."></textarea>
    </div>
    <div class="row">
      <!-- Bed and Bath -->
      <div class="mb-3 col-md-5">
        <label for="houseBathrooms">Bathrooms</label>
        <input v-model="editableHouseData.bathrooms" id="houseBathrooms" name="bathrooms" type="number" required min="1" max="10"
        placeholder="0">
      </div>
      <div class="col-md-5">
        <label for="houseBedrooms">Bedrooms</label>
        <input v-model="editableHouseData.bedrooms" id="houseBedrooms" name="bedrooms" type="number" required min="1" max="10"
        placeholder="0">
      </div>
    </div>
    <div class="row">
      <!-- Level and Year -->
      <div class="mb-3 col-md-5">
        <label for="houseLevels">Levels</label>
        <input v-model="editableHouseData.levels" id="houseLevels" name="levels" type="number" required min="1" max="10"
        placeholder="0">
      </div>
      <div class="col-md-5">
        <label for="houseYear">Year</label>
        <input v-model="editableHouseData.year" id="houseYear" name="year" type="number" required min="1800" max="2025"
        placeholder="0">
      </div>
    </div>
    <!-- Price and imgURL -->
    <div class="row">
      <div class="mb-3 col-md-5">
        <label for="housePrice">Price</label>
        <input type="number" v-model="editableHouseData.price" id="housePrice" name="price" required min="500" max="100000000">
    </div>
    <div class="mb-3 col-md-5">
      <label for="houseImgUrl">Image URL</label>
      <input type="url" name="imgUrl" id="houseImgUrl">
    </div>
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