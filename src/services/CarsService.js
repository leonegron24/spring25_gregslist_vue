import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Car } from "@/models/Car.js"
import { AppState } from "@/AppState.js"

// REVIEW our service here is basically identical to the service from async/await week
class CarsService {

  async getCars() {
    const response = await api.get('api/cars')
    logger.log('GOT CARS 🚓🚓🚗🚘🚘🚘', response.data)
    const cars = response.data.map(pojo => new Car(pojo))
    AppState.cars = cars
  }

  async createCar(carData) {
    const response = await api.post('api/cars', carData)
    logger.log('CREATED CAR', response.data)
    const car = new Car(response.data)
    AppState.cars.push(car)
  }

  async deleteCar(carId) {
    const response = await api.delete(`api/cars/${carId}`)
    logger.log('DELETED CAR', response.data)
    const cars = AppState.cars
    const carIndex = cars.findIndex(car => car.id == carId)
    cars.splice(carIndex, 1)
  }

}

export const carsService = new CarsService()