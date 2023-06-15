<script setup lang="ts">
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>
<template>
  <Header />
    <div class="container content">
      <RouterView />
    </div>
  <Footer />
</template>
