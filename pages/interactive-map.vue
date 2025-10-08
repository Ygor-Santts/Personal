<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Mapa Interativo do Resort</h1>
      <p class="page__description">
        Explore o resort clicando nos pontos numerados para descobrir atrações,
        acomodações e serviços.
      </p>
    </div>

    <div class="page__content">
      <InteractiveMap />
    </div>

    <div class="page__instructions">
      <h2>Como usar:</h2>
      <ul>
        <li>
          <strong>Desktop:</strong> Use o scroll do mouse para zoom, arraste
          para mover o mapa
        </li>
        <li>
          <strong>Mobile:</strong> Use gestos de pinça para zoom e arraste para
          mover
        </li>
        <li>
          <strong>Clique</strong> nos números para ver informações sobre cada
          ponto
        </li>
        <li>
          <strong>Controles:</strong> Use os botões no canto superior direito
          para zoom
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveMap from "~/components/organisms/InteractiveMap.vue";

// Meta tags
useHead({
  title: "Mapa Interativo - Resort",
  meta: [
    {
      name: "description",
      content: "Mapa interativo do resort com todas as atrações e serviços",
    },
  ],
});
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #f9fafb;
}

.page__header {
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #e5e7eb;
  padding: 2rem 1.5rem;
}

.page__title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.page__description {
  font-size: 1.125rem;
  color: #4b5563;
}

.page__content {
  padding: 1.5rem;
}

.page__instructions {
  background-color: white;
  margin: 0 1.5rem 1.5rem 1.5rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.page__instructions h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.page__instructions ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page__instructions li {
  color: #374151;
}

.page__instructions strong {
  color: #111827;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 768px) {
  .page__header {
    padding: 1.5rem 1rem;
  }

  .page__title {
    font-size: 1.5rem;
  }

  .page__description {
    font-size: 1rem;
  }

  .page__content {
    padding: 1rem;
  }

  .page__instructions {
    margin: 0 1rem 1rem 1rem;
    padding: 1rem;
  }
}
</style>
