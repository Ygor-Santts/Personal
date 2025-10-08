<template>
  <div class="interactive-map">
    <div class="interactive-map__container">
      <VueZoomPanPinch
        ref="zoomPanPinchRef"
        :min-scale="0.5"
        :max-scale="3"
        :initial-scale="1"
        :wheel-step="0.1"
        :double-click-delay="300"
        :double-click-step="0.7"
        :disabled="false"
        :limit-to-bounds="false"
        :center-on-init="true"
        :disable-wheel="false"
        :disable-pinch="false"
        :disable-double-click="false"
        :disable-drag="false"
        :disable-scroll="false"
        :disable-keyboard="false"
        :enable-rtl="false"
        :prevent-default-events="true"
        :content-class="'interactive-map__content'"
        :wrapper-class="'interactive-map__wrapper'"
        class="interactive-map__zoom-container"
      >
        <div class="interactive-map__image-container">
          <img
            ref="mapImageRef"
            src="/resort-map.jpg"
            alt="Mapa do Resort"
            class="interactive-map__image"
            @load="onImageLoad"
            @error="onImageError"
          />

          <!-- Hotspots -->
          <Hotspot
            v-for="hotspot in hotspotsData"
            :key="hotspot.number"
            :number="hotspot.number"
            :title="hotspot.title"
            :x="hotspot.x"
            :y="hotspot.y"
            @click="handleHotspotClick"
          />
        </div>
      </VueZoomPanPinch>
    </div>

    <!-- Popup -->
    <Popup
      :is-visible="isPopupVisible"
      :title="selectedHotspot?.title || ''"
      :description="selectedHotspot?.description || ''"
      :x="popupPosition.x"
      :y="popupPosition.y"
      @close="closePopup"
    />

    <!-- Controles -->
    <div class="interactive-map__controls">
      <button
        class="control-button"
        @click="resetZoom"
        aria-label="Resetar zoom"
      >
        <svg
          class="control-button__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      <button class="control-button" @click="zoomIn" aria-label="Aumentar zoom">
        <svg
          class="control-button__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </button>

      <button
        class="control-button"
        @click="zoomOut"
        aria-label="Diminuir zoom"
      >
        <svg
          class="control-button__icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
          />
        </svg>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="interactive-map__loading">
      <div class="loading-spinner"></div>
      <p>Carregando mapa...</p>
    </div>

    <!-- Error -->
    <div v-if="hasError" class="interactive-map__error">
      <p>Erro ao carregar o mapa. Verifique se o arquivo existe.</p>
      <button @click="retryLoad" class="retry-button">Tentar novamente</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import VueZoomPanPinch from "vue3-zoom-pan-pinch";
import Hotspot from "@/components/atoms/Hotspot.vue";
import Popup from "@/components/molecules/Popup.vue";
import { hotspotsData } from "~/data/hotspots";
import type { HotspotClickEvent, HotspotData } from "~/types/hotspot";

// Refs
const zoomPanPinchRef = ref();
const mapImageRef = ref<HTMLImageElement>();

// State
const isLoading = ref(true);
const hasError = ref(false);
const isPopupVisible = ref(false);
const selectedHotspot = ref<HotspotData | null>(null);
const popupPosition = ref({ x: 50, y: 50 });

// Methods
const onImageLoad = () => {
  isLoading.value = false;
  hasError.value = false;
};

const onImageError = () => {
  isLoading.value = false;
  hasError.value = true;
};

const retryLoad = () => {
  isLoading.value = true;
  hasError.value = false;
  if (mapImageRef.value) {
    mapImageRef.value.src = mapImageRef.value.src;
  }
};

const handleHotspotClick = (event: HotspotClickEvent) => {
  const hotspot = hotspotsData.find((h) => h.number === event.number);
  if (hotspot) {
    selectedHotspot.value = hotspot;
    popupPosition.value = { x: event.x, y: event.y };
    isPopupVisible.value = true;
  }
};

const closePopup = () => {
  isPopupVisible.value = false;
  selectedHotspot.value = null;
};

const resetZoom = () => {
  if (zoomPanPinchRef.value) {
    zoomPanPinchRef.value.resetTransform();
  }
};

const zoomIn = () => {
  if (zoomPanPinchRef.value) {
    zoomPanPinchRef.value.zoomIn();
  }
};

const zoomOut = () => {
  if (zoomPanPinchRef.value) {
    zoomPanPinchRef.value.zoomOut();
  }
};

// Fechar popup com ESC
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isPopupVisible.value) {
      closePopup();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
});
</script>

<style scoped>
.interactive-map {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
  overflow: hidden;
  min-height: 500px;
}

.interactive-map__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.interactive-map__zoom-container {
  width: 100%;
  height: 100%;
}

.interactive-map__wrapper {
  width: 100%;
  height: 100%;
}

.interactive-map__content {
  width: 100%;
  height: 100%;
}

.interactive-map__image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.interactive-map__image {
  width: 100%;
  height: auto;
  max-width: none;
  display: block;
}

.interactive-map__controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 20;
}

.control-button {
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.control-button:hover {
  background-color: #f9fafb;
  color: #111827;
}

.control-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5),
    0 0 0 4px rgba(59, 130, 246, 0.2);
}

.control-button__icon {
  width: 1.25rem;
  height: 1.25rem;
}

.interactive-map__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 30;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 4px solid #dbeafe;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.interactive-map__error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 30;
  padding: 2rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.retry-button:hover {
  background-color: #1d4ed8;
}

.retry-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Responsividade */
@media (max-width: 768px) {
  .interactive-map {
    min-height: 400px;
  }

  .interactive-map__controls {
    top: 0.5rem;
    right: 0.5rem;
  }

  .control-button {
    width: 2rem;
    height: 2rem;
  }

  .control-button__icon {
    width: 1rem;
    height: 1rem;
  }
}

@media (max-width: 480px) {
  .interactive-map {
    min-height: 300px;
  }

  .interactive-map__controls {
    top: 0.25rem;
    right: 0.25rem;
  }

  .control-button {
    width: 1.75rem;
    height: 1.75rem;
  }

  .control-button__icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}
</style>
