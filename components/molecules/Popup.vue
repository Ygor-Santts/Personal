<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
      @click="handleOverlayClick"
    >
      <div
        class="relative bg-white rounded-lg shadow-2xl max-w-96 w-full mx-4 p-4 -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 sm:max-w-80"
        :style="popupStyle"
        @click.stop
      >
        <CloseButton @click="handleClose" />

        <div class="pr-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 sm:text-base">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed sm:text-xs">
            {{ description }}
          </p>
        </div>

        <!-- Seta apontando para baixo -->
        <div
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-md"
        ></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
// CloseButton é auto-importado pelo Nuxt

interface Props {
  isVisible: boolean;
  title: string;
  description: string;
  x: number; // posição em percentual (0-100)
  y: number; // posição em percentual (0-100)
}

interface Emits {
  (e: "close"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const popupStyle = computed(() => {
  // Calcular posição para que o popup apareça acima do hotspot
  // Ajustar a posição Y para colocar o popup acima do ponto
  const adjustedY = Math.max(props.y - 8, 10); // 8% acima do hotspot, mínimo 10% do topo

  return {
    left: `${props.x}%`,
    top: `${adjustedY}%`,
  };
});

const handleClose = () => {
  emit("close");
};

const handleOverlayClick = () => {
  emit("close");
};

// Fechar com ESC
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && props.isVisible) {
      emit("close");
    }
  };

  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
});
</script>
