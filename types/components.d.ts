declare module "@components/atoms/Hotspot.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@components/atoms/CloseButton.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@components/molecules/Popup.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@components/organisms/InteractiveMap.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Aliases para compatibilidade
declare module "~/components/atoms/Hotspot.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "~/components/atoms/CloseButton.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "~/components/molecules/Popup.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "~/components/organisms/InteractiveMap.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@data/hotspots" {
  export const hotspotsData: any[];
}

declare module "@types/hotspot" {
  export interface HotspotData {
    number: number;
    title: string;
    description: string;
    x: number;
    y: number;
    category: "attraction" | "accommodation" | "service" | "facility";
  }

  export interface HotspotClickEvent {
    number: number;
    title: string;
    x: number;
    y: number;
  }
}

// Aliases para compatibilidade
declare module "~/data/hotspots" {
  export const hotspotsData: any[];
}

declare module "~/types/hotspot" {
  export interface HotspotData {
    number: number;
    title: string;
    description: string;
    x: number;
    y: number;
    category: "attraction" | "accommodation" | "service" | "facility";
  }

  export interface HotspotClickEvent {
    number: number;
    title: string;
    x: number;
    y: number;
  }
}
