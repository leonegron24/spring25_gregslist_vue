export class Job{
    /**
     * 
     * @param {{
     * company: string,
     * jobTitle: string,
     * hours: number,
     * rate: number,
     * description: string,
     * creatorId: string,
     * id: string,
     * creator: object
     * }} data 
     */
    constructor(data){
      this.company = data.company
      this.jobTitle = data.jobTitle
      this.hours = data.hours
      this.rate = data.rate
      this.description = data.description
      this.creatorId = data.creatorId
      this.id = data.id
      this.creator = data.creator  
    }
}