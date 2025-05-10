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
        this.imgUrl = data.imgUrl || 'https://media.istockphoto.com/id/2170456340/photo/neighborhood-new-homes-sunset-north-carolina-wide-angle.webp?a=1&b=1&s=612x612&w=0&k=20&c=ftpd-CRS1dogmkLG5hY0NqUdBGQSf2lp4ywOTAFvTUg='
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