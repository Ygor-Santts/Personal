<template>
  <div
    class="relative w-full h-full bg-gray-100 overflow-hidden select-none"
    ref="containerRef"
  >
    <!-- Mapa e Hotspots -->
    <div
      ref="mapRef"
      class="absolute transition-transform duration-200 ease-out"
      :style="mapStyle"
      @mousedown="startPan"
      @touchstart="startPan"
    >
      <!-- Imagem do mapa -->
      <img
        :src="mapImageSrc"
        alt="Mapa do Resort"
        class="block pointer-events-none w-full h-full object-cover"
        @load="onImageLoad"
        @error="onImageError"
      />

      <!-- Hotspots -->
      <div
        v-for="hotspot in hotspotsData"
        :key="hotspot.number"
        class="absolute w-10 h-10 bg-red-500 text-white rounded-full border-2 border-white shadow-md flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-red-600 hover:shadow-xl"
        :style="getHotspotStyle(hotspot)"
        @click="handleHotspotClick(hotspot)"
      >
        {{ hotspot.number }}
      </div>
    </div>

    <!-- Controles de Zoom -->
    <div class="absolute top-4 right-4 flex flex-col gap-2 z-20">
      <button
        @click="zoomIn"
        class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Zoom in"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <button
        @click="zoomOut"
        class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Zoom out"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          />
        </svg>
      </button>
      <button
        @click="resetView"
        class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Reset view"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>
    </div>

    <!-- Popup -->
    <Popup :is-visible="isPopupVisible" @close="closePopup">
      <template #title>
        {{ selectedHotspot?.title || "" }}
      </template>
      <template #description>
        {{ selectedHotspot?.description || "" }}
      </template>
      <template #x>
        {{ popupPosition.x }}
      </template>
      <template #y>
        {{ popupPosition.y }}
      </template>
    </Popup>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-30"
    >
      <div
        class="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"
      ></div>
      <p class="text-gray-700">Carregando mapa...</p>
    </div>

    <!-- Error -->
    <div
      v-if="hasError"
      class="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-30 p-8"
    >
      <p class="text-gray-700 mb-4">
        Erro ao carregar o mapa. Verifique se o arquivo existe.
      </p>
      <button
        @click="retryLoad"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg border-0 cursor-pointer transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Tentar novamente
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { HotspotData } from "../../types/hotspot";
import { hotspotsData } from "../../data/hotspots";

// Refs
const containerRef = ref<HTMLDivElement>();
const mapRef = ref<HTMLDivElement>();

// State
const isLoading = ref(true);
const hasError = ref(false);
const isPopupVisible = ref(false);
const selectedHotspot = ref<HotspotData | null>(null);
const popupPosition = ref({ x: 50, y: 50 });

// Transform state
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const containerWidth = ref(0);
const containerHeight = ref(0);
const imageWidth = ref(0);
const imageHeight = ref(0);

// Pan state
const isPanning = ref(false);
const startX = ref(0);
const startY = ref(0);
const lastTranslateX = ref(0);
const lastTranslateY = ref(0);

// Configurações
const mapImageSrc = "/resort-map.jpg";
const minScale = 0.2;
const maxScale = 3;
const zoomStep = 0.3;

// Computed
const mapStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  transformOrigin: "0 0",
  width: `${containerWidth.value}px`,
  height: `${containerHeight.value}px`,
}));

// Métodos
const getHotspotStyle = (hotspot: HotspotData) => ({
  left: `${hotspot.x}%`,
  top: `${hotspot.y}%`,
  transform: "translate(-50%, -50%)",
});

const handleHotspotClick = (hotspot: HotspotData) => {
  selectedHotspot.value = hotspot;
  popupPosition.value = { x: hotspot.x, y: hotspot.y };
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
  selectedHotspot.value = null;
};

const zoomIn = () => {
  const newScale = Math.min(scale.value + zoomStep, maxScale);
  scale.value = newScale;
};

const zoomOut = () => {
  const newScale = Math.max(scale.value - zoomStep, minScale);
  scale.value = newScale;
};

