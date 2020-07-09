import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: 0,
    pokemons: [],
    filter: {
      query: ''
    }
  },
  mutations: {
    recieveProducts(state, payload) {
      state.products = payload
    },
    receivePokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setQuery(state, query) {
      state.filter.query = query
    }
  },
  getters: {
    filteredPokemons(state) {
      if (state.filter.query > 2) {
        return state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(state.filter.query))
      }
      return state.pokemons
    }
  },
  actions: {
    getAllPokemons(context, value) {
      return new Promise((resolve, reject) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${value.increment}`)
          .then(response => {
            resolve(response)
            context.commit('receivePokemons', response.data.results)
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
