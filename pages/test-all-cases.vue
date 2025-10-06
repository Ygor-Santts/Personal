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

    <h1 class="text-2xl font-bold mb-4">Carousel All Cases Test</h1>

    <!-- 1 Item Test -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">1 Item (Auto-duplicated)</h2>
      <Carousel
        :items="oneItem"
        :items-per-view="3"
        :gap="20"
        :height="300"
        :loop="true"
        :show-arrows="true"
        :show-content="true"
        :auto-play="false"
      >
        <template #default="{ item }">
          <div
            class="w-full h-full relative rounded-lg overflow-hidden bg-red-200 flex items-center justify-center"
          >
            <div class="text-center">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm text-gray-600">ID: {{ item.id }}</div>
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
    </div>

    <!-- 2 Items Test -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">2 Items (Auto-duplicated)</h2>
      <Carousel
        :items="twoItems"
        :items-per-view="3"
        :gap="20"
        :height="300"
        :loop="true"
        :show-arrows="true"
        :show-content="true"
        :auto-play="false"
      >
        <template #default="{ item }">
          <div
            class="w-full h-full relative rounded-lg overflow-hidden bg-green-200 flex items-center justify-center"
          >
            <div class="text-center">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm text-gray-600">ID: {{ item.id }}</div>
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
    </div>

    <!-- 3 Items Test -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">3 Items (Auto-duplicated)</h2>
      <Carousel
        :items="threeItems"
        :items-per-view="3"
        :gap="20"
        :height="300"
        :loop="true"
        :show-arrows="true"
        :show-content="true"
        :auto-play="false"
      >
        <template #default="{ item }">
          <div
            class="w-full h-full relative rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <div class="text-center">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm text-gray-600">ID: {{ item.id }}</div>
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
    </div>

    <!-- 5 Items Test (No duplication) -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">5 Items (No duplication)</h2>
      <Carousel
        :items="fiveItems"
        :items-per-view="3"
        :gap="20"
        :height="300"
        :loop="true"
        :show-arrows="true"
        :show-content="true"
        :auto-play="false"
      >
        <template #default="{ item }">
          <div
            class="w-full h-full relative rounded-lg overflow-hidden bg-blue-200 flex items-center justify-center"
          >
            <div class="text-center">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm text-gray-600">ID: {{ item.id }}</div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const oneItem = ref([
  {
    id: 1,
    title: "Only Item",
    description: "Single item description",
  },
]);

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

const threeItems = ref([
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
  {
    id: 3,
    title: "Item 3",
    description: "Third item description",
  },
]);

const fiveItems = ref([
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
  {
    id: 3,
    title: "Item 3",
    description: "Third item description",
  },
  {
    id: 4,
    title: "Item 4",
    description: "Fourth item description",
  },
  {
    id: 5,
    title: "Item 5",
    description: "Fifth item description",
  },
]);
</script>
