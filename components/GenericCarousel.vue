<template>
  <div :class="`w-full ${maxWidth} mx-auto p-4 sm:p-6`">
    <div class="carousel-container rounded-2xl sm:rounded-3xl overflow-hidden">
      <div
        ref="carouselWrapper"
        :class="`carousel-wrapper ${height} relative overflow-hidden`"
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
              :class="`w-full h-full rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                index === currentIndex ? 'shadow-2xl z-20' : 'z-0'
              }`"
              :style="{
                opacity: index === currentIndex ? 1 : sideItemOpacity,
                transform:
                  index === currentIndex ? 'scale(1.05)' : 'scale(0.85)',
              }"
            >
              <slot
                :name="index === currentIndex ? 'center-item' : 'side-item'"
                :item="item"
                :index="item.originalIndex"
                :isActive="index === currentIndex"
              />
            </div>
          </div>
        </div>

        <!-- Setas de navegação -->
        <button
          v-if="showArrows"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 z-30 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click.stop="prevSlide"
          :disabled="isTransitioning"
          aria-label="Slide anterior"
        >
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          v-if="showArrows"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 z-30 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click.stop="nextSlide"
          :disabled="isTransitioning"
          aria-label="Próximo slide"
        >
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Conteúdo abaixo do carrossel -->
      <div
        v-if="showContent"
        class="px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-center space-y-3 sm:space-y-4"
      >
        <Transition name="content-fade" mode="out-in">
          <div :key="currentIndex" class="transition-all duration-300 ease-out">
            <slot name="content" :item="activeItem" :index="currentIndex" />
          </div>
        </Transition>
      </div>

      <!-- Controles -->
      <div
        v-if="showIndicators || showProgressBar || showPlayPause"
        class="flex items-center justify-center space-x-3 sm:space-x-4 pb-4 sm:pb-6 mt-4"
      >
        <div
          v-if="showIndicators"
          class="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2"
        >
          <button
            v-for="(item, index) in items"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'transition-all duration-300 ease-out',
              currentIndex === index
                ? 'w-6 h-2 rounded-full bg-blue-600'
                : 'w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400',
            ]"
            :aria-label="`Ir para slide ${index + 1}`"
          />
        </div>
        <button
          v-if="showPlayPause"
          @click="toggleAutoplay"
          class="p-1 text-gray-800 hover:text-gray-600 transition-all duration-300 ease-out"
          :aria-label="isPlaying ? 'Pausar carrossel' : 'Reproduzir carrossel'"
        >
          <svg
            v-if="isPlaying"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";

interface Props {
  items: any[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showProgressBar?: boolean;
  showPlayPause?: boolean;
  showContent?: boolean;
  maxWidth?: string;
  height?: string;
  sideItemOpacity?: number;
  centerItemWidth?: string;
  sideItemWidth?: string;
  // Configurações de snap e transição
  snapDistanceThreshold?: number;
  velocityThreshold?: number;
  transitionMs?: number;
  ease?: string;
  clonesPerSide?: number;
  rounding?: number;
  // Configurações de comportamento
  loopInfinite?: boolean;
  pauseOnHover?: boolean;
  visibleSlides?: number;
  // Configurações de threshold
  swipeThreshold?: number;
  dragThreshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  autoplayInterval: 5000,
  showArrows: true,
  showIndicators: true,
  showProgressBar: true,
  showPlayPause: true,
  showContent: true,
  maxWidth: "max-w-7xl",
  height: "h-64 sm:h-80 md:h-96 lg:h-[500px]",
  sideItemOpacity: 0.6,
  centerItemWidth: "w-4/5 sm:w-4/5 md:w-2/5",
  sideItemWidth: "w-1/6 sm:w-1/5 md:w-2/5",
  // Configurações de snap e transição
  snapDistanceThreshold: 0.3, // 30%
  velocityThreshold: 0.35,
  transitionMs: 320,
  ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  clonesPerSide: 2,
  rounding: 0.5,
  // Configurações de comportamento
  loopInfinite: true,
  pauseOnHover: true,
  visibleSlides: 3,
  // Configurações de threshold
  swipeThreshold: 50,
  dragThreshold: 50,
});

// Refs principais
const carouselWrapper = ref<HTMLElement>();
const carouselTrack = ref<HTMLElement>();
const currentIndex = ref(0);
const isPlaying = ref(props.autoplay);
const isDragging = ref(false);
const isTransitioning = ref(false);

// Estados de interação
const startX = ref(0);
const startY = ref(0);
const currentX = ref(0);
const currentY = ref(0);
const velocity = ref(0);
const lastMoveTime = ref(0);
const lastMoveX = ref(0);

// Estados de animação
const translateX = ref(0);
const slideWidthPx = ref(0);
const totalWidth = ref(0);

// Timers e animações
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

  watch(
    props.items,
    () => {
      console.log("items changed", props.items);
      // console.log("displayItems", displayItems.value);
      console.log("activeItem", activeItem.value);
      console.log("currentIndex", currentIndex.value);
    },
    { immediate: true }
  );
  // Para loop infinito, criamos clones com sentinelas
  const items = [...props.items];
  const clones: any[] = [];

  // Se temos poucos itens, criamos mais clones para garantir transição suave
  const minClones = Math.max(props.clonesPerSide, 3);

  // Clones à esquerda
  for (let i = 0; i < minClones; i++) {
    clones.push(
      ...items.map((item, index) => ({ ...item, originalIndex: index }))
    );
  }

  // Items originais
  clones.push(
    ...items.map((item, index) => ({ ...item, originalIndex: index }))
  );

  // Clones à direita
  for (let i = 0; i < minClones; i++) {
    clones.push(
      ...items.map((item, index) => ({ ...item, originalIndex: index }))
    );
  }

  return clones;
});

// Computed para o índice central correto
const centerIndex = computed(() => {
  if (!props.loopInfinite || props.items.length <= 1) {
    return currentIndex.value;
  }
  const centerOffset = Math.floor(props.visibleSlides / 2);
  const minClones = Math.max(props.clonesPerSide, 3);
  return minClones + currentIndex.value + centerOffset;
});

// Computed para o item ativo correto (para o conteúdo de texto)
const activeItem = computed(() => {
  return props.items[currentIndex.value];
});

// Funções utilitárias
const roundToNearest = (
  value: number,
  precision: number = props.rounding
): number => {
  return Math.round(value / precision) * precision;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Funções de navegação
const goToSlide = (index: number) => {
  if (index === currentIndex.value || isTransitioning.value) return;

  const direction = index > currentIndex.value ? 1 : -1;
  animateToSlide(index, direction);
  resetAutoplay();
};

const nextSlide = () => {
  if (isTransitioning.value) return;

  if (props.loopInfinite) {
    animateToSlide((currentIndex.value + 1) % props.items.length, 1);
  } else {
    const nextIndex = Math.min(currentIndex.value + 1, props.items.length - 1);
    if (nextIndex !== currentIndex.value) {
      animateToSlide(nextIndex, 1);
    }
  }
  resetAutoplay();
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
    if (prevIndex !== currentIndex.value) {
      animateToSlide(prevIndex, -1);
    }
  }
  resetAutoplay();
};

// Função principal de animação
const animateToSlide = (targetIndex: number, direction: number) => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;
  currentIndex.value = targetIndex;

  // Calcular posição de destino
  const centerOffset = Math.floor(props.visibleSlides / 2);
  const targetTranslateX = roundToNearest(
    -(targetIndex * slideWidthPx.value) + centerOffset * slideWidthPx.value
  );

  // Aplicar animação suave
  translateX.value = targetTranslateX;

  // Verificar se precisa reposicionar para loop infinito
  setTimeout(() => {
    if (props.loopInfinite && props.items.length > 1) {
      checkAndReposition();
    }
    isTransitioning.value = false;
  }, props.transitionMs);
};

// Reposicionamento para loop infinito
const checkAndReposition = () => {
  if (!props.loopInfinite || props.items.length <= 1) return;

  const currentTranslate = translateX.value;
  const slideWidth = slideWidthPx.value;
  const totalSlides = props.items.length;
  const centerOffset = Math.floor(props.visibleSlides / 2);

  // Se passou do último slide, reposicionar para o início
  if (
    currentTranslate <=
    -(totalSlides * slideWidth) + centerOffset * slideWidth
  ) {
    translateX.value = roundToNearest(
      currentTranslate + totalSlides * slideWidth
    );
  }
  // Se passou do primeiro slide, reposicionar para o final
  else if (currentTranslate >= centerOffset * slideWidth) {
    translateX.value = roundToNearest(
      currentTranslate - totalSlides * slideWidth
    );
  }
};

// Funções de autoplay
const toggleAutoplay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
};

const startAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = setInterval(nextSlide, props.autoplayInterval);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const resetAutoplay = () => {
  if (isPlaying.value) {
    stopAutoplay();
    startAutoplay();
  }
};

// Funções de interação touch/mouse
const handleTouchStart = (e: TouchEvent) => {
  if (isTransitioning.value) return;

  startX.value = e.touches[0].clientX;
  startY.value = e.touches[0].clientY;
  currentX.value = startX.value;
  currentY.value = startY.value;
  isDragging.value = true;
  velocity.value = 0;
  lastMoveTime.value = Date.now();
  lastMoveX.value = startX.value;

  stopAutoplay();
  e.preventDefault();
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || isTransitioning.value) return;

  e.preventDefault();

  const now = Date.now();
  const deltaTime = now - lastMoveTime.value;
  const deltaX = e.touches[0].clientX - lastMoveX.value;

  if (deltaTime > 0) {
    velocity.value = clamp(deltaX / deltaTime, -2.5, 2.5); // Cap de velocidade
  }

  currentX.value = e.touches[0].clientX;
  currentY.value = e.touches[0].clientY;
  lastMoveTime.value = now;
  lastMoveX.value = e.touches[0].clientX;

  // Aplicar movimento em tempo real
  const delta = currentX.value - startX.value;
  const centerOffset = Math.floor(props.visibleSlides / 2);
  const baseTranslate =
    -(currentIndex.value * slideWidthPx.value) +
    centerOffset * slideWidthPx.value;
  translateX.value = roundToNearest(baseTranslate + delta);
};

const handleTouchEnd = (e: TouchEvent) => {
  if (!isDragging.value) return;

  isDragging.value = false;

  const deltaX = currentX.value - startX.value;
  const deltaY = Math.abs(currentY.value - startY.value);

  // Debounce para evitar snap duplo
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    // Verificar se é um swipe horizontal válido
    if (Math.abs(deltaX) > props.swipeThreshold && Math.abs(deltaX) > deltaY) {
      if (Math.abs(velocity.value) > props.velocityThreshold) {
        // Swipe com velocidade alta
        if (velocity.value > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        // Swipe simples
        if (deltaX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    } else {
      // Snap de volta para o slide atual
      snapToCurrentSlide();
    }

    // Reiniciar autoplay após um delay
    setTimeout(() => {
      if (isPlaying.value) {
        startAutoplay();
      }
    }, 1000);
  }, 16); // Debounce de 16ms
};

const handleMouseDown = (e: MouseEvent) => {
  if (isTransitioning.value) return;

  startX.value = e.clientX;
  startY.value = e.clientY;
  currentX.value = startX.value;
  currentY.value = e.clientY;
  isDragging.value = true;
  velocity.value = 0;
  lastMoveTime.value = Date.now();
  lastMoveX.value = startX.value;

  stopAutoplay();
  e.preventDefault();
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || isTransitioning.value) return;

  e.preventDefault();

  const now = Date.now();
  const deltaTime = now - lastMoveTime.value;
  const deltaX = e.clientX - lastMoveX.value;

  if (deltaTime > 0) {
    velocity.value = clamp(deltaX / deltaTime, -2.5, 2.5); // Cap de velocidade
  }

  currentX.value = e.clientX;
  currentY.value = e.clientY;
  lastMoveTime.value = now;
  lastMoveX.value = e.clientX;

  // Aplicar movimento em tempo real
  const delta = currentX.value - startX.value;
  const centerOffset = Math.floor(props.visibleSlides / 2);
  const baseTranslate =
    -(currentIndex.value * slideWidthPx.value) +
    centerOffset * slideWidthPx.value;
  translateX.value = roundToNearest(baseTranslate + delta);
};

const handleMouseUp = (e: MouseEvent) => {
  if (!isDragging.value) return;

  isDragging.value = false;

  const deltaX = currentX.value - startX.value;
  const deltaY = Math.abs(currentY.value - startY.value);

  // Debounce para evitar snap duplo
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    // Verificar se é um drag válido
    if (Math.abs(deltaX) > props.dragThreshold && Math.abs(deltaX) > deltaY) {
      if (Math.abs(velocity.value) > props.velocityThreshold) {
        // Drag com velocidade alta
        if (velocity.value > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        // Drag simples
        if (deltaX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    } else {
      // Snap de volta para o slide atual
      snapToCurrentSlide();
    }

    // Reiniciar autoplay após um delay
    setTimeout(() => {
      if (isPlaying.value) {
        startAutoplay();
      }
    }, 1000);
  }, 16); // Debounce de 16ms
};

const handleMouseLeave = () => {
  if (isDragging.value) {
    isDragging.value = false;
    snapToCurrentSlide();
  }
};

// Função de snap
const snapToCurrentSlide = () => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;
  const centerOffset = Math.floor(props.visibleSlides / 2);
  translateX.value = roundToNearest(
    -(currentIndex.value * slideWidthPx.value) +
      centerOffset * slideWidthPx.value
  );

  setTimeout(() => {
    isTransitioning.value = false;
  }, props.transitionMs);
};

// Função para calcular dimensões
const calculateDimensions = () => {
  if (!carouselWrapper.value) return;

  const wrapperWidth = carouselWrapper.value.offsetWidth;
  slideWidthPx.value = wrapperWidth / props.visibleSlides;
  totalWidth.value = displayItems.value.length * slideWidthPx.value;

  // Reposicionar para o slide atual
  // Com 3 slides visíveis, o slide central deve estar no meio
  const centerOffset = Math.floor(props.visibleSlides / 2);
  translateX.value = roundToNearest(
    -(currentIndex.value * slideWidthPx.value) +
      centerOffset * slideWidthPx.value
  );
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

  // Resize observer
  if (carouselWrapper.value) {
    resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });
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

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});

// Watch para mudanças nas props
watch(
  () => props.items,
  () => {
    currentIndex.value = 0;
    calculateDimensions();
  },
  { deep: true }
);

watch(
  () => props.visibleSlides,
  () => {
    calculateDimensions();
  }
);
</script>
<style scoped>
/* Carrossel wrapper - otimizado para performance */
.carousel-wrapper {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: pan-y pinch-zoom;
  will-change: transform;
  contain: layout style paint;
  overscroll-behavior: contain;
}

.carousel-wrapper:active {
  cursor: grabbing;
}

.carousel-wrapper * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Track do carrossel - otimizado para GPU */
.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.carousel-track[data-transitioning="true"] {
  transition: transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Slides individuais */
.carousel-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Container principal */
.carousel-container {
  transform-style: preserve-3d;
  contain: layout style paint;
}

/* Transições suaves para elementos interativos */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

button:hover {
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

/* Efeitos de hover para setas */
.carousel-wrapper .absolute button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Animações de entrada para conteúdo */
@keyframes slideInFromLeft {
  from {
    transform: translate3d(-100px, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translate3d(100px, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 20px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Aplicar animações ao conteúdo */
.carousel-content-enter-active {
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide-enter-left {
  animation: slideInFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide-enter-right {
  animation: slideInFromRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide-scale {
  animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Transições de conteúdo */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.content-fade-enter-from {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translate3d(0, -15px, 0);
}

/* Indicadores melhorados */
.carousel-wrapper .bg-gray-100 button {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: width, background-color;
}

.carousel-wrapper .bg-gray-100 button:hover {
  transform: scale(1.2);
}

/* Efeitos de foco para acessibilidade */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Otimizações para dispositivos móveis */
@media (max-width: 768px) {
  .carousel-wrapper {
    touch-action: pan-x pan-y;
  }

  .carousel-slide {
    touch-action: manipulation;
  }
}

/* Reduzir animações para usuários que preferem menos movimento */
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    transition: none !important;
  }

  .carousel-slide {
    transition: none !important;
  }

  button {
    transition: none !important;
  }

  .content-fade-enter-active,
  .content-fade-leave-active {
    transition: none !important;
  }

  @keyframes slideInFromLeft {
    from,
    to {
      transform: none;
      opacity: 1;
    }
  }

  @keyframes slideInFromRight {
    from,
    to {
      transform: none;
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from,
    to {
      transform: none;
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from,
    to {
      transform: none;
      opacity: 1;
    }
  }
}

/* Melhorias de performance */
.carousel-wrapper * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Estados de loading */
.carousel-loading {
  opacity: 0.7;
  pointer-events: none;
}

.carousel-loading .carousel-track {
  filter: blur(1px);
}

/* Efeitos de drag ativo */
.carousel-dragging .carousel-track {
  transition: none !important;
}

.carousel-dragging .carousel-slide {
  transition: none !important;
}
</style>
