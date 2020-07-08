<template>
  <div class="w-full mb-5">
    <form
      class="w-full max-w-sm bg-white p-5 border border-gray-400 rounded mx-auto"
      autocomplete="off"
      @submit.prevent="getPokemon"
      method="post"
    >
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            id="search"
            type="search"
            placeholder="Search pokemons..."
            v-model="search"
          />
        </div>
        <div class="md:w-1/3">
          <div class="md:w-full p-2">
            <button class="btn btn-red" type="button" @click="getPokemon">Search</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pokemons: []
    };
  },
  name: "SearchInput",
  methods: {
    getPokemon() {
      this.$emit('search', this.search)
    }
  }
};
</script>

<style>
</style>