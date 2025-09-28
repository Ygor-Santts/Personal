<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  >
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-white text-center mb-8">
        Exemplos do Carrossel Circular
      </h1>
      <p class="text-center text-white/80 mb-12 max-w-2xl mx-auto">
        Diferentes estilos e configurações do carrossel circular para diversos
        casos de uso.
      </p>

      <div class="max-w-7xl mx-auto space-y-16">
        <!-- Exemplo 1: Cards Simples com Cores -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center text-white">
            1. Cards Simples com Cores
          </h2>
          <div class="h-64">
            <CircularCarousel
              :items="simpleCards"
              :visible-slides="3"
              :loop-infinite="true"
              :show-arrows="true"
              :show-indicators="true"
              :autoplay="false"
              :transition-ms="400"
              :ease="'cubic-bezier(0.22, 0.61, 0.36, 1)'"
              :clones-per-side="5"
              class="h-full"
            >
              <template #side-item="{ item }">
                <div
                  :class="`w-full h-full ${item.backgroundColor} rounded-xl p-4 flex items-center justify-center`"
                >
                  <span class="text-gray-600 font-medium">{{ item.name }}</span>
                </div>
              </template>

              <template #center-item="{ item }">
                <div
                  :class="`w-full h-full ${item.backgroundColor} rounded-xl p-4 flex items-center justify-center`"
                >
                  <span class="text-white font-bold text-lg">{{
                    item.name
                  }}</span>
                </div>
              </template>
            </CircularCarousel>
          </div>
        </div>

        <!-- Exemplo 2: Cards com Ícones -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center text-white">
            2. Cards com Ícones
          </h2>
          <div class="h-64">
            <CircularCarousel
              :items="iconCards"
              :visible-slides="3"
              :loop-infinite="true"
              :show-arrows="true"
              :show-indicators="true"
              :autoplay="false"
              :transition-ms="400"
              :ease="'cubic-bezier(0.22, 0.61, 0.36, 1)'"
              :clones-per-side="5"
              class="h-full"
            >
              <template #side-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-6 flex flex-col justify-center items-center text-center"
                >
                  <div class="text-4xl mb-2">{{ item.icon }}</div>
                  <span class="text-white font-medium">{{ item.name }}</span>
                </div>
              </template>

              <template #center-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-2xl"
                >
                  <div class="text-5xl mb-3">{{ item.icon }}</div>
                  <span class="text-white font-bold text-xl">{{
                    item.name
                  }}</span>
                  <span class="text-white/80 text-sm mt-1">{{
                    item.category
                  }}</span>
                </div>
              </template>
            </CircularCarousel>
          </div>
        </div>

        <!-- Exemplo 3: Cards de Produtos -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center text-white">
            3. Cards de Produtos
          </h2>
          <div class="h-80">
            <CircularCarousel
              :items="productCards"
              :visible-slides="3"
              :loop-infinite="true"
              :show-arrows="true"
              :show-indicators="true"
              :autoplay="false"
              :transition-ms="400"
              :ease="'cubic-bezier(0.22, 0.61, 0.36, 1)'"
              :clones-per-side="5"
              class="h-full"
            >
              <template #side-item="{ item }">
                <div
                  class="w-full h-full bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div
                    class="h-2/3 bg-gray-200 flex items-center justify-center"
                  >
                    <div class="text-4xl">{{ item.icon }}</div>
                  </div>
                  <div class="h-1/3 p-3 flex flex-col justify-between">
                    <div>
                      <h4 class="text-sm font-semibold text-gray-900">
                        {{ item.name }}
                      </h4>
                      <p class="text-xs text-gray-600">{{ item.category }}</p>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-lg font-bold text-green-600">{{
                        item.price
                      }}</span>
                      <button
                        class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </template>

              <template #center-item="{ item }">
                <div
                  class="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl"
                >
                  <div
                    class="h-2/3 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
                  >
                    <div class="text-6xl">{{ item.icon }}</div>
                  </div>
                  <div class="h-1/3 p-4 flex flex-col justify-between">
                    <div>
                      <h3 class="text-lg font-bold text-gray-900">
                        {{ item.name }}
                      </h3>
                      <p class="text-sm text-gray-600">{{ item.category }}</p>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-xl font-bold text-green-600">{{
                        item.price
                      }}</span>
                      <button
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </CircularCarousel>
          </div>
        </div>

        <!-- Exemplo 4: Cards de Tecnologia -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center text-white">
            4. Cards de Tecnologia
          </h2>
          <div class="h-80">
            <CircularCarousel
              :items="techCards"
              :visible-slides="3"
              :loop-infinite="true"
              :show-arrows="true"
              :show-indicators="true"
              :autoplay="false"
              :transition-ms="400"
              :ease="'cubic-bezier(0.22, 0.61, 0.36, 1)'"
              :clones-per-side="5"
              class="h-full"
            >
              <template #side-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 flex flex-col justify-center items-center text-center"
                >
                  <div class="text-4xl mb-3">{{ item.icon }}</div>
                  <h4 class="text-white font-semibold text-sm">
                    {{ item.name }}
                  </h4>
                  <p class="text-gray-400 text-xs mt-1">
                    {{ item.description }}
                  </p>
                </div>
              </template>

              <template #center-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-2xl"
                >
                  <div class="text-6xl mb-4">{{ item.icon }}</div>
                  <h3 class="text-white font-bold text-xl">{{ item.name }}</h3>
                  <p class="text-white/80 text-sm mt-2">
                    {{ item.description }}
                  </p>
                  <div class="mt-4 flex space-x-2">
                    <span
                      v-for="tag in item.tags"
                      :key="tag"
                      class="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </template>
            </CircularCarousel>
          </div>
        </div>

        <!-- Exemplo 5: Cards de Música -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center text-white">
            5. Cards de Música
          </h2>
          <div class="h-80">
            <CircularCarousel
              :items="musicCards"
              :visible-slides="3"
              :loop-infinite="true"
              :show-arrows="true"
              :show-indicators="true"
              :autoplay="false"
              :transition-ms="400"
              :ease="'cubic-bezier(0.22, 0.61, 0.36, 1)'"
              :clones-per-side="5"
              class="h-full"
            >
              <template #side-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-4 flex flex-col justify-center items-center text-center"
                >
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-3"
                  >
                    <span class="text-white text-2xl">{{ item.icon }}</span>
                  </div>
                  <h4 class="text-white font-semibold text-sm">
                    {{ item.title }}
                  </h4>
                  <p class="text-gray-400 text-xs mt-1">{{ item.artist }}</p>
                </div>
              </template>

              <template #center-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-2xl"
                >
                  <div
                    class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4"
                  >
                    <span class="text-purple-600 text-3xl">{{
                      item.icon
                    }}</span>
                  </div>
                  <h3 class="text-white font-bold text-xl">{{ item.title }}</h3>
                  <p class="text-white/80 text-sm mt-1">{{ item.artist }}</p>
                  <div class="mt-4 flex items-center space-x-2">
                    <button
                      class="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      ▶ Play
                    </button>
                    <button
                      class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      ♡ Like
                    </button>
                  </div>
                </div>
              </template>
            </CircularCarousel>
          </div>
        </div>

        <!-- Exemplo 6: Cards de Jogos -->
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center text-white">
            6. Cards de Jogos
          </h2>
          <div class="h-80">
            <CircularCarousel
              :items="gameCards"
              :visible-slides="3"
              :loop-infinite="true"
              :show-arrows="true"
              :show-indicators="true"
              :autoplay="false"
              :transition-ms="400"
              :ease="'cubic-bezier(0.22, 0.61, 0.36, 1)'"
              :clones-per-side="5"
              class="h-full"
            >
              <template #side-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden"
                >
                  <div
                    class="h-3/4 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center"
                  >
                    <div class="text-4xl">{{ item.icon }}</div>
                  </div>
                  <div
                    class="h-1/4 p-3 bg-gray-800 flex flex-col justify-center"
                  >
                    <h4 class="text-white font-semibold text-sm">
                      {{ item.name }}
                    </h4>
                    <p class="text-gray-400 text-xs">{{ item.genre }}</p>
                  </div>
                </div>
              </template>

              <template #center-item="{ item }">
                <div
                  class="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl overflow-hidden shadow-2xl"
                >
                  <div
                    class="h-3/4 bg-gradient-to-br from-blue-700 to-purple-800 flex items-center justify-center"
                  >
                    <div class="text-6xl">{{ item.icon }}</div>
                  </div>
                  <div
                    class="h-1/4 p-4 bg-gradient-to-r from-blue-600 to-purple-700 flex flex-col justify-center"
                  >
                    <h3 class="text-white font-bold text-lg">
                      {{ item.name }}
                    </h3>
                    <div class="flex justify-between items-center mt-1">
                      <p class="text-white/80 text-sm">{{ item.genre }}</p>
                      <div class="flex space-x-1">
                        <span
                          v-for="i in 5"
                          :key="i"
                          class="text-yellow-400 text-xs"
                          >★</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </CircularCarousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircularCarousel from "../components/CircularCarousel.vue";

