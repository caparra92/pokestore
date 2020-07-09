<template>
  <div class="container m-5 mx-auto my-0">
    <div class="products w-full flex">
      <SearchInput @search = findPokemon($event,pokemons) />
      <button @click="show" class="btn w-10 h-10 p-0">
        <ShoppingCart />
        <div class="rounded rounded-full border border-red-500">{{ products }}</div>
      </button>
    </div>
    <p class="mx-auto my-0 w-full" v-if="pokemons.length == 0">No results found</p>
    <Loading v-if="loading" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        class="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg border border-gray m-2"
        v-for="pokemon in pokemons.entries()"
        :key="pokemon.name"
      >
        <PokemonCard :pokemonName="pokemon[1].name">
          <template v-slot:button>
            <button @click="sendToCart(pokemon, $event)" class="btn btn-red p-2 w-full">{{ 'Buy' }}</button>
          </template>
          <template v-slot:img>
            <img
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+(pokemon[0]+increment+1) +'.png'"
              v-if="increment !== 0"
              alt="pokemon avatar"
              class="mx-auto"
            />
            <img
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+(pokemon[0]+increment+1) +'.png'"
              v-if="increment === 0"
              alt="pokemon avatar"
              class="mx-auto"
              ref="image"
            />
          </template>
        </PokemonCard>
      </div>
    </div>
    <div class="w-full mx-auto my-0">
      <PaginatorButton>
        <template v-slot:prevButton>
          <button
            @click="prevPage"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded-l"
            :class="{'pointer-events-none opacity-50': disabled}"
            :disabled="disabled"
          >Prev</button>
        </template>
        <template v-slot:nextButton>
          <button
            @click="nextPage"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded-l"
          >Next</button>
        </template>
      </PaginatorButton>
    </div>
    <modal name="cart" :adaptive="true" :scrollable="true">
      <div class="w-full text-center flex" v-for="cart in shoppingCart" :key="cart.name">
        <div class="w-full border border-gray">
          <div class="w-3/4 p-2">
            <p class="font-semibold text-2xl text-left">{{ cart[1].name }}</p>
          </div>
        </div>
        <div class="w-full border border-gray bg-white">
          <img :src="cart[1].img" alt="image">
        </div>
      </div>
      <div class="w-full absolute bottom-0 m-2 pr-5 p-2">
        <button class="btn btn-green p-2 w-full">Buy now</button>
      </div>
    </modal>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import PaginatorButton from "@/components/PaginatorButton.vue";
import Loading from "@/components/Loading.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import axios from 'axios'

export default {
  name: "Products",
  components: {
    SearchInput,
    PokemonCard,
    PaginatorButton,
    Loading,
    ShoppingCart
  },
  data() {
    return {
      pokemons: [],
      shoppingCart: [],
      images: [],
      increment: 0,
      loading: true,
      disabled: false,
      selected: false,
      products: this.$store.state.products
    };
  },
  mounted() {
    this.getAllPokemons();
  },
  methods: {
    getAllPokemons() {
      this.loading = true;
      this.pokemons = [];
      this.$store
        .dispatch("getAllPokemons", { increment: this.increment })
        .then(response => {
          this.pokemons.push(...response.data.results);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    prevPage() {
      this.increment <= 0 ? (this.disabled = true) : (this.increment -= 10);
      this.getAllPokemons();
    },
    nextPage() {
      this.increment > 807 && this.increment < 10001
        ? (this.increment = 10001)
        : (this.increment += 10);
      this.getAllPokemons();
    },
    sendToCart(card, event) {
      this.products += 1;
      event.target.disabled = true;
      event.target.className = "btn btn-green pointer-events-none";
      event.target.textContent = "Cart";
      this.shoppingCart.push(card);
      this.$store.commit("recieveProducts", this.products);
      //this.retrieveImage(card[1].url).then(res => card[1].img = res)
      this.shoppingCart.forEach((card) => {
        this.retrieveImage(card[1].url).then(res => card[1].img = res)
      })
      console.log(this.shoppingCart)
    },
    show() {
      this.$modal.show("cart");
    },
    hide() {
      this.$modal.hide("cart");
    },
    retrieveImage(url) {
       return new Promise((resolve, reject) => {
        axios.get(url)
          .then(response => {
            resolve(response.data.sprites.front_default)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    findPokemon(wordToSearch, pokemons) {
      return pokemons.filter(pokemon => {
        const regex = new RegExp(wordToSearch, 'gi');
        console.log(pokemon.name.find(wordToSearch));
      })
    }
  },
  computed: {}
};
</script>
