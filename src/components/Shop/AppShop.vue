<script setup lang="ts">

import ShopProductList from './ShopProductList.vue'
import ShopFilters from './ShopFilters.vue'
import type { FilterInterface, FilterUpdate , ProductInterface} from '@/interfaces';

defineProps<{
  products: ProductInterface[],
  filters: FilterInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()

</script>

<template>
  <div class="d-flex flex-row">
    <ShopFilters
      :filters="filters"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
    <ShopProductList
      @add-product-to-cart="emit('addProductToCart', $event)"
      :products="products"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}</style>
