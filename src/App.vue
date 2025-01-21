<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppShop from './components/Shop/AppShop.vue'
import AppCart from './components/Cart/AppCart.vue'
import data from './data/product'
import { DEFAULT_FILTERS}  from './data/filter'
import { reactive, computed, onUpdated } from 'vue'
import type { ProductInterface, ProductCartInterface, FilterInterface, FilterUpdate } from './interfaces'


const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
  filters: FilterInterface
}>({
  products: data,
  cart: [],
  filters: { ...DEFAULT_FILTERS }
})

function addProductToCart(productId: number): void {
  const product = state.products.find((product) => product.id === productId);
  if (product) {
    const productInCart = state.cart.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
}

function removeProductFromCart(productId: number): void {
  const productFromCart = state.cart.find(
    (product) => product.id === productId
  );
  if (productFromCart) {
    if (productFromCart.quantity === 1) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    } else {
      productFromCart.quantity--;
    }
  }
}

function updateFilter(filterUpdate: FilterUpdate){
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  }
  else if (filterUpdate.priceRange !== undefined) {
    state.filters.priceRange = filterUpdate.priceRange;
  }
  else if (filterUpdate.category !== undefined) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS };
  }
}


const cartEmpty = computed(() => state.cart.length === 0);

const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    if (
      product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category || state.filters.category ==='all')
    ) {
      return true;
    } else {
      return false;
    }
  })
})


</script>

<template>
  <div
    class="app-container"
    :class="{
      gridEmpty: cartEmpty,
    }"
  >
    <AppHeader class="header" />
    <AppShop
      @update-filter='updateFilter'
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <AppCart
      v-if="!cartEmpty"
      :cart="state.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />
    <AppFooter class="footer" />
  </div>
</template>

<style lang="scss">
@use './assets/scss/base.scss' as *;
@use './assets/scss/debug.scss' as *;


.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header header' 'shop cart' 'footer footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
}

.gridEmpty {
  grid-template-areas: 'header' 'shop' 'footer';
  grid-template-columns: 100%;
}

.header {
  grid-area: header;
}
.shop {
  grid-area: shop;
}
.cart {
  grid-area: cart;
  border-left: var(--border);
  background-color: white;
}
.footer {
  grid-area: footer;
}
</style>
