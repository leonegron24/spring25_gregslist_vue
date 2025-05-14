<script setup>
import { AppState } from '@/AppState.js';
import JobListing from '@/components/JobListing.vue';
import { jobService } from '@/services/JobService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(()=> {
    getJobs()
})

const jobs = computed(()=> AppState.jobs)

async function getJobs(){
    try {
      const jobs = await jobService.getJobs()
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
<div class="container">
    <div class="row" v-for="job in jobs" :key="job.id">
        <JobListing :jobProps="job"  />
    </div>
</div>
</template>


<style lang="scss" scoped>

</style>