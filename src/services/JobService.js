import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Job } from "@/models/Job.js"
import { Pop } from "@/utils/Pop.js"

class JobService{
    async deleteJob(jobId) {
        const request = await api.delete(`api/jobs/${jobId}`)
        const confirm = Pop.confirm("Are you sure you want to delete this job?")
        if(confirm){
            const indexToDelete = AppState.jobs.findIndex(job => job.id == jobId)
            AppState.jobs.splice(indexToDelete,1)
        }
        console.log('deleting job...')
    }

    async getJobs(){
        const request = await api.get('api/jobs')
        console.log('getting jobs :', request.data)
        const jobs = request.data.map(job => new Job(job))
        AppState.jobs = jobs
    }

}
export const jobService = new JobService()