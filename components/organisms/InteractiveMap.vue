<template>
  <div
    class="relative w-full h-full bg-gray-100 overflow-hidden select-none"
    ref="containerRef"
  >
    <!-- Mapa e Hotspots -->
    <div
      ref="mapRef"
      :class="[
        'absolute transition-transform duration-200 ease-out',
        props.editorMode
          ? 'cursor-crosshair'
          : 'cursor-grab active:cursor-grabbing',
      ]"
      :style="mapStyle"
      @mousedown="startPan"
      @touchstart="startPan"
      @click="handleMapClick"
    >
      <!-- Imagem do mapa -->
      <img
        :src="props.mapImageSrc"
        alt="Mapa do Resort"
        class="block pointer-events-none w-full h-full"
        @load="onImageLoad"
        @error="onImageError"
      />

      <!-- Hotspots -->
      <div
        v-for="hotspot in hotspotsData"
        :key="hotspot.number"
        :class="getHotspotClasses(hotspot)"
        :style="getHotspotStyle(hotspot)"
        @click.stop="handleHotspotClick(hotspot)"
        @contextmenu.prevent.stop="
          props.editorMode ? removeHotspot(hotspot) : null
        "
        :title="
          props.editorMode
            ? `Marcador ${hotspot.number} - Clique direito para remover`
            : hotspot.title
        "
      >
        {{ getHotspotContent(hotspot) }}
      </div>

      <!-- Tooltip dentro do mapa para acompanhar transformações -->
      <Tooltip
        :is-visible="isPopupVisible"
        :title="selectedHotspot?.title || ''"
        :description="selectedHotspot?.description || ''"
        :x="popupPosition.x"
        :y="popupPosition.y"
        position="auto"
        @close="closePopup"
      />
    </div>

    <!-- Instrução de uso (apenas em modo editor) -->
    <div
      v-if="props.editorMode && props.showEditorTools"
      class="absolute top-4 left-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md text-sm z-20 max-w-xs"
    >
      <div class="font-semibold mb-1">Modo Editor de Marcadores</div>
      <div class="text-xs opacity-90">
        • Clique no mapa para adicionar<br />
        • Clique direito no marcador para remover
      </div>
    </div>

    <!-- Botão para exportar dados (apenas em modo editor com ferramentas) -->
    <div
      v-if="props.editorMode && props.showEditorTools"
      class="absolute bottom-4 right-4 flex flex-col gap-2 z-20"
    >
      <button
        @click="exportHotspots"
        class="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-medium"
        aria-label="Exportar marcadores"
      >
        Exportar ({{ hotspotsData.length }})
      </button>
      <button
        @click="clearHotspots"
        class="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm font-medium"
        aria-label="Limpar marcadores"
      >
        Limpar Todos
      </button>
    </div>

    <!-- Controles de Zoom -->
    <div
      v-if="props.showZoomControls"
      class="absolute top-4 right-4 flex flex-col gap-2 z-20"
    >
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
import Tooltip from "../molecules/Tooltip.vue";

// Refs
const containerRef = ref<HTMLDivElement>();
const mapRef = ref<HTMLDivElement>();

// Props
const props = withDefaults(
  defineProps<{
    hotspots?: HotspotData[];
    editorMode?: boolean;
    showZoomControls?: boolean;
    showEditorTools?: boolean;
    mapImageSrc?: string;
    defaultHotspotColor?: string;
    defaultHotspotSize?: "small" | "medium" | "large";
  }>(),
  {
    hotspots: () => [],
    editorMode: false,
    showZoomControls: true,
    showEditorTools: false,
    mapImageSrc: "/resort-map.jpg",
    defaultHotspotColor: "#ef4444", // red-500
    defaultHotspotSize: "medium",
  }
);

// Emits
const emit = defineEmits<{
  hotspotClick: [hotspot: HotspotData];
  hotspotAdd: [hotspot: HotspotData];
  hotspotRemove: [hotspot: HotspotData];
  hotspotsUpdate: [hotspots: HotspotData[]];
}>();

// State - Hotspots editáveis
const nextHotspotNumber = ref(1);
const hotspotsData = ref<HotspotData[]>([...props.hotspots]);

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
const minScale = ref(1); // Escala mínima dinâmica (preenche o container)

// Pan state
const isPanning = ref(false);
const startX = ref(0);
const startY = ref(0);
const lastTranslateX = ref(0);
const lastTranslateY = ref(0);
const hasMoved = ref(false); // Para detectar se moveu durante o clique

// Configurações
const maxScale = 3;
const zoomStep = 0.3;

