<template>
  <button
    class="close-button"
    @click="handleClick"
    aria-label="Fechar"
    type="button"
  >
    <svg
      class="close-button__icon"
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

<style scoped>
.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.close-button:hover {
  background-color: #e5e7eb;
  color: #1f2937;
}

.close-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.5);
}

.close-button__icon {
  width: 1rem;
  height: 1rem;
}
</style>
