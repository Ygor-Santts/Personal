<script setup lang="ts">
import { computed } from "vue";
import Carousel from "./Carousel.vue";

const sampleImages = [
  {
    id: 1,
    title: "O melhor da gastronomia",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    price: "R$ 450/noite",
    tag: "Todos os destinos",
    actionLabel: "Ver mais",
  },
  {
    id: 2,
    title: "Conforto e tranquilidade nas montanhas",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    price: "R$ 320/noite",
    tag: "Tag 2",
    actionLabel: "Ver mais",
  },
  {
    id: 3,
    title: "3 Urban Business Hotel",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    price: "R$ 280/noite",
    tag: "Tag 3",
    actionLabel: "Ver mais",
  },
];

const moreItems = [
  {
    id: 4,
    title: "Beachside Resort",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    price: "R$ 500/noite",
    tag: "Tag 4",
    actionLabel: "Ver mais",
  },
  {
    id: 5,
    title: "City Lights Hotel",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop",
    price: "R$ 350/noite",
    tag: "Tag 5",
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
  <Story title="Molecules/Carousel">
    <Variant title="Loop com matemática modular">
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
    </Variant>

    <Variant title="5 itens por vez">
      <div class="w-full max-w-6xl mx-auto">
        <Carousel
          :items="computedItems.concat(moreItems)"
          :items-per-view="5"
          :gap="20"
          :height="300"
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
        </Carousel>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
/* Estilos para demonstração */
:deep(.carousel-item) {
  transition: transform 0.3s ease-out;
}

:deep(.carousel-item img) {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

/* Responsividade customizada se necessário */
@media (min-width: 640px) {
  .sm\:items-per-view-2 {
    --items-per-view: 2;
  }
}

@media (min-width: 1024px) {
  .lg\:items-per-view-3 {
    --items-per-view: 3;
  }
}
</style>
