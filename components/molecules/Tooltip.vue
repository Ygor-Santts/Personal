<template>
  <div
    v-if="isVisible"
    class="absolute z-50 pointer-events-auto transition-all duration-300 ease-out"
    :style="tooltipStyle"
    @click.stop
  >
    <!-- Connection line to hotspot -->
    <div
      class="absolute bg-blue-500 opacity-60 transition-all duration-300 ease-out"
      :style="connectionLineStyle"
    ></div>
    
    <div
      class="relative bg-white rounded-xl shadow-2xl w-72 p-5 border-2 border-blue-200 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <CloseButton @click="handleClose" />

      <div class="pr-8">
        <div class="flex items-center mb-3">
          <div class="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
          <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed pl-6">{{ description }}</p>
      </div>

      <!-- Enhanced arrow pointing to the hotspot -->
      <div
        class="absolute w-4 h-4 bg-white border-2 border-blue-200 rotate-45 transition-all duration-300"
        :class="arrowClasses"
      ></div>
      
      <!-- Hotspot indicator -->
      <div
        class="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"
        :style="hotspotIndicatorStyle"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CloseButton from "../atoms/CloseButton.vue";

interface Props {
  isVisible: boolean;
  title: string;
  description: string;
  x: number; // position as percentage (0-100)
  y: number; // position as percentage (0-100)
  position?: "top" | "bottom" | "left" | "right" | "auto";
}

interface Emits {
  (e: "close"): void;
}

const props = withDefaults(defineProps<Props>(), {
  position: "auto",
});

const emit = defineEmits<Emits>();

// Determine the best position based on map boundaries
const actualPosition = computed(() => {
  if (props.position && props.position !== "auto") {
    return props.position;
  }

  // Logic to determine the best position automatically
  // Based on the hotspot position on the map
  const x = props.x || 50; // Default to center if undefined
  const y = props.y || 50; // Default to center if undefined

  // If too close to top, show below
  if (y < 25) {
    return "bottom";
  }
  // If too close to bottom, show above
  if (y > 75) {
    return "top";
  }
  // If too close to left, show right
  if (x < 25) {
    return "right";
  }
  // If too close to right, show left
  if (x > 75) {
    return "left";
  }

  // Default: on top
  return "top";
});

const tooltipStyle = computed(() => {
  const offset = 4; // spacing from hotspot in %
  const tooltipWidthPercent = 35; // approximate tooltip width in %
  const tooltipHeightPercent = 20; // approximate tooltip height in %

  // Safety checks for undefined props
  const x = props.x || 50;
  const y = props.y || 50;

  let left = x;
  let top = y;
  let transform = "";

  switch (actualPosition.value) {
    case "top":
      top = y - offset;
      // Adjust to not overflow horizontal limits
      if (x < tooltipWidthPercent / 2) {
        left = tooltipWidthPercent / 2;
      } else if (x > 100 - tooltipWidthPercent / 2) {
        left = 100 - tooltipWidthPercent / 2;
      }
      transform = "translate(-50%, -100%)";
      break;

    case "bottom":
      top = y + offset;
      // Adjust to not overflow horizontal limits
      if (x < tooltipWidthPercent / 2) {
        left = tooltipWidthPercent / 2;
      } else if (x > 100 - tooltipWidthPercent / 2) {
        left = 100 - tooltipWidthPercent / 2;
      }
      transform = "translate(-50%, 0)";
      break;

    case "left":
      left = x - offset;
      top = y;
      // Adjust to not overflow vertical limits
      if (y < tooltipHeightPercent / 2) {
        top = tooltipHeightPercent / 2;
      } else if (y > 100 - tooltipHeightPercent / 2) {
        top = 100 - tooltipHeightPercent / 2;
      }
      transform = "translate(-100%, -50%)";
      break;

    case "right":
      left = x + offset;
      top = y;
      // Adjust to not overflow vertical limits
      if (y < tooltipHeightPercent / 2) {
        top = tooltipHeightPercent / 2;
      } else if (y > 100 - tooltipHeightPercent / 2) {
        top = 100 - tooltipHeightPercent / 2;
      }
      transform = "translate(0, -50%)";
      break;
  }

  return {
    left: `${left}%`,
    top: `${top}%`,
    transform,
  };
});

const arrowClasses = computed(() => {
  switch (actualPosition.value) {
    case "top":
      return "bottom-[-8px] left-1/2 -translate-x-1/2 border-b-2 border-r-2";
    case "bottom":
      return "top-[-8px] left-1/2 -translate-x-1/2 border-t-2 border-l-2";
    case "left":
      return "right-[-8px] top-1/2 -translate-y-1/2 border-r-2 border-t-2";
    case "right":
      return "left-[-8px] top-1/2 -translate-y-1/2 border-l-2 border-b-2";
    default:
      return "bottom-[-8px] left-1/2 -translate-x-1/2 border-b-2 border-r-2";
  }
});

// Connection line style to connect tooltip to hotspot
const connectionLineStyle = computed(() => {
  const offset = 2; // spacing from hotspot in %
  const x = props.x || 50;
  const y = props.y || 50;
  
  switch (actualPosition.value) {
    case "top":
      return {
        left: `${x}%`,
        top: `${y - offset}%`,
        width: '2px',
        height: `${offset * 2}%`,
        transform: 'translateX(-50%)',
        transformOrigin: 'top center'
      };
    case "bottom":
      return {
        left: `${x}%`,
        top: `${y + offset}%`,
        width: '2px',
        height: `${offset * 2}%`,
        transform: 'translateX(-50%)',
        transformOrigin: 'bottom center'
      };
    case "left":
      return {
        left: `${x - offset}%`,
        top: `${y}%`,
        width: `${offset * 2}%`,
        height: '2px',
        transform: 'translateY(-50%)',
        transformOrigin: 'left center'
      };
    case "right":
      return {
        left: `${x + offset}%`,
        top: `${y}%`,
        width: `${offset * 2}%`,
        height: '2px',
        transform: 'translateY(-50%)',
        transformOrigin: 'right center'
      };
    default:
      return {
        left: `${x}%`,
        top: `${y - offset}%`,
        width: '2px',
        height: `${offset * 2}%`,
        transform: 'translateX(-50%)',
        transformOrigin: 'top center'
      };
  }
});

// Hotspot indicator style
const hotspotIndicatorStyle = computed(() => {
  const x = props.x || 50;
  const y = props.y || 50;
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)'
  };
});

const handleClose = () => {
  emit("close");
};
</script>
