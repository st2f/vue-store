<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Store from './features/store/Store.vue';
import Admin from './features/admin/Admin.vue';
import {reactive, type Component as C} from 'vue'
import type { Page } from './interfaces';
import { seed,seed50articles } from './data/seed';

const state = reactive<{
  page: Page
}>({
  page: 'Store'
})

const pages: { [s: string]: C } = {
  Store,
  Admin
}

function navigate(page: Page): void {
  state.page = page;
}

//seed50articles('projectproducts');
// to post / get info for 10h
// https://restapi.fr/api/projectproducts
</script>

<template>
  <div class="app-container">
    <AppHeader @navigate="navigate" :page="state.page" class="header" />
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>
    </div>
    <AppFooter class="footer" />
  </div>
</template>

<style lang="scss">
@use './assets/scss/base.scss' as *;
@use './assets/scss/debug.scss' as *;

.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}
.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>
