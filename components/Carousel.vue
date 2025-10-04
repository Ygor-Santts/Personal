<template>
  <div class="w-full">
    <!-- Título e subtítulo -->
    <div v-if="title || subtitle" class="text-center mb-6">
      <h2 v-if="title" class="text-2xl font-bold text-gray-800 mb-2">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-gray-600">{{ subtitle }}</p>
    </div>

    <!-- Container do carrossel -->
    <div
      class="relative w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      :style="{ height: `${height}px` }"
      tabindex="0"
      role="region"
      aria-label="Carrossel de imagens"
    >
      <!-- Container do carousel -->
      <div
        ref="carouselContainer"
        class="relative h-full overflow-hidden"
        :class="containerClasses"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <!-- Items do carousel -->
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

      <!-- Navegação por setas -->
      <button
        v-if="showArrows"
        @click="previous"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        :disabled="!canGoPrevious"
        aria-label="Slide anterior"
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
        aria-label="Próximo slide"
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

    <!-- Indicadores de página -->
    <div v-if="showDots" class="flex justify-center mt-4 gap-2">
      <button
        v-for="(_, index) in dots"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer"
        :class="
          index === activeDotIndex
            ? 'bg-blue-600 scale-110'
            : 'bg-gray-300 hover:bg-gray-400'
        "
        :aria-label="`Ir para slide ${index + 1}`"
      />
    </div>

    <!-- Seção de conteúdo externa -->
    <div v-if="showContent" class="mt-6 text-center space-y-3">
      <Transition name="content-fade" mode="out-in">
        <div :key="currentSlide" class="transition-all duration-300 ease-out">
          <slot name="content" :item="activeItem" :index="currentSlide" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, readonly } from "vue";

interface CarouselItem {
  id: string | number;
  width?: number; // Largura customizada do item
  height?: number; // Altura customizada do item
  [key: string]: any;
}

