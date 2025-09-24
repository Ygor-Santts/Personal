
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)

interface _GlobalComponents {
      'CarouselExamples': typeof import("../../components/CarouselExamples.vue")['default']
    'GenericCarousel': typeof import("../../components/GenericCarousel.vue")['default']
    'InfoCard': typeof import("../../components/InfoCard.vue")['default']
    'NuxtWelcome': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../../node_modules/.pnpm/@nuxt+image@1.11.0_db0@0.3.2_ioredis@5.8.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../../node_modules/.pnpm/@nuxt+image@1.11.0_db0@0.3.2_ioredis@5.8.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtLinkLocale': typeof import("../../node_modules/.pnpm/@nuxtjs+i18n@9.5.6_@vue+compiler-dom@3.5.21_eslint@9.36.0_jiti@2.6.0__magicast@0.3.5_ro_f3a85ea96da0bf5d34759d97db2f9311/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../../node_modules/.pnpm/@nuxtjs+i18n@9.5.6_@vue+compiler-dom@3.5.21_eslint@9.36.0_jiti@2.6.0__magicast@0.3.5_ro_f3a85ea96da0bf5d34759d97db2f9311/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'NuxtPage': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyCarouselExamples': LazyComponent<typeof import("../../components/CarouselExamples.vue")['default']>
    'LazyGenericCarousel': LazyComponent<typeof import("../../components/GenericCarousel.vue")['default']>
    'LazyInfoCard': LazyComponent<typeof import("../../components/InfoCard.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/.pnpm/@nuxt+image@1.11.0_db0@0.3.2_ioredis@5.8.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/.pnpm/@nuxt+image@1.11.0_db0@0.3.2_ioredis@5.8.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+i18n@9.5.6_@vue+compiler-dom@3.5.21_eslint@9.36.0_jiti@2.6.0__magicast@0.3.5_ro_f3a85ea96da0bf5d34759d97db2f9311/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../../node_modules/.pnpm/@nuxtjs+i18n@9.5.6_@vue+compiler-dom@3.5.21_eslint@9.36.0_jiti@2.6.0__magicast@0.3.5_ro_f3a85ea96da0bf5d34759d97db2f9311/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@3.19.2_@parcel+watcher@2.5.1_@types+node@24.5.2_@vue+compiler-sfc@3.5.21_db0@0.3.2_23c94d9768497a145b4094957351b646/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
