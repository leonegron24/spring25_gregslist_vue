<script setup>
import { AppState } from '@/AppState.js';
import CarForm from '@/components/CarForm.vue';
import CarListing from '@/components/CarListing.vue';
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const cars = computed(() => AppState.cars)
const account = computed(() => AppState.account)

onMounted(() => {
  getCars()
})

async function getCars() {
  try {
    await carsService.getCars()
  } catch (error) {
    Pop.error(error, 'Could not get cars')
    logger.error('COULD NOT GET CARS!', error)
  }
}
</script>


<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center">
          <h1 class="display-3">Cars</h1>
        </div>
      </div>
    </div>
  </section>
  <!-- NOTE will only show this container if the user is logged in (if there is an account object in the appstate) -->
  <section v-if="account" class="container">
    <div class="row align-items-center">
      <div class="col-md-6">
        <CarForm />
      </div>
      <div class="col-md-6">
        <div class="text-center my-3">
          <img
            src="https://images.unsplash.com/photo-1522780209919-d8d8b64e0e9e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="War God hanging out with her brother" class="img-fluid rounded-5 shadow-lg">
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <h2 class="text-center">Please log in to list a car!</h2>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="car in cars" :key="car.id" class="col-12">
        <CarListing :carProp="car" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
img {
  max-height: 80dvh;
  width: 100%;
  object-fit: cover;
}
</style>