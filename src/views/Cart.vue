<template>
  <div>Tu tienes {{ products }} seleccionados</div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      products: 0
    }
  },
  created() {
    this.products = this.$store.state.products
  }
}
</script>

<style>

</style>