// Mapeamento de tamanhos
const sizeClasses = {
  small: "w-5 h-5 text-xs",
  medium: "w-6 h-6 text-xs",
  large: "w-8 h-8 text-sm",
};

// Computed
const mapStyle = computed(() => ({
  transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  transformOrigin: "0 0",
  width: `${imageWidth.value}px`,
  height: `${imageHeight.value}px`,
}));

// Métodos
const getHotspotStyle = (hotspot: HotspotData) => {
  const bgColor = hotspot.backgroundColor || props.defaultHotspotColor;
  return {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
    transform: "translate(-50%, -50%)",
    backgroundColor: bgColor,
  };
};

const getHotspotClasses = (hotspot: HotspotData) => {
  const size = (hotspot.size || props.defaultHotspotSize) as
    | "small"
    | "medium"
    | "large";
  const sizeClass = sizeClasses[size];
  return `absolute ${sizeClass} text-white rounded-full border border-white shadow-md flex items-center justify-center font-bold cursor-pointer transition-all duration-200 hover:scale-125 hover:shadow-xl`;
};

const getHotspotContent = (hotspot: HotspotData) => {
  // Prioridade: icon > text > number
  if (hotspot.icon) return hotspot.icon;
  if (hotspot.text) return hotspot.text;
  return hotspot.number.toString();
};

const handleMapClick = (e: MouseEvent) => {
  // Só adicionar marcador em modo editor
  if (!props.editorMode) return;

  // Não adicionar marcador se houve movimento (pan)
  if (hasMoved.value) return;

  if (!mapRef.value) return;

  // Obter as coordenadas do clique relativas ao mapa
  const rect = mapRef.value.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // Calcular as coordenadas em percentual (0-100)
  const percentX = (clickX / rect.width) * 100;
  const percentY = (clickY / rect.height) * 100;

  // Criar novo hotspot
  const newHotspot: HotspotData = {
    number: nextHotspotNumber.value,
    title: `Marcador ${nextHotspotNumber.value}`,
    description: `Descrição do marcador ${nextHotspotNumber.value}`,
    x: Math.round(percentX * 100) / 100, // 2 casas decimais
    y: Math.round(percentY * 100) / 100,
    category: "attraction",
    backgroundColor: props.defaultHotspotColor,
    size: props.defaultHotspotSize,
  };

  hotspotsData.value.push(newHotspot);
  nextHotspotNumber.value++;

  emit("hotspotAdd", newHotspot);
  emit("hotspotsUpdate", [...hotspotsData.value]);
};

const handleHotspotClick = (hotspot: HotspotData) => {
  selectedHotspot.value = hotspot;
  popupPosition.value = { x: hotspot.x, y: hotspot.y };
  isPopupVisible.value = true;
  emit("hotspotClick", hotspot);
};

const closePopup = () => {
  isPopupVisible.value = false;
  selectedHotspot.value = null;
};

const exportHotspots = () => {
  const data = JSON.stringify(hotspotsData.value, null, 2);

  // Copiar para clipboard
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        alert(
          `${hotspotsData.value.length} marcadores copiados para a área de transferência!`
        );
      })
      .catch(() => {
        alert(
          `Dados exibidos no console. Total: ${hotspotsData.value.length} marcadores`
        );
      });
  } else {
    alert(
      `Dados exibidos no console. Total: ${hotspotsData.value.length} marcadores`
    );
  }
};

const clearHotspots = () => {
  if (confirm("Deseja realmente limpar todos os marcadores?")) {
    hotspotsData.value = [];
    nextHotspotNumber.value = 1;
  }
};

const removeHotspot = (hotspot: HotspotData) => {
  const index = hotspotsData.value.findIndex(
    (h: HotspotData) => h.number === hotspot.number
  );
  if (index !== -1) {
    hotspotsData.value.splice(index, 1);
    emit("hotspotRemove", hotspot);
    emit("hotspotsUpdate", [...hotspotsData.value]);
  }
};

// Função para aplicar limites ao pan (não arrastar para fora do mapa)
const applyPanLimits = (x: number, y: number): { x: number; y: number } => {
  const scaledWidth = imageWidth.value * scale.value;
  const scaledHeight = imageHeight.value * scale.value;

  // Calcular os limites
  // O mapa não deve ser arrastado para além dos limites do container
  const minX = containerWidth.value - scaledWidth;
  const maxX = 0;
  const minY = containerHeight.value - scaledHeight;
  const maxY = 0;

  // Aplicar limites
  let limitedX = x;
  let limitedY = y;

  // Se o mapa for menor que o container em alguma dimensão, centralizar
  if (scaledWidth <= containerWidth.value) {
    limitedX = (containerWidth.value - scaledWidth) / 2;
  } else {
    limitedX = Math.max(minX, Math.min(maxX, x));
  }

  if (scaledHeight <= containerHeight.value) {
    limitedY = (containerHeight.value - scaledHeight) / 2;
  } else {
    limitedY = Math.max(minY, Math.min(maxY, y));
  }

  return { x: limitedX, y: limitedY };
};