interface Props {
  items: CarouselItem[];
  infinite?: boolean;
  loop?: boolean; // Loop infinito usando matemática modular (mais eficiente que infinite)
  showArrows?: boolean;
  showDots?: boolean;
  itemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  centerMode?: boolean;
  height?: number;
  dragSensitivity?: number;
  variableWidth?: boolean; // Permite larguras diferentes para cada item
  fixedItemWidth?: number; // Largura fixa quando variableWidth é false
  // Novas props para texto e conteúdo
  title?: string;
  subtitle?: string;
  showContent?: boolean;
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
  // Novas props com valores padrão
  title: "",
  subtitle: "",
  showContent: false,
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
const isPlaying = ref(props.autoPlay);

// Computed
const isItemsDuplicated = computed(() => {
  // Detecta se os itens estão duplicados (como no caso de 3 itens duplicados)
  if (props.items.length % 2 === 0 && props.items.length > 0) {
    const halfLength = props.items.length / 2;
    const firstHalf = props.items.slice(0, halfLength);
    const secondHalf = props.items.slice(halfLength);

    // Compara se a primeira metade é igual à segunda metade
    // Usa comparação mais robusta que funciona com qualquer tipo de dados
    return firstHalf.every((item, index) => {
      const correspondingItem = secondHalf[index];
      if (!correspondingItem) return false;
      
      // Se ambos têm id, compara por id (mais eficiente)
      if (item.id !== undefined && correspondingItem.id !== undefined) {
        return item.id === correspondingItem.id;
      }
      
      // Fallback para comparação profunda com JSON.stringify
      // (pode ser lento com objetos muito complexos, mas é robusto)
      try {
        return JSON.stringify(item) === JSON.stringify(correspondingItem);
      } catch (error) {
        // Se JSON.stringify falhar (objetos circulares, etc.), 
        // tenta comparação de propriedades principais
        const itemKeys = Object.keys(item);
        const correspondingKeys = Object.keys(correspondingItem);
        
        if (itemKeys.length !== correspondingKeys.length) return false;
        
        return itemKeys.every(key => {
          try {
            return JSON.stringify(item[key]) === JSON.stringify(correspondingItem[key]);
          } catch {
            return item[key] === correspondingItem[key];
          }
        });
      }
    });
  }
  return false;
});

const originalItemsCount = computed(() => {
  return isItemsDuplicated.value ? props.items.length / 2 : props.items.length;
});
const totalSlides = computed(() => {
  // Calcular número total de slides baseado em items-per-view
  // Começar do slide 0 (não incluir slide -1)
  const maxSlide = Math.max(0, props.items.length - props.itemsPerView);
  return Math.max(1, maxSlide + 1); // +1 para incluir slide 0
});

const displayItems = computed(() => {
  // Para loop, sempre retorna apenas os itens originais
  if (props.loop) {
    return props.items;
  }

  if (!props.infinite) {
    return props.items;
  }

  // Para carousel infinito, duplicamos os itens
  const beforeItems = props.items.slice(-props.itemsPerView);
  const afterItems = props.items.slice(0, props.itemsPerView);
  return [...beforeItems, ...props.items, ...afterItems];
});

const canGoPrevious = computed(() => {
  return props.loop || props.infinite || currentSlide.value > 0;
});

const canGoNext = computed(() => {
  const maxSlide = Math.max(0, props.items.length - props.itemsPerView);
  return props.loop || props.infinite || currentSlide.value < maxSlide;
});

const containerClasses = computed(() => {
  return ["cursor-grab", isDragging.value && "cursor-grabbing"];
});

const itemClasses = computed(() => {
  return [
    // Só aplica transição quando não está arrastando
    !isDragging.value && "transition-all duration-300 ease-out",
    // Otimizações de performance
    "transform-gpu",
  ];
});

const dots = computed(() => {
  // Se os itens estão duplicados, mostrar apenas os originais
  if (isItemsDuplicated.value) {
    return props.items.slice(0, originalItemsCount.value);
  }

  // Para loop, mostrar todos os itens
  if (props.loop) {
    return props.items;
  }
  // Para modo normal, mostrar apenas os slides possíveis
  return props.items.slice(0, totalSlides.value);
});

// Computed para o índice do dot ativo
const activeDotIndex = computed(() => {
  // Se os itens estão duplicados, mapear para os originais
  if (isItemsDuplicated.value) {
    return currentSlide.value % originalItemsCount.value;
  }

  if (props.loop) {
    // Para loop, usar módulo para garantir índice válido
    return currentSlide.value % props.items.length;
  }
  return currentSlide.value;
});

// Computed para o item ativo (necessário para o slot de conteúdo)
const activeItem = computed(() => {
  // Se os itens estão duplicados, mapear para os originais
  if (isItemsDuplicated.value) {
    const index = currentSlide.value % originalItemsCount.value;
    return props.items[index];
  }

  if (props.loop) {
    // Para loop, usar módulo para garantir índice válido
    const index = currentSlide.value % props.items.length;
    return props.items[index];
  }
  return props.items[currentSlide.value];
});

// Métodos
const getItemStyle = (index: number) => {
  const containerWidth = carouselContainer.value?.offsetWidth || 1;
  const item = displayItems.value[index];

  // Calcular largura do item
  let itemWidth: number;
  if (props.variableWidth && item?.width) {
    itemWidth = item.width;
  } else {
    itemWidth = props.fixedItemWidth;
  }

  const itemWidthWithGap = itemWidth + props.gap;

  // Posição base do item
  let basePosition: number;
  if (props.loop) {
    // Para loop, calcular a posição considerando o wrap-around
    const realIndex = index % props.items.length;

    if (props.variableWidth) {
      // Para larguras variáveis, calcular posição acumulada baseada no índice real
      basePosition = props.items.slice(0, realIndex).reduce((acc, prevItem) => {
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
    const realCurrentSlide = currentSlide.value % props.items.length;
    if (props.variableWidth) {
      // Para larguras variáveis, calcular offset acumulado baseado no slide real
      slideOffset = -props.items
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
  const realIndex = index % props.items.length;
  const realCurrentSlide = currentSlide.value % props.items.length;

  // Calcular a diferença relativa entre o item e o currentSlide
  let relativePosition: number;
  if (props.loop) {
    // Para loop, calcular a posição relativa considerando wrap-around
    let diff = realIndex - realCurrentSlide;

    // Ajustar para o wrap-around (considerar a menor distância)
    if (diff > props.items.length / 2) {
      diff -= props.items.length;
    } else if (diff < -props.items.length / 2) {
      diff += props.items.length;
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
  if (isInViewArea) {
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

  if (isInViewArea) {
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
  if (props.variableWidth) {
    // Para larguras variáveis com múltiplos items visíveis:
    // O item que deveria estar no centro visual é currentSlide + centerIndex
    let visualCenterItemIndex: number;
    if (props.loop) {
      // Para loop, usar matemática modular
      visualCenterItemIndex =
        (currentSlide.value + centerIndex) % props.items.length;
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
      // Para loop, usar props.items em vez de displayItems
      positionOfCenterItem = props.items
        .slice(0, visualCenterItemIndex)
        .reduce((acc, prevItem) => {
          const prevWidth = prevItem?.width || props.fixedItemWidth;
          return acc + prevWidth + props.gap;
        }, 0);
      centerItemWidth =
        props.items[visualCenterItemIndex]?.width || props.fixedItemWidth;
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
    // Loop usando matemática modular
    currentSlide.value = (currentSlide.value + 1) % props.items.length;
  } else if (props.infinite) {
    currentSlide.value++;

    // Reset para o início quando necessário
    if (currentSlide.value >= props.items.length) {
      setTimeout(() => {
        currentSlide.value = 0;
      }, 300);
    }
  } else {
    const maxSlide = Math.max(0, props.items.length - props.itemsPerView);
    currentSlide.value = Math.min(currentSlide.value + 1, maxSlide);
  }

  emit("slideChange", currentSlide.value);
};

const previous = () => {
  if (props.loop) {
    // Loop usando matemática modular
    currentSlide.value =
      (currentSlide.value - 1 + props.items.length) % props.items.length;
  } else if (props.infinite) {
    currentSlide.value--;

    // Reset para o fim quando necessário
    if (currentSlide.value < 0) {
      setTimeout(() => {
        currentSlide.value = props.items.length - 1;
      }, 300);
    }
  } else {
    currentSlide.value = Math.max(currentSlide.value - 1, 0);
  }

  emit("slideChange", currentSlide.value);
};

const goToSlide = (index: number) => {
  // Se os itens estão duplicados, navegar inteligentemente entre os conjuntos
  if (isItemsDuplicated.value) {
    const originalCount = originalItemsCount.value;
    // Se estamos no primeiro conjunto, ir para o índice correspondente no segundo conjunto
    // Se estamos no segundo conjunto, ir para o índice correspondente no primeiro conjunto
    if (currentSlide.value < originalCount) {
      currentSlide.value = index + originalCount; // Ir para o segundo conjunto
    } else {
      currentSlide.value = index; // Ir para o primeiro conjunto
    }
  } else {
    currentSlide.value = index;
  }
  emit("slideChange", currentSlide.value);
};

const startAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
  }

  isPlaying.value = true;
  autoPlayTimer.value = setInterval(() => {
    if (canGoNext.value) {
      next();
    } else if (props.infinite) {
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
  } else {
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
    } else if (props.autoPlay) {
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
