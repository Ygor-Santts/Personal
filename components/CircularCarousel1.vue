<template>
  <div class="circular-carousel-container">
    <!-- Carrossel wrapper -->
    <div
      ref="carouselWrapper"
      :class="`carousel-wrapper ${isDragging ? 'carousel-dragging' : ''}`"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
      :style="{
        cursor: 'default',
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
          transform: `translate3d(${translateX + dragOffset}px, 0, 0)`,
          width: `${totalWidth}px`,
          willChange: isDragging ? 'transform' : 'auto',
        }"
      >
        <!-- Clones para loop infinito -->
        <div
          v-for="(item, index) in displayItems"
          :key="`${item.originalIndex}-${index}`"
          :class="`carousel-slide h-full flex-shrink-0 ${
            isTransitioning && !isDragging ? 'carousel-slide-transitioning' : ''
          }`"
          :style="{
            width: getSlideWidth(index),
            opacity: getSlideOpacity(index),
            transform: getSlideTransform(index),
            position: 'relative',
            zIndex: index === centerIndex ? 99 : 1,
            cursor:
              index === centerIndex
                ? isDragging
                  ? 'grabbing'
                  : 'grab'
                : 'default',
            willChange: isDragging ? 'transform, opacity' : 'auto',
          }"
          role="group"
          :aria-label="`Slide ${item.originalIndex + 1} de ${items.length}`"
          @touchstart="handleItemTouchStart($event, index)"
          @touchmove="handleItemTouchMove($event, index)"
          @touchend="handleItemTouchEnd($event, index)"
          @mousedown="handleItemMouseDown($event, index)"
          @mouseleave="handleItemMouseLeave($event, index)"
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

    <!-- Controles de navegação -->
    <button
      v-if="showArrows"
      class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 z-30 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      @click.stop="prevSlide"
      :disabled="isTransitioning"
      aria-label="Slide anterior"
    >
      <svg
        class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
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
      class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 z-30 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      @click.stop="nextSlide"
      :disabled="isTransitioning"
      aria-label="Próximo slide"
    >
      <svg
        class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
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
    <div
      v-if="showIndicators"
      class="flex items-center justify-center space-x-3 sm:space-x-4 pb-4 sm:pb-6 mt-4"
    >
      <div
        class="flex items-center space-x-2 bg-white bg-opacity-90 rounded-full px-3 py-2"
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
  transitionMs: 500,
  ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  pauseOnHover: true,
  swipeThreshold: 30,
  dragThreshold: 5,
  clonesPerSide: 1, // Reduzido para 1 já que sempre exibimos 3 itens
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
const dragOffset = ref(0);
const baseTranslateX = ref(0);

// Estados para drag individual dos itens
const draggedItemIndex = ref(-1);
const itemDragOffset = ref(0);
const isItemDragging = ref(false);

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

  const totalItems = items.length;
  const allItems: any[] = [];

  // Sempre exibir apenas 3 itens: anterior, atual, próximo
  const currentIdx = currentIndex.value;

  // Item anterior
  const prevIndex = currentIdx === 0 ? totalItems - 1 : currentIdx - 1;
  allItems.push({
    ...items[prevIndex],
    originalIndex: prevIndex,
    cloneIndex: 0,
    globalIndex: -1,
  });

  // Item atual (centro)
  allItems.push({
    ...items[currentIdx],
    originalIndex: currentIdx,
    cloneIndex: 1,
    globalIndex: 0,
  });

  // Item próximo
  const nextIndex = (currentIdx + 1) % totalItems;
  allItems.push({
    ...items[nextIndex],
    originalIndex: nextIndex,
    cloneIndex: 2,
    globalIndex: 1,
  });

  return allItems;
});

// Computed para o índice central correto
const centerIndex = computed(() => {
  if (!props.loopInfinite || props.items.length <= 1) {
    return currentIndex.value;
  }
  // O centro sempre está no índice 1 do array displayItems (3 itens: 0, 1, 2)
  return 1;
});

// Função para calcular largura do slide (baseada no HTML fornecido)
const getSlideWidth = (index: number) => {
  if (!carouselWrapper.value) return "0px";

  const wrapperWidth = carouselWrapper.value.offsetWidth;
  const centerIdx = centerIndex.value;
  const distance = Math.abs(index - centerIdx);

  // Proporções baseadas no HTML: Central ~48%, Laterais ~26% cada
  if (distance === 0) {
    // Item central: 165.333px (48% de 343px)
    return `${Math.round(wrapperWidth * 0.48)}px`;
  } else {
    // Itens laterais: 114.333px (26% de 343px)
    return `${Math.round(wrapperWidth * 0.26)}px`;
  }
};

// Função para calcular opacidade do slide (simplificada)
const getSlideOpacity = (index: number) => {
  if (!props.loopInfinite || props.items.length <= 1) {
    const isActive = index === currentIndex.value;
    return isActive ? 1 : 0.7;
  }

  const centerIdx = centerIndex.value;
  const distance = Math.abs(index - centerIdx);

  // Apenas o item central é visível, laterais ficam atrás
  if (distance === 0) return 1; // Centro sempre 100% opaco
  return 1; // Itens laterais também 100% opacos, mas atrás
};

// Função para calcular transformação do slide (com proporções específicas)
const getSlideTransform = (index: number) => {
  if (!props.loopInfinite || props.items.length <= 1) {
    const isActive = index === currentIndex.value;
    return `scale(${isActive ? 1 : 0.7})`;
  }

  const centerIdx = centerIndex.value;
  const distance = index - centerIdx;

  // Calcular offset individual durante drag
  let individualOffset = 0;
  if (isItemDragging.value && draggedItemIndex.value === index) {
    individualOffset = itemDragOffset.value;
  }

  // Item central - na frente (scale 1, translateX baseado no HTML)
  if (distance === 0) {
    return `scale(1) translateX(${0}px)`;
  }

  // Itens laterais - atrás e deslocados (scale 0.7, translateX baseado no HTML)
  if (distance > 0) {
    // Card à direita (baseado no HTML: translateX(19px))
    return `scale(0.7) translateX(${-45}px)`;
  } else {
    // Card à esquerda (baseado no HTML: translateX(-60px))
    return `scale(0.7) translateX(${45}px)`;
  }
};

// Função para calcular dimensões (com proporções específicas)
const calculateDimensions = () => {
  if (!carouselWrapper.value) return;

  const wrapperWidth = carouselWrapper.value.offsetWidth;

  // Proporções baseadas no HTML fornecido
  // Total: 343px, Central: 165.333px, Laterais: 114.333px cada
  const centralWidthPx = Math.round(wrapperWidth * 0.48); // ~48% para o central
  const lateralWidthPx = Math.round(wrapperWidth * 0.26); // ~26% para cada lateral

  slideWidthPx.value = centralWidthPx; // Largura base para cálculos
  totalWidth.value = wrapperWidth; // Largura total do container

  // Reposicionar para o slide atual (centro sempre no meio)
  const centerOffset = Math.floor(props.visibleSlides / 2);
  baseTranslateX.value =
    -(centerIndex.value * slideWidthPx.value) +
    centerOffset * slideWidthPx.value;
  translateX.value = baseTranslateX.value;
};

// Função para arredondar para o pixel mais próximo
const roundToNearest = (value: number, nearest: number = 1) => {
  return Math.round(value / nearest) * nearest;
};

// Função para calcular o snap automático (simplificada)
const calculateSnapPosition = (dragDistance: number) => {
  const slideWidth = slideWidthPx.value;
  const threshold = slideWidth * 0.2; // 20% do slide para ativar snap

  // Calcular quantos slides o usuário moveu - INVERTER A DIREÇÃO
  const slideOffset = Math.round(-dragDistance / slideWidth);

  // Determinar direção baseada na velocidade e distância
  if (Math.abs(dragDistance) > threshold || Math.abs(velocity.value) > 0.3) {
    return slideOffset;
  }

  return 0; // Não mover se não atingir o threshold
};

// Funções de navegação
const nextSlide = () => {
  if (isTransitioning.value) return;

  // Reset dos estados de drag antes da navegação
  dragOffset.value = 0;
  itemDragOffset.value = 0;
  isItemDragging.value = false;
  draggedItemIndex.value = -1;

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

  // Reset dos estados de drag antes da navegação
  dragOffset.value = 0;
  itemDragOffset.value = 0;
  isItemDragging.value = false;
  draggedItemIndex.value = -1;

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

  // Reset dos estados de drag antes da navegação
  dragOffset.value = 0;
  itemDragOffset.value = 0;
  isItemDragging.value = false;
  draggedItemIndex.value = -1;

  const direction = targetIndex > currentIndex.value ? 1 : -1;
  animateToSlide(targetIndex, direction);
};

// Função para animar para um slide específico
const animateToSlide = (targetIndex: number, direction: number) => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;
  currentIndex.value = targetIndex;

  // Reset dos offsets do drag antes da animação
  dragOffset.value = 0;
  itemDragOffset.value = 0;
  isItemDragging.value = false;
  draggedItemIndex.value = -1;

  // Recalcular posição
  calculateDimensions();

  // Aguardar a transição dos itens individuais terminar
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
  dragOffset.value = 0;
  baseTranslateX.value = translateX.value;

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

  // Atualizar offset do drag em tempo real com suavização
  const totalDragDistance = currentX.value - startX.value;
  dragOffset.value = totalDragDistance * 0.8; // Suavizar o movimento durante drag

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

  // Calcular quantos slides mover baseado no snap
  const slideOffset = calculateSnapPosition(deltaX);

  if (slideOffset !== 0) {
    // Navegar para o slide calculado
    const targetIndex = currentIndex.value + slideOffset;
    if (props.loopInfinite) {
      const newIndex =
        ((targetIndex % props.items.length) + props.items.length) %
        props.items.length;
      animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
    } else {
      const newIndex = Math.max(
        0,
        Math.min(targetIndex, props.items.length - 1)
      );
      if (newIndex !== currentIndex.value) {
        animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
      }
    }
  }

  // Reset do offset do drag
  dragOffset.value = 0;

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
  dragOffset.value = 0;
  baseTranslateX.value = translateX.value;

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

  // Atualizar offset do drag em tempo real com suavização
  const totalDragDistance = currentX.value - startX.value;
  dragOffset.value = totalDragDistance * 0.8; // Suavizar o movimento durante drag

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

  // Calcular quantos slides mover baseado no snap
  const slideOffset = calculateSnapPosition(deltaX);

  if (slideOffset !== 0) {
    // Navegar para o slide calculado
    const targetIndex = currentIndex.value + slideOffset;
    if (props.loopInfinite) {
      const newIndex =
        ((targetIndex % props.items.length) + props.items.length) %
        props.items.length;
      animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
    } else {
      const newIndex = Math.max(
        0,
        Math.min(targetIndex, props.items.length - 1)
      );
      if (newIndex !== currentIndex.value) {
        animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
      }
    }
  }

  // Reset do offset do drag
  dragOffset.value = 0;

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

// Novas funções de drag para itens individuais
const handleItemTouchStart = (event: TouchEvent, itemIndex: number) => {
  if (isTransitioning.value) return;

  // Permitir drag apenas no item central
  if (itemIndex !== centerIndex.value) return;

  // Configurar drag individual do item
  isItemDragging.value = true;
  draggedItemIndex.value = itemIndex;
  itemDragOffset.value = 0;

  isDragging.value = true;
  startX.value = event.touches[0].clientX;
  currentX.value = startX.value;
  lastMoveX.value = startX.value;
  startTime.value = Date.now();
  velocity.value = 0;
  dragOffset.value = 0;
  baseTranslateX.value = translateX.value;

  stopAutoplay();
};

const handleItemTouchMove = (event: TouchEvent, itemIndex: number) => {
  if (!isDragging.value || isTransitioning.value || !isItemDragging.value)
    return;

  event.preventDefault();
  currentX.value = event.touches[0].clientX;
  const deltaX = currentX.value - lastMoveX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  // Atualizar offset individual do item com suavização
  const totalDragDistance = currentX.value - startX.value;
  itemDragOffset.value = totalDragDistance * 0.6; // Suavizar mais o movimento individual

  // Manter offset global mínimo para feedback visual
  dragOffset.value = totalDragDistance * 0.1;

  lastMoveX.value = currentX.value;
};

const handleItemTouchEnd = (event: TouchEvent, itemIndex: number) => {
  if (!isDragging.value || isTransitioning.value) return;

  isDragging.value = false;
  isItemDragging.value = false;

  const deltaX = currentX.value - startX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  // Calcular quantos slides mover baseado no snap
  const slideOffset = calculateSnapPosition(deltaX);

  if (slideOffset !== 0) {
    // Navegar para o slide calculado
    const targetIndex = currentIndex.value + slideOffset;
    if (props.loopInfinite) {
      const newIndex =
        ((targetIndex % props.items.length) + props.items.length) %
        props.items.length;
      animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
    } else {
      const newIndex = Math.max(
        0,
        Math.min(targetIndex, props.items.length - 1)
      );
      if (newIndex !== currentIndex.value) {
        animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
      }
    }
  }

  // Reset dos offsets
  dragOffset.value = 0;
  itemDragOffset.value = 0;
  draggedItemIndex.value = -1;

  // Reiniciar autoplay se habilitado
  if (props.autoplay) {
    startAutoplay();
  }
};

const handleItemMouseDown = (event: MouseEvent, itemIndex: number) => {
  if (isTransitioning.value) return;

  // Permitir drag apenas no item central
  if (itemIndex !== centerIndex.value) return;

  event.preventDefault();

  // Configurar drag individual do item
  isItemDragging.value = true;
  draggedItemIndex.value = itemIndex;
  itemDragOffset.value = 0;

  isDragging.value = true;
  startX.value = event.clientX;
  currentX.value = startX.value;
  lastMoveX.value = startX.value;
  startTime.value = Date.now();
  velocity.value = 0;
  dragOffset.value = 0;
  baseTranslateX.value = translateX.value;

  stopAutoplay();
};

const handleItemMouseMove = (event: MouseEvent, itemIndex: number) => {
  if (!isDragging.value || isTransitioning.value || !isItemDragging.value)
    return;

  event.preventDefault();
  currentX.value = event.clientX;
  const deltaX = currentX.value - lastMoveX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  // Atualizar offset individual do item com suavização
  const totalDragDistance = currentX.value - startX.value;
  itemDragOffset.value = totalDragDistance * 0.6; // Suavizar mais o movimento individual

  // Manter offset global mínimo para feedback visual
  dragOffset.value = totalDragDistance * 0.1;

  lastMoveX.value = currentX.value;
};

const handleItemMouseUp = (event: MouseEvent, itemIndex: number) => {
  if (!isDragging.value || isTransitioning.value) return;

  isDragging.value = false;
  isItemDragging.value = false;

  const deltaX = currentX.value - startX.value;
  const deltaTime = Date.now() - startTime.value;

  if (deltaTime > 0) {
    velocity.value = deltaX / deltaTime;
  }

  // Calcular quantos slides mover baseado no snap
  const slideOffset = calculateSnapPosition(deltaX);

  if (slideOffset !== 0) {
    // Navegar para o slide calculado
    const targetIndex = currentIndex.value + slideOffset;
    if (props.loopInfinite) {
      const newIndex =
        ((targetIndex % props.items.length) + props.items.length) %
        props.items.length;
      animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
    } else {
      const newIndex = Math.max(
        0,
        Math.min(targetIndex, props.items.length - 1)
      );
      if (newIndex !== currentIndex.value) {
        animateToSlide(newIndex, slideOffset > 0 ? 1 : -1);
      }
    }
  }

  // Reset dos offsets
  dragOffset.value = 0;
  itemDragOffset.value = 0;
  draggedItemIndex.value = -1;

  // Reiniciar autoplay se habilitado
  if (props.autoplay) {
    startAutoplay();
  }
};

const handleItemMouseLeave = (event: MouseEvent, itemIndex: number) => {
  if (isDragging.value) {
    handleItemMouseUp(new MouseEvent("mouseup"), itemIndex);
  }
};

// Wrapper functions para event listeners globais
const handleGlobalMouseMove = (event: MouseEvent) => {
  handleItemMouseMove(event, 0);
};

const handleGlobalMouseUp = (event: MouseEvent) => {
  handleItemMouseUp(event, 0);
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

// Função para debounce do resize
const debouncedResize = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    calculateDimensions();
  }, 100);
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
  document.addEventListener("mousemove", handleGlobalMouseMove);
  document.addEventListener("mouseup", handleGlobalMouseUp);
  window.addEventListener("resize", debouncedResize);

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
  document.removeEventListener("mousemove", handleGlobalMouseMove);
  document.removeEventListener("mouseup", handleGlobalMouseUp);
  window.removeEventListener("resize", debouncedResize);

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
  dragOffset,
  isDragging,
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
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: pan-y pinch-zoom;
  will-change: transform;
  contain: layout style paint;
  overscroll-behavior: contain;
}

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  transform: translateZ(0);
}

/* Carousel track não precisa de transição - movimentos são instantâneos */

/* Transições suaves para os itens individuais */
.carousel-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: none; /* Transições desabilitadas por padrão */
}

/* Aplicar transições apenas durante navegação por setas */
.carousel-slide-transitioning {
  transition: transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

/* Desabilitar transições durante drag individual */
.carousel-dragging .carousel-slide {
  transition: none !important;
}

.carousel-slide > div {
  transition: opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Efeitos de drag ativo - desabilita transições durante drag */
.carousel-dragging .carousel-track {
  transition: none !important;
}

.carousel-dragging .carousel-slide {
  transition: none !important;
}

.carousel-dragging .carousel-slide > div {
  transition: none !important;
}

/* Efeitos de hover para setas */
.circular-carousel-container .absolute button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>
