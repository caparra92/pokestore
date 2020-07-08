import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: 0
  },
  mutations: {
    recieveProducts(state, payload) {
      state.products = payload
    }
  },
  actions: {
    getAllPokemons(context, value) {
      return new Promise((resolve, reject) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${value.increment}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
            console.log(error)
          })
      })
    },
    getPokemons() {
    return new Promise((resolve, reject) => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
      .then(response => {
        resolve(response)
        console.log(response)
      })
      .catch(error => {
        reject(error)
        console.log(error)
      })
    })
    }
  },
  modules: {
  }
})
