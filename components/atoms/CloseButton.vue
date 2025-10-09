<template>
  <button
    class="absolute top-2 right-2 w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out border-none cursor-pointer hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
    @click="handleClick"
    aria-label="Fechar"
    type="button"
  >
    <svg
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
interface Emits {
  (e: "click"): void;
}

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit("click");
};
</script>
