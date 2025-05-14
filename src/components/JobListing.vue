<script setup>
import { AppState } from '@/AppState.js';
import { Job } from '@/models/Job.js';
import { jobService } from '@/services/JobService.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';


const props = defineProps({
    jobProps: {type: Job}
})

const job = computed(()=>
    AppState.jobs.find(j => j.id == props.jobProps.id ))

const account = computed(()=> AppState.account)

async function deleteJob(jobId){
    try {
      const request = await jobService.deleteJob(jobId)
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
    <div class="col-md-12 border-primary shadow-lg g-4 job-border">
        <h3 class="text-center m-2">{{ job.jobTitle }} at {{ job.company }}</h3>
        <div class="m-2"><span class="fw-bold">Job Description: </span>{{ job.description }}</div>
        <div class="m-2"><span class="fw-bold">Rate: </span>{{ job.rate }}</div>
        <div class="m-2"><span class="fw-bold">Hours: </span>{{ job.hours }}</div>
        <div class="d-flex justify-content-between align-items-center">
            <div v-if="job.creatorId == account.id">
                <button class="m-2 text-white btn btn-primary">Edit</button>
                <button @click="deleteJob(`${job.id}`)" class="m-2 text-white btn btn-danger">Delete</button>
            </div>
            <div class="d-flex align-items-center m-4 gap-3">
                <p>{{ job.creator.name }}</p>
                <img :src="job.creator.picture" class="creator-img" alt="">
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.creator-img{
    max-height: 80px;
    object-fit: center;
    border-radius: 50%;
    aspect-ratio: 1/1;
}
.job-border {
  border-style: solid;
  border-width: thick;
}
</style>