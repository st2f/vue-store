<script setup lang="ts">
import AppShop from "./components/Shop/AppShop.vue";
import AppCart from "./components/Cart/AppCart.vue";

import { computed, reactive, watchEffect, watch, provide, toRef } from 'vue';
import type {
	ProductInterface,
	ProductCartInterface,
	FilterInterface,
	FilterUpdate,
} from "../../interfaces";
import { DEFAULT_FILTERS } from "../../data/filter.ts";
import { fetchProduct } from "@/shared/services/product.service.ts";
import { pageKey } from '../../shared/injectionKeys/pageKey';

const state = reactive<{
	products: ProductInterface[];
	cart: ProductCartInterface[];
	filters: FilterInterface;
  page: number,
  isLoading: boolean,
  moreResults: boolean
}>({
	products: [],
	cart: [],
	filters: { ...DEFAULT_FILTERS },
  page: 1,
  isLoading: true,
  moreResults: true
});

provide(pageKey, toRef(state, 'page'));

watch([() => state.filters.priceRange, () => state.filters.category], () => {
  state.page = 1
  state.products = [];
})

watchEffect(async () => {
  state.isLoading = true;
  const products = await fetchProduct(state.filters, state.page);
  if (Array.isArray(products)) {
    state.products = [...state.products, ...products];
    if (products.length < 20) {
      state.moreResults = false;
    }
  } else {
    state.products = [...state.products, products];
  }
  state.isLoading = false;
})

function addProductToCart(productId: string): void {
	const product = state.products.find((product) => product._id === productId);
	if (product) {
		const productInCart = state.cart.find((product) => product._id === productId);
		if (productInCart) {
			productInCart.quantity++;
		} else {
			state.cart.push({ ...product, quantity: 1 });
		}
	}
}

function removeProductFromCart(productId: string): void {
	const productFromCart = state.cart.find((product) => product._id === productId);
	if (productFromCart) {
		if (productFromCart.quantity === 1) {
			state.cart = state.cart.filter((product) => product._id !== productId);
		} else {
			productFromCart.quantity--;
		}
	}
}

function updateFilter(filterUpdate: FilterUpdate) {
	if (filterUpdate.search !== undefined) {
		state.filters.search = filterUpdate.search;
	} else if (filterUpdate.priceRange) {
		state.filters.priceRange = filterUpdate.priceRange;
	} else if (filterUpdate.category) {
		state.filters.category = filterUpdate.category;
	} else {
		state.filters = { ...DEFAULT_FILTERS };
	}
}

const cartEmpty = computed(() => state.cart.length === 0);

const filteredProducts = computed(() => {
	return state.products.filter((product) => {
		if (
			product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase())
		) {
			return true;
		} else {
			return false;
		}
	});
});
</script>

<template>
	<div class="store-container" :class="{ 'grid-empty': cartEmpty }">
		<AppShop
      @update-filter="updateFilter"
			@add-product-to-cart="addProductToCart"
      @inc-page="state.page++"
      :products="filteredProducts"
			:filters="state.filters"
      :more-results="state.moreResults"
      class="shop"
		/>
		<AppCart
			v-if="!cartEmpty"
			:cart="state.cart"
			class="cart"
			@remove-product-from-cart="removeProductFromCart"
		/>
	</div>
</template>

<style scoped lang="scss">
.store-container {
	display: grid;
	grid-template-columns: 75% 25%;
}

.grid-empty {
	grid-template-areas: "header" "shop" "footer";
	grid-template-columns: 100%;
}

.cart {
	border-left: var(--border);
	background-color: white;
}
</style>
