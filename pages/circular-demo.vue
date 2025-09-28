<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  >
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-white text-center mb-8">
        Carrossel Circular de Imagens
      </h1>
      <p class="text-center text-white/80 mb-8 max-w-2xl mx-auto">
        Demonstração do sistema circular com cards de imagens. Arraste para
        navegar ou use as setas.
      </p>

      <div class="max-w-6xl mx-auto">
        <!-- Carrossel Circular -->
        <div class="h-80 mb-8">
          <CircularCarousel
            ref="carouselRef"
            :items="imageCards"
            :visible-slides="3"
            :loop-infinite="true"
            :show-arrows="true"
            :show-indicators="true"
            :autoplay="false"
            :autoplay-interval="4000"
            :clones-per-side="5"
            :transition-ms="500"
            :ease="'cubic-bezier(0.25, 0.46, 0.45, 0.94)'"
            :pause-on-hover="true"
            :swipe-threshold="20"
            :drag-threshold="10"
            class="h-full"
          >
            <template #center-item="{ item }">
              <div class="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <img
                  :src="item.image"
                  :alt="item.alt"
                  class="w-full h-full object-cover transition-all duration-500 ease-out"
                />
              </div>
            </template>

            <template #side-item="{ item }">
              <div class="w-full h-full rounded-xl overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.alt"
                  class="w-full h-full object-cover transition-all duration-500 ease-out"
                />
              </div>
            </template>
          </CircularCarousel>
        </div>

        <!-- Conteúdo do Card Central -->
        <div class="text-center mb-8">
          <div
            class="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-2 transition-all duration-500 ease-out"
            :key="`tag-${activeCard.id}`"
          >
            {{ activeCard.tag }}
          </div>
          <h2
            class="text-2xl font-bold text-gray-800 mb-3 transition-all duration-500 ease-out"
            :key="`title-${activeCard.id}`"
          >
            {{ activeCard.title }}
          </h2>
          <p
            class="text-gray-600 mb-4 max-w-md mx-auto transition-all duration-500 ease-out"
            :key="`desc-${activeCard.id}`"
          >
            {{ activeCard.description }}
          </p>
          <div
            class="text-green-600 font-medium cursor-pointer hover:text-green-700 transition-all duration-300 ease-out inline-block"
            :key="`action-${activeCard.id}`"
          >
            {{ activeCard.actionLabel }}
          </div>
        </div>

        <!-- Análise Técnica -->
        <div class="bg-red-200/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h2 class="text-2xl font-bold mb-4">
            🔍 Análise Técnica do Sistema Circular
          </h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-xl font-semibold mb-3">📐 Arquitetura</h3>
              <ul class="space-y-2 text-sm">
                <li>
                  • <strong>Container Principal:</strong> translate3d() para
                  posicionamento global
                </li>
                <li>
                  • <strong>Slides Individuais:</strong> Cada slide tem sua
                  própria transformação
                </li>
                <li>
                  • <strong>Sistema Circular:</strong> Múltiplos clones formam
                  um círculo virtual
                </li>
                <li>
                  • <strong>Índices Globais:</strong> -7 a +7 para criar o
                  efeito circular
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">🎯 Transformações</h3>
              <ul class="space-y-2 text-sm">
                <li>
                  • <strong>Escala:</strong> -1 a 1 (negativo para slides
                  "atrás")
                </li>
                <li>
                  • <strong>Posição:</strong> translateX() com porcentagens
                </li>
                <li>
                  • <strong>Opacidade:</strong> Fade out progressivo com
                  distância
                </li>
                <li>
                  • <strong>Z-Index:</strong> Slides mais próximos ficam na
                  frente
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-3">
              🧮 Algoritmo de Posicionamento
            </h3>
            <div class="bg-black/20 rounded-lg p-4 font-mono text-sm">
              <div class="text-green-400">
                // Cálculo da distância do centro
              </div>
              <div class="text-blue-400">
                const distance = slideIndex - centerIndex
              </div>
              <div class="text-green-400 mt-2">// Escala circular (-1 a 1)</div>
              <div class="text-blue-400">
                const scale = 1 - (Math.abs(distance) * 0.2)
              </div>
              <div class="text-green-400 mt-2">// Posição horizontal</div>
              <div class="text-blue-400">const translateX = distance * 50%</div>
              <div class="text-green-400 mt-2">// Opacidade progressiva</div>
              <div class="text-blue-400">
                const opacity = 1 - (Math.abs(distance) * 0.15)
              </div>
            </div>
          </div>
        </div>

        <!-- Comparação com Implementação Anterior -->
        <div
          class="mt-8 bg-red-200/10 backdrop-blur-sm rounded-2xl p-6 text-white"
        >
          <h2 class="text-2xl font-bold mb-4">⚡ Melhorias Implementadas</h2>

          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <h3 class="text-lg font-semibold mb-2 text-green-400">
                ✅ Sistema Circular
              </h3>
              <p class="text-sm opacity-90">
                Cada slide calcula sua posição individualmente baseada na
                distância do centro, criando um verdadeiro efeito circular como
                no Swiper.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2 text-blue-400">
                ✅ Performance
              </h3>
              <p class="text-sm opacity-90">
                Container principal não se move, apenas os slides individuais
                são transformados. Isso reduz o trabalho do browser e melhora a
                performance.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2 text-purple-400">
                ✅ Flexibilidade
              </h3>
              <p class="text-sm opacity-90">
                Sistema configurável com clonesPerSide, permitindo ajustar o
                número de clones e o alcance do efeito circular.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CircularCarousel from "../components/CircularCarousel.vue";

interface ImageCard {
  id: number;
  image: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  actionLabel: string;
}

// Dados de cards de imagens (baseado no Exemplo 6)
const imageCards: ImageCard[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    alt: "Jardim paisagístico com caminhos e vegetação",
    tag: "PAISAGISMO",
    title: "Jardim Paisagístico",
    description:
      "Um oásis de tranquilidade com caminhos sinuosos e vegetação cuidadosamente planejada para relaxamento.",
    actionLabel: "VISITAR",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
    alt: "Arquitetura moderna com linhas limpas",
    tag: "ARQUITETURA",
    title: "Design Moderno",
    description:
      "Edifícios contemporâneos que combinam funcionalidade e estética em harmonia perfeita.",
    actionLabel: "CONHECER",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&crop=center",
    alt: "Paisagem montanhosa com pôr do sol",
    tag: "AVENTURA",
    title: "Montanhas Sagradas",
    description:
      "Descubra as majestosas montanhas que tocam o céu e inspire-se com vistas deslumbrantes.",
    actionLabel: "EXPLORAR",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center",
    alt: "Cidade moderna com arranha-céus iluminados",
    tag: "URBANO",
    title: "Metrópole Digital",
    description:
      "A energia pulsante da cidade moderna, onde tecnologia e vida urbana se encontram.",
    actionLabel: "DESCOBRIR",
  },
];

// Referência para o carrossel
const carouselRef = ref(null);

// Computed para o card ativo baseado no currentIndex do carrossel
const activeCard = computed(() => {
  if (carouselRef.value && "currentIndex" in carouselRef.value) {
    const currentIndex = (carouselRef.value as any).currentIndex;
    return imageCards[currentIndex] || imageCards[0];
  }
  return imageCards[0]; // Fallback para o primeiro item
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
