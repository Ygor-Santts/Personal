<template>
  <div
    :class="`w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 ${backgroundColor}`"
  >
    <div>
      <h3 class="text-lg font-bold text-white mb-2">{{ title }}</h3>
      <p class="text-sm text-white opacity-90 leading-relaxed">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center justify-between">
      <div class="text-xs text-white opacity-75">{{ category }}</div>
      <div
        class="w-8 h-8 bg-red-200 bg-opacity-20 rounded-full flex items-center justify-center"
      >
        <Icon :name="icon" class="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  category: string;
  backgroundColor: string;
  icon: string;
}

defineProps<Props>();
</script>
