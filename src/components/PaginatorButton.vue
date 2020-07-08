<template>
  <div class="inline-flex w-full justify-center mx-auto my-5">
    <slot name="prevButton"></slot>
    <slot name="nextButton"></slot>
  </div>
</template>

<script>
export default {
    name: 'PaginatorButton',
    methods: {
    }
}
</script>

<style>
</style>