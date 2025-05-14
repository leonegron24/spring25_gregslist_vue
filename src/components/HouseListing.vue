<script setup>
import { AppState } from '@/AppState.js';
import { House } from '@/models/House.js';
import { houseService } from '@/services/HouseService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';
import HouseForm from './HouseForm.vue';

const props = defineProps({
  houseProp: { type: House, required: true }
})

const house = computed(() =>
  AppState.houses.find(h => h.id == props.houseProp.id)
)

const account = computed(() => AppState.account)
const showEditForm = ref(false)

function toggleForm() {
  showEditForm.value = !showEditForm.value
}

async function deleteHouse(houseId) {
  try {
    const confirmed = await Pop.confirm(
      'Are you sure you want to delete this house?',
      'It will be gone forever!',
      'Yes I am sure',
      "I've changed my mind"
    )

    if (!confirmed) return

    await houseService.deleteHouse(houseId)
  } catch (error) {
    Pop.error(error, 'Could not delete house')
    logger.error('COULD NOT DELETE HOUSE', error)
  }
}

async function editHouse(houseData) {
  try {
    await houseService.editHouse(house.value.id, houseData)
    showEditForm.value = false
  } catch (error) {
    Pop.error(error, 'Could not edit house')
    logger.error('COULD NOT EDIT HOUSE', error)
  }
}
</script>

<template>
  <div class="row shadow-lg mb-4 house-border">
    <div class="col-md-5 px-0">
      <img :src="house.imgUrl" :alt="`A house built in ${house.year}`" class="w-100">
    </div>
    <div class="col-md-7">
      <div class="p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <div class="d-flex justify-content-between">
            <div class="d-flex w-50 justify-content-around">
              <p>Year: {{ house.year }},</p>
              <p>Bedrooms: {{ house.bedrooms }}, Bathrooms: {{ house.bathrooms }}</p>
            </div>
            <small>{{ new Date(house.createdAt).toLocaleDateString() }}</small>
          </div>
          <p class="fs-3">{{ '$' + house.price.toLocaleString() }}</p>
          <p v-if="house.description">{{ house.description }}</p>
          <p v-else>A lovely house</p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div>
            <button
              v-if="house.creatorId == account?.id"
              @click="deleteHouse(house.id)"
              class="btn btn-outline-danger"
            >
              Delete House
            </button>
            <button
              v-if="house.creatorId == account?.id"
              @click="toggleForm"
              class="btn btn-outline-primary mx-2"
            >
              {{ showEditForm ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          <div class="d-flex align-items-center gap-3">
            <p class="mb-0">{{ house.creator.name }}</p>
            <img :src="house.creator.picture" alt="creator" class="creator-img">
          </div>
        </div>

        <HouseForm v-if="showEditForm" :initialData="house" @submit="editHouse" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.creator-img {
  height: 3.7em;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

img {
  height: 45dvh;
  object-fit: cover;
}

.house-border {
  border-style: solid;
  border-width: thick;
}
</style>
