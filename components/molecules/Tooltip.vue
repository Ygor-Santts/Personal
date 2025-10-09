<template>
  <div
    v-if="isVisible"
    class="absolute z-50 pointer-events-auto transition-all duration-200"
    :style="tooltipStyle"
    @click.stop
  >
    <div
      class="relative bg-white rounded-lg shadow-2xl w-64 p-4 border border-gray-100"
    >
      <CloseButton @click="handleClose" />

      <div class="pr-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-600 leading-relaxed">{{ description }}</p>
      </div>

      <!-- Arrow pointing to the hotspot -->
      <div
        class="absolute w-3 h-3 bg-white border-gray-100 rotate-45"
        :class="arrowClasses"
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
  if (props.position !== "auto") {
    return props.position;
  }

  // Logic to determine the best position automatically
  // Based on the hotspot position on the map
  const x = props.x;
  const y = props.y;

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
  const offset = 3; // spacing from hotspot in %
  const tooltipWidthPercent = 30; // approximate tooltip width in %

  let left = props.x;
  let top = props.y;
  let transform = "";

  switch (actualPosition.value) {
    case "top":
      top = props.y - offset;
      // Adjust to not overflow horizontal limits
      if (props.x < tooltipWidthPercent / 2) {
        left = tooltipWidthPercent / 2;
      } else if (props.x > 100 - tooltipWidthPercent / 2) {
        left = 100 - tooltipWidthPercent / 2;
      }
      transform = "translate(-50%, -100%)";
      break;

    case "bottom":
      top = props.y + offset;
      // Adjust to not overflow horizontal limits
      if (props.x < tooltipWidthPercent / 2) {
        left = tooltipWidthPercent / 2;
      } else if (props.x > 100 - tooltipWidthPercent / 2) {
        left = 100 - tooltipWidthPercent / 2;
      }
      transform = "translate(-50%, 0)";
      break;

    case "left":
      left = props.x - offset;
      top = props.y;
      transform = "translate(-100%, -50%)";
      break;

    case "right":
      left = props.x + offset;
      top = props.y;
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
      return "bottom-[-6px] left-1/2 -translate-x-1/2 border-b border-r";
    case "bottom":
      return "top-[-6px] left-1/2 -translate-x-1/2 border-t border-l";
    case "left":
      return "right-[-6px] top-1/2 -translate-y-1/2 border-r border-t";
    case "right":
      return "left-[-6px] top-1/2 -translate-y-1/2 border-l border-b";
    default:
      return "bottom-[-6px] left-1/2 -translate-x-1/2 border-b border-r";
  }
});

const handleClose = () => {
  emit("close");
};
</script>
