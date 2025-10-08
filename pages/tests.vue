<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Navigation -->
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          ← Back to Main Demo
        </NuxtLink>
      </div>

      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Carousel Tests</h1>
        <p class="text-lg text-gray-600">
          Comprehensive testing suite for the Carousel component
        </p>
      </div>

      <!-- Test Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Main Demo -->
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Main Demo</h3>
            <p class="text-gray-600 mb-4">
              Original carousel implementation with 2 items
            </p>
            <NuxtLink
              to="/"
              class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View Demo
            </NuxtLink>
          </div>
        </div>

        <!-- All Cases Test -->
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">All Cases Test</h3>
            <p class="text-gray-600 mb-4">
              Tests for 1, 2, 3, and 5+ items scenarios
            </p>
            <NuxtLink
              to="/test-all-cases"
              class="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Run Tests
            </NuxtLink>
          </div>
        </div>

        <!-- Two Items Test -->
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Two Items Test</h3>
            <p class="text-gray-600 mb-4">
              Specific test for the 2 items navigation issue
            </p>
            <NuxtLink
              to="/test-two-items"
              class="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Run Test
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Features List -->
      <div class="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Features Tested</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3 text-green-600">
              ✅ Auto-Duplication
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>• 1 item → duplicated to 2</li>
              <li>• 2 items → duplicated to 4</li>
              <li>• 3 items → duplicated to 6</li>
              <li>• 5+ items → no duplication</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-green-600">
              ✅ Navigation
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Infinite loop with duplicated items</li>
              <li>• Smooth transitions</li>
              <li>• Arrow navigation always enabled</li>
              <li>• Dots show only original items</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-green-600">
              ✅ Edge Cases
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Single item handling</li>
              <li>• Two items navigation fix</li>
              <li>• Variable item widths</li>
              <li>• Responsive design</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3 text-green-600">
              ✅ Performance
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Hardware acceleration</li>
              <li>• Smooth animations</li>
              <li>• Touch/drag support</li>
              <li>• Auto-play functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This page provides comprehensive testing for the Carousel component
</script>
