<script setup lang="ts">
import { computed } from "vue";

// Dados de exemplo para o carousel
const sampleImages = [
  {
    id: 1,
    title: "1 Hotel Resort Paradise",
    description: "Um resort de luxo à beira-mar com todas as comodidades",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    price: "R$ 450/noite",
    width: 400, // Largura customizada
    tag: "Tag 1",
    actionLabel: "Ver mais",
  },
  {
    id: 2,
    title: "2 Mountain Lodge Retreat",
    description: "Conforto e tranquilidade nas montanhas",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    price: "R$ 320/noite",
    width: 250, // Largura menor (vertical)
    tag: "Tag 2",
    actionLabel: "Ver mais",
  },
];
const computedItems = computed(() => {
  return sampleImages;
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-20 mb-20">
    <!-- Navigation Menu -->
    <div class="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 class="text-lg font-semibold mb-4">Carousel Navigation</h2>
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/tests"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          🧪 All Tests
        </NuxtLink>
        <NuxtLink
          to="/test-all-cases"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Test All Cases
        </NuxtLink>
        <NuxtLink
          to="/test-two-items-debug"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Test Two Items Debug
        </NuxtLink>
      </div>
    </div>
    <div class="w-full h-full">
      <div class="max-w-4xl">
        <Carousel
          :items="computedItems"
          :items-per-view="3"
          :gap="-160"
          :height="300"
          :loop="true"
          :show-arrows="false"
          :show-content="true"
          :auto-play="true"
          :auto-play-delay="2000"
        >
          <template #default="{ item }">
            <div class="w-full h-full relative rounded-4xl overflow-hidden">
              <img
                :src="item['imageUrl']"
                :alt="item['title']"
                class="w-full h-full object-cover"
              />
            </div>
          </template>
          <template #content="{ item }">
            <div
              class="uppercase !text-foundation-verde1 font-mplus flex flex-col items-center text-center w-[224.42px]"
            >
              <div class="text-xs font-normal mb-2">
                {{ item["tag"] }}
              </div>
              <h2 class="text-xl font-bold mb-3">
                {{ item["title"] }}
              </h2>
            </div>
          </template>
        </Carousel>
      </div>
    </div>

    <!-- Separador -->
    <div class="my-16 border-t border-gray-200"></div>
  </div>
</template>
