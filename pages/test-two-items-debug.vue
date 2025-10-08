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

    <h1 class="text-2xl font-bold mb-4">Two Items Debug Test</h1>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">2 Items Debug Info</h2>
      <div class="mb-4 p-4 bg-gray-100 rounded">
        <p><strong>Original Items:</strong> {{ twoItems.length }}</p>
        <p><strong>Auto Duplicate:</strong> {{ autoDuplicate }}</p>
        <p><strong>Items Per View:</strong> {{ itemsPerView }}</p>
        <p><strong>Loop:</strong> {{ loop }}</p>
      </div>

      <Carousel
        ref="carouselRef"
        :items="twoItems"
        :items-per-view="itemsPerView"
        :gap="20"
        :height="300"
        :loop="loop"
        :show-arrows="true"
        :show-content="true"
        :auto-play="false"
        :auto-duplicate="autoDuplicate"
        @slide-change="onSlideChange"
      >
        <template #default="{ item, index }">
          <div
            class="w-full h-full relative rounded-lg overflow-hidden flex items-center justify-center"
            :class="getItemClass(index)"
          >
            <div class="text-center">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm text-gray-600">ID: {{ item.id }}</div>
              <div class="text-sm text-gray-600">Index: {{ index }}</div>
              <div class="text-sm text-gray-600">
                Original: {{ item.originalId || "N/A" }}
              </div>
              <div class="text-sm text-gray-600">
                Duplicate: {{ item.isDuplicate ? "Yes" : "No" }}
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
        <button
          @click="goToSlide(0)"
          class="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to 0
        </button>
        <button
          @click="goToSlide(1)"
          class="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to 1
        </button>
        <button
          @click="goToSlide(2)"
          class="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to 2
        </button>
        <button
          @click="goToSlide(3)"
          class="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to 3
        </button>
      </div>

      <div class="mt-4 p-4 bg-yellow-100 rounded">
        <p><strong>Current Slide:</strong> {{ currentSlide }}</p>
        <p><strong>Can Go Next:</strong> {{ canGoNext }}</p>
        <p><strong>Can Go Previous:</strong> {{ canGoPrevious }}</p>
      </div>
    </div>

    <!-- Test Controls -->
    <div class="mb-8 p-4 bg-blue-50 rounded">
      <h3 class="text-lg font-semibold mb-4">Test Controls</h3>
      <div class="flex gap-4 mb-4">
        <label class="flex items-center">
          <input type="checkbox" v-model="autoDuplicate" class="mr-2" />
          Auto Duplicate
        </label>
        <label class="flex items-center">
          <input type="checkbox" v-model="loop" class="mr-2" />
          Loop
        </label>
      </div>
      <div class="flex gap-4">
        <label class="flex items-center">
          Items Per View:
          <input
            type="number"
            v-model="itemsPerView"
            min="1"
            max="4"
            class="ml-2 px-2 py-1 border rounded w-20"
          />
        </label>
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
const autoDuplicate = ref(true);
const loop = ref(true);
const itemsPerView = ref(3);

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

const getItemClass = (index: number) => {
  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  return colors[index % colors.length];
};

const onSlideChange = (slideIndex: number) => {
  currentSlide.value = slideIndex;
  // Update navigation state
  if (carouselRef.value) {
    canGoNext.value = true;
    canGoPrevious.value = true;
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

const goToSlide = (index: number) => {
  if (carouselRef.value) {
    carouselRef.value.goToSlide(index);
  }
};
</script>
