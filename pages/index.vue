<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">
        Carrossel de Imagens
      </h1>

      <!-- Link para Demo -->
      <div class="text-center mb-12">
        <NuxtLink
          to="/demo"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <Icon name="heroicons:play" class="w-5 h-5 mr-2" />
          Demo Interativo
        </NuxtLink>
      </div>
      <!-- Carrossel Principal -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-800">
          Carrossel Principal
        </h2>
        <GenericCarousel
          :items="carouselItems"
          :autoplay="true"
          :autoplay-interval="4000"
          :animation-duration="600"
          :easing-function="'cubic-bezier(0.25, 0.46, 0.45, 0.94)'"
          :visible-slides="3"
          :loop-infinite="true"
          :pause-on-hover="true"
          :swipe-threshold="50"
          :drag-threshold="50"
        >
          <template #side-item="{ item }">
            <div class="w-full h-full rounded-xl overflow-hidden">
              <NuxtImg
                :src="item.image"
                :alt="item.alt"
                class="w-full h-full object-cover"
              />
            </div>
          </template>

          <template #center-item="{ item }">
            <div class="w-full h-full rounded-xl overflow-hidden shadow-2xl">
              <NuxtImg
                :src="item.image"
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
        </GenericCarousel>
      </div>

      <!-- Exemplos de Uso do Carrossel Genérico -->
      <div class="mb-16">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-800">
          Exemplos de Uso
        </h2>
        <CarouselExamples />
      </div>

      <!-- Demo Controls -->
      <div class="mt-16 max-w-2xl mx-auto">
        <h2 class="text-2xl font-semibold mb-8 text-center text-gray-800">
          Controles de Demonstração
        </h2>

        <div class="bg-red-200 rounded-2xl p-8 shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-semibold text-gray-700 mb-4">
                Navegação por Teclado:
              </h3>
              <ul class="space-y-3 text-sm text-gray-600">
                <li class="flex items-center space-x-2">
                  <span>•</span>
                  <kbd class="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd>
                  <span>Imagem anterior</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span>•</span>
                  <kbd class="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd>
                  <span>Próxima imagem</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span>•</span>
                  <kbd class="px-2 py-1 bg-gray-100 rounded text-xs"
                    >Espaço</kbd
                  >
                  <span>Pausar/Reproduzir</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-gray-700 mb-4">
                Navegação por Mouse:
              </h3>
              <ul class="space-y-3 text-sm text-gray-600">
                <li>• Clique nos indicadores para navegar</li>
                <li>• Botão de pausa/reprodução</li>
                <li>• Barra de progresso visual</li>
                <li>• Swipe em dispositivos móveis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";
import GenericCarousel from "../components/GenericCarousel.vue";
import CarouselExamples from "../components/CarouselExamples.vue";
const carouselItems = [
  {
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop&crop=center",
    alt: "Pratos de camarões grelhados com limão e ervas",
    tag: "CULINÁRIA",
    title: "Camarões Grelhados Premium",
    description:
      "Deliciosos camarões grelhados servidos com limão fresco e ervas aromáticas, preparados com técnicas culinárias tradicionais.",
    actionLabel: "VER RECEITA",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    alt: "Vista aérea de floresta tropical densa",
    tag: "NATUREZA",
    title: "Floresta Tropical",
    description:
      "Explore a beleza exuberante da floresta tropical com sua vegetação densa e biodiversidade única.",
    actionLabel: "EXPLORAR",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    alt: "Montanhas ",
    tag: "PAISAGISMO",
    title: "Montanhas",
    description:
      "Um oásis de tranquilidade com caminhos sinuosos e vegetação cuidadosamente planejada para relaxamento.",
    actionLabel: "VISITAR",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&crop=center",
    alt: "Pizza artesanal com ingredientes frescos",
    tag: "GASTRONOMIA",
    title: "Pizza Artesanal",
    description:
      "Pizza preparada com ingredientes frescos e técnicas tradicionais italianas, assada em forno a lenha.",
    actionLabel: "PEDIR AGORA",
  },
];

// Meta tags para SEO
useHead({
  title: "Carrossel de Imagens - Demo",
  meta: [
    {
      name: "description",
      content: "Demonstração de um carrossel de imagens moderno e responsivo",
    },
  ],
});
</script>

<style scoped>
kbd {
  font-family: "Courier New", monospace;
  font-size: 0.875rem;
}
</style>
