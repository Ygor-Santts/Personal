<template>
  <div class="test-page">
    <h1>Teste do Mapa Interativo</h1>
    <div class="map-container">
      <InteractiveMap />
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveMap from "~/components/organisms/InteractiveMap.vue";
</script>

<style scoped>
.test-page {
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
}

.map-container {
  width: 100%;
  height: 600px;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
