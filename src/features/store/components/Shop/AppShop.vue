<script setup lang="ts">

import ShopProductList from './ShopProductList.vue'
import ShopFilters from './ShopFilters.vue'
import type { FilterInterface, FilterUpdate , ProductInterface} from '@/interfaces';

defineProps<{
  products: ProductInterface[],
  filters: FilterInterface,
  moreResults: boolean
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
  (e: 'incPage'): void
}>()
</script>

<template>
  <div class="d-flex flex-row">
    <ShopFilters
      :filters="filters"
      :nbr-of-products="products.length"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
    <ShopProductList
    class="flex-fill scrollable"
    @add-product-to-cart="emit('addProductToCart', $event)"
    @inc-page="emit('incPage')"
    :products="products"
    :more-results="moreResults"
    />
  </div>
</template>

<style lang="scss" scoped>
.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px)
}
.shop-filter {
  flex: 0 0 200px;
}</style>
