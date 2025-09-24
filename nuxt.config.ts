export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false, // Para GitHub Pages
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
  app: {
    baseURL: "/Personal/", // Nome do seu repositório
    buildAssetsDir: "/_nuxt/",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
      ],
      theme: {
        extend: {
          colors: {
            "teal-dark": "#2D5A5A",
            "beige-light": "#F5F5DC",
          },
        },
      },
    },
  },
  image: {
    quality: 80,
    format: ["webp", "avif", "jpeg"],
  },
});
