<template>
  <div class="max-w-7xl mx-auto p-6 space-y-16">
    <!-- Exemplo 1: Cards Simples -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        1. Cards Simples
      </h2>
      <GenericCarousel
        :items="simpleCards"
        :height="'h-[300px]'"
        :show-content="false"
        :show-indicators="true"
        :animation-duration="500"
        :easing-function="'cubic-bezier(0.25, 0.46, 0.45, 0.94)'"
        :visible-slides="3"
        :loop-infinite="true"
        :pause-on-hover="true"
      >
        <template #side-item="{ item }">
          <div
            :class="`w-full h-full ${item.backgroundColor} rounded-lg p-4 flex items-center justify-center`"
          >
            <span class="text-gray-600 font-medium">{{ item.name }}</span>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            :class="`w-full h-full ${item.backgroundColor} rounded-lg p-4 flex items-center justify-center`"
          >
            <span class="text-white font-bold text-lg">{{ item.name }}</span>
          </div>
        </template>
      </GenericCarousel>
    </div>

    <!-- Exemplo 2: Cards com Ícones -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        2. Cards com Ícones
      </h2>
      <GenericCarousel
        :items="iconCards"
        :height="'h-64'"
        :show-content="false"
        :side-item-opacity="0.5"
      >
        <template #side-item="{ item }">
          <div
            class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-6 flex flex-col justify-center items-center text-center"
          >
            <div
              class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3"
            >
              <div class="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h4 class="text-white font-semibold">{{ item.title }}</h4>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            class="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-8 flex flex-col justify-center items-center text-center"
          >
            <div
              class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4"
            >
              <div class="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h4 class="text-white font-bold text-xl">{{ item.title }}</h4>
            <p class="text-white opacity-90 text-sm mt-2">
              {{ item.description }}
            </p>
          </div>
        </template>
      </GenericCarousel>
    </div>

    <!-- Exemplo 3: Cards de Produtos -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        3. Cards de Produtos
      </h2>
      <GenericCarousel
        :items="productCards"
        :height="'h-80'"
        :show-content="false"
        :side-item-opacity="0.4"
      >
        <template #side-item="{ item }">
          <div
            class="w-full h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center"
          >
            <div
              class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
            >
              <div class="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ item.name }}
            </h3>
            <p class="text-sm text-gray-600">{{ item.category }}</p>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center"
          >
            <div
              class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6"
            >
              <div class="w-10 h-10 bg-white rounded-full"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">{{ item.name }}</h3>
            <p class="text-white opacity-90 mb-4">{{ item.description }}</p>
            <div class="text-3xl font-bold text-white">{{ item.price }}</div>
          </div>
        </template>
      </GenericCarousel>
    </div>

    <!-- Exemplo 4: Cards com Conteúdo -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        4. Cards com Conteúdo
      </h2>
      <GenericCarousel
        :items="contentCards"
        :height="'h-64'"
        :show-content="true"
        :side-item-opacity="0.5"
      >
        <template #side-item="{ item }">
          <div
            class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-4 flex flex-col justify-center text-center"
          >
            <div class="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
            <h4 class="text-white font-semibold">{{ item.title }}</h4>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            class="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 flex flex-col justify-center text-center"
          >
            <div class="w-12 h-12 bg-white rounded-full mx-auto mb-4"></div>
            <h4 class="text-white font-bold text-xl">{{ item.title }}</h4>
          </div>
        </template>

        <template #content="{ item }">
          <div
            class="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-2"
          >
            {{ item.category }}
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">
            {{ item.title }}
          </h2>
          <p class="text-gray-600 mb-4">
            {{ item.description }}
          </p>
          <div
            class="text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors"
          >
            {{ item.action }}
          </div>
        </template>
      </GenericCarousel>
    </div>

    <!-- Exemplo 5: Cards de Informação -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        5. Cards de Informação
      </h2>
      <GenericCarousel
        :items="infoCards"
        :height="'h-[200px]'"
        :show-content="false"
        :center-item-width="'w-[300px]'"
        :side-item-width="'w-[300px]'"
        :side-item-opacity="0.4"
      >
        <template #side-item="{ item }">
          <div
            :class="`w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 ${item.backgroundColor}`"
          >
            <div>
              <h3 class="text-lg font-bold text-white mb-2">
                {{ item.title }}
              </h3>
              <p class="text-sm text-white opacity-90 leading-relaxed">
                {{ item.subtitle }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-xs text-white opacity-75">
                {{ item.category }}
              </div>
              <div
                class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              >
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            :class="`w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 ${item.backgroundColor}`"
          >
            <div>
              <h3 class="text-lg font-bold text-white mb-2">
                {{ item.title }}
              </h3>
              <p class="text-sm text-white opacity-90 leading-relaxed">
                {{ item.subtitle }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-xs text-white opacity-75">
                {{ item.category }}
              </div>
              <div
                class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              >
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </template>
      </GenericCarousel>
    </div>

    <!-- Exemplo 6: Cards de Imagens -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        6. Cards de Imagens
      </h2>
      <GenericCarousel
        :items="imageCards"
        :height="'h-80'"
        :show-content="true"
        :side-item-opacity="0.6"
        :animation-duration="800"
        :easing-function="'cubic-bezier(0.175, 0.885, 0.32, 1.275)'"
        :visible-slides="3"
        :loop-infinite="true"
        :pause-on-hover="true"
        :swipe-threshold="30"
        :drag-threshold="30"
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

    <!-- Exemplo 7: Configurações Avançadas -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        7. Configurações Avançadas - Loop Rápido
      </h2>
      <div class="mb-4 text-center text-sm text-gray-600">
        <p>Autoplay rápido, animação suave, 5 slides visíveis</p>
      </div>
      <GenericCarousel
        :items="advancedCards"
        :height="'h-64'"
        :show-content="false"
        :autoplay="true"
        :autoplay-interval="2000"
        :animation-duration="400"
        :easing-function="'cubic-bezier(0.68, -0.55, 0.265, 1.55)'"
        :visible-slides="5"
        :loop-infinite="true"
        :pause-on-hover="true"
        :swipe-threshold="20"
        :drag-threshold="20"
        :side-item-opacity="0.3"
      >
        <template #side-item="{ item }">
          <div
            :class="`w-full h-full ${item.backgroundColor} rounded-lg p-3 flex flex-col justify-center items-center text-center`"
          >
            <div class="w-6 h-6 bg-white rounded-full mb-2"></div>
            <span class="text-white text-xs font-medium">{{ item.name }}</span>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            :class="`w-full h-full ${item.backgroundColor} rounded-lg p-4 flex flex-col justify-center items-center text-center shadow-2xl`"
          >
            <div class="w-8 h-8 bg-white rounded-full mb-3"></div>
            <span class="text-white font-bold">{{ item.name }}</span>
            <span class="text-white text-xs opacity-90 mt-1">{{
              item.category
            }}</span>
          </div>
        </template>
      </GenericCarousel>
    </div>

    <!-- Exemplo 8: Sem Loop - Modo Linear -->
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        8. Modo Linear (Sem Loop)
      </h2>
      <div class="mb-4 text-center text-sm text-gray-600">
        <p>Navegação linear, sem loop infinito, animação lenta</p>
      </div>
      <GenericCarousel
        :items="linearCards"
        :height="'h-72'"
        :show-content="true"
        :autoplay="false"
        :animation-duration="1000"
        :easing-function="'cubic-bezier(0.25, 0.46, 0.45, 0.94)'"
        :visible-slides="3"
        :loop-infinite="false"
        :pause-on-hover="false"
        :swipe-threshold="80"
        :drag-threshold="80"
        :side-item-opacity="0.4"
      >
        <template #side-item="{ item }">
          <div
            :class="`w-full h-full ${item.backgroundColor} rounded-xl p-4 flex flex-col justify-center text-center`"
          >
            <div class="w-10 h-10 bg-white rounded-full mx-auto mb-3"></div>
            <h4 class="text-white font-semibold">{{ item.title }}</h4>
            <p class="text-white text-xs opacity-90 mt-1">
              {{ item.subtitle }}
            </p>
          </div>
        </template>

        <template #center-item="{ item }">
          <div
            :class="`w-full h-full ${item.backgroundColor} rounded-xl p-6 flex flex-col justify-center text-center shadow-2xl`"
          >
            <div class="w-12 h-12 bg-white rounded-full mx-auto mb-4"></div>
            <h4 class="text-white font-bold text-lg">{{ item.title }}</h4>
            <p class="text-white text-sm opacity-90 mt-2">
              {{ item.subtitle }}
            </p>
            <div class="text-white text-xs opacity-75 mt-3">
              {{ item.category }}
            </div>
          </div>
        </template>

        <template #content="{ item }">
          <div class="text-center">
            <div
              class="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-2"
            >
              {{ item.category }}
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-3">
              {{ item.title }}
            </h2>
            <p class="text-gray-600 mb-4">
              {{ item.description }}
            </p>
            <div
              class="text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors"
            >
              {{ item.action }}
            </div>
          </div>
        </template>
      </GenericCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenericCarousel from "./GenericCarousel.vue";

const simpleCards = [
  { name: "Card 1", backgroundColor: "bg-red-500" },
  { name: "Card 2", backgroundColor: "bg-blue-500" },
  { name: "Card 3", backgroundColor: "bg-green-500" },
  { name: "Card 4", backgroundColor: "bg-yellow-500" },
];

const iconCards = [
  {
    title: "Design",
    description: "Soluções visuais inovadoras",
  },
  {
    title: "Desenvolvimento",
    description: "Aplicações web modernas",
  },
  {
    title: "Marketing",
    description: "Campanhas que geram resultados",
  },
];

const productCards = [
  {
    name: "Smartphone Pro",
    category: "TECNOLOGIA",
    description: "O mais avançado smartphone do mercado",
    price: "R$ 2.999",
  },
  {
    name: "Laptop Ultra",
    category: "COMPUTAÇÃO",
    description: "Performance excepcional para profissionais",
    price: "R$ 4.599",
  },
  {
    name: "Fones Premium",
    category: "ÁUDIO",
    description: "Qualidade de som excepcional",
    price: "R$ 899",
  },
];

const contentCards = [
  {
    title: "Design",
    category: "CRIATIVIDADE",
    description: "Soluções visuais inovadoras para sua marca",
    action: "VER PORTFÓLIO",
  },
  {
    title: "Desenvolvimento",
    category: "TECNOLOGIA",
    description: "Aplicações web modernas e responsivas",
    action: "VER PROJETOS",
  },
  {
    title: "Marketing",
    category: "ESTRATÉGIA",
    description: "Campanhas que geram resultados reais",
    action: "VER CASES",
  },
];

const infoCards = [
  {
    title: "Tecnologia",
    subtitle: "Soluções inovadoras para o futuro digital",
    category: "INOVAÇÃO",
    backgroundColor: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    title: "Design",
    subtitle: "Criatividade e estética em cada projeto",
    category: "ARTE",
    backgroundColor: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    title: "Marketing",
    subtitle: "Estratégias que conectam marcas e pessoas",
    category: "COMUNICAÇÃO",
    backgroundColor: "bg-gradient-to-br from-green-500 to-green-700",
  },
  {
    title: "Desenvolvimento",
    subtitle: "Código limpo e soluções eficientes",
    category: "PROGRAMAÇÃO",
    backgroundColor: "bg-gradient-to-br from-orange-500 to-orange-700",
  },
  {
    title: "Consultoria",
    subtitle: "Orientação especializada para seu negócio",
    category: "NEGÓCIOS",
    backgroundColor: "bg-gradient-to-br from-red-500 to-red-700",
  },
];

const imageCards = [
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
    alt: "Jardim paisagístico com caminhos e vegetação",
    tag: "PAISAGISMO",
    title: "Jardim Paisagístico",
    description:
      "Um oásis de tranquilidade com caminhos sinuosos e vegetação cuidadosamente planejada para relaxamento.",
    actionLabel: "VISITAR",
  },
];

const advancedCards = [
  {
    name: "React",
    category: "FRONTEND",
    backgroundColor: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    name: "Vue",
    category: "FRONTEND",
    backgroundColor: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    name: "Angular",
    category: "FRONTEND",
    backgroundColor: "bg-gradient-to-br from-red-400 to-red-600",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    backgroundColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
  },
  {
    name: "Python",
    category: "BACKEND",
    backgroundColor: "bg-gradient-to-br from-purple-400 to-purple-600",
  },
  {
    name: "TypeScript",
    category: "LANGUAGE",
    backgroundColor: "bg-gradient-to-br from-indigo-400 to-indigo-600",
  },
  {
    name: "Docker",
    category: "DEVOPS",
    backgroundColor: "bg-gradient-to-br from-cyan-400 to-cyan-600",
  },
  {
    name: "AWS",
    category: "CLOUD",
    backgroundColor: "bg-gradient-to-br from-orange-400 to-orange-600",
  },
];

const linearCards = [
  {
    title: "Primeiro Passo",
    subtitle: "Início da jornada",
    category: "FUNDAMENTOS",
    description:
      "Comece sua jornada de aprendizado com os conceitos básicos e fundamentais.",
    action: "COMEÇAR AGORA",
    backgroundColor: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    title: "Desenvolvimento",
    subtitle: "Crescimento contínuo",
    category: "PRÁTICA",
    description:
      "Aplique seus conhecimentos em projetos reais e desenvolva suas habilidades.",
    action: "VER PROJETOS",
    backgroundColor: "bg-gradient-to-br from-green-500 to-green-700",
  },
  {
    title: "Especialização",
    subtitle: "Domínio técnico",
    category: "AVANÇADO",
    description:
      "Aprofunde-se em áreas específicas e torne-se um especialista reconhecido.",
    action: "ESPECIALIZAR-SE",
    backgroundColor: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    title: "Liderança",
    subtitle: "Influência e impacto",
    category: "LIDERANÇA",
    description:
      "Lidere equipes e projetos, compartilhando conhecimento e inspirando outros.",
    action: "LIDERAR",
    backgroundColor: "bg-gradient-to-br from-orange-500 to-orange-700",
  },
  {
    title: "Inovação",
    subtitle: "Criação e descoberta",
    category: "INOVAÇÃO",
    description:
      "Crie soluções inovadoras e contribua para o avanço da tecnologia.",
    action: "INOVAR",
    backgroundColor: "bg-gradient-to-br from-red-500 to-red-700",
  },
];
</script>
