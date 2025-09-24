import { initFlowbite } from 'flowbite'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  if (process.client) {
    initFlowbite()
  }
})
