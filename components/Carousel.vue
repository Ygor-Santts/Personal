<template>
  <div class="w-full">
    <!-- Carousel container -->
    <div
      class="relative w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      :style="{ height: `${height}px` }"
      tabindex="0"
      role="region"
      aria-label="Image carousel"
    >
      <!-- Carousel container -->
      <div
        ref="carouselContainer"
        class="relative h-full overflow-hidden"
        :class="containerClasses"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <!-- Carousel items -->
        <div
          v-for="(item, index) in displayItems"
          :key="`${item.id}-${index}`"
          class="absolute top-0 h-full carousel-item"
          :class="itemClasses"
          :style="getItemStyle(index)"
        >
          <slot :item="item" :index="index"> </slot>
        </div>
      </div>

      <!-- Arrow navigation -->
      <button
        v-if="showArrows"
        @click="previous"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        :disabled="!canGoPrevious"
        aria-label="Previous slide"
      >
        <svg
          class="w-6 h-6 text-gray-700"
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
        @click="next"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        :disabled="!canGoNext"
        aria-label="Next slide"
      >
        <svg
          class="w-6 h-6 text-gray-700"
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
    <!-- External content section -->

    <div v-if="showContent" class="mt-4 text-center w-full flex justify-center">
      <Transition name="content-fade" mode="out-in">
        <div :key="currentSlide" class="transition-all duration-300 ease-out">
          <slot name="content" :item="activeItem" :index="currentSlide" />
        </div>
      </Transition>
    </div>
  </div>

  <!-- Page indicators -->
  <div class="flex justify-center items-center gap-2 mt-8">
    <div v-if="showDots">
      <div
        class="flex justify-center rounded-2xl items-center gap-2 bg-[#F1EFE79E] w-[88px] h-8"
      >
        <button
          v-for="(_, index) in dots"
          :key="index"
          @click="goToSlide(index)"
          class="w-1.5 h-1.5 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer"
          :class="
            index === activeDotIndex
              ? 'bg-black scale-110 w-6'
              : 'bg-gray-600 hover:bg-gray-400'
          "
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
    <div
      v-if="autoPlay"
      class="flex justify-center items-center"
      @click="toggleAutoPlay"
    >
      <div
        class="flex justify-center rounded-2xl items-center gap-2 bg-[#F1EFE79E] w-8 h-8 cursor-pointer hover:bg-[#E8E6DD] transition-colors duration-200"
      >
        <!-- Play icon (when paused) -->
        <svg
          v-if="!isPlaying"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
        >
          <path d="M0 0.5L0 13.5L10 7L0 0.5Z" fill="#004851" />
        </svg>
        <!-- Pause icon (when playing) -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
        >
          <rect y="0.5" width="3" height="13" fill="#004851" />
          <rect x="7" y="0.5" width="3" height="13" fill="#004851" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, readonly, ref } from "vue";

defineOptions({
  name: "Carousel",
});

interface CarouselItem {
  id: string | number;
  width?: number; // Custom item width
  height?: number; // Custom item height
  [key: string]: any;
}

interface Props {
  items: CarouselItem[];
  infinite?: boolean;
  loop?: boolean; // Infinite loop using modular math (more efficient than infinite)
  showArrows?: boolean;
  showDots?: boolean;
  itemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  centerMode?: boolean;
  height?: number;
  dragSensitivity?: number;
  variableWidth?: boolean; // Allows different widths for each item
  fixedItemWidth?: number; // Fixed width when variableWidth is false
  // New props for text and content
  title?: string;
  subtitle?: string;
  showContent?: boolean;
  autoDuplicate?: boolean; // Auto-duplicate items when 3 or fewer items
}

const props = withDefaults(defineProps<Props>(), {
  infinite: false,
  loop: false,
  showArrows: true,
  showDots: true,
  itemsPerView: 1,
  gap: 16,
  autoPlay: false,
  autoPlayDelay: 3000,
  centerMode: false,
  height: 400,
  dragSensitivity: 1,
  variableWidth: false,
  fixedItemWidth: 224.427,
  // New props with default values
  title: "",
  subtitle: "",
  showContent: false,
  autoDuplicate: true, // Auto-duplicate when 3 or fewer items
});

const emit = defineEmits<{
  slideChange: [index: number];
}>();

