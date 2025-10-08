<template>
  <button
    :style="hotspotStyle"
    class="hotspot"
    @click="handleClick"
    :aria-label="`Ponto de interesse ${number}: ${title}`"
  >
    <span class="hotspot__number">{{ number }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  number: number;
  title: string;
  x: number; // posição em percentual (0-100)
  y: number; // posição em percentual (0-100)
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

<style scoped>
.hotspot {
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.hotspot:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background-color: #dc2626;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hotspot:active {
  transform: translate(-50%, -50%) scale(0.95);
}

.hotspot:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(252, 165, 165, 0.5),
    0 0 0 4px rgba(252, 165, 165, 0.2);
}

.hotspot__number {
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
