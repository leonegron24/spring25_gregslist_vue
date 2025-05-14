<script setup>

import { House } from '@/models/House.js';
import { ref } from 'vue';

const props = defineProps({
  initialData: { type: House }
})


const editableHouseData = ref({ ...props.initialData })


</script>


<template>
  <form class="container" @submit.prevent="$emit('submit', editableHouseData)">
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
      <input type="url" v-model="editableHouseData.imgUrl" name="imgUrl" id="houseImgUrl">
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