// Refs
const carouselContainer = ref<HTMLElement>();
const currentSlide = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragCurrentX = ref(0);
const dragOffset = ref(0);
const autoPlayTimer = ref<NodeJS.Timeout>();
const animationFrame = ref<number>();
const isPlaying = ref(false);

// Computed
const isItemsDuplicated = computed(() => {
  // Detect if items are duplicated (auto-duplication when 2-3 items, not 1)
  return (
    props.autoDuplicate && props.items.length >= 2 && props.items.length <= 3
  );
});

// Auto-duplicate items when there are 3 or fewer items
const processedItems = computed(() => {
  if (!props.autoDuplicate || props.items.length > 3) {
    return props.items;
  }

  // If there's only 1 item, don't duplicate it
  if (props.items.length === 1) {
    return props.items;
  }

  // If there are 2-3 items, duplicate them (like in stories)
  return props.items.concat(props.items).concat(props.items);
});

const originalItemsCount = computed(() => {
  return props.items.length;
});
const totalSlides = computed(() => {
  // Calculate total number of slides based on items-per-view
  // Start from slide 0 (don't include slide -1)

  // For duplicated items, calculate based on how many slides we can actually show
  if (isItemsDuplicated.value) {
    // With duplicated items, we want to show all possible slides
    // For 2 items (4 total) with itemsPerView=3: slides 0,1 (showing items 0,1,2 and 1,2,3)
    const maxSlide = Math.max(
      0,
      processedItems.value.length - props.itemsPerView
    );
    return Math.max(1, maxSlide + 1); // +1 to include slide 0
  }

  const maxSlide = Math.max(
    0,
    processedItems.value.length - props.itemsPerView
  );
  return Math.max(1, maxSlide + 1); // +1 to include slide 0
});

const displayItems = computed(() => {
  // For loop, always return only the original items
  if (props.loop) {
    return processedItems.value;
  }

  if (!props.infinite) {
    return processedItems.value;
  }

  // For infinite carousel, duplicate the items
  const beforeItems = processedItems.value.slice(-props.itemsPerView);
  const afterItems = processedItems.value.slice(0, props.itemsPerView);
  return [...beforeItems, ...processedItems.value, ...afterItems];
});

const canGoPrevious = computed(() => {
  // For duplicated items, use the same logic as normal items
  if (isItemsDuplicated.value) {
    return props.loop || props.infinite || currentSlide.value > 0;
  }

  return props.loop || props.infinite || currentSlide.value > 0;
});

const canGoNext = computed(() => {
  // For duplicated items, use the same logic as normal items but with totalSlides
  if (isItemsDuplicated.value) {
    const maxSlide = totalSlides.value - 1;
    return props.loop || props.infinite || currentSlide.value < maxSlide;
  }

  const maxSlide = Math.max(
    0,
    processedItems.value.length - props.itemsPerView
  );
  return props.loop || props.infinite || currentSlide.value < maxSlide;
});

const containerClasses = computed(() => {
  return ["cursor-grab", isDragging.value && "cursor-grabbing"];
});

const itemClasses = computed(() => {
  return [
    // Only apply transition when not dragging
    !isDragging.value && "transition-all duration-300 ease-out",
    // Performance optimizations
    "transform-gpu",
  ];
});

const dots = computed(() => {
  // Always show only the original items for dots
  if (props.loop) {
    return props.items;
  }
  // For normal mode, show only possible slides
  return props.items.slice(0, totalSlides.value);
});

// Computed for active dot index
const activeDotIndex = computed(() => {
  // Calculate the visual center index (same as activeItem)
  const centerIndex = Math.floor(props.itemsPerView / 2);
  const visualActiveIndex = currentSlide.value + centerIndex;

  // Always map to original items for dots
  if (isItemsDuplicated.value) {
    return visualActiveIndex % originalItemsCount.value;
  }

  if (props.loop) {
    // For loop, use module to ensure valid index
    return visualActiveIndex % props.items.length;
  }

  // Ensure index is within bounds
  return Math.min(visualActiveIndex, props.items.length - 1);
});

// Computed for active item (needed for content slot)
const activeItem = computed(() => {
  // Calculate the visual center index
  const centerIndex = Math.floor(props.itemsPerView / 2);
  const visualActiveIndex = currentSlide.value + centerIndex;

  // Always map to original items for content
  if (isItemsDuplicated.value) {
    const index = visualActiveIndex % originalItemsCount.value;
    return props.items[index];
  }

  if (props.loop) {
    // For loop, use module to ensure valid index
    const index = visualActiveIndex % props.items.length;
    return props.items[index];
  }

  // Ensure index is within bounds
  const index = Math.min(visualActiveIndex, props.items.length - 1);
  return props.items[index];
});

