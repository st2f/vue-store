<script setup lang="ts">
import type { ProductInterface } from '@/interfaces/Product.interface';
import CartProduct from './CartProduct.vue'

defineProps<{
  cart: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void;
}>();
</script>

<template>
  <div class="d-flex flex-column">
    <CartProduct
      v-for="product of cart"
      :product="product"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
      :key="product._id"
    />
  </div>
</template>

<style lang="scss" scoped></style>
