export class House{
     /**
     * 
     * @param {{
     * bedrooms: number,
     * bathrooms: number,
     * levels: number,
     * imgUrl: string,
     * year: number,
     * price: number,
     * description: string
     * creatorId: string, // SchemaObjectId
     * id: string // SchemaObjectId
     * createdAt: Date,
     * updatedAt: Date,
     * creator: Object
     * }} data 
     */
    constructor(data){
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.id = data.id
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator
    }
}