// Methods
const getItemStyle = (index: number) => {
  const containerWidth = carouselContainer.value?.offsetWidth || 1;
  const item = displayItems.value[index];

  // Calculate item width
  let itemWidth: number;
  if (props.variableWidth && item?.width) {
    itemWidth = item.width;
  } else {
    itemWidth = props.fixedItemWidth;
  }

  const itemWidthWithGap = itemWidth + props.gap;

  // Base position of item
  let basePosition: number;
  if (props.loop) {
    // Para loop, calcular a posição considerando o wrap-around
    const realIndex = index % processedItems.value.length;

    if (props.variableWidth) {
      // Para larguras variáveis, calcular posição acumulada baseada no índice real
      basePosition = processedItems.value
        .slice(0, realIndex)
        .reduce((acc, prevItem) => {
          const prevWidth = prevItem?.width || props.fixedItemWidth;
          return acc + prevWidth + props.gap;
        }, 0);
    } else {
      // Para larguras fixas, usar multiplicação com índice real
      basePosition = realIndex * itemWidthWithGap;
    }

    // Para loop, não precisamos de wrap-around na basePosition
    // O wrap-around é tratado pela lógica de posicionamento final
  } else if (props.variableWidth) {
    // Para larguras variáveis, calcular posição acumulada
    basePosition = displayItems.value
      .slice(0, index)
      .reduce((acc, prevItem) => {
        const prevWidth = prevItem?.width || props.fixedItemWidth;
        return acc + prevWidth + props.gap;
      }, 0);
  } else {
    // Para larguras fixas, usar multiplicação
    basePosition = index * itemWidthWithGap;
  }

  // Offset do slide atual
  let slideOffset: number;
  if (props.loop) {
    // Para loop, usar matemática modular para calcular o offset
    const realCurrentSlide = currentSlide.value % processedItems.value.length;
    if (props.variableWidth) {
      // Para larguras variáveis, calcular offset acumulado baseado no slide real
      slideOffset = -processedItems.value
        .slice(0, realCurrentSlide)
        .reduce((acc, prevItem) => {
          const prevWidth = prevItem?.width || props.fixedItemWidth;
          return acc + prevWidth + props.gap;
        }, 0);
    } else {
      // Para larguras fixas, usar multiplicação com slide real
      slideOffset = -realCurrentSlide * itemWidthWithGap;
    }
  } else if (props.variableWidth) {
    // Para larguras variáveis, calcular offset acumulado até o currentSlide
    slideOffset = -displayItems.value
      .slice(0, Math.max(0, currentSlide.value))
      .reduce((acc, prevItem) => {
        const prevWidth = prevItem?.width || props.fixedItemWidth;
        return acc + prevWidth + props.gap;
      }, 0);
  } else {
    slideOffset = -currentSlide.value * itemWidthWithGap;
  }

  // Offset do drag
  const dragOffsetPx = dragOffset.value;

  // Para carousel infinito, ajustamos a posição
  let infiniteOffset = 0;
  if (props.infinite) {
    if (props.variableWidth) {
      // Para larguras variáveis, calcular o offset baseado nos itens duplicados
      infiniteOffset = displayItems.value
        .slice(0, props.itemsPerView)
        .reduce((sum, item) => {
          return sum + (item?.width || props.fixedItemWidth) + props.gap;
        }, 0);
    } else {
      infiniteOffset = props.itemsPerView * itemWidthWithGap;
    }
  }

  // Para loop, usar matemática modular simples
  const realIndex = index % processedItems.value.length;
  const realCurrentSlide = currentSlide.value % processedItems.value.length;

  // Calcular a diferença relativa entre o item e o currentSlide
  let relativePosition: number;
  if (props.loop) {
    // Para loop, calcular a posição relativa considerando wrap-around
    let diff = realIndex - realCurrentSlide;

    // Ajustar para o wrap-around (considerar a menor distância)
    if (diff > processedItems.value.length / 2) {
      diff -= processedItems.value.length;
    } else if (diff < -processedItems.value.length / 2) {
      diff += processedItems.value.length;
    }

    relativePosition = diff;
  } else {
    relativePosition = index - currentSlide.value;
  }

  // Verificar se o item está na área de visualização
  const isInViewArea =
    relativePosition >= 0 && relativePosition < props.itemsPerView;

  // Centro visual é no meio da área de visualização
  const centerIndex = Math.floor(props.itemsPerView / 2);

  // Calcular a posição final baseada na posição relativa
  let finalPosition: number;

  // Caso especial: se há apenas 1 item, posicioná-lo no início (será centralizado depois)
  if (props.items.length === 1) {
    finalPosition = 0;
  } else if (isInViewArea) {
    // Item na área de visualização - posição baseada na relativePosition
    finalPosition =
      relativePosition * itemWidthWithGap + infiniteOffset + dragOffsetPx;
  } else {
    // Item fora da área de visualização - usar a mesma posição do item central
    finalPosition =
      centerIndex * itemWidthWithGap + infiniteOffset + dragOffsetPx;
  }

  // Calcular distância do centro visual dos itens exibidos
  // Para items-per-view = 3, o centro visual é no índice 1 (meio)
  // centerIndex já foi declarado acima

  // Considerar o drag offset para calcular a posição "virtual" do centro
  // Inverter o sinal: drag para direita = próximo slide, drag para esquerda = slide anterior
  let dragOffsetInSlides: number;
  if (props.variableWidth) {
    const avgItemWidth =
      displayItems.value.reduce(
        (sum, item) => sum + (item?.width || props.fixedItemWidth),
        0
      ) / displayItems.value.length;
    dragOffsetInSlides = -dragOffsetPx / (avgItemWidth + props.gap);
  } else {
    dragOffsetInSlides = -dragOffsetPx / itemWidthWithGap;
  }

  // Durante o drag, usar apenas o offset para calcular o centro virtual
  // Quando não está arrastando, usar o currentSlide
  const virtualCenter =
    isDragging.value && Math.abs(dragOffsetPx) > 5 // Só muda se realmente arrastou
      ? currentSlide.value + centerIndex + dragOffsetInSlides
      : currentSlide.value + centerIndex;

  // Removido: lógica complexa de z-index
  // Agora z-index é baseado diretamente na escala

  // Calcular escala baseada na posição relativa ao centro
  const baseScale = 0.7; // Escala mínima
  const maxScale = 1.0; // Escala máxima

  let scale = baseScale;
  let zIndex = 1;

  // Caso especial: se há apenas 1 item, dar escala máxima
  if (props.items.length === 1) {
    scale = maxScale;
    zIndex = 10;
  } else if (isInViewArea) {
    // Item na área de visualização - calcular escala baseada na proximidade do centro
    let distanceFromCenter: number;

    if (isDragging.value && Math.abs(dragOffsetPx) > 5) {
      // Durante o drag: ajustar a distância considerando o offset do drag
      // relativePosition já considera a posição visual correta
      distanceFromCenter = Math.abs(
        relativePosition - centerIndex - dragOffsetInSlides
      );
    } else {
      // Sem drag: usar apenas a posição relativa
      distanceFromCenter = Math.abs(relativePosition - centerIndex);
    }

    const maxDistance = Math.ceil(props.itemsPerView / 2);
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    scale = Math.max(
      baseScale,
      maxScale - normalizedDistance * (maxScale - baseScale)
    );

    // Z-index: baseado diretamente na escala
    zIndex = Math.max(1, Math.floor(scale * 10));
  } else {
    // Item fora da área de visualização - escala mínima e z-index baixo
    scale = baseScale * 0.5; // Escala bem pequena para ficar atrás
    zIndex = 1; // Z-index mínimo
  }

  // Centralizar o carousel
  let centerOffset: number;

  // Caso especial: se há apenas 1 item, centralizá-lo
  if (props.items.length === 1) {
    centerOffset = (containerWidth - itemWidth) / 2;
  } else if (props.variableWidth) {
    // Para larguras variáveis com múltiplos items visíveis:
    // O item que deveria estar no centro visual é currentSlide + centerIndex
    let visualCenterItemIndex: number;
    if (props.loop) {
      // Para loop, usar matemática modular
      visualCenterItemIndex =
        (currentSlide.value + centerIndex) % processedItems.value.length;
    } else {
      visualCenterItemIndex = Math.max(
        0,
        Math.floor(currentSlide.value + centerIndex)
      );
    }

    // Calcular posição acumulada até esse item
    let positionOfCenterItem: number;
    let centerItemWidth: number;

    if (props.loop) {
      // Para loop, usar processedItems em vez de displayItems
      positionOfCenterItem = processedItems.value
        .slice(0, visualCenterItemIndex)
        .reduce((acc, prevItem) => {
          const prevWidth = prevItem?.width || props.fixedItemWidth;
          return acc + prevWidth + props.gap;
        }, 0);
      centerItemWidth =
        processedItems.value[visualCenterItemIndex]?.width ||
        props.fixedItemWidth;
    } else {
      positionOfCenterItem = displayItems.value
        .slice(0, visualCenterItemIndex)
        .reduce((acc, prevItem) => {
          const prevWidth = prevItem?.width || props.fixedItemWidth;
          return acc + prevWidth + props.gap;
        }, 0);
      centerItemWidth =
        displayItems.value[visualCenterItemIndex]?.width ||
        props.fixedItemWidth;
    }

    // O centro da tela
    const screenCenter = containerWidth / 2;

    // Para centralizar: screenCenter deve apontar para o centro do item
    // Após aplicar slideOffset, o item estará em: positionOfCenterItem - slideOffset
    // Queremos: positionOfCenterItem - slideOffset + centerItemWidth/2 = screenCenter
    // Logo: centerOffset = screenCenter - centerItemWidth/2
    // Mas como slideOffset já move baseado no currentSlide, precisamos compensar
    centerOffset =
      screenCenter - positionOfCenterItem - centerItemWidth / 2 - slideOffset;
  } else {
    centerOffset =
      (containerWidth - (props.itemsPerView * itemWidthWithGap - props.gap)) /
      2;
  }
  const totalTranslate = finalPosition + centerOffset;

  // Calcular opacity baseada na escala
  // Quanto menor a escala, menor a opacity
  const opacity = Math.max(0.1, scale);

  return {
    transform: `translateX(${totalTranslate}px) scale(${scale})`,
    width: `${itemWidth}px`,
    willChange: "transform, opacity",
    transformOrigin: "center center",
    zIndex: zIndex,
    opacity: opacity,
  };
};

