<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">
        Demo Interativo do Carrossel
      </h1>

      <!-- Controles Dinâmicos -->
      <div class="max-w-4xl mx-auto mb-12">
        <div class="bg-red-200 rounded-2xl p-8 shadow-lg">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">
            Configurações do Carrossel
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Controles Básicos -->
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-700">Controles Básicos</h3>

              <div class="flex items-center space-x-3">
                <input
                  id="autoplay"
                  v-model="carouselConfig.autoplay"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="autoplay" class="text-sm text-gray-700"
                  >Autoplay</label
                >
              </div>

              <div class="flex items-center space-x-3">
                <input
                  id="showArrows"
                  v-model="carouselConfig.showArrows"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="showArrows" class="text-sm text-gray-700"
                  >Mostrar Setas</label
                >
              </div>

              <div class="flex items-center space-x-3">
                <input
                  id="showIndicators"
                  v-model="carouselConfig.showIndicators"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="showIndicators" class="text-sm text-gray-700"
                  >Mostrar Indicadores</label
                >
              </div>

              <div class="flex items-center space-x-3">
                <input
                  id="showProgressBar"
                  v-model="carouselConfig.showProgressBar"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="showProgressBar" class="text-sm text-gray-700"
                  >Mostrar Barra de Progresso</label
                >
              </div>

              <div class="flex items-center space-x-3">
                <input
                  id="showPlayPause"
                  v-model="carouselConfig.showPlayPause"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="showPlayPause" class="text-sm text-gray-700"
                  >Mostrar Play/Pause</label
                >
              </div>

              <div class="flex items-center space-x-3">
                <input
                  id="showContent"
                  v-model="carouselConfig.showContent"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="showContent" class="text-sm text-gray-700"
                  >Mostrar Conteúdo</label
                >
              </div>
            </div>

            <!-- Configurações de Layout -->
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-700">Layout</h3>

              <div>
                <label class="block text-sm text-gray-700 mb-2"
                  >Largura Máxima</label
                >
                <select
                  v-model="carouselConfig.maxWidth"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="max-w-4xl">Pequeno (max-w-4xl)</option>
                  <option value="max-w-5xl">Médio (max-w-5xl)</option>
                  <option value="max-w-6xl">Grande (max-w-6xl)</option>
                  <option value="max-w-7xl">Extra Grande (max-w-7xl)</option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-700 mb-2">Altura</label>
                <select
                  v-model="carouselConfig.height"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="h-48 sm:h-64 md:h-80">Pequena</option>
                  <option value="h-64 sm:h-80 md:h-96">Média</option>
                  <option value="h-80 sm:h-96 md:h-[450px]">Grande</option>
                  <option value="h-96 md:h-[500px] lg:h-[600px]">
                    Extra Grande
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-700 mb-2"
                  >Largura da Imagem Central</label
                >
                <select
                  v-model="carouselConfig.centerImageWidth"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="w-3/5 sm:w-3/5 md:w-2/5">Pequena (60%)</option>
                  <option value="w-4/5 sm:w-4/5 md:w-2/5">Média (80%)</option>
                  <option value="w-5/6 sm:w-5/6 md:w-3/5">Grande (83%)</option>
                  <option value="w-full sm:w-full md:w-4/5">
                    Extra Grande (100%)
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm text-gray-700 mb-2"
                  >Largura das Imagens Laterais</label
                >
                <select
                  v-model="carouselConfig.sideImageWidth"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="w-1/8 sm:w-1/6 md:w-1/5">
                    Muito Pequena (12.5%)
                  </option>
                  <option value="w-1/6 sm:w-1/5 md:w-2/5">
                    Pequena (16.7%)
                  </option>
                  <option value="w-1/5 sm:w-1/4 md:w-1/3">Média (20%)</option>
                  <option value="w-1/4 sm:w-1/3 md:w-2/5">Grande (25%)</option>
                </select>
              </div>
            </div>

            <!-- Configurações Avançadas -->
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-700">Avançado</h3>

              <div>
                <label class="block text-sm text-gray-700 mb-2">
                  Intervalo do Autoplay: {{ carouselConfig.autoplayInterval }}ms
                </label>
                <input
                  v-model.number="carouselConfig.autoplayInterval"
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label class="block text-sm text-gray-700 mb-2">
                  Opacidade das Imagens Laterais:
                  {{ carouselConfig.sideImageOpacity }}
                </label>
                <input
                  v-model.number="carouselConfig.sideImageOpacity"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label class="block text-sm text-gray-700 mb-2"
                  >Tema do Conteúdo</label
                >
                <select
                  v-model="selectedTheme"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="culinaria">Culinária</option>
                  <option value="produtos">Produtos</option>
                  <option value="viagens">Viagens</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="natureza">Natureza</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carrossel Dinâmico -->
      <GenericCarousel
        :items="currentItems"
        :autoplay="carouselConfig.autoplay"
        :autoplay-interval="carouselConfig.autoplayInterval"
        :show-arrows="carouselConfig.showArrows"
        :show-indicators="carouselConfig.showIndicators"
        :show-progress-bar="carouselConfig.showProgressBar"
        :show-play-pause="carouselConfig.showPlayPause"
        :show-content="carouselConfig.showContent"
        :max-width="carouselConfig.maxWidth"
        :height="carouselConfig.height"
        :side-item-opacity="carouselConfig.sideImageOpacity"
        :center-item-width="carouselConfig.centerImageWidth"
        :side-item-width="carouselConfig.sideImageWidth"
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

      <!-- Informações do Carrossel -->
      <div class="max-w-4xl mx-auto mt-12">
        <div class="bg-red-200 rounded-2xl p-8 shadow-lg">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">
            Informações do Carrossel
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-gray-700 mb-3">
                Configurações Atuais
              </h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>Autoplay:</strong>
                  {{ carouselConfig.autoplay ? "Ativo" : "Inativo" }}
                </div>
                <div>
                  <strong>Intervalo:</strong>
                  {{ carouselConfig.autoplayInterval }}ms
                </div>
                <div>
                  <strong>Setas:</strong>
                  {{ carouselConfig.showArrows ? "Visíveis" : "Ocultas" }}
                </div>
                <div>
                  <strong>Indicadores:</strong>
                  {{ carouselConfig.showIndicators ? "Visíveis" : "Ocultos" }}
                </div>
                <div>
                  <strong>Barra de Progresso:</strong>
                  {{ carouselConfig.showProgressBar ? "Visível" : "Oculta" }}
                </div>
                <div>
                  <strong>Play/Pause:</strong>
                  {{ carouselConfig.showPlayPause ? "Visível" : "Oculto" }}
                </div>
                <div>
                  <strong>Conteúdo:</strong>
                  {{ carouselConfig.showContent ? "Visível" : "Oculto" }}
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-gray-700 mb-3">Layout Atual</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>Largura Máxima:</strong> {{ carouselConfig.maxWidth }}
                </div>
                <div><strong>Altura:</strong> {{ carouselConfig.height }}</div>
                <div>
                  <strong>Imagem Central:</strong>
                  {{ carouselConfig.centerImageWidth }}
                </div>
                <div>
                  <strong>Imagens Laterais:</strong>
                  {{ carouselConfig.sideImageWidth }}
                </div>
                <div>
                  <strong>Opacidade Lateral:</strong>
                  {{ carouselConfig.sideImageOpacity }}
                </div>
                <div><strong>Tema:</strong> {{ selectedTheme }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";
import { ref, computed } from "vue";
import GenericCarousel from "../components/GenericCarousel.vue";

// Configuração do carrossel
const carouselConfig = ref({
  autoplay: true,
  autoplayInterval: 4000,
  showArrows: true,
  showIndicators: true,
  showProgressBar: true,
  showPlayPause: true,
  showContent: true,
  maxWidth: "max-w-7xl",
  height: "h-64 sm:h-80 md:h-96 lg:h-[500px]",
  sideImageOpacity: 0.6,
  centerImageWidth: "w-4/5 sm:w-4/5 md:w-2/5",
  sideImageWidth: "w-1/6 sm:w-1/5 md:w-2/5",
});

// Tema selecionado
const selectedTheme = ref("culinaria");

// Dados por tema
const themeData = {
  culinaria: [
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
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&crop=center",
      alt: "Pizza artesanal com ingredientes frescos",
      tag: "GASTRONOMIA",
      title: "Pizza Artesanal",
      description:
        "Pizza preparada com ingredientes frescos e técnicas tradicionais italianas, assada em forno a lenha.",
      actionLabel: "PEDIR AGORA",
    },
    {
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center",
      alt: "Hambúrguer gourmet com batatas fritas",
      tag: "FAST FOOD",
      title: "Hambúrguer Gourmet",
      description:
        "Hambúrguer artesanal com carne premium, queijo especial e ingredientes frescos selecionados.",
      actionLabel: "FAZER PEDIDO",
    },
  ],
  produtos: [
    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&crop=center",
      alt: "Tênis esportivo premium",
      tag: "CALÇADOS",
      title: "Tênis Esportivo Premium",
      description:
        "Tênis de alta performance com tecnologia de amortecimento avançada e design moderno para atletas profissionais.",
      actionLabel: "COMPRAR AGORA",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&crop=center",
      alt: "Relógio inteligente",
      tag: "TECNOLOGIA",
      title: "Smartwatch Pro",
      description:
        "Relógio inteligente com monitoramento de saúde, GPS integrado e bateria de longa duração.",
      actionLabel: "VER DETALHES",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&crop=center",
      alt: "Fones de ouvido sem fio",
      tag: "ÁUDIO",
      title: "Fones Bluetooth Premium",
      description:
        "Fones de ouvido sem fio com cancelamento de ruído ativo e qualidade de som excepcional.",
      actionLabel: "ADICIONAR AO CARRINHO",
    },
  ],
  viagens: [
    {
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
      alt: "Praia tropical com águas cristalinas",
      tag: "DESTINOS",
      title: "Maldivas Paradise",
      description:
        "Descubra as águas cristalinas e praias de areia branca das Maldivas, o paraíso tropical perfeito para relaxar.",
      actionLabel: "RESERVAR AGORA",
    },
    {
      image:
        "https://images.unsplash.com/photo-1464822759844-d150baec0b0b?w=800&h=600&fit=crop&crop=center",
      alt: "Montanhas cobertas de neve",
      tag: "AVENTURA",
      title: "Alpes Suíços",
      description:
        "Explore as majestosas montanhas dos Alpes Suíços com suas paisagens espetaculares e estações de esqui de classe mundial.",
      actionLabel: "PLANEJAR VIAGEM",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
      alt: "Floresta tropical densa",
      tag: "NATUREZA",
      title: "Floresta Amazônica",
      description:
        "Aventure-se na maior floresta tropical do mundo e descubra sua incrível biodiversidade e belezas naturais únicas.",
      actionLabel: "EXPLORAR TOUR",
    },
  ],
  tecnologia: [
    {
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center",
      alt: "Laptop moderno",
      tag: "COMPUTAÇÃO",
      title: "Laptop Pro Max",
      description:
        "Laptop de última geração com processador de alta performance, tela 4K e bateria de longa duração.",
      actionLabel: "VER ESPECIFICAÇÕES",
    },
    {
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&crop=center",
      alt: "Smartphone premium",
      tag: "MOBILE",
      title: "Smartphone Ultra",
      description:
        "Smartphone com câmera profissional, tela OLED e sistema operacional mais recente.",
      actionLabel: "COMPARAR MODELOS",
    },
    {
      image:
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop&crop=center",
      alt: "Tablet profissional",
      tag: "TABLET",
      title: "Tablet Pro",
      description:
        "Tablet profissional com caneta digital, tela de alta resolução e performance excepcional.",
      actionLabel: "TESTAR DEMO",
    },
  ],
  natureza: [
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
        "https://images.unsplash.com/photo-1464822759844-d150baec0b0b?w=800&h=600&fit=crop&crop=center",
      alt: "Montanhas cobertas de neve ao amanhecer",
      tag: "AVENTURA",
      title: "Montanhas Nevadas",
      description:
        "Aventure-se nas montanhas cobertas de neve e desfrute de vistas espetaculares e ar puro.",
      actionLabel: "PLANEJAR VIAGEM",
    },
  ],
};

// Computed property para os itens atuais
const currentItems = computed(() => {
  return themeData[selectedTheme.value] || themeData.culinaria;
});

// Meta tags para SEO
useHead({
  title: "Demo Interativo - Carrossel Dinâmico",
  meta: [
    {
      name: "description",
      content:
        "Demonstração interativa de um carrossel de imagens com controles dinâmicos",
    },
  ],
});
</script>
