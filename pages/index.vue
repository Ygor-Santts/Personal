<script setup lang="ts">
import { computed } from "vue";

// Dados de exemplo para o carousel
const moreItems = [
  {
    id: 4,
    title: "4 Boutique Hotel Experience",
    description: "Experiência única e personalizada",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    price: "R$ 380/noite",
    width: 300, // Largura padrão
    tag: "Tag 4",
    actionLabel: "Ver mais",
  },
  {
    id: 5,
    title: "5 Beachfront Villa",
    description: "Villa privativa com vista para o mar",
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
    price: "R$ 650/noite",
    width: 350, // Largura média
    tag: "Tag 5",
    actionLabel: "Ver mais",
  },
  {
    id: 6,
    title: "6 Historic Palace Hotel",
    description: "Elegância clássica em um palácio histórico",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    price: "R$ 520/noite",
    width: 450, // Largura grande
    tag: "Tag 6",
    actionLabel: "Ver mais",
  },
  {
    id: 7,
    title: "7 Luxury Spa Resort",
    description: "Relaxamento total com tratamentos de spa",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    price: "R$ 580/noite",
    width: 280, // Largura menor
    tag: "Tag 7",
    actionLabel: "Ver mais",
  },
  {
    id: 8,
    title: "8 Modern City Hotel",
    description: "Design contemporâneo no coração da cidade",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    price: "R$ 350/noite",
    width: 320, // Largura padrão
    tag: "Tag 8",
    actionLabel: "Ver mais",
  },
  {
    id: 9,
    title: "9 Tropical Island Resort",
    description: "Paraíso tropical com praias de areia branca",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    price: "R$ 720/noite",
    width: 380, // Largura média-grande
    tag: "Tag 9",
    actionLabel: "Ver mais",
  },
  {
    id: 10,
    title: "10 Cozy Country Inn",
    description: "Charme rústico no campo com aconchego familiar",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    price: "R$ 220/noite",
    width: 260, // Largura menor
    tag: "Tag 10",
    actionLabel: "Ver mais",
  },
  {
    id: 11,
    title: "11 Skyline Penthouse Hotel",
    description: "Vista panorâmica da cidade do alto",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    price: "R$ 890/noite",
    width: 420, // Largura grande
    tag: "Tag 11",
    actionLabel: "Ver mais",
  },
];
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
  return sampleImages.concat(moreItems);
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-20 mb-20">
    <div class="w-full h-full">
      <Carousel
        :items="computedItems"
        :items-per-view="3"
        :gap="computedItems.length > 3 ? -180 : -150"
        :gap-left="-130"
        :gap-right="-270"
        :height="300"
        :loop="true"
        title="Nossos Hotéis"
        subtitle="Descubra as melhores opções de hospedagem"
        :show-content="true"
      >
        <template #default="{ item }">
          <div class="w-full h-full relative rounded-lg overflow-hidden">
            <img
              :src="item['imageUrl']"
              :alt="item['title']"
              class="w-full h-full object-cover"
            />
          </div>
        </template>
        <template #content="{ item }">
          <div class="max-w-md mx-auto">
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
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-green-600">{{
                item.price
              }}</span>
              <button
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ item.actionLabel }}
              </button>
            </div>
          </div>
        </template>
      </Carousel>
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