const startDrag = (e: MouseEvent | TouchEvent) => {
  // Verificar se o elemento clicado é interativo
  const target = e.target as HTMLElement;
  if (
    target.tagName === "BUTTON" ||
    target.tagName === "A" ||
    target.closest("button, a")
  ) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  isDragging.value = true;
  dragStartX.value = "touches" in e ? e.touches[0].clientX : e.clientX;
  dragCurrentX.value = dragStartX.value;
  dragOffset.value = 0;

  // Pausar autoplay durante o drag
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
  }

  // Adicionar event listeners globais para capturar movimento fora do carousel
  document.addEventListener("mousemove", drag, { passive: false });
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("mouseup", endDrag, { passive: false });
  document.addEventListener("touchend", endDrag, { passive: false });
};

const drag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  e.preventDefault();
  e.stopPropagation();

  const newX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const newOffset = (newX - dragStartX.value) * props.dragSensitivity;

  // Cancelar animation frame anterior se existir
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }

  // Usar requestAnimationFrame para máxima performance
  animationFrame.value = requestAnimationFrame(() => {
    dragCurrentX.value = newX;
    dragOffset.value = newOffset;
  });
};

const endDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;

  // Cancelar animation frame pendente
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
    animationFrame.value = undefined;
  }

  // Remover event listeners globais
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);

  // Threshold para mudança de slide
  const containerWidth = carouselContainer.value?.offsetWidth || 1;
  const itemWidth = containerWidth / props.itemsPerView;
  const threshold = itemWidth * 0.3; // 30% da largura de um item

  if (Math.abs(dragOffset.value) > threshold) {
    if (dragOffset.value > 0 && canGoPrevious.value) {
      previous();
    } else if (dragOffset.value < 0 && canGoNext.value) {
      next();
    }
  }

  dragOffset.value = 0;

  // Retomar autoplay se estiver ativo
  if (props.autoPlay) {
    startAutoPlay();
  }
};

