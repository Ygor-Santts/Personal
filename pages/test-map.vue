<template>
  <div class="min-h-screen bg-gray-50 p-8 md:p-4 flex flex-col">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      Teste do Mapa Interativo
    </h1>
    <div
      class="w-full max-h-[600px] border-2 border-gray-200 rounded-lg overflow-hidden shadow-md"
      style="height: calc(100vh)"
    >
      <InteractiveMap />
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveMap from "../components/organisms/InteractiveMap.vue";
</script>
