<script setup>
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const editableCarData = ref({
  make: '',
  model: '',
  price: 0,
  year: 1886,
  imgUrl: '',
  engineType: 'unknown',
  color: '#000000',
  description: ''
})

async function createCar() {
  try {
    // NOTE make sure you use .value! The .value is what's stored inside of the ref object
    const carData = editableCarData.value
    await carsService.createCar(carData)
    // NOTE clears form
    editableCarData.value = {
      make: '',
      model: '',
      price: 0,
      year: 1886,
      imgUrl: '',
      engineType: 'unknown',
      color: '#000000',
      description: ''
    }
  } catch (error) {
    Pop.error(error, 'Could not create car')
    logger.error('COULD NOT CREATE CAR', error)
  }
}

</script>


<template>
  <form @submit.prevent="createCar()">
    <div class="mb-3">
      <label for="carMake">Car Make</label>
      <input v-model="editableCarData.make" id="carMake" name="make" type="text" required maxlength="500"
        placeholder="Car Make...">
    </div>
    <div class="mb-3">
      <label for="carModel">Car Model</label>
      <input v-model="editableCarData.model" id="carModel" name="model" type="text" required maxlength="500"
        placeholder="Car Model...">
    </div>
    <div class="mb-3">
      <label for="carPrice">Car Price</label>
      <input v-model="editableCarData.price" id="carPrice" name="price" type="number" required min="0" max="1000000"
        placeholder="0">
    </div>
    <div class="mb-3">
      <label for="carYear">Car Year</label>
      <input v-model="editableCarData.year" id="carYear" name="year" type="number" required min="1886" max="2025"
        placeholder="2025">
    </div>
    <div class="mb-3">
      <label for="carImgUrl">Car Image URL</label>
      <input v-model="editableCarData.imgUrl" id="carImgUrl" name="imgUrl" type="url" required maxlength="500"
        placeholder="Image URL...">
    </div>
    <div class="d-flex justify-content-between">
      <div class="mb-3">
        <label for="carEngineType">Car Engine Type</label>
        <select v-model="editableCarData.engineType" name="engineType" id="carEngineType">
          <option value="unknown">Unknown</option>
          <option value="2 stroke">2 Stroke</option>
          <option value="4 cylinder">4 cylinder</option>
          <option value="v6">v6</option>
          <option value="v8">v8</option>
          <option value="v10">v10</option>
          <option value="v12">v12</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
          <option value="chuncko">chuncko</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="carColor">Car Color</label>
        <input v-model="editableCarData.color" id="carColor" name="color" type="color" value="#FF0000"
          class="check-input">
      </div>
    </div>
    <div class="mb-3">
      <label for="carDescription">Car Description</label>
      <textarea v-model="editableCarData.description" name="description" id="carDescription" class="w-100"
        placeholder="Description of the car..." maxlength="500"></textarea>
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