const next = () => {
  if (props.loop) {
    // For duplicated items, use original items length for modular math
    if (isItemsDuplicated.value) {
      currentSlide.value = (currentSlide.value + 1) % originalItemsCount.value;
    } else {
      // Loop usando matemática modular
      currentSlide.value =
        (currentSlide.value + 1) % processedItems.value.length;
    }
  } else if (props.infinite) {
    currentSlide.value++;

    // Reset para o início quando necessário
    if (currentSlide.value >= processedItems.value.length) {
      setTimeout(() => {
        currentSlide.value = 0;
      }, 300);
    }
  } else {
    const maxSlide = Math.max(
      0,
      processedItems.value.length - props.itemsPerView
    );
    currentSlide.value = Math.min(currentSlide.value + 1, maxSlide);
  }

  emit("slideChange", currentSlide.value);
};

const previous = () => {
  if (props.loop) {
    // For duplicated items, use original items length for modular math
    if (isItemsDuplicated.value) {
      currentSlide.value =
        (currentSlide.value - 1 + originalItemsCount.value) %
        originalItemsCount.value;
    } else {
      // Loop usando matemática modular
      currentSlide.value =
        (currentSlide.value - 1 + processedItems.value.length) %
        processedItems.value.length;
    }
  } else if (props.infinite) {
    currentSlide.value--;

    // Reset para o fim quando necessário
    if (currentSlide.value < 0) {
      setTimeout(() => {
        currentSlide.value = processedItems.value.length - 1;
      }, 300);
    }
  } else {
    currentSlide.value = Math.max(currentSlide.value - 1, 0);
  }

  emit("slideChange", currentSlide.value);
};

