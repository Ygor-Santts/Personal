/// <reference types="@nuxt/image" />
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false, // Para GitHub Pages
  nitro: {
    preset: "github_pages",
  },
  app: {
    baseURL: "/Personal/", // Nome do seu repositório
    buildAssetsDir: "/_nuxt/",
  },
  routeRules: {
    "/**": { prerender: true },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  // @ts-expect-error - 'image' options are injected by @nuxt/image module
  image: {
    provider: "none", // Evita transformações via servidor em hospedagem estática
    quality: 80,
    format: ["webp", "avif", "jpeg"],
  },
});
