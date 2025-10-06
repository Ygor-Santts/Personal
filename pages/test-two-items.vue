<template>
  <div class="p-8">
    <!-- Navigation -->
    <div class="mb-6 flex gap-4">
      <NuxtLink
        to="/"
        class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        ← Main Demo
      </NuxtLink>
      <NuxtLink
        to="/tests"
        class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        🧪 All Tests
      </NuxtLink>
    </div>

    <h1 class="text-2xl font-bold mb-4">Two Items Test</h1>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">2 Items (Auto-duplicated to 4)</h2>
      <div class="mb-4">
        <p class="text-sm text-gray-600">
          Current slide: {{ currentSlide }} | Can go next: {{ canGoNext }} | Can
          go previous: {{ canGoPrevious }}
        </p>
      </div>

      <Carousel
        ref="carouselRef"
        :items="twoItems"
        :items-per-view="3"
        :gap="20"
        :height="300"
        :loop="true"
        :show-arrows="true"
        :show-content="true"
        :auto-play="false"
        @slide-change="onSlideChange"
      >
        <template #default="{ item, index }">
          <div
            class="w-full h-full relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center"
          >
            <div class="text-center">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm text-gray-600">ID: {{ item.id }}</div>
              <div class="text-sm text-gray-600">Index: {{ index }}</div>
              <div class="text-sm text-gray-600">
                Original: {{ item.originalId || "N/A" }}
              </div>
            </div>
          </div>
        </template>
        <template #content="{ item }">
          <div class="text-center">
            <h3 class="text-lg font-bold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </template>
      </Carousel>

      <div class="mt-4 flex gap-2">
        <button
          @click="previous"
          :disabled="!canGoPrevious"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          @click="next"
          :disabled="!canGoNext"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const carouselRef = ref();
const currentSlide = ref(0);
const canGoNext = ref(true);
const canGoPrevious = ref(true);

const twoItems = ref([
  {
    id: 1,
    title: "Item 1",
    description: "First item description",
  },
  {
    id: 2,
    title: "Item 2",
    description: "Second item description",
  },
]);

const onSlideChange = (slideIndex: number) => {
  currentSlide.value = slideIndex;
  // Update navigation state
  if (carouselRef.value) {
    canGoNext.value = true; // Always true for duplicated items
    canGoPrevious.value = true; // Always true for duplicated items
  }
};

const next = () => {
  if (carouselRef.value) {
    carouselRef.value.next();
  }
};

const previous = () => {
  if (carouselRef.value) {
    carouselRef.value.previous();
  }
};
</script>
