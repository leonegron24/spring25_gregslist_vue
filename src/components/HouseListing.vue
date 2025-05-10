<script setup>
import { AppState } from '@/AppState.js';
import { House } from '@/models/House.js';
import { houseService } from '@/services/HouseService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

defineProps({
  houseProp: { type: House, required: true }
})

const account = computed(() => AppState.account)

async function deleteHouse(houseId) {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete this house?', 'It will be gone forever!', 'Yes I am sure', "I've changed my mind")

    if (!confirmed) {
      return
    }

    await houseService.deleteHouse(houseId)
  } catch (error) {
    Pop.error(error, 'Could not delete house')
    logger.error('COULD NOT DELETE House', error)
  }
}

</script>


<template>
    <div class="row shadow-lg mb-4 house-border">
      <div class="col-md-5 px-0">
        <img :src="houseProp.imgUrl" :alt="`A picture of a house built in ${houseProp.year} with ${houseProp.bedrooms} Bedroom(s) and  ${houseProp.bathrooms} Bathroom(s)`" class="w-100">
      </div>
      <div class="col-md-7">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between">
              <div class="d-flex w-50 justify-content-around">
                <p>Year: {{ houseProp.year }}, </p>
                <p>Bedrooms: {{ houseProp.bedrooms }},  Bathrooms: {{ houseProp.bathrooms }}</p>
              </div>
              <small>{{ houseProp.createdAt.toLocaleDateString() }}</small>
            </div>
            <p class="fs-3">{{ '$' + houseProp.price.toLocaleString() }}</p>
            <p v-if="houseProp.description">{{ houseProp.description }}</p>
            <p v-else>A lovely house</p>
            <p>Description: {{ houseProp.description }}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <!-- <button v-if="account && houseProp.creatorId == account?.id" @click="deleteHouse(houseProp.id)" -->
              <!-- NOTE elvis operator (?) evaluates if a property is null/undefined before drilling into it -->
              <button v-if="houseProp.creatorId == account?.id" @click="deleteHouse(houseProp.id)"
                class="btn btn-outline-danger" type="button">
                Delete Car
              </button>
            </div>
            <div class="d-flex align-items-center gap-3">
              <p class="mb-0">{{ houseProp.creator.name }}</p>
              <img :src="houseProp.creator.picture" alt="" class="creator-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style lang="scss" scoped>
  .creator-img {
    height: 3.7em;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  
  img {
    height: 45dvh;
    object-fit: cover;
  }
  
  .house-border {
    border-style: solid;
    border-width: thick;
    // NOTE accesses the color from the houseProp
    // border-color: v-bind('houseProp.');
  }
  </style>