<template>
  <div :class="`w-full ${maxWidth} mx-auto p-4 sm:p-6`">
    <div class="carousel-containerrounded-2xl sm:rounded-3xl overflow-hidden">
      <div
        :class="`carousel-wrapper ${height} relative overflow-hidden`"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
        :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            :class="`absolute left-0 ${sideItemWidth} h-11/12 rounded-l-xl sm:rounded-l-2xl overflow-hidden z-0 transition-all duration-700 ease-out`"
            :style="{ 
              opacity: sideItemOpacity,
              transform: `translateX(${isTransitioning ? '-10px' : '0px'}) scale(${isTransitioning ? '0.95' : '1'})`,
              filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
            }"
          >
            <div class="transition-all duration-700 ease-out" :style="{ transform: `translateX(${leftSlideOffset}px)` }">
              <slot 
                name="side-item" 
                :item="getLeftItem()" 
                :index="getLeftIndex()"
                :isActive="false"
              />
            </div>
          </div>

          <div
            :class="`min-w-[40%] ${centerItemWidth} h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative z-20 transition-all duration-700 ease-out`"
            :style="{ 
              transform: `scale(${isTransitioning ? '1.02' : '1'}) translateY(${isTransitioning ? '-5px' : '0px'})`,
              filter: isTransitioning ? 'brightness(1.1)' : 'brightness(1)'
            }"
          >
            <div class="transition-all duration-700 ease-out" :style="{ transform: `translateX(${centerSlideOffset}px)` }">
              <slot 
                name="center-item" 
                :item="items[currentIndex]" 
                :index="currentIndex"
                :isActive="true"
              />
            </div>
          </div>

          <div
            :class="`absolute right-0 ${sideItemWidth} h-11/12 rounded-r-xl sm:rounded-r-2xl overflow-hidden z-0 transition-all duration-700 ease-out`"
            :style="{ 
              opacity: sideItemOpacity,
              transform: `translateX(${isTransitioning ? '10px' : '0px'}) scale(${isTransitioning ? '0.95' : '1'})`,
              filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
            }"
          >
            <div class="transition-all duration-700 ease-out" :style="{ transform: `translateX(${rightSlideOffset}px)` }">
              <slot 
                name="side-item" 
                :item="getRightItem()" 
                :index="getRightIndex()"
                :isActive="false"
              />
            </div>
          </div>
        </div>

        <button
          v-if="showArrows"
          @click="prevSlide"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 text-gray-800 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 ease-out z-30 flex items-center justify-center"
          :style="{ 
            transform: `translateY(-50%) scale(${isTransitioning ? '0.9' : '1'})`,
            opacity: isTransitioning ? '0.7' : '1',
            boxShadow: isTransitioning ? '0 4px 12px rgba(0,0,0,0.15)' : '0 4px 8px rgba(0,0,0,0.1)'
          }"
        >
          <Icon
            name="heroicons:chevron-left"
            class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300"
            :style="{ transform: `translateX(${isTransitioning ? '-2px' : '0px'})` }"
          />
        </button>

        <button
          v-if="showArrows"
          @click="nextSlide"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 text-gray-800 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 ease-out z-30 flex items-center justify-center"
          :style="{ 
            transform: `translateY(-50%) scale(${isTransitioning ? '0.9' : '1'})`,
            opacity: isTransitioning ? '0.7' : '1',
            boxShadow: isTransitioning ? '0 4px 12px rgba(0,0,0,0.15)' : '0 4px 8px rgba(0,0,0,0.1)'
          }"
        >
          <Icon
            name="heroicons:chevron-right"
            class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300"
            :style="{ transform: `translateX(${isTransitioning ? '2px' : '0px'})` }"
          />
        </button>
      </div>

      <div
        v-if="showContent"
        class="px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-center space-y-3 sm:space-y-4 transition-all duration-500 ease-out"
        :style="{ 
          opacity: isTransitioning ? '0.7' : '1',
          transform: `translateY(${isTransitioning ? '10px' : '0px'})`
        }"
      >
        <div 
          class="transition-all duration-500 ease-out"
          :style="{ 
            transform: `translateX(${isTransitioning ? (transitionDirection === 'right' ? '-20px' : '20px') : '0px'})`
          }"
        >
          <slot 
            name="content" 
            :item="items[currentIndex]" 
            :index="currentIndex"
          />
        </div>
      </div>

      <div
        v-if="showIndicators || showProgressBar || showPlayPause"
        class="flex items-center justify-center space-x-3 sm:space-x-4 pb-4 sm:pb-6 mt-4 transition-all duration-500 ease-out"
        :style="{ 
          opacity: isTransitioning ? '0.8' : '1',
          transform: `translateY(${isTransitioning ? '5px' : '0px'})`
        }"
      >
        <div v-if="showIndicators" class="flex space-x-2">
          <button
            v-for="(item, index) in items"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-2 h-2 rounded-full transition-all duration-500 ease-out',
              currentIndex === index ? 'bg-gray-800 scale-125' : 'bg-gray-300 scale-100',
            ]"
            :style="{ 
              transform: `scale(${currentIndex === index ? '1.25' : '1'})`,
              boxShadow: currentIndex === index ? '0 0 8px rgba(0,0,0,0.3)' : 'none'
            }"
          />
        </div>

        <div v-if="showProgressBar" class="w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div
            class="h-full bg-gray-800 rounded-full transition-all duration-700 ease-out"
            :style="{ 
              width: `${((currentIndex + 1) / items.length) * 100}%`,
              transform: `translateX(${isTransitioning ? '-2px' : '0px'})`
            }"
          />
        </div>

        <button
          v-if="showPlayPause"
          @click="toggleAutoplay"
          class="p-1 text-gray-800 hover:text-gray-600 transition-all duration-300 ease-out"
          :style="{ 
            transform: `scale(${isTransitioning ? '0.95' : '1'})`,
            opacity: isTransitioning ? '0.8' : '1'
          }"
        >
          <Icon v-if="isPlaying" name="heroicons:pause" class="w-5 h-5" />
          <Icon v-else name="heroicons:play" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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
});

