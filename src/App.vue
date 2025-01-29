<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Store from './features/store/Store.vue';
import Admin from './features/admin/Admin.vue';
import {reactive, type Component as C} from 'vue'
import type { Page } from './interfaces';

const state = reactive<{
  page: Page
}>({
  page: 'Admin'
})


const pages: { [s: string]: C } = {
  Store,
  Admin
}

function navigate(page: Page): void {
  state.page = page;
}
</script>

<template>
  <div class="app-container">
    <AppHeader @navigate="navigate" :page="state.page" class="header" />
    <div class="app-content">
      <Component :is="pages[state.page]" />
    </div>
    <AppFooter class="footer" />
  </div>
</template>

<style lang="scss">
@use './assets/scss/base.scss' as *;
@use './assets/scss/debug.scss' as *;

.app-container {
  min-height: 100vh;
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
