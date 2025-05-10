<script setup>
import { AppState } from '@/AppState.js';
import HouseForm from '@/components/HouseForm.vue';
import HouseListing from '@/components/HouseListing.vue';
import { houseService } from '@/services/HouseService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const houses = computed(() => AppState.houses)
const account = computed(() => AppState.account)

onMounted(() => {
  getHouses()
})

async function getHouses(){
    try {
        await houseService.getHouses()
    } catch (error) {
        Pop.error(error, 'Could not get houses')
        logger.error('COULD NOT GET houses!', error)
    }
}


</script>


<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center">
          <h1 class="display-3">Houses</h1>
        </div>
      </div>
    </div>
  </section>
  <!-- NOTE will only show this container if the user is logged in (if there is an account object in the appstate) -->
  <section v-if="account" class="container">
    <div class="row align-items-center">
      <div class="col-md-6">
        <HouseForm />
      </div>
      <div class="col-md-6">
        <div class="text-center my-3">
          <img
            src="https://media.istockphoto.com/id/2170456340/photo/neighborhood-new-homes-sunset-north-carolina-wide-angle.webp?a=1&b=1&s=612x612&w=0&k=20&c=ftpd-CRS1dogmkLG5hY0NqUdBGQSf2lp4ywOTAFvTUg="
            alt="War God hanging out with her brother" class="img-fluid rounded-5 shadow-lg">
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <h2 class="text-center">Please log in to list a House!</h2>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="house in houses" :key="house.id" class="col-12">
        <HouseListing :houseProp="house" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>

</style>