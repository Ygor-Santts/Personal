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
  {
    id: 3,
    title: "3 Urban Business Hotel",
    description: "Localização central para viagens de negócios",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    price: "R$ 280/noite",
    width: 500, // Largura maior (horizontal)
    tag: "Tag 3",
    actionLabel: "Ver mais",
  },
];
const computedItems = computed(() => {
  if (sampleImages.length === 3) {
    return sampleImages.concat(sampleImages);
  }
  return sampleImages;
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-20 mb-20">
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
    <!-- 
    <GenericCarousel
      :items="sampleImages"
      :autoplay="true"
      :autoplay-interval="4000"
      :show-arrows="true"
      :show-indicators="true"
      :show-progress-bar="true"
      :show-play-pause="true"
      :show-content="true"
      :max-width="'100%'"
      :height="600"
      :side-item-opacity="0.5"
      :center-item-width="100"
      :side-item-width="100"
    >
      <template #side-item="{ item }">
        <div class="w-full h-full rounded-xl overflow-hidden">
          <NuxtImg
            :src="item.imageUrl"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
        </div>
      </template>

      <template #center-item="{ item }">
        <div class="w-full h-full rounded-xl overflow-hidden shadow-2xl">
          <NuxtImg
            :src="item.imageUrl"
            :alt="item.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </template>

      <template #content="{ item }">
        <div
          class="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-2"
        >
          {{ item.tag }}
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">
          {{ item.title }}
        </h2>
        <p class="text-gray-600 mb-4">
          {{ item.description }}
        </p>
        <div
          class="text-green-600 font-medium cursor-pointer hover:text-green-700 transition-colors"
        >
          {{ item.actionLabel }}
        </div>
      </template>
    </GenericCarousel> -->
  </div>
</template>
