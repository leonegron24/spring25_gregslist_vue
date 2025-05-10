import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { House } from "@/models/House.js"
import { AppState } from "@/AppState.js"

class HouseService{
    async getHouses() {
        const response = await api.get('api/houses')
        logger.log('GOT HOMES 🏠🏠🏠🏠', response.data)
        const houses = response.data.map(pojo => new House(pojo))
        AppState.houses = houses
    }

    async deleteHouse(houseId) {
        const response = await api.delete(`api/house/${houseId}`)
        logger.log('DELETED house', response.data)
        const house = AppState.houses
        const houseIndex = house.findIndex(house => house.id == houseId)
        house.splice(houseIndex, 1)
      }

    async createHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        logger.log('CREATED HOUSE', response.data)
        const house = new House(response.data)
        AppState.houses.push(house)
    }
}
export const houseService = new HouseService()