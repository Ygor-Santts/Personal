<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">
      Exemplos do Mapa Interativo
    </h1>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Exemplo 1: Modo Visualização -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          1. Modo Visualização (Padrão)
        </h2>
        <p class="text-gray-600 mb-4">
          Mapa com marcadores fixos, zoom habilitado, sem modo editor
        </p>
        <div class="h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
          <InteractiveMap :hotspots="exampleHotspots" />
        </div>
      </div>

      <!-- Exemplo 2: Modo Editor -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          2. Modo Editor Completo
        </h2>
        <p class="text-gray-600 mb-4">
          Clique para adicionar, clique direito para remover marcadores
        </p>
        <div class="h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
          <InteractiveMap
            :hotspots="editorHotspots"
            :editorMode="true"
            :showEditorTools="true"
            @hotspotAdd="handleHotspotAdd"
            @hotspotRemove="handleHotspotRemove"
            @hotspotsUpdate="handleHotspotsUpdate"
          />
        </div>
      </div>

      <!-- Exemplo 3: Marcadores Personalizados -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          3. Marcadores Personalizados
        </h2>
        <p class="text-gray-600 mb-4">Diferentes cores, tamanhos e ícones</p>
        <div class="h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
          <InteractiveMap :hotspots="customHotspots" />
        </div>
      </div>

      <!-- Exemplo 4: Sem Controles -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          4. Sem Controles de Zoom
        </h2>
        <p class="text-gray-600 mb-4">
          Apenas pan e zoom com scroll, sem botões
        </p>
        <div class="h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
          <InteractiveMap
            :hotspots="exampleHotspots"
            :showZoomControls="false"
          />
        </div>
      </div>

      <!-- Exemplo 5: Configurações Customizadas -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          5. Cores e Tamanhos Padrão
        </h2>
        <p class="text-gray-600 mb-4">
          Marcadores grandes com cor personalizada
        </p>
        <div class="h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
          <InteractiveMap
            :hotspots="simpleHotspots"
            defaultHotspotColor="#10b981"
            defaultHotspotSize="large"
          />
        </div>
      </div>

      <!-- Exemplo 6: Editor com Configurações -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          6. Editor com Marcadores Pequenos
        </h2>
        <p class="text-gray-600 mb-4">
          Modo editor com marcadores pequenos azuis
        </p>
        <div class="h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
          <InteractiveMap
            :editorMode="true"
            :showEditorTools="true"
            defaultHotspotColor="#3b82f6"
            defaultHotspotSize="small"
          />
        </div>
      </div>
    </div>

    <!-- Log de eventos -->
    <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Log de Eventos</h2>
      <div class="bg-gray-100 p-4 rounded-lg max-h-48 overflow-y-auto">
        <div v-if="eventLog.length === 0" class="text-gray-500">
          Nenhum evento registrado ainda...
        </div>
        <div
          v-for="(event, index) in eventLog"
          :key="index"
          class="text-sm text-gray-700 mb-1"
        >
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InteractiveMap from "../components/organisms/InteractiveMap.vue";
import type { HotspotData } from "../types/hotspot";

// Marcadores de exemplo básicos
const exampleHotspots = ref<HotspotData[]>([
  {
    number: 1,
    title: "Ponto A",
    description: "Primeiro ponto de interesse",
    x: 20,
    y: 30,
    category: "attraction",
  },
  {
    number: 2,
    title: "Ponto B",
    description: "Segundo ponto de interesse",
    x: 50,
    y: 50,
    category: "service",
  },
  {
    number: 3,
    title: "Ponto C",
    description: "Terceiro ponto de interesse",
    x: 70,
    y: 40,
    category: "facility",
  },
]);

// Marcadores para o editor
const editorHotspots = ref<HotspotData[]>([]);

// Marcadores personalizados
const customHotspots = ref<HotspotData[]>([
  {
    number: 1,
    title: "Marcador Vermelho Grande",
    description: "Um marcador vermelho grande",
    x: 15,
    y: 20,
    category: "attraction",
    backgroundColor: "#ef4444",
    size: "large",
  },
  {
    number: 2,
    title: "Marcador Verde Médio com Ícone",
    description: "Um marcador verde com emoji",
    x: 40,
    y: 35,
    category: "service",
    backgroundColor: "#10b981",
    size: "medium",
    icon: "🌟",
  },
  {
    number: 3,
    title: "Marcador Azul Pequeno",
    description: "Um marcador azul pequeno",
    x: 65,
    y: 25,
    category: "facility",
    backgroundColor: "#3b82f6",
    size: "small",
  },
  {
    number: 4,
    title: "Marcador Roxo com Texto",
    description: "Um marcador roxo com texto customizado",
    x: 50,
    y: 60,
    category: "accommodation",
    backgroundColor: "#8b5cf6",
    size: "medium",
    text: "A",
  },
  {
    number: 5,
    title: "Marcador Rosa com Ícone",
    description: "Um marcador rosa com coração",
    x: 75,
    y: 70,
    category: "attraction",
    backgroundColor: "#ec4899",
    size: "large",
    icon: "❤️",
  },
]);

// Marcadores simples
const simpleHotspots = ref<HotspotData[]>([
  {
    number: 1,
    title: "Local 1",
    description: "Descrição do local 1",
    x: 30,
    y: 40,
    category: "attraction",
  },
  {
    number: 2,
    title: "Local 2",
    description: "Descrição do local 2",
    x: 60,
    y: 50,
    category: "service",
  },
]);

// Log de eventos
const eventLog = ref<string[]>([]);

const handleHotspotAdd = (hotspot: HotspotData) => {
  eventLog.value.unshift(
    `✅ Marcador adicionado: #${hotspot.number} em (${hotspot.x}%, ${hotspot.y}%)`
  );
};

const handleHotspotRemove = (hotspot: HotspotData) => {
  eventLog.value.unshift(`❌ Marcador removido: #${hotspot.number}`);
};

const handleHotspotsUpdate = (hotspots: HotspotData[]) => {
  eventLog.value.unshift(`🔄 Marcadores atualizados: ${hotspots.length} total`);
};
</script>
