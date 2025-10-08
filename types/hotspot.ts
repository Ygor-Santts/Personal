export interface HotspotData {
  number: number;
  title: string;
  description: string;
  x: number; // posição em percentual (0-100)
  y: number; // posição em percentual (0-100)
  category: "attraction" | "accommodation" | "service" | "facility";
}

export interface HotspotClickEvent {
  number: number;
  title: string;
  x: number;
  y: number;
}