// Dados para os exemplos
const simpleCards = [
  {
    id: 1,
    name: "React",
    backgroundColor: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Vue",
    backgroundColor: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    id: 3,
    name: "Angular",
    backgroundColor: "bg-gradient-to-br from-red-400 to-red-600",
  },
  {
    id: 4,
    name: "Svelte",
    backgroundColor: "bg-gradient-to-br from-orange-400 to-orange-600",
  },
  {
    id: 5,
    name: "Nuxt",
    backgroundColor: "bg-gradient-to-br from-emerald-400 to-emerald-600",
  },
  {
    id: 6,
    name: "Next",
    backgroundColor: "bg-gradient-to-br from-gray-400 to-gray-600",
  },
];

const iconCards = [
  { id: 1, name: "Frontend", category: "Desenvolvimento", icon: "💻" },
  { id: 2, name: "Backend", category: "Servidor", icon: "⚙️" },
  { id: 3, name: "Mobile", category: "Aplicativo", icon: "📱" },
  { id: 4, name: "Design", category: "UI/UX", icon: "🎨" },
  { id: 5, name: "Database", category: "Dados", icon: "🗄️" },
  { id: 6, name: "DevOps", category: "Infraestrutura", icon: "🚀" },
];

const productCards = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Smartphone",
    price: "R$ 7.999",
    icon: "📱",
  },
  {
    id: 2,
    name: "MacBook Air",
    category: "Notebook",
    price: "R$ 9.999",
    icon: "💻",
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "Áudio",
    price: "R$ 2.199",
    icon: "🎧",
  },
  {
    id: 4,
    name: "Apple Watch",
    category: "Wearable",
    price: "R$ 3.499",
    icon: "⌚",
  },
  {
    id: 5,
    name: "iPad Pro",
    category: "Tablet",
    price: "R$ 8.999",
    icon: "📱",
  },
  {
    id: 6,
    name: "Magic Mouse",
    category: "Acessório",
    price: "R$ 799",
    icon: "🖱️",
  },
];