const currentIndex = ref(0);
const isPlaying = ref(props.autoplay);
let autoplayTimer: NodeJS.Timeout | null = null;

const touchStartX = ref(0);
const touchEndX = ref(0);
const touchStartY = ref(0);
const touchEndY = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragCurrentX = ref(0);

// Animation states
const isTransitioning = ref(false);
const leftSlideOffset = ref(0);
const centerSlideOffset = ref(0);
const rightSlideOffset = ref(0);
const transitionDirection = ref<'left' | 'right' | null>(null);

const getLeftItem = () => {
  const leftIndex =
    currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1;
  return props.items[leftIndex];
};

const getLeftIndex = () => {
  return currentIndex.value === 0
    ? props.items.length - 1
    : currentIndex.value - 1;
};

const getRightItem = () => {
  const rightIndex =
    currentIndex.value === props.items.length - 1 ? 0 : currentIndex.value + 1;
  return props.items[rightIndex];
};

const getRightIndex = () => {
  return currentIndex.value === props.items.length - 1
    ? 0
    : currentIndex.value + 1;
};

const animateTransition = (direction: 'left' | 'right') => {
  isTransitioning.value = true;
  transitionDirection.value = direction;
  
  if (direction === 'right') {
    // Slide to the right (next)
    leftSlideOffset.value = -50;
    centerSlideOffset.value = -100;
    rightSlideOffset.value = -150;
  } else {
    // Slide to the left (previous)
    leftSlideOffset.value = 50;
    centerSlideOffset.value = 100;
    rightSlideOffset.value = 150;
  }
  
  // Reset positions after animation
  setTimeout(() => {
    leftSlideOffset.value = 0;
    centerSlideOffset.value = 0;
    rightSlideOffset.value = 0;
    isTransitioning.value = false;
    transitionDirection.value = null;
  }, 700);
};

const goToSlide = (index: number) => {
  if (index === currentIndex.value) return;
  
  const direction = index > currentIndex.value ? 'right' : 'left';
  animateTransition(direction);
  currentIndex.value = index;
  resetAutoplay();
};

const nextSlide = () => {
  const direction = 'right';
  animateTransition(direction);
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
  resetAutoplay();
};

const prevSlide = () => {
  const direction = 'left';
  animateTransition(direction);
  currentIndex.value =
    currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1;
  resetAutoplay();
};

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

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
  isDragging.value = true;
  stopAutoplay();
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
};

const handleTouchEnd = (e: TouchEvent) => {
  if (!isDragging.value) return;

  touchEndX.value = e.changedTouches[0].clientX;
  touchEndY.value = e.changedTouches[0].clientY;

  handleSwipe();
  isDragging.value = false;

  setTimeout(() => {
    if (isPlaying.value) {
      startAutoplay();
    }
  }, 1000);
};

const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = e.clientX;
  stopAutoplay();
  e.preventDefault();
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  dragCurrentX.value = e.clientX;
  e.preventDefault();
};

const handleMouseUp = (e: MouseEvent) => {
  if (!isDragging.value) return;

  const dragDistance = dragStartX.value - dragCurrentX.value;
  handleDrag(dragDistance);
  isDragging.value = false;

  setTimeout(() => {
    if (isPlaying.value) {
      startAutoplay();
    }
  }, 1000);
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const swipeDistance = touchStartX.value - touchEndX.value;
  const verticalDistance = Math.abs(touchStartY.value - touchEndY.value);

  if (
    Math.abs(swipeDistance) > swipeThreshold &&
    Math.abs(swipeDistance) > verticalDistance
  ) {
    if (swipeDistance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const handleDrag = (distance: number) => {
  const dragThreshold = 50;

  if (Math.abs(distance) > dragThreshold) {
    if (distance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft":
      prevSlide();
      break;
    case "ArrowRight":
      nextSlide();
      break;
    case " ":
      event.preventDefault();
      toggleAutoplay();
      break;
  }
};

onMounted(() => {
  if (isPlaying.value) {
    startAutoplay();
  }
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  stopAutoplay();
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style scoped>
.carousel-wrapper {
  transition: all 0.3s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  perspective: 1000px;
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

.carousel-wrapper {
  touch-action: pan-y pinch-zoom;
}

/* Enhanced animations */
.carousel-container {
  transform-style: preserve-3d;
}

/* Smooth transitions for all elements */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects for interactive elements */
button:hover {
  transform: scale(1.05) !important;
}

button:active {
  transform: scale(0.95) !important;
}

/* Keyframe animations for smooth transitions */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Apply animations to content */
.carousel-content-enter-active {
  animation: fadeInUp 0.6s ease-out;
}

.carousel-slide-enter-left {
  animation: slideInFromLeft 0.7s ease-out;
}

.carousel-slide-enter-right {
  animation: slideInFromRight 0.7s ease-out;
}
</style>
