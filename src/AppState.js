import { reactive } from 'vue'
import { House } from './models/House.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,


  /** @type {import('./models/Car.js').Car[]} cars from the sandbox API*/
  cars: [],

  /** @type {House[]} */
  houses: []
})

