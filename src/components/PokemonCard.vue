<template>
  <div class="w-full text-center">
    <div class="w-full flex">
      <div class="w-3/4 p-5">
        <p class="font-semibold text-2xl text-left">{{ pokemonName | toUpper  }}</p>
      </div>
      <div class="w-1/4 py-5 mx-auto my-0 text-center">
        <slot name="button"></slot>
      </div>
    </div>
    <div class="w-full p-3 border border-gray bg-white">
      <div class="w-full p-3 mt-2 text-left">
        <slot name="img"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemonName: {
      type: String,
      default: "Pokemon name"
    },
    type: {
      type: String,
      default: "Pokemon type"
    },
    description: {
      type: String,
      default: "Pokemon description"
    },
    level: {
      type: String,
      default: "Pokemon level"
    },
    user: {
      type: String,
      default: "Created by"
    }
  },
  filters: {
    toUpper(value) {
      return value.toUpperCase();
    },
    subStr(value) {
      return value.substr(0, 3);
    }
  }
};
</script>

<style>
</style>