const zoomIn = () => {
  const newScale = Math.min(scale.value + zoomStep, maxScale);
  scale.value = newScale;

  // Aplicar limites após zoom
  const limited = applyPanLimits(translateX.value, translateY.value);
  translateX.value = limited.x;
  translateY.value = limited.y;
  lastTranslateX.value = limited.x;
  lastTranslateY.value = limited.y;
};

const zoomOut = () => {
  const newScale = Math.max(scale.value - zoomStep, minScale.value);
  scale.value = newScale;

  // Aplicar limites após zoom
  const limited = applyPanLimits(translateX.value, translateY.value);
  translateX.value = limited.x;
  translateY.value = limited.y;
  lastTranslateX.value = limited.x;
  lastTranslateY.value = limited.y;
};

const resetView = () => {
  if (containerRef.value && imageWidth.value > 0) {
    const containerRect = containerRef.value.getBoundingClientRect();
    containerWidth.value = containerRect.width;
    containerHeight.value = containerRect.height;

    // Recalcular escala para preencher o container
    const scaleX = containerWidth.value / imageWidth.value;
    const scaleY = containerHeight.value / imageHeight.value;
    const fillScale = Math.max(scaleX, scaleY);

    // Atualizar escala mínima
    minScale.value = fillScale;
    scale.value = fillScale;

    // Centralizar a imagem escalada
    const scaledWidth = imageWidth.value * fillScale;
    const scaledHeight = imageHeight.value * fillScale;
    translateX.value = (containerWidth.value - scaledWidth) / 2;
    translateY.value = (containerHeight.value - scaledHeight) / 2;
    lastTranslateX.value = translateX.value;
    lastTranslateY.value = translateY.value;
  }
};

const startPan = (e: MouseEvent | TouchEvent) => {
  isPanning.value = true;
  hasMoved.value = false;

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

  hasMoved.value = true;

  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

  const newX = clientX - startX.value;
  const newY = clientY - startY.value;

  // Aplicar limites para não arrastar para fora do mapa
  const limited = applyPanLimits(newX, newY);
  translateX.value = limited.x;
  translateY.value = limited.y;
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
  const newScale = Math.max(
    minScale.value,
    Math.min(maxScale, scale.value + delta)
  );

  scale.value = newScale;

  // Aplicar limites após zoom
  const limited = applyPanLimits(translateX.value, translateY.value);
  translateX.value = limited.x;
  translateY.value = limited.y;
  lastTranslateX.value = limited.x;
  lastTranslateY.value = limited.y;
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

    // Armazenar as dimensões reais da imagem
    imageWidth.value = naturalWidth;
    imageHeight.value = naturalHeight;

    // Calcular escala para preencher o container mantendo proporção
    const scaleX = containerWidth.value / naturalWidth;
    const scaleY = containerHeight.value / naturalHeight;
    const fillScale = Math.max(scaleX, scaleY); // Usar o maior para preencher completamente

    // Definir escala mínima como a escala que preenche o container
    minScale.value = fillScale;

    // Definir escala inicial
    scale.value = fillScale;

    // Centralizar a imagem escalada
    const scaledWidth = naturalWidth * fillScale;
    const scaledHeight = naturalHeight * fillScale;
    translateX.value = (containerWidth.value - scaledWidth) / 2;
    translateY.value = (containerHeight.value - scaledHeight) / 2;
    lastTranslateX.value = translateX.value;
    lastTranslateY.value = translateY.value;
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

    // Recalcular escala para manter o preenchimento
    const scaleX = containerWidth.value / imageWidth.value;
    const scaleY = containerHeight.value / imageHeight.value;
    const fillScale = Math.max(scaleX, scaleY);

    // Atualizar escala mínima
    minScale.value = fillScale;

    // Se a escala atual for menor que a nova escala mínima, ajustar
    if (scale.value < fillScale) {
      scale.value = fillScale;
    }

    // Centralizar a imagem escalada
    const scaledWidth = imageWidth.value * scale.value;
    const scaledHeight = imageHeight.value * scale.value;
    translateX.value = (containerWidth.value - scaledWidth) / 2;
    translateY.value = (containerHeight.value - scaledHeight) / 2;
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