const goToSlide = (index: number) => {
  // For duplicated items, always go to the first set (original items)
  if (isItemsDuplicated.value) {
    currentSlide.value = index;
  } else {
    currentSlide.value = index;
  }
  emit("slideChange", currentSlide.value);
};

const startAutoPlay = () => {
  if (!props.autoPlay) return;

  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
  }
  console.log("Starting autoplay");
  isPlaying.value = true;
  autoPlayTimer.value = setInterval(() => {
    if (canGoNext.value) {
      next();
    } else if (props.infinite || props.loop) {
      next();
    } else {
      currentSlide.value = 0;
    }
  }, props.autoPlayDelay);
};

const stopAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
    autoPlayTimer.value = undefined;
  }
  isPlaying.value = false;
};

const toggleAutoPlay = () => {
  if (isPlaying.value) {
    stopAutoPlay();
  } else if (props.autoPlay) {
    startAutoPlay();
  }
};

// Função de navegação por teclado
const handleKeydown = (event: KeyboardEvent) => {
  // Só processar se o carrossel estiver em foco ou se não houver outros elementos focados
  if (isDragging.value) return;

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      previous();
      break;
    case "ArrowRight":
      event.preventDefault();
      next();
      break;
    case " ":
      event.preventDefault();
      toggleAutoPlay();
      break;
    case "Home":
      event.preventDefault();
      goToSlide(0);
      break;
    case "End":
      event.preventDefault();
      goToSlide(props.items.length - 1);
      break;
  }
};

// Lifecycle
onMounted(() => {
  if (props.autoPlay) {
    startAutoPlay();
  }

  // Pausar autoplay quando a janela não está em foco
  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAutoPlay();
    } else if (props.autoPlay && isPlaying.value) {
      startAutoPlay();
    }
  };

  // Adicionar event listeners
  document.addEventListener("visibilitychange", handleVisibilityChange);
  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    document.removeEventListener("keydown", handleKeydown);
    stopAutoPlay();
  });
});

onUnmounted(() => {
  stopAutoPlay();
  // Cancelar animation frame pendente
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
  // Limpar event listeners caso o componente seja desmontado durante o drag
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
});

// Exposição de métodos para uso externo
defineExpose({
  next,
  previous,
  goToSlide,
  currentSlide: readonly(currentSlide),
});
</script>

<style scoped>
/* Otimizações de performance para aceleração de hardware */
.carousel-item {
  backface-visibility: hidden;
  transform: translateZ(0); /* Força aceleração de hardware */
  will-change: transform;
  touch-action: pan-y; /* Permite scroll vertical mas controla horizontal */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Garante que as transições sejam suaves */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Melhora o drag em dispositivos touch */
.cursor-grab {
  touch-action: none;
}

.cursor-grabbing {
  touch-action: none;
  user-select: none;
}

/* Container do carousel */
.relative {
  contain: layout style paint; /* Otimização de renderização */
  perspective: 1000px; /* Adiciona perspectiva para efeito 3D */
}

/* Efeito de profundidade para os itens */
.carousel-item {
  transform-style: preserve-3d;
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
</style>
