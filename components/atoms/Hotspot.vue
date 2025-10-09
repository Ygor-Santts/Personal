<template>
  <button
    :style="hotspotStyle"
    class="absolute w-8 h-8 bg-red-500 text-white rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 ease-in-out -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 hover:bg-red-600 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-red-200"
    @click="handleClick"
    :aria-label="`Point of interest ${number}: ${title}`"
  >
    <slot v-if="icon" name="icon" />
    <span
      class="text-sm font-bold leading-none flex items-center justify-center h-full"
      >{{ number }}</span
    >
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  number: number;
  title: string;
  x: number; // position as percentage (0-100)
  y: number; // position as percentage (0-100)
  icon?: string; // optional icon to display instead of number
}

interface Emits {
  (
    e: "click",
    hotspot: { number: number; title: string; x: number; y: number }
  ): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const hotspotStyle = computed(() => ({
  left: `${props.x}%`,
  top: `${props.y}%`,
}));

const handleClick = () => {
  emit("click", {
    number: props.number,
    title: props.title,
    x: props.x,
    y: props.y,
  });
};
</script>
