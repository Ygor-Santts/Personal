<template>
  <div class="circular-carousel-container">
    <!-- Carrossel wrapper -->
    <div
      ref="carouselWrapper"
      class="carousel-wrapper"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      :style="{
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        touchAction: 'pan-y pinch-zoom',
        overscrollBehavior: 'contain',
      }"
    >
      <!-- Carrossel com loop infinito -->
      <div
        ref="carouselTrack"
        class="carousel-track"
        :data-transitioning="isTransitioning"
        :style="{
          transform: `translate3d(${translateX}px, 0, 0)`,
          transition: isTransitioning
            ? `transform ${transitionMs}ms ${ease}`
            : 'none',
          width: `${totalWidth}px`,
        }"
      >
        <!-- Clones para loop infinito -->
        <div
          v-for="(item, index) in displayItems"
          :key="`${item.originalIndex}-${index}`"
          :class="`carousel-slide h-full flex-shrink-0`"
          :style="{ width: `${slideWidthPx}px` }"
          role="group"
          :aria-label="`Slide ${item.originalIndex + 1} de ${items.length}`"
        >
          <div
            :class="`w-full h-full rounded-xl sm:rounded-2xl overflow-hidden ${
              index === centerIndex ? 'shadow-2xl z-20' : 'z-0'
            }`"
            :style="{
              opacity: getSlideOpacity(index),
              transform: getSlideTransform(index),
              transition: isTransitioning
                ? `opacity ${transitionMs}ms ${ease}, transform ${transitionMs}ms ${ease}`
                : 'opacity 0.3s ease, transform 0.3s ease',
            }"
          >
            <slot
              :name="index === centerIndex ? 'center-item' : 'side-item'"
              :item="item"
              :index="item.originalIndex"
              :isActive="index === centerIndex"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Controles de navegação -->
    <button
      v-if="showArrows"
      class="nav-button nav-button-prev"
      @click.stop="prevSlide"
      :disabled="isTransitioning"
      aria-label="Slide anterior"
    >
      <svg
        class="nav-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      v-if="showArrows"
      class="nav-button nav-button-next"
      @click.stop="nextSlide"
      :disabled="isTransitioning"
      aria-label="Próximo slide"
    >
      <svg
        class="nav-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <!-- Indicadores -->
    <div v-if="showIndicators" class="indicators">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Ir para slide ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";

interface CarouselItem {
  id: string | number;
  [key: string]: any;
}

interface Props {
  items: CarouselItem[];
  visibleSlides?: number;
  loopInfinite?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  transitionMs?: number;
  ease?: string;
  pauseOnHover?: boolean;
  swipeThreshold?: number;
  dragThreshold?: number;
  clonesPerSide?: number;
}

const props = withDefaults(defineProps<Props>(), {
  visibleSlides: 3,
  loopInfinite: true,
  showArrows: true,
  showIndicators: true,
  autoplay: false,
  autoplayInterval: 3000,
  transitionMs: 800,
  ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  pauseOnHover: true,
  swipeThreshold: 50,
  dragThreshold: 10,
  clonesPerSide: 5,
});

// Estados reativos
const currentIndex = ref(0);
const isTransitioning = ref(false);
const isDragging = ref(false);
const isPlaying = ref(props.autoplay);

// Posicionamento
const translateX = ref(0);

// Estados de drag
const startX = ref(0);
const currentX = ref(0);
const lastMoveX = ref(0);
const velocity = ref(0);
const startTime = ref(0);

// Referências DOM
const carouselWrapper = ref<HTMLElement | null>(null);
const carouselTrack = ref<HTMLElement | null>(null);

// Dimensões
const slideWidthPx = ref(0);
const totalWidth = ref(0);

// Timers
let autoplayTimer: NodeJS.Timeout | null = null;
let animationFrameId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let debounceTimer: NodeJS.Timeout | null = null;

// Computed properties
const displayItems = computed(() => {
  if (!props.loopInfinite || props.items.length <= 1) {
    return props.items.map((item, index) => ({
      ...item,
      originalIndex: index,
    }));
  }

  const items = props.items.map((item, index) => ({
    ...item,
    originalIndex: index,
  }));

  const clonesPerSide = props.clonesPerSide;
  const totalItems = items.length;
  const allItems: any[] = [];

  // Criar clones suficientes para formar o círculo
  const currentIdx = currentIndex.value;

  for (let i = -clonesPerSide; i <= clonesPerSide; i++) {
    // Calcular o índice do item original baseado na posição circular
    let itemIndex = (((currentIdx + i) % totalItems) + totalItems) % totalItems;

    allItems.push({
      ...items[itemIndex],
      originalIndex: itemIndex,
      cloneIndex: i + clonesPerSide,
      globalIndex: i,
    });
  }

  return allItems;
});

// Computed para o índice central correto
const centerIndex = computed(() => {
  if (!props.loopInfinite || props.items.length <= 1) {
    return currentIndex.value;
  }
  // O centro sempre está no meio do array displayItems (clonesPerSide)
  return props.clonesPerSide;
});

// Função para calcular opacidade do slide (baseado no Swiper)
const getSlideOpacity = (index: number) => {
  if (!props.loopInfinite || props.items.length <= 1) {
    const isActive = index === currentIndex.value;
    return isActive ? 1 : 0.7;
  }

  const centerIdx = centerIndex.value;
  const distance = Math.abs(index - centerIdx);
  const maxDistance = props.clonesPerSide;

  // Calcular opacidade com transição mais suave
  if (distance === 0) return 1; // Centro sempre 100% opaco
  if (distance === 1) return 0.8; // Adjacentes 80% opacos
  if (distance === 2) return 0.6; // Próximos 60% opacos
  if (distance === 3) return 0.4; // Distantes 40% opacos

  // Para distâncias maiores, fade mais gradual
  return Math.max(0.2, 1 - (distance / maxDistance) * 0.8);
};

// Função para calcular transformação do slide (baseado no Swiper)
const getSlideTransform = (index: number) => {
  if (!props.loopInfinite || props.items.length <= 1) {
    const isActive = index === currentIndex.value;
    return `scale(${isActive ? 1 : 0.8})`;
  }

  const centerIdx = centerIndex.value;
  const distance = Math.abs(index - centerIdx);

  // Calcular escala com transições mais suaves e graduais
  if (distance === 0) return `scale(1)`; // Centro sempre escala 1
  if (distance === 1) return `scale(0.9)`; // Adjacentes 90%
  if (distance === 2) return `scale(0.8)`; // Próximos 80%
  if (distance === 3) return `scale(0.7)`; // Distantes 70%
  if (distance === 4) return `scale(0.65)`; // Mais distantes 65%
  if (distance >= 5) return `scale(0.6)`; // Muito distantes 60%

  return `scale(1)`;
};

// Função para calcular dimensões
const calculateDimensions = () => {
  if (!carouselWrapper.value) return;

  const wrapperWidth = carouselWrapper.value.offsetWidth;
  slideWidthPx.value = wrapperWidth / props.visibleSlides;
  totalWidth.value = displayItems.value.length * slideWidthPx.value;

  // Reposicionar para o slide atual
  const centerOffset = Math.floor(props.visibleSlides / 2);
  translateX.value =
    -(centerIndex.value * slideWidthPx.value) +
    centerOffset * slideWidthPx.value;
};

// Função para arredondar para o pixel mais próximo
const roundToNearest = (value: number, nearest: number = 1) => {
  return Math.round(value / nearest) * nearest;
};

// Funções de navegação
const nextSlide = () => {
  if (isTransitioning.value) return;

  if (props.loopInfinite) {
    const nextIndex = (currentIndex.value + 1) % props.items.length;
    animateToSlide(nextIndex, 1);
  } else {
    const nextIndex = Math.min(currentIndex.value + 1, props.items.length - 1);
    animateToSlide(nextIndex, 1);
  }
};

const prevSlide = () => {
  if (isTransitioning.value) return;

  if (props.loopInfinite) {
    const prevIndex =
      currentIndex.value === 0
        ? props.items.length - 1
        : currentIndex.value - 1;
    animateToSlide(prevIndex, -1);
  } else {
    const prevIndex = Math.max(currentIndex.value - 1, 0);
    animateToSlide(prevIndex, -1);
  }
};

const goToSlide = (targetIndex: number) => {
  if (isTransitioning.value || targetIndex === currentIndex.value) return;

  const direction = targetIndex > currentIndex.value ? 1 : -1;
  animateToSlide(targetIndex, direction);
};

// Função para animar para um slide específico
const animateToSlide = (targetIndex: number, direction: number) => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;
  currentIndex.value = targetIndex;

  // Recalcular posição
  calculateDimensions();

  // Verificar se precisa reposicionar (para loop infinito)
  setTimeout(() => {
    if (props.loopInfinite && props.items.length > 1) {
      checkAndReposition();
    }
    isTransitioning.value = false;
  }, props.transitionMs);
};

// Função para verificar e reposicionar (loop infinito)
const checkAndReposition = () => {
  if (!props.loopInfinite || props.items.length <= 1) return;

  // Temporariamente desabilitar transições
  const wasTransitioning = isTransitioning.value;
  isTransitioning.value = false;

  // Reposicionar se necessário
  calculateDimensions();

  // Reabilitar transições
  isTransitioning.value = wasTransitioning;
};

// Funções de autoplay
const startAutoplay = () => {
  if (!props.autoplay || isPlaying.value) return;

  isPlaying.value = true;
  autoplayTimer = setInterval(() => {
    if (!isDragging.value && !isTransitioning.value) {
      nextSlide();
    }
  }, props.autoplayInterval);
};

const stopAutoplay = () => {
  isPlaying.value = false;
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const toggleAutoplay = () => {
  if (isPlaying.value) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
};

// Funções de drag/touch
const handleTouchStart = (event: TouchEvent) => {
  if (isTransitioning.value) return;

  isDragging.value = true;
  startX.value = event.touches[0].clientX;
  currentX.value = startX.value;
  lastMoveX.value = startX.value;
  startTime.value = Date.now();
  velocity.value = 0;

  stopAutoplay();
};

const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || isTransitioning.value) return;

  event.preventDefault();
  currentX.value = event.touches[0].clientX;
  const deltaX = currentX.value - lastMoveX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  lastMoveX.value = currentX.value;
};

const handleTouchEnd = (event: TouchEvent) => {
  if (!isDragging.value || isTransitioning.value) return;

  isDragging.value = false;
  const deltaX = currentX.value - startX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  // Determinar se deve navegar baseado na velocidade e distância
  if (
    Math.abs(deltaX) > props.swipeThreshold ||
    Math.abs(velocity.value) > 0.5
  ) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }

  // Reiniciar autoplay se habilitado
  if (props.autoplay) {
    startAutoplay();
  }
};

const handleMouseDown = (event: MouseEvent) => {
  if (isTransitioning.value) return;

  event.preventDefault();
  isDragging.value = true;
  startX.value = event.clientX;
  currentX.value = startX.value;
  lastMoveX.value = startX.value;
  startTime.value = Date.now();
  velocity.value = 0;

  stopAutoplay();
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || isTransitioning.value) return;

  event.preventDefault();
  currentX.value = event.clientX;
  const deltaX = currentX.value - lastMoveX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  lastMoveX.value = currentX.value;
};

const handleMouseUp = (event: MouseEvent) => {
  if (!isDragging.value || isTransitioning.value) return;

  isDragging.value = false;
  const deltaX = currentX.value - startX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  // Determinar se deve navegar baseado na velocidade e distância
  if (
    Math.abs(deltaX) > props.swipeThreshold ||
    Math.abs(velocity.value) > 0.5
  ) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }

  // Reiniciar autoplay se habilitado
  if (props.autoplay) {
    startAutoplay();
  }
};

const handleMouseLeave = () => {
  if (isDragging.value) {
    handleMouseUp(new MouseEvent("mouseup"));
  }
};

// Função de teclado
const handleKeydown = (event: KeyboardEvent) => {
  if (isTransitioning.value) return;

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      prevSlide();
      break;
    case "ArrowRight":
      event.preventDefault();
      nextSlide();
      break;
    case "Home":
      event.preventDefault();
      goToSlide(0);
      break;
    case "End":
      event.preventDefault();
      goToSlide(props.items.length - 1);
      break;
    case " ":
      event.preventDefault();
      toggleAutoplay();
      break;
  }
};

// Lifecycle hooks
onMounted(async () => {
  await nextTick();
  calculateDimensions();

  if (isPlaying.value) {
    startAutoplay();
  }

  // Event listeners
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // ResizeObserver para recalcular dimensões
  resizeObserver = new ResizeObserver(() => {
    calculateDimensions();
  });

  if (carouselWrapper.value) {
    resizeObserver.observe(carouselWrapper.value);
  }

  // Pause on hover
  if (props.pauseOnHover && carouselWrapper.value) {
    carouselWrapper.value.addEventListener("mouseenter", stopAutoplay);
    carouselWrapper.value.addEventListener("mouseleave", () => {
      if (isPlaying.value) {
        startAutoplay();
      }
    });
  }
});

onUnmounted(() => {
  stopAutoplay();
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);

  if (resizeObserver) {
    resizeObserver.disconnect();
  }

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});

// Watchers
watch(
  () => props.visibleSlides,
  () => {
    calculateDimensions();
  }
);

watch(
  () => props.items,
  () => {
    currentIndex.value = 0;
    calculateDimensions();
  },
  { immediate: true }
);

// Expor funções para o template
defineExpose({
  nextSlide,
  prevSlide,
  goToSlide,
  toggleAutoplay,
  currentIndex,
  isTransitioning,
  isPlaying,
  translateX,
  slideWidthPx,
  totalWidth,
  displayItems,
});
</script>

<style scoped>
/* Carrossel wrapper - otimizado para performance */
.circular-carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-track {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.carousel-slide {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Botões de navegação */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(-50%);
}

.nav-button-prev {
  left: 16px;
}

.nav-button-next {
  right: 16px;
}

.nav-icon {
  width: 20px;
  height: 20px;
  color: #374151;
}

/* Indicadores */
.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 30;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.indicator.active {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.3);
}

/* Responsividade */
@media (max-width: 768px) {
  .nav-button {
    width: 40px;
    height: 40px;
  }

  .nav-icon {
    width: 16px;
    height: 16px;
  }

  .nav-button-prev {
    left: 12px;
  }

  .nav-button-next {
    right: 12px;
  }

  .indicators {
    bottom: 16px;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }
}
</style>