const resetView = () => {
  if (containerRef.value) {
    const containerRect = containerRef.value.getBoundingClientRect();
    containerWidth.value = containerRect.width;
    containerHeight.value = containerRect.height;

    // Recalcular escala para preencher o container
    const scaleX = containerWidth.value / (imageWidth.value / scale.value);
    const scaleY = containerHeight.value / (imageHeight.value / scale.value);
    const fillScale = Math.max(scaleX, scaleY);

    scale.value = fillScale;

    // Centralizar novamente
    translateX.value = (containerWidth.value - imageWidth.value) / 2;
    translateY.value = (containerHeight.value - imageHeight.value) / 2;
    lastTranslateX.value = translateX.value;
    lastTranslateY.value = translateY.value;
  }
};

const startPan = (e: MouseEvent | TouchEvent) => {
  isPanning.value = true;

  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

  startX.value = clientX - translateX.value;
  startY.value = clientY - translateY.value;

  document.addEventListener("mousemove", onPan);
  document.addEventListener("mouseup", endPan);
  document.addEventListener("touchmove", onPan);
  document.addEventListener("touchend", endPan);

  e.preventDefault();
};

const onPan = (e: MouseEvent | TouchEvent) => {
  if (!isPanning.value) return;

  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

  translateX.value = clientX - startX.value;
  translateY.value = clientY - startY.value;
};

const endPan = () => {
  isPanning.value = false;
  lastTranslateX.value = translateX.value;
  lastTranslateY.value = translateY.value;

  document.removeEventListener("mousemove", onPan);
  document.removeEventListener("mouseup", endPan);
  document.removeEventListener("touchmove", onPan);
  document.removeEventListener("touchend", endPan);
};

const onWheel = (e: WheelEvent) => {
  e.preventDefault();

  const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
  const newScale = Math.max(minScale, Math.min(maxScale, scale.value + delta));

  scale.value = newScale;
};

const onImageLoad = (event: Event) => {
  isLoading.value = false;
  hasError.value = false;

  if (containerRef.value && event.target) {
    const img = event.target as HTMLImageElement;
    const containerRect = containerRef.value.getBoundingClientRect();

    // Obter dimensões reais da imagem
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Calcular dimensões do container
    containerWidth.value = containerRect.width;
    containerHeight.value = containerRect.height;

    // Calcular escala para preencher o container mantendo proporção
    const scaleX = containerWidth.value / naturalWidth;
    const scaleY = containerHeight.value / naturalHeight;
    const fillScale = Math.max(scaleX, scaleY); // Usar o maior para preencher completamente

    // Definir dimensões da imagem escalada
    imageWidth.value = naturalWidth * fillScale;
    imageHeight.value = naturalHeight * fillScale;

    // Centralizar a imagem
    translateX.value = (containerWidth.value - imageWidth.value) / 2;
    translateY.value = (containerHeight.value - imageHeight.value) / 2;
    lastTranslateX.value = translateX.value;
    lastTranslateY.value = translateY.value;

    // Ajustar escala inicial para preencher o container
    scale.value = fillScale;
  }
};

const onImageError = () => {
  isLoading.value = false;
  hasError.value = true;
};

const retryLoad = () => {
  isLoading.value = true;
  hasError.value = false;
  resetView();
};

// Fechar popup com ESC
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isPopupVisible.value) {
    closePopup();
  }
};

const handleResize = () => {
  if (containerRef.value && imageWidth.value > 0) {
    const containerRect = containerRef.value.getBoundingClientRect();
    containerWidth.value = containerRect.width;
    containerHeight.value = containerRect.height;

    // Recalcular posição central
    translateX.value = (containerWidth.value - imageWidth.value) / 2;
    translateY.value = (containerHeight.value - imageHeight.value) / 2;
    lastTranslateX.value = translateX.value;
    lastTranslateY.value = translateY.value;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);

  if (containerRef.value) {
    containerRef.value.addEventListener("wheel", onWheel, { passive: false });
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", handleResize);

  if (containerRef.value) {
    containerRef.value.removeEventListener("wheel", onWheel);
  }

  // Limpar event listeners de pan
  document.removeEventListener("mousemove", onPan);
  document.removeEventListener("mouseup", endPan);
  document.removeEventListener("touchmove", onPan);
  document.removeEventListener("touchend", endPan);
});
</script>