const techCards = [
  {
    id: 1,
    name: "JavaScript",
    description: "Linguagem de programação",
    icon: "⚡",
    tags: ["Frontend", "Backend"],
  },
  {
    id: 2,
    name: "Python",
    description: "Linguagem versátil",
    icon: "🐍",
    tags: ["Backend", "Data Science"],
  },
  {
    id: 3,
    name: "TypeScript",
    description: "JavaScript tipado",
    icon: "📘",
    tags: ["Frontend", "Backend"],
  },
  {
    id: 4,
    name: "Go",
    description: "Linguagem concorrente",
    icon: "🐹",
    tags: ["Backend", "Cloud"],
  },
  {
    id: 5,
    name: "Rust",
    description: "Linguagem de sistemas",
    icon: "🦀",
    tags: ["Systems", "Performance"],
  },
  {
    id: 6,
    name: "Swift",
    description: "Linguagem da Apple",
    icon: "🍎",
    tags: ["Mobile", "iOS"],
  },
];

const musicCards = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", icon: "🎵" },
  { id: 2, title: "Imagine", artist: "John Lennon", icon: "🎶" },
  { id: 3, title: "Hotel California", artist: "Eagles", icon: "🎸" },
  { id: 4, title: "Stairway to Heaven", artist: "Led Zeppelin", icon: "🎸" },
  { id: 5, title: "Sweet Child O' Mine", artist: "Guns N' Roses", icon: "🎸" },
  { id: 6, title: "Purple Rain", artist: "Prince", icon: "🎤" },
];

const gameCards = [
  { id: 1, name: "Cyberpunk 2077", genre: "RPG", icon: "🤖" },
  { id: 2, name: "The Witcher 3", genre: "RPG", icon: "⚔️" },
  { id: 3, name: "Grand Theft Auto V", genre: "Ação", icon: "🚗" },
  { id: 4, name: "Red Dead Redemption 2", genre: "Aventura", icon: "🤠" },
  { id: 5, name: "The Last of Us", genre: "Aventura", icon: "🧟" },
  { id: 6, name: "God of War", genre: "Ação", icon: "⚡" },
];
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
