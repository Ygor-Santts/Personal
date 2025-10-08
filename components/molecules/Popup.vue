<template>
  <Teleport to="body">
    <div v-if="isVisible" class="popup-overlay" @click="handleOverlayClick">
      <div class="popup" :style="popupStyle" @click.stop>
        <CloseButton @click="handleClose" />

        <div class="popup__content">
          <h3 class="popup__title">{{ title }}</h3>
          <p class="popup__description">{{ description }}</p>
        </div>

        <!-- Seta apontando para baixo -->
        <div class="popup__arrow"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import CloseButton from "@/components/atoms/CloseButton.vue";

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

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 24rem;
  width: 100%;
  margin: 0 1rem;
  padding: 1rem;
  transform: translate(-50%, -50%);
  animation: popup-appear 0.2s ease-out;
}

.popup__content {
  padding-right: 1.5rem;
}

.popup__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.popup__description {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.625;
}

.popup__arrow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@keyframes popup-appear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Responsividade */
@media (max-width: 640px) {
  .popup {
    max-width: 20rem;
  }

  .popup__title {
    font-size: 1rem;
  }

  .popup__description {
    font-size: 0.75rem;
  }
}
